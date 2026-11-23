import { test, expect } from "@playwright/test";

// Measure the painted foreground and its nearest opaque surface. Counting
// links alone missed the previous yellow-on-yellow and blue-on-blue regressions.
async function unreadableText(page) {
  return page.evaluate(() => {
    function luminance(rgb) {
      const linear = rgb.map(value => {
        const s = value / 255;
        return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
      });
      return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
    }

    const failures = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const text = walker.currentNode.textContent.trim();
      const el = walker.currentNode.parentElement;
      if (!text || !el || el.closest("script, style, .sr-only, .skip-link")) continue;
      const range = document.createRange();
      range.selectNodeContents(walker.currentNode);
      if (!range.getBoundingClientRect().width || !el.checkVisibility({ visibilityProperty: true })) continue;
      const style = getComputedStyle(el);
      let parent = el;
      while (parent) {
        const bg = getComputedStyle(parent).backgroundColor;
        if (bg.startsWith("rgb(")) {
          const tones = [bg, style.color].map(color => luminance(color.match(/[\d.]+/g).map(Number)));
          const ratio = (Math.max(...tones) + .05) / (Math.min(...tones) + .05);
          if (ratio < 4.5) failures.push({ text: text.slice(0, 65), ratio: ratio.toFixed(2) });
          break;
        }
        parent = parent.parentElement;
      }
    }
    return failures;
  });
}

for (const colorScheme of ["light", "dark"]) {
  for (const width of [393, 1440]) {
    test(`homepage text is legible in ${colorScheme} at ${width}px`, async ({ page }) => {
      await page.emulateMedia({ colorScheme, reducedMotion: "reduce" });
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      await expect(page.locator("html")).toHaveAttribute("data-theme", colorScheme);
      const reading = page.getByRole("region", { name: "Research & essays" });
      await expect(reading.getByRole("link")).toHaveCount(3);
      for (const link of await reading.getByRole("link").all()) {
        await expect(link.getByRole("heading")).toBeVisible();
        await expect(link).toHaveAttribute("href", /^https:\/\//);
        await link.focus();
        await link.hover();
        await expect(link).toHaveCSS("color", "rgb(24, 39, 128)");
      }
      if (width < 700) await page.locator(".mobile-nav summary").click();
      expect(await unreadableText(page)).toEqual([]);
    });
  }
}

test("desktop opening waits for a delayed portrait and runs once", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  let release;
  const gate = new Promise(resolve => { release = resolve; });
  await page.route("**/broadcast/hero3.webp", async route => {
    await gate;
    await route.continue();
  });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const hero = page.locator(".broadcast-hero");
  await expect(hero).not.toHaveAttribute("data-on-air", "");
  release();
  await expect(hero).toHaveAttribute("data-on-air", "");
  await expect.poll(() => page.locator(".hero-art").evaluate(el =>
    getComputedStyle(el, "::after").animationName)).toBe("print-pass");
  await page.getByRole("link", { name: "Explore my work" }).click();
  await expect(page).toHaveURL(/#portfolio$/);
});

test("reduced motion leaves the artwork and copy static", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".hero-intro h2")).toBeVisible();
  await expect(page.locator(".hero-art img")).toHaveCSS("animation-name", "none");
  expect(await page.locator(".hero-art").evaluate(el =>
    getComputedStyle(el, "::after").animationName)).toBe("none");
});


test("research and essays survive a live theme toggle and a reload", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to dark mode" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator(".archive-reading h3").first()).toHaveCSS("color", "rgb(24, 39, 128)");
});

test("the snug code example remains legible after syntax highlighting", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/work/snug");
  await expect(page.locator("pre .token").first()).toBeVisible();
  expect(await unreadableText(page)).toEqual([]);
});

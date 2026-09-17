#!/usr/bin/env node
/**
 * Sync posts from the Jekyll blog at github.com/JeremySNR/JeremySNR.github.io
 * into this site's writing section (src/app/blog/posts/*.mdx).
 *
 *   node scripts/sync-blog.mjs               # fetch _posts from GitHub
 *   node scripts/sync-blog.mjs --from ./path # use a local checkout's _posts dir
 *
 * Every generated file carries `source: "github-blog"` in its frontmatter.
 * Files with that marker are owned by this script: they are overwritten on
 * each run and removed when the upstream post disappears. Hand-written posts
 * are never touched.
 */

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const OWNER = "JeremySNR";
const REPO = "JeremySNR.github.io";
const BRANCH = process.env.BLOG_BRANCH || "main";
const SITE_URL = "https://jeremysnr.github.io";
const OUT_DIR = path.join(process.cwd(), "src", "app", "blog", "posts");
const MARKER = "github-blog";

const TAG_LABELS = {
  ai: "AI",
  policy: "Policy",
  uk: "UK",
  "sovereign-compute": "Sovereign Compute",
  safety: "Safety",
  security: "Security",
  evaluations: "Evaluations",
  agents: "Agents",
  travel: "Travel",
  startups: "Startups",
  voice: "Voice AI",
};

const args = process.argv.slice(2);
const fromIdx = args.indexOf("--from");
const localDir = fromIdx !== -1 ? args[fromIdx + 1] : null;

async function listPosts() {
  if (localDir) {
    const files = (await fs.readdir(localDir)).filter((f) => /\.(md|markdown)$/.test(f));
    return Promise.all(
      files.map(async (name) => ({
        name,
        content: await fs.readFile(path.join(localDir, name), "utf8"),
      })),
    );
  }

  const headers = { Accept: "application/vnd.github+json", "User-Agent": "jeremys-portfolio-sync" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  const listRes = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/_posts?ref=${BRANCH}`,
    { headers },
  );
  if (!listRes.ok) throw new Error(`GitHub API ${listRes.status} listing _posts`);
  const entries = await listRes.json();

  return Promise.all(
    entries
      .filter((e) => e.type === "file" && /\.(md|markdown)$/.test(e.name))
      .map(async (e) => {
        const res = await fetch(e.download_url, {
          headers: { "User-Agent": headers["User-Agent"] },
        });
        if (!res.ok) throw new Error(`GitHub ${res.status} fetching ${e.name}`);
        return { name: e.name, content: await res.text() };
      }),
  );
}

/** "2026-08-03-some-slug.md" -> { date: "2026-08-03", slug: "some-slug" } */
function parseFilename(name) {
  const m = name.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)\.(md|markdown)$/);
  if (!m) return null;
  return { year: m[1], month: m[2], day: m[3], slug: m[4] };
}

function toDateString(value, fallback) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "string") {
    const m = value.match(/^(\d{4}-\d{2}-\d{2})/);
    if (m) return m[1];
  }
  return fallback;
}

function tagLabel(tags) {
  if (!Array.isArray(tags) || tags.length === 0) return "Essay";
  const labels = tags.slice(0, 2).map((t) => TAG_LABELS[t] ?? String(t).replace(/-/g, " "));
  return labels.join(" & ");
}

/**
 * Make Jekyll/kramdown markdown safe for MDX. Curly braces open JSX
 * expressions in MDX, so escape them outside fenced code. Everything else
 * that GFM and MDX share is left alone.
 */
function toMdxBody(markdown) {
  const lines = markdown.split("\n");
  let inFence = false;
  return lines
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) {
        inFence = !inFence;
        return line;
      }
      if (inFence) return line;
      // Leave inline code spans alone, escape braces in the rest.
      return line
        .split(/(`[^`]*`)/)
        .map((part, i) => (i % 2 === 1 ? part : part.replace(/[{}]/g, (c) => `\\${c}`)))
        .join("");
    })
    .join("\n")
    .trim();
}

function yamlString(value) {
  return JSON.stringify(
    String(value ?? "")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const upstream = await listPosts();

  const written = new Set();
  for (const file of upstream) {
    const parsed = parseFilename(file.name);
    if (!parsed) {
      console.warn(`skip ${file.name}: filename is not YYYY-MM-DD-slug.md`);
      continue;
    }
    const { data, content } = matter(file.content);
    if (data.published === false || data.draft === true) continue;

    const publishedAt = toDateString(data.date, `${parsed.year}-${parsed.month}-${parsed.day}`);
    const canonical = `${SITE_URL}/${parsed.year}/${parsed.month}/${parsed.slug}/`;

    const frontmatter = [
      "---",
      `title: ${yamlString(data.title || parsed.slug)}`,
      `summary: ${yamlString(data.description || data.excerpt || "")}`,
      `publishedAt: ${yamlString(publishedAt)}`,
      `tag: ${yamlString(tagLabel(data.tags))}`,
      `source: ${yamlString(MARKER)}`,
      `canonical: ${yamlString(canonical)}`,
      "---",
      "",
    ].join("\n");

    const outPath = path.join(OUT_DIR, `${parsed.slug}.mdx`);
    await fs.writeFile(outPath, `${frontmatter}${toMdxBody(content)}\n`, "utf8");
    written.add(`${parsed.slug}.mdx`);
    console.log(`synced ${parsed.slug}.mdx`);
  }

  // Remove synced posts that no longer exist upstream.
  for (const name of await fs.readdir(OUT_DIR)) {
    if (!name.endsWith(".mdx") || written.has(name)) continue;
    const raw = await fs.readFile(path.join(OUT_DIR, name), "utf8");
    if (matter(raw).data.source === MARKER) {
      await fs.unlink(path.join(OUT_DIR, name));
      console.log(`removed ${name} (no longer upstream)`);
    }
  }

  console.log(`done: ${written.size} post(s) from ${localDir ? localDir : `${OWNER}/${REPO}`}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

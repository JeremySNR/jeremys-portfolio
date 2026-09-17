"use client";

import { useEffect, useState } from "react";
import styles from "./about.module.scss";

/**
 * Section navigation for the About page. Tracks the section in view
 * and highlights it; plain anchor links so it works without JS too.
 */
export function AboutNav({ sections }: { sections: Array<{ id: string; title: string }> }) {
  const [active, setActive] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className={styles.toc} aria-label="On this page">
      <ol>
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`${styles.tocLink} ${active === s.id ? styles.tocActive : ""}`}
            >
              {s.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { person, about, blog, work, news } from "@/resources";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.scss";

const NAV = [
  { href: work.path, label: "Work" },
  { href: blog.path, label: "Writing" },
  { href: news.path, label: "Press" },
  { href: about.path, label: "About" },
];

export const Header = () => {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.wordmark} aria-label="Home">
          <span className={styles.name}>{person.name}</span>
          <span className={`mono ${styles.role}`}>AI, built and shipped</span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.navLink}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <span className={styles.divider} aria-hidden="true" />
          <ThemeToggle />
        </nav>

        <div className={styles.mobileControls}>
          <ThemeToggle />
          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <div
        id="site-menu"
        className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`}
        aria-hidden={!open}
      >
        <nav className={`container ${styles.overlayNav}`} aria-label="Mobile">
          <Link href="/" className={styles.overlayLink} style={{ ["--i" as string]: 0 }}>
            Home
          </Link>
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.overlayLink}
              style={{ ["--i" as string]: i + 1 }}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={`mailto:${person.email}`}
            className={`mono ${styles.overlayMeta}`}
            style={{ ["--i" as string]: NAV.length + 1 }}
          >
            {person.email}
          </a>
        </nav>
      </div>
    </header>
  );
};

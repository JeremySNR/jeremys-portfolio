"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { routes, display, person } from "@/resources";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  ["/work", "Work"], ["/blog", "Writing"], ["/about", "About"],
  ["/news", "Press"], ["/gallery", "Gallery"],
] as const;

export function Header() {
  const path = usePathname();
  const disclosure = useRef<HTMLDetailsElement>(null);
  const nav = (
    <nav aria-label="Main navigation" onClick={() => disclosure.current?.removeAttribute("open")}>
      {links.filter(([href]) => routes[href]).map(([href, label]) => (
        <Link key={href} href={href} aria-current={path === href || path?.startsWith(href + "/") ? "page" : undefined}>
          {label}
        </Link>
      ))}
      <a href={`mailto:${person.email}`}>Contact</a>
    </nav>
  );

  return (
    <header className="masthead">
      <div className="masthead-inner">
        <Link href="/" className="wordmark" aria-label="Jeremy Smith, home">JS<span>_</span></Link>
        <div className="desktop-nav">{nav}</div>
        <details className="mobile-nav" ref={disclosure} onKeyDown={(event) => {
          if (event.key === "Escape" && disclosure.current?.open) {
            disclosure.current.open = false;
            disclosure.current.querySelector("summary")?.focus();
          }
        }}>
          <summary>Menu</summary>
          {nav}
        </details>
        {display.themeSwitcher && <ThemeToggle />}
      </div>
    </header>
  );
}

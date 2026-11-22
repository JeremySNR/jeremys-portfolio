"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes, display, person } from "@/resources";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  ["/work", "Work"],
  ["/blog", "Writing"],
  ["/about", "About"],
  ["/news", "Press"],
  ["/gallery", "Gallery"],
] as const;

export function Header() {
  const path = usePathname();
  return (
    <header className="masthead">
      <div className="masthead-inner">
        <Link href="/" className="wordmark" aria-label="Jeremy Smith, home">
          JS<span>_</span>
        </Link>
        <nav aria-label="Main navigation">
          {links
            .filter(([href]) => routes[href])
            .map(([href, label]) => (
              <Link
                key={href}
                href={href}
                aria-current={path === href || path?.startsWith(href + "/") ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
          <a href={`mailto:${person.email}`}>Contact</a>
        </nav>
        {display.themeSwitcher && <ThemeToggle />}
      </div>
    </header>
  );
}

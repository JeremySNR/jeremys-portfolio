"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export function BroadcastHero() {
  const section = useRef<HTMLElement>(null);
  const poster = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const stage = section.current;
    const image = poster.current;
    if (!stage || !image || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let decoded = false;
    let inView = false;
    let played = false;

    function enter() {
      if (cancelled || played || !decoded || !inView || document.hidden) return;
      played = true;
      stage?.setAttribute("data-on-air", "");
      observer.disconnect();
      document.removeEventListener("visibilitychange", enter);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        enter();
      },
      { threshold: 0.25 },
    );
    observer.observe(stage);
    document.addEventListener("visibilitychange", enter);
    image
      .decode()
      .then(() => {
        decoded = true;
        enter();
      })
      .catch(() => {
        /* Keep the server-rendered introduction visible. */
      });

    return () => {
      cancelled = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", enter);
    };
  }, []);

  return (
    <section ref={section} className="broadcast-hero" aria-labelledby="hero-name">
      <h1 id="hero-name" className="sr-only">
        Jeremy Smith
      </h1>
      <picture className="hero-art">
        <source
          media="(max-width: 700px)"
          srcSet="/broadcast/mobile3.webp"
          width={780}
          height={720}
        />
        <img
          ref={poster}
          src="/broadcast/hero3.webp"
          width="1600"
          height="667"
          alt="Jeremy Smith"
          fetchPriority="high"
        />
      </picture>
      <div className="hero-intro">
        <h2>
          My take
          <br /> on AI.
        </h2>
        <Link className="broadcast-button" href="#portfolio">
          Explore my work
        </Link>
      </div>
      <p className="hero-bio">
        I build AI at Travel Counsellors. Here’s my take on the new releases, big ideas and
        arguments in AI.
      </p>
    </section>
  );
}

"use client";

import { useRef } from "react";
import Link from "next/link";
import { Media, Text } from "@once-ui-system/core";
import styles from "./Showcase.module.scss";

interface ShowcaseCardProps {
  href: string;
  image: string;
  title: string;
  summary: string;
  tag: string;
  feature?: boolean;
  priority?: boolean;
}

/**
 * A single entry in the selected-work showcase. The feature variant runs
 * image-beside-text at full width; grid entries stack image over text.
 * Shares the site's signature tilt + cursor-spotlight treatment.
 */
export function ShowcaseCard({
  href,
  image,
  title,
  summary,
  tag,
  feature = false,
  priority = false,
}: ShowcaseCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.setProperty("--rx", `${(x / rect.width - 0.5) * 3.5}deg`);
    el.style.setProperty("--ry", `${(y / rect.height - 0.5) * -3.5}deg`);
  };

  const handleLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <Link
      ref={cardRef}
      href={href}
      className={`${styles.card} ${feature ? styles.feature : styles.gridItem}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className={styles.media}>
        <Media
          src={image}
          alt={title}
          aspectRatio="16 / 9"
          radius="l"
          border="neutral-alpha-weak"
          sizes={feature ? "(max-width: 960px) 100vw, 640px" : "(max-width: 960px) 100vw, 480px"}
          priority={priority}
        />
      </div>
      <div className={styles.body}>
        <Text as="span" className={styles.tag}>
          {tag}
        </Text>
        <Text
          as="h3"
          variant={feature ? "display-strong-xs" : "heading-strong-l"}
          wrap="balance"
          className={styles.title}
        >
          {title}
        </Text>
        <Text as="p" variant="body-default-s" onBackground="neutral-weak" wrap="balance">
          {summary}
        </Text>
        <Text as="span" variant="label-default-s" className={styles.cta}>
          {feature ? "Read the case study" : "Read more"}
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
        </Text>
      </div>
    </Link>
  );
}

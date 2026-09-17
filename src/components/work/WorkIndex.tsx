"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./WorkIndex.module.scss";

export type WorkIndexItem = {
  slug: string;
  name: string;
  strap: string;
  role?: string;
  period?: string;
  outcome?: string;
  kind?: string;
  tags?: string[];
  image?: string;
};

const KIND_LABEL: Record<string, string> = {
  venture: "Venture",
  product: "Product",
  "open-source": "Open source",
  research: "Research",
  role: "In-house",
};

/**
 * The project index: numbered rows with name, one-line strap, role and
 * period. On wide screens a sticky preview on the right crossfades to
 * the hovered row's image. On small screens each row carries its own
 * image so nothing is lost.
 */
export function WorkIndex({
  items,
  startAt = 1,
  compact = false,
}: {
  items: WorkIndexItem[];
  startAt?: number;
  compact?: boolean;
}) {
  const [active, setActive] = useState(0);
  const current = items[active] ?? items[0];

  return (
    <div className={`${styles.wrap} ${compact ? styles.compact : ""}`}>
      <ol className={styles.list} onMouseLeave={() => setActive(0)}>
        {items.map((item, i) => (
          <li key={item.slug} className={styles.item}>
            <Link
              href={`/work/${item.slug}`}
              className={`${styles.row} ${i === active ? styles.rowActive : ""}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <span className={`mono ${styles.index}`}>{String(i + startAt).padStart(2, "0")}</span>
              <span className={styles.body}>
                <span className={styles.titleRow}>
                  <span className={`title ${styles.name}`}>{item.name}</span>
                  {item.kind && (
                    <span className={`mono ${styles.kind}`}>
                      {KIND_LABEL[item.kind] ?? item.kind}
                    </span>
                  )}
                </span>
                <span className={styles.strap}>{item.strap}</span>
                {item.outcome && !compact && <span className={styles.outcome}>{item.outcome}</span>}
              </span>
              <span className={`mono ${styles.meta}`}>
                {item.role && <span className={styles.role}>{item.role}</span>}
                {item.period && <span className={styles.period}>{item.period}</span>}
              </span>
              {item.image && (
                <span className={styles.inlineMedia}>
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 1023px) 100vw, 0px"
                    className={styles.inlineImg}
                  />
                </span>
              )}
            </Link>
          </li>
        ))}
      </ol>

      <div className={styles.preview} aria-hidden="true">
        <div className={styles.previewInner}>
          {items.map((item, i) =>
            item.image ? (
              <Image
                key={item.slug}
                src={item.image}
                alt=""
                fill
                sizes="(max-width: 1023px) 0px, 40vw"
                priority={i === 0}
                className={`${styles.previewImg} ${i === active ? styles.previewImgActive : ""}`}
              />
            ) : null,
          )}
          <div className={`mono ${styles.previewCaption}`}>
            <span>{current?.name}</span>
            <span>{current?.period}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

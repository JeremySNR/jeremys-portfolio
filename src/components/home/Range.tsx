import { home } from "@/resources";
import { SectionHead } from "@/components/SectionHead";
import styles from "./Range.module.scss";

/**
 * Three columns that make the "builds and leads" claim with evidence
 * rather than adjectives. Each column is a serif title and three lines.
 */
export function Range() {
  if (!home.range?.display) return null;
  return (
    <section className="container section" aria-labelledby="range-title">
      <SectionHead
        label="Range"
        count={home.range.items.length}
        title={home.range.title}
        id="range-title"
      />
      <div className={styles.cols}>
        {home.range.items.map((col, i) => (
          <div key={col.title} className={styles.col}>
            <div className={`mono ${styles.num}`}>{String(i + 1).padStart(2, "0")}</div>
            <h3 className={`title ${styles.colTitle}`}>{col.title}</h3>
            <ul className={styles.lines}>
              {col.lines.map((line) => (
                <li key={line} className={styles.line}>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

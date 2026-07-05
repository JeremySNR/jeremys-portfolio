import { about } from "@/resources";
import styles from "./ResearchPanel.module.scss";

/**
 * The published paper, presented like a journal entry rather than a card:
 * venue and year in mono, title in the display serif, abstract underneath.
 */
export function ResearchPanel() {
  const paper = about.publications?.papers[0];
  if (!about.publications?.display || !paper) return null;

  return (
    <a className={styles.panel} href={paper.link} target="_blank" rel="noreferrer">
      <span className={styles.meta}>
        Published paper{paper.venue ? ` · ${paper.venue}` : ""}
        {paper.date ? ` · ${paper.date}` : ""}
      </span>
      <h3 className={styles.title}>{paper.title}</h3>
      {paper.description && <p className={styles.abstract}>{paper.description}</p>}
      <span className={styles.cta}>
        Read the paper
        <span className={styles.arrow} aria-hidden="true">
          →
        </span>
      </span>
    </a>
  );
}

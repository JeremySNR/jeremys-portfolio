import { home } from "@/resources";
import styles from "./Proof.module.scss";

/**
 * The numbers that matter, typeset large between hairlines. Serif
 * numerals with tabular figures; captions in the body face.
 */
export function Proof() {
  if (!home.highlights?.display) return null;
  return (
    <section className="container" aria-label="Key numbers">
      <dl className={styles.band}>
        {home.highlights.items.map((item) => (
          <div key={item.label} className={styles.stat}>
            <dd className={`serif tnum ${styles.value}`}>{item.value}</dd>
            <dt className={styles.label}>{item.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}

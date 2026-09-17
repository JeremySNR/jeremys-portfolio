import { home } from "@/resources";
import styles from "./StatBand.module.scss";

/**
 * The numbers that would otherwise be buried in prose, set large between
 * two hairlines. Serif numerals, mono captions — stats as typography,
 * not dashboard widgets.
 */
export function StatBand() {
  if (!home.highlights?.display) return null;

  return (
    <dl className={styles.band}>
      {home.highlights.items.map((item) => (
        <div key={item.label} className={styles.stat}>
          <dt className={styles.label}>{item.label}</dt>
          <dd className={styles.value}>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

import { news } from "@/resources";
import { SectionHead } from "@/components/SectionHead";
import styles from "./PressList.module.scss";

/**
 * Press as a typeset list with context, not a strip of grey logos.
 * Outlet in the serif, headline beneath, date and story in mono.
 */
export function PressList({ limit = 6 }: { limit?: number }) {
  const items = news.items.filter((n) => n.featured).slice(0, limit);
  if (items.length === 0) return null;

  return (
    <section className="container section" aria-labelledby="press-title">
      <SectionHead
        label="Press"
        count={news.items.length}
        title="What was said about the work."
        id="press-title"
        href={news.path}
        linkLabel="All coverage"
      />
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.link} className={styles.item}>
            <a href={item.link} target="_blank" rel="noreferrer" className={styles.row}>
              <span className={`mono ${styles.meta}`}>
                <span>{item.tag}</span>
                <span>{item.date}</span>
              </span>
              <span className={`title ${styles.outlet}`}>{item.outlet}</span>
              <span className={styles.headline}>{item.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

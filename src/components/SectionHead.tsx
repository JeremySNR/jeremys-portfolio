import Link from "next/link";
import styles from "./SectionHead.module.scss";

/**
 * Editorial section opener: a mono label with a count on the left rail,
 * the heading in the reading column, and an optional quiet link.
 */
export function SectionHead({
  label,
  count,
  title,
  href,
  linkLabel,
  id,
}: {
  label: string;
  count?: number | string;
  title?: React.ReactNode;
  href?: string;
  linkLabel?: string;
  id?: string;
}) {
  return (
    <div className={styles.head} id={id}>
      <div className={`mono ${styles.label}`}>
        <span>{label}</span>
        {count !== undefined && <span className={styles.count}>({count})</span>}
      </div>
      <div className={styles.main}>
        {title && <h2 className={`display-m ${styles.title}`}>{title}</h2>}
        {href && linkLabel && (
          <Link href={href} className={`link-under ${styles.link}`}>
            {linkLabel}
          </Link>
        )}
      </div>
    </div>
  );
}

import styles from "./PageIntro.module.scss";

/**
 * Opening block for index pages: mono label on the rail, display title
 * and a lede in the reading column. Same rhythm as the home hero, quieter.
 */
export function PageIntro({
  label,
  count,
  title,
  lede,
  children,
}: {
  label: string;
  count?: number | string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className={`container ${styles.intro}`}>
      <div className={styles.grid}>
        <div className={`mono ${styles.rail} rise`} style={{ ["--i" as string]: 0 }}>
          <span>{label}</span>
          {count !== undefined && <span className={styles.count}>({count})</span>}
        </div>
        <div className={styles.main}>
          <h1 className={`display-l ${styles.title} rise`} style={{ ["--i" as string]: 1 }}>
            {title}
          </h1>
          {lede && (
            <p className={`lede ${styles.lede} rise`} style={{ ["--i" as string]: 2 }}>
              {lede}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}

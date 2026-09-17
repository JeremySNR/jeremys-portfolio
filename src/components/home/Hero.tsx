import Link from "next/link";
import { home, work, about } from "@/resources";
import styles from "./Hero.module.scss";

/**
 * The opening statement. Left-aligned display serif, one lede paragraph,
 * a "now / previously" line in mono, and two quiet ways forward. The
 * only auto-playing motion on the site lives here: a staggered rise.
 */
export function Hero() {
  return (
    <section className={`container ${styles.hero}`} aria-labelledby="hero-title">
      <div className={styles.grid}>
        <div className={`mono ${styles.rail} rise`} style={{ ["--i" as string]: 0 }}>
          <div className={styles.railRow}>
            <span className={styles.railKey}>Now</span>
            <span className={styles.railVal}>{home.now}</span>
          </div>
          <div className={styles.railRow}>
            <span className={styles.railKey}>Before</span>
            <span className={styles.railVal}>{home.previously}</span>
          </div>
        </div>

        <div className={styles.main}>
          <h1
            id="hero-title"
            className={`display-xl ${styles.title} rise`}
            style={{ ["--i" as string]: 1 }}
          >
            {home.headline}
          </h1>
          <p className={`lede ${styles.lede} rise`} style={{ ["--i" as string]: 2 }}>
            {home.subline}
          </p>
          <div className={`${styles.actions} rise`} style={{ ["--i" as string]: 3 }}>
            <Link href={work.path} className={styles.primary}>
              Selected work
            </Link>
            <Link href={about.path} className={`link ${styles.secondary}`}>
              About me
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { about, home, blog, routes } from "@/resources";
import { getPosts } from "@/utils/utils";
import { SectionHead } from "@/components/SectionHead";
import styles from "./Writing.module.scss";

/**
 * Research and writing. The paper gets the reading column as a journal
 * entry; essays and posts follow as hairline rows with mono metadata.
 */
export function Writing() {
  const paper = about.publications?.display ? about.publications.papers[0] : undefined;
  const posts = routes["/blog"]
    ? getPosts(["src", "app", "blog", "posts"])
        .sort(
          (a, b) =>
            new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime(),
        )
        .slice(0, 2)
    : [];
  const essays = home.essays?.display ? home.essays.items : [];

  const rows: Array<{ title: string; meta: string; href: string; external: boolean }> = [
    ...posts.map((p) => ({
      title: p.metadata.title,
      meta: `Essay · ${new Date(p.metadata.publishedAt).getFullYear()}`,
      href: `/blog/${p.slug}`,
      external: false,
    })),
    ...essays.map((e) => ({
      title: e.title,
      meta: e.meta ?? "Essay",
      href: e.link,
      external: true,
    })),
  ];

  return (
    <section className="container section" aria-labelledby="writing-title">
      <SectionHead
        label="Research & writing"
        count={rows.length + (paper ? 1 : 0)}
        title="Thinking in public."
        id="writing-title"
        href={routes["/blog"] ? blog.path : undefined}
        linkLabel="All writing"
      />
      <div className={styles.grid}>
        {paper && (
          <a className={styles.paper} href={paper.link} target="_blank" rel="noreferrer">
            <div className={`mono ${styles.paperMeta}`}>
              <span>Paper</span>
              <span>
                {paper.venue}
                {paper.date ? ` · ${paper.date}` : ""}
              </span>
            </div>
            <h3 className={`display-m ${styles.paperTitle}`}>{paper.title}</h3>
            {paper.description && <p className={styles.abstract}>{paper.description}</p>}
            <span className={`link ${styles.paperCta}`}>Read the paper</span>
          </a>
        )}
        <ul className={styles.rows}>
          {rows.map((row) => {
            const inner = (
              <>
                <span className={styles.rowTitle}>{row.title}</span>
                <span className={`mono ${styles.rowMeta}`}>{row.meta}</span>
              </>
            );
            return (
              <li key={row.href} className={styles.rowItem}>
                {row.external ? (
                  <a href={row.href} target="_blank" rel="noreferrer" className={styles.row}>
                    {inner}
                  </a>
                ) : (
                  <Link href={row.href} className={styles.row}>
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

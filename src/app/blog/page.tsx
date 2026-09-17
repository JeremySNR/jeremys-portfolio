import Link from "next/link";
import { Meta, Schema } from "@once-ui-system/core";
import { baseURL, blog, person, home, about } from "@/resources";
import { getPosts } from "@/utils/utils";
import { PageIntro } from "@/components/PageIntro";
import { SectionHead } from "@/components/SectionHead";
import styles from "./blog.module.scss";

export async function generateMetadata() {
  return Meta.generate({
    title: blog.title,
    description: blog.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(blog.title)}`,
    path: blog.path,
  });
}

const year = (d: string) => new Date(d).getFullYear();

export default function Blog() {
  const posts = getPosts(["src", "app", "blog", "posts"]).sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime(),
  );
  const essays = home.essays?.display ? home.essays.items : [];
  const talks = about.talks?.display
    ? about.talks.items.filter((t) => !essays.some((e) => e.link === t.link))
    : [];

  return (
    <>
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={blog.title}
        description={blog.description}
        path={blog.path}
        image={`/api/og/generate?title=${encodeURIComponent(blog.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <PageIntro
        label="Writing"
        count={posts.length + essays.length + talks.length}
        title="Writing on AI, travel, and building businesses."
        lede="Longer pieces live here. Essays published elsewhere, talks and interviews are listed below them."
      />

      <div className="container" style={{ paddingBottom: "var(--section)" }}>
        <section className={styles.group}>
          <SectionHead label="Essays" count={posts.length} title="Long-form." />
          <ul className={styles.list}>
            {posts.map((post) => (
              <li key={post.slug} className={styles.item}>
                <Link href={`/blog/${post.slug}`} className={styles.post}>
                  <span className={`mono ${styles.postMeta}`}>
                    <span>{post.metadata.tag}</span>
                    <span>{year(post.metadata.publishedAt)}</span>
                  </span>
                  <span className={`display-m ${styles.postTitle}`}>{post.metadata.title}</span>
                  <span className={styles.postSummary}>{post.metadata.summary}</span>
                  <span className={`link ${styles.postCta}`}>Read</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {essays.length > 0 && (
          <section className={styles.group}>
            <SectionHead
              label="Published elsewhere"
              count={essays.length}
              title="Essays on LinkedIn and Medium."
            />
            <ul className={styles.rows}>
              {essays.map((e) => (
                <li key={e.link} className={styles.row}>
                  <a
                    href={e.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`link-under ${styles.rowTitle}`}
                  >
                    {e.title}
                  </a>
                  <span className={`mono ${styles.rowMeta}`}>{e.meta}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {talks.length > 0 && (
          <section className={styles.group}>
            <SectionHead label="Talks & interviews" count={talks.length} title="Out loud." />
            <ul className={styles.rows}>
              {talks.map((t) => (
                <li key={t.link} className={styles.row}>
                  <a
                    href={t.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`link-under ${styles.rowTitle}`}
                  >
                    {t.title}
                  </a>
                  <span className={`mono ${styles.rowMeta}`}>{t.meta}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}

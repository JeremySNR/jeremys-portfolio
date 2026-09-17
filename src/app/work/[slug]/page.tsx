import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Meta, Schema } from "@once-ui-system/core";
import { baseURL, about, person, work, news } from "@/resources";
import { getPosts } from "@/utils/utils";
import { ScrollToHash, CustomMDX } from "@/components";
import { WorkIndex } from "@/components/work/WorkIndex";
import { getAllWork } from "@/components/work/getWorkIndex";
import { SectionHead } from "@/components/SectionHead";
import styles from "./project.module.scss";

const KIND_LABEL: Record<string, string> = {
  venture: "Venture",
  product: "Product",
  "open-source": "Open source",
  research: "Research",
  role: "In-house",
};

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return getPosts(["src", "app", "work", "projects"]).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";
  const post = getPosts(["src", "app", "work", "projects"]).find((p) => p.slug === slugPath);
  if (!post) return {};
  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${work.path}/${post.slug}`,
  });
}

export default async function Project({
  params,
}: { params: Promise<{ slug: string | string[] }> }) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";
  const post = getPosts(["src", "app", "work", "projects"]).find((p) => p.slug === slugPath);
  if (!post) notFound();

  const m = post.metadata;
  const cover = m.images[0];
  const coverIsArt = cover?.endsWith(".svg");
  const related = getAllWork()
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);
  const press = news.items.filter(
    (n) => n.tag && m.name && n.tag.toLowerCase() === m.name.toLowerCase(),
  );
  const isRepo = (url?: string) => !!url && url.includes("github.com");

  return (
    <>
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}`}
        title={m.title}
        description={m.summary}
        datePublished={m.publishedAt}
        dateModified={m.publishedAt}
        image={m.image || `/api/og/generate?title=${encodeURIComponent(m.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <article className={`container ${styles.article}`}>
        <header className={styles.header}>
          <div className={`mono ${styles.crumbs} rise`} style={{ ["--i" as string]: 0 }}>
            <Link href={work.path} className="link">
              Work
            </Link>
            <span aria-hidden="true">/</span>
            <span>{m.name || m.title}</span>
          </div>
          <div className={styles.headMain}>
            <h1 className={`display-l ${styles.title} rise`} style={{ ["--i" as string]: 1 }}>
              {m.title}
            </h1>
            {m.strap && (
              <p className={`lede ${styles.strap} rise`} style={{ ["--i" as string]: 2 }}>
                {m.strap}
              </p>
            )}
          </div>
        </header>

        {cover && (
          <figure className={`${styles.cover} ${coverIsArt ? styles.coverArt : ""}`}>
            <Image
              src={cover}
              alt={m.title}
              width={1280}
              height={720}
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className={styles.coverImg}
            />
          </figure>
        )}

        <div className={styles.body}>
          <aside className={styles.rail}>
            <dl className={styles.facts}>
              {m.role && (
                <div className={styles.fact}>
                  <dt className="mono">Role</dt>
                  <dd>{m.role}</dd>
                </div>
              )}
              {m.period && (
                <div className={styles.fact}>
                  <dt className="mono">When</dt>
                  <dd>{m.period}</dd>
                </div>
              )}
              {m.kind && (
                <div className={styles.fact}>
                  <dt className="mono">Kind</dt>
                  <dd>{KIND_LABEL[m.kind] ?? m.kind}</dd>
                </div>
              )}
              {m.outcome && (
                <div className={styles.fact}>
                  <dt className="mono">Outcome</dt>
                  <dd>{m.outcome}</dd>
                </div>
              )}
              {m.tags && m.tags.length > 0 && (
                <div className={styles.fact}>
                  <dt className="mono">Tags</dt>
                  <dd>
                    <ul className={styles.tags}>
                      {m.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
              {(m.link || m.repo) && (
                <div className={styles.fact}>
                  <dt className="mono">Links</dt>
                  <dd className={styles.links}>
                    {m.link && (
                      <a href={m.link} target="_blank" rel="noreferrer" className="link-under">
                        {isRepo(m.link) ? "Source on GitHub" : "Visit"}
                      </a>
                    )}
                    {m.repo && m.repo !== m.link && (
                      <a href={m.repo} target="_blank" rel="noreferrer" className="link-under">
                        Source on GitHub
                      </a>
                    )}
                  </dd>
                </div>
              )}
              {press.length > 0 && (
                <div className={styles.fact}>
                  <dt className="mono">Coverage</dt>
                  <dd className={styles.links}>
                    {press.slice(0, 4).map((n) => (
                      <a
                        key={n.link}
                        href={n.link}
                        target="_blank"
                        rel="noreferrer"
                        className="link-under"
                      >
                        {n.outlet}
                      </a>
                    ))}
                    {press.length > 4 && (
                      <Link href={news.path} className="link-under">
                        All {press.length} pieces
                      </Link>
                    )}
                  </dd>
                </div>
              )}
            </dl>
          </aside>

          <div className={`prose ${styles.prose}`}>
            <CustomMDX source={post.content} />
          </div>
        </div>
      </article>

      <section className="container section" aria-labelledby="more-work">
        <SectionHead
          label="More work"
          title="Elsewhere in the record."
          id="more-work"
          href={work.path}
          linkLabel="All work"
        />
        <WorkIndex items={related} compact />
      </section>
      <ScrollToHash />
    </>
  );
}

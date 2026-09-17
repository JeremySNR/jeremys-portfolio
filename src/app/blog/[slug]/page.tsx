import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Meta, Schema } from "@once-ui-system/core";
import { CustomMDX, ScrollToHash } from "@/components";
import { baseURL, about, blog, person } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { getPosts } from "@/utils/utils";
import { ShareSection } from "@/components/blog/ShareSection";
import styles from "../../work/[slug]/project.module.scss";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return getPosts(["src", "app", "blog", "posts"]).map((post) => ({ slug: post.slug }));
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
  const post = getPosts(["src", "app", "blog", "posts"]).find((p) => p.slug === slugPath);
  if (!post) return {};
  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${blog.path}/${post.slug}`,
  });
}

export default async function BlogPost({
  params,
}: { params: Promise<{ slug: string | string[] }> }) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";
  const post = getPosts(["src", "app", "blog", "posts"]).find((p) => p.slug === slugPath);
  if (!post) notFound();

  const m = post.metadata;
  const words = post.content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 230));

  return (
    <>
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${blog.path}/${post.slug}`}
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
            <Link href={blog.path} className="link">
              Writing
            </Link>
            <span aria-hidden="true">/</span>
            <span>{m.tag || "Essay"}</span>
          </div>
          <div className={styles.headMain}>
            <h1 className={`display-l ${styles.title} rise`} style={{ ["--i" as string]: 1 }}>
              {m.title}
            </h1>
            <p className={`lede ${styles.strap} rise`} style={{ ["--i" as string]: 2 }}>
              {m.summary}
            </p>
          </div>
        </header>

        {m.image && (
          <figure className={styles.cover}>
            <Image
              src={m.image}
              alt={m.title}
              width={1280}
              height={560}
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className={styles.coverImg}
            />
          </figure>
        )}

        <div className={styles.body}>
          <aside className={styles.rail}>
            <dl className={styles.facts}>
              <div className={styles.fact}>
                <dt className="mono">Published</dt>
                <dd>{formatDate(m.publishedAt)}</dd>
              </div>
              <div className={styles.fact}>
                <dt className="mono">Reading time</dt>
                <dd>{minutes} min</dd>
              </div>
              <div className={styles.fact}>
                <dt className="mono">Author</dt>
                <dd>
                  <Link href={about.path} className="link-under">
                    {person.name}
                  </Link>
                </dd>
              </div>
            </dl>
          </aside>
          <div className={`prose ${styles.prose}`}>
            <CustomMDX source={post.content} />
            <ShareSection title={m.title} url={`${baseURL}${blog.path}/${post.slug}`} />
          </div>
        </div>
      </article>
      <ScrollToHash />
    </>
  );
}

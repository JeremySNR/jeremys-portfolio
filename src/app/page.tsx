import { Meta, Schema } from "@once-ui-system/core";
import Link from "next/link";
import { about, baseURL, home, person } from "@/resources";
import { getPosts } from "@/utils/utils";
import { Projects } from "@/components/work/Projects";

export function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  const posts = getPosts(["src", "app", "blog", "posts"])
    .sort((a, b) => b.metadata.publishedAt.localeCompare(a.metadata.publishedAt))
    .slice(0, 3);
  return (
    <div className="broadcast-home">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={home.image}
        author={{ name: person.name, url: baseURL + about.path, image: baseURL + person.avatar }}
      />
      <section className="broadcast-hero" aria-labelledby="hero-name">
        <h1 id="hero-name" className="sr-only">
          Jeremy Smith
        </h1>
        <picture>
          <source media="(max-width: 700px)" srcSet="/broadcast/mobile3.webp" />
          <img
            src="/broadcast/hero3.webp"
            width="1600"
            height="667"
            alt="Jeremy Smith"
            fetchPriority="high"
          />
        </picture>
        <div className="hero-intro">
          <h2>
            My take
            <br /> on AI.
          </h2>
          <Link className="broadcast-button" href="#portfolio">
            Explore my work
          </Link>
        </div>
        <p className="hero-bio">
          I build AI at Travel Counsellors. Here’s my take on the new releases, big ideas and
          arguments in AI.
        </p>
      </section>
      <section id="portfolio" className="home-section">
        <div className="index-heading">
          <h2>Selected work.</h2>
          <Link href="/work">All projects ↗</Link>
        </div>
        <Projects selected={["neural-voice", "pluribus", "ai-mark"]} />
      </section>
      <section className="home-section home-writing">
        <div className="index-heading">
          <h2>On my mind.</h2>
          <Link href="/blog">All writing ↗</Link>
        </div>
        {posts.map(({ slug, metadata }) => (
          <Link className="index-row" key={slug} href={`/blog/${slug}`}>
            <span>{metadata.title}</span>
            <small>{metadata.publishedAt.slice(0, 10)}</small>
          </Link>
        ))}
      </section>
      <section className="home-section home-about">
        <div>
          <h2>About Jeremy.</h2>
          <p>
            I work on AI in travel, build open-source tools, and research what happens when AI
            agents disagree.
          </p>
          <Link className="broadcast-button" href="/about">
            My background
          </Link>
        </div>
        <div>
          <h2>Get in touch.</h2>
          <p>For speaking, research and project enquiries, you can reach me directly.</p>
          <a className="broadcast-button" href={`mailto:${person.email}`}>
            Email me
          </a>
        </div>
      </section>
    </div>
  );
}

import { Meta, Schema } from "@once-ui-system/core";
import Image from "next/image";
import { BroadcastHero } from "@/components/home/BroadcastHero";
import { ArchiveHighlights } from "@/components/home/ArchiveHighlights";
import "./HomeUpdates.css";
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
      <BroadcastHero />
      <section id="portfolio" className="home-section">
        <div className="index-heading">
          <h2>Selected work.</h2>
          <Link href="/work">All projects ↗</Link>
        </div>
        <article className="flagship">
          <Link
            href="/work/clip-forge"
            className="flagship-art"
            aria-label="Read the Cutawan case study"
          >
            <Image
              src="/broadcast/projects/clip-forge.webp"
              alt="A mechanical splicer cutting a strip of film."
              width={764}
              height={508}
              sizes="(max-width: 700px) 92vw, 50vw"
            />
          </Link>
          <div className="flagship-copy">
            <p className="feature-label">Featured open source</p>
            <h3>Cutawan.</h3>
            <p>
              Give it a two-hour podcast. Get back the moments worth sharing, with captions and a
              crop that follows the speaker. Keep editing on your desktop, dub the clip, or send the
              timeline to your editor.
            </p>
            <div className="feature-links">
              <Link className="broadcast-button" href="/work/clip-forge">
                Inside Cutawan
              </Link>
              <a href="https://github.com/JeremySNR/cutawan">View on GitHub ↗</a>
            </div>
          </div>
        </article>
        <Projects selected={["metachlorian", "pluribus", "neural-voice"]} />
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
      <ArchiveHighlights />
      <section className="home-section home-photos" aria-labelledby="gallery-heading">
        <div className="index-heading">
          <h2 id="gallery-heading">In the frame.</h2>
          <Link href="/gallery">Full gallery ↗</Link>
        </div>
        <div className="gallery-strip">
          {[
            ["studio-interview.jpg", "Jeremy seated for a studio interview", "In the studio"],
            ["PXL_20250319_123231055.jpg", "Jeremy at the Neural Voice stand", "On the stand"],
            [
              "PXL_20251013_202014559.NIGHT.jpg",
              "Jeremy outside the door of 10 Downing Street",
              "Downing Street",
            ],
          ].map(([file, alt, caption]) => (
            <figure key={file}>
              <div>
                <Image
                  src={`/images/gallery/${file}`}
                  alt={alt}
                  fill
                  sizes="(max-width: 600px) 92vw, 32vw"
                />
              </div>
              <figcaption>{caption}</figcaption>
            </figure>
          ))}
        </div>
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

import { Meta, Schema } from "@once-ui-system/core";
import { baseURL, about, person, news } from "@/resources";
import { PageIntro } from "@/components/PageIntro";
import { SectionHead } from "@/components/SectionHead";
import styles from "./news.module.scss";

export async function generateMetadata() {
  return Meta.generate({
    title: news.title,
    description: news.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(news.title)}`,
    path: news.path,
  });
}

/** Group order and the one-line context that each story deserves. */
const STORIES: Array<{ tag: string; title: string; context: string }> = [
  {
    tag: "AI Mark",
    title: "AI Mark, 2025",
    context:
      "An AI clone of a sitting Labour MP that constituents could talk to around the clock. Built at Neural Voice.",
  },
  {
    tag: "AI Steve",
    title: "AI Steve, 2024",
    context: "The world's first AI election candidate, on a real UK ballot. Built at Neural Voice.",
  },
  {
    tag: "Travel",
    title: "Travel and industry",
    context:
      "The move to Travel Counsellors, the AI Emily virtual agent, and the Humans vs AI debate at ITT.",
  },
  {
    tag: "Recognition",
    title: "Recognition",
    context: "Board appointments, awards and grants.",
  },
];

export default function News() {
  return (
    <>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={news.path}
        title={news.title}
        description={news.description}
        image={`/api/og/generate?title=${encodeURIComponent(news.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <PageIntro label="Press" count={news.items.length} title="In the news." lede={news.intro} />

      <div className="container" style={{ paddingBottom: "var(--section)" }}>
        {STORIES.map((story) => {
          const items = news.items.filter((n) => n.tag === story.tag);
          if (items.length === 0) return null;
          return (
            <section
              key={story.tag}
              className={styles.group}
              aria-labelledby={`story-${story.tag}`}
            >
              <SectionHead
                label={story.title}
                count={items.length}
                title={story.context}
                id={`story-${story.tag}`}
              />
              <ul className={styles.list}>
                {items.map((item) => (
                  <li key={item.link} className={styles.item}>
                    <a href={item.link} target="_blank" rel="noreferrer" className={styles.row}>
                      <span className={`title ${styles.outlet}`}>{item.outlet}</span>
                      <span className={styles.headline}>{item.title}</span>
                      <span className={`mono ${styles.date}`}>{item.date ?? ""}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}

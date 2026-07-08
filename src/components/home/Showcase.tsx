import { getPosts } from "@/utils/utils";
import { Reveal } from "@/components/Reveal";
import { ShowcaseCard } from "./ShowcaseCard";
import styles from "./Showcase.module.scss";

/**
 * Curated selected work for the homepage: one flagship case study up top,
 * then a hand-picked grid. Everything else lives on /work.
 */
const FEATURE = { slug: "neural-voice", tag: "The venture · Co-founder & CEO" };

const GRID = [
  { slug: "ai-steve", tag: "World first · 2024" },
  { slug: "ai-mark", tag: "World first · 2025" },
  { slug: "clip-forge", tag: "Open source · Just shipped" },
  { slug: "project-foundry", tag: "Open source · Agent governance" },
];

export function Showcase() {
  const projects = getPosts(["src", "app", "work", "projects"]);
  const bySlug = new Map(projects.map((p) => [p.slug, p]));

  const feature = bySlug.get(FEATURE.slug);
  const gridItems = GRID.map((item) => ({ ...item, post: bySlug.get(item.slug) })).filter(
    (item) => item.post,
  );

  return (
    <div className={styles.grid}>
      {feature && (
        <Reveal style={{ gridColumn: "1 / -1" }}>
          <ShowcaseCard
            feature
            priority
            href={`/work/${feature.slug}`}
            image={feature.metadata.images[0]}
            title={feature.metadata.title}
            summary={feature.metadata.summary}
            tag={FEATURE.tag}
          />
        </Reveal>
      )}
      {gridItems.map((item, index) => (
        <Reveal key={item.slug} delay={Math.min(index * 0.08, 0.32)}>
          <ShowcaseCard
            href={`/work/${item.slug}`}
            image={item.post!.metadata.images[0]}
            title={item.post!.metadata.title}
            summary={item.post!.metadata.summary}
            tag={item.tag}
          />
        </Reveal>
      ))}
    </div>
  );
}

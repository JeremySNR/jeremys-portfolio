import Link from "next/link";
import Image from "next/image";
import { getPosts } from "@/utils/utils";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  selected?: string[];
}

export function Projects({ range, exclude = [], selected }: ProjectsProps) {
  const projects = getPosts(["src", "app", "work", "projects"])
    .filter((post) => !exclude.includes(post.slug))
    .sort((a, b) => b.metadata.publishedAt.localeCompare(a.metadata.publishedAt));
  const selection = selected
    ? selected.flatMap((slug) => projects.filter((post) => post.slug === slug))
    : projects;
  const items = range ? selection.slice(range[0] - 1, range[1]) : selection;

  return (
    <div className="project-grid">
      {items.map(({ slug, metadata }) => (
        <Link key={slug} href={`/work/${slug}`} className="project-link">
          {metadata.images[0] && (
            <div className="project-art">
              <Image
                src={metadata.images[0]}
                fill
                alt=""
                sizes="(max-width: 600px) 100vw, (max-width: 940px) 50vw, 33vw"
              />
            </div>
          )}
          <div className="project-meta">
            {metadata.publishedAt.slice(0, 4)}
            <span aria-hidden>↗</span>
          </div>
          <h3>{metadata.title.split(":")[0]}</h3>
          <p>{metadata.summary}</p>
        </Link>
      ))}
    </div>
  );
}

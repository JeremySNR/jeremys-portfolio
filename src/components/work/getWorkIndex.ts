import { getPosts } from "@/utils/utils";
import type { WorkIndexItem } from "./WorkIndex";

function toItem(post: ReturnType<typeof getPosts>[number]): WorkIndexItem {
  const m = post.metadata;
  return {
    slug: post.slug,
    name: m.name || m.title,
    strap: m.strap || m.summary,
    role: m.role,
    period: m.period,
    outcome: m.outcome,
    kind: m.kind,
    tags: m.tags,
    image: m.images?.[0],
  };
}

/** Projects flagged for the home page, in `featured` order. */
export function getFeaturedWork(): WorkIndexItem[] {
  return getPosts(["src", "app", "work", "projects"])
    .filter((p) => typeof p.metadata.featured === "number")
    .sort((a, b) => (a.metadata.featured ?? 99) - (b.metadata.featured ?? 99))
    .map(toItem);
}

/** Every project, newest first. */
export function getAllWork(): WorkIndexItem[] {
  return getPosts(["src", "app", "work", "projects"])
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime(),
    )
    .map(toItem);
}

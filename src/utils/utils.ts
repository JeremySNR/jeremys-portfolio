import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

export type ProjectKind = "venture" | "product" | "open-source" | "research" | "role";

export type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  images: string[];
  tag?: string;
  team: Team[];
  link?: string;
  /** Short display name for indexes, e.g. "Neural Voice" */
  name?: string;
  /** One-line description shown in indexes */
  strap?: string;
  /** What I did, e.g. "Co-founder & CEO" */
  role?: string;
  /** Display period, e.g. "2023 – 2025" */
  period?: string;
  /** The outcome in one line, ideally with a number */
  outcome?: string;
  /** Kind of work */
  kind?: ProjectKind;
  /** Free-form tags (stack, domain) */
  tags?: string[];
  /** Order on the home page; omitted = not shown on home */
  featured?: number;
  /** Repo link, if different from `link` */
  repo?: string;
};

import { notFound } from "next/navigation";

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    notFound();
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata: Metadata = {
    title: data.title || "",
    publishedAt: data.publishedAt,
    summary: data.summary || "",
    image: data.image || "",
    images: data.images || [],
    tag: data.tag || [],
    team: data.team || [],
    link: data.link || "",
    name: data.name || "",
    strap: data.strap || "",
    role: data.role || "",
    period: data.period || "",
    outcome: data.outcome || "",
    kind: data.kind,
    tags: data.tags || [],
    featured: typeof data.featured === "number" ? data.featured : undefined,
    repo: data.repo || "",
  };

  return { metadata, content };
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getPosts(customPath = ["", "", "", ""]) {
  const postsDir = path.join(process.cwd(), ...customPath);
  return getMDXData(postsDir);
}

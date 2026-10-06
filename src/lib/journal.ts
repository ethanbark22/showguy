import "server-only";
import fs from "node:fs";
import path from "node:path";

/**
 * SHOWGUY Journal: plain Markdown files in /content/journal. No CMS, no database.
 * Each file starts with a short header between --- lines (title, description,
 * date, author, category, optional cover) and then the article text.
 *
 * Files with `draft: true` are never published. To preview drafts on your own
 * computer only, run with SHOW_DRAFT_JOURNAL=true. See the README.
 */
export type Post = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, e.g. 2026-10-06 */
  date: string;
  author: string;
  category: string;
  /** Optional cover image path, e.g. /journal/my-cover.jpg */
  cover?: string;
  coverAlt?: string;
  draft: boolean;
  body: string;
};

const DIR = path.join(process.cwd(), "content", "journal");

/** Drafts are visible only when running locally with the flag set. Never in production. */
const showDrafts = process.env.NODE_ENV !== "production" && process.env.SHOW_DRAFT_JOURNAL === "true";

function parse(slug: string, raw: string): Post {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const meta: Record<string, string> = {};
  if (m) {
    for (const line of m[1].split(/\r?\n/)) {
      const i = line.indexOf(":");
      if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
    }
  }
  return {
    slug,
    title: meta.title || slug,
    description: meta.description || "",
    date: meta.date || "1970-01-01",
    author: meta.author || "SHOWGUY",
    category: meta.category || "Journal",
    cover: meta.cover || undefined,
    coverAlt: meta.coverAlt || undefined,
    draft: meta.draft === "true",
    body: (m ? m[2] : raw).trim(),
  };
}

function readAll(): Post[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parse(f.replace(/\.md$/, ""), fs.readFileSync(path.join(DIR, f), "utf8")));
}

/** Everything that may be shown on this build, newest first. */
export function getPosts(): Post[] {
  return readAll()
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

/** True when at least one real, published article exists. Drives the nav link and sitemap. */
export function hasPublishedPosts(): boolean {
  return readAll().some((p) => !p.draft);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

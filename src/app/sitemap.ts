import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getPosts, hasPublishedPosts } from "@/lib/journal";

/**
 * Pages listed for search engines. The legal pages are left out while they are
 * placeholders. Add them (and remove `noindex` on the pages) once real copy is in.
 * Future sections (/journal, /artists…) get added here.
 */
const routes = ["/", "/apply", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  // The Journal joins the sitemap only once real articles are published
  const journal = hasPublishedPosts() ? ["/journal", ...getPosts().map((p) => `/journal/${p.slug}`)] : [];
  return [...routes, ...journal].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}

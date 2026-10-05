import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/**
 * Pages listed for search engines. The legal pages are left out while they are
 * placeholders. Add them (and remove `noindex` on the pages) once real copy is in.
 * Future sections (/journal, /artists…) get added here.
 */
const routes = ["/", "/apply", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}

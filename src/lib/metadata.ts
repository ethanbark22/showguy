import type { Metadata } from "next";
import { site } from "@/config/site";
import { brand } from "@/config/brand";

type Options = {
  title?: string;
  /** Use this exact title instead of "<title> | SHOWGUY". */
  fullTitle?: string;
  /** "article" for journal posts. */
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
  image?: string;
  description?: string;
  /** Path starting with "/", used for the canonical link. */
  path: string;
  noindex?: boolean;
};

/** Builds titles, canonical link, Open Graph and Twitter tags for a page. */
export function pageMetadata({
  title,
  fullTitle: exactTitle,
  type = "website",
  publishedTime,
  authors,
  image,
  description = site.description,
  path,
  noindex,
}: Options): Metadata {
  const fullTitle = exactTitle ?? (title ? `${title} | ${site.name}` : site.title);
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type,
      ...(type === "article" ? { publishedTime, authors } : {}),
      locale: site.locale,
      siteName: site.name,
      title: fullTitle,
      description,
      url: path,
      images: [{ url: image ?? brand.socialCard, ...(image ? {} : { width: 1200, height: 630 }), alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image ?? brand.socialCard],
    },
  };
}

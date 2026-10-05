import type { Metadata } from "next";
import { site } from "@/config/site";
import { brand } from "@/config/brand";

type Options = {
  title?: string;
  description?: string;
  /** Path starting with "/", used for the canonical link. */
  path: string;
  noindex?: boolean;
};

/** Builds titles, canonical link, Open Graph and Twitter tags for a page. */
export function pageMetadata({
  title,
  description = site.description,
  path,
  noindex,
}: Options): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : site.title;
  return {
    title: title ? { absolute: fullTitle } : { absolute: site.title },
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      title: fullTitle,
      description,
      url: path,
      images: [{ url: brand.socialCard, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [brand.socialCard],
    },
  };
}

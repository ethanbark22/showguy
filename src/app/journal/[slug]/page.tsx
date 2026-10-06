import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/metadata";
import { formatDate, getPost, getPosts } from "@/lib/journal";
import { site } from "@/config/site";
import { events } from "@/lib/track";
import { ButtonLink } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { Markdown } from "@/components/Markdown";
import { TrackEvent } from "@/components/TrackEvent";

type Props = { params: Promise<{ slug: string }> };

/** Only published articles get a page. Drafts return a 404 on the live site. */
export const dynamicParams = false;
export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/journal/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    authors: [post.author],
    image: post.cover,
    noindex: post.draft,
  });
}

export default async function JournalPost({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8 lg:py-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          author: { "@type": "Person", name: post.author },
          publisher: { "@type": "Organization", name: site.name },
          mainEntityOfPage: `${site.url}/journal/${post.slug}`,
          ...(post.cover ? { image: `${site.url}${post.cover}` } : {}),
        }}
      />
      {!post.draft && <TrackEvent name={events.journalArticleViewed} props={{ slug: post.slug }} />}
      <Link href="/journal" className="text-sm font-bold uppercase tracking-[0.14em] text-lav hover:text-paper">
        ← Journal
      </Link>
      <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-lav">
        {post.category} <span className="text-mute-text">·</span> {formatDate(post.date)} <span className="text-mute-text">·</span> {post.author}
        {post.draft && <span className="ml-3 rounded-full bg-violet-strong px-2 py-0.5 text-paper">Draft preview</span>}
      </p>
      <h1 className="display mt-4 text-[clamp(2.2rem,6vw,4.2rem)] text-balance">{post.title}</h1>
      <p className="mt-5 text-lg text-paper/80 sm:text-xl">{post.description}</p>

      {post.cover && (
        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl border border-line">
          <Image src={post.cover} alt={post.coverAlt ?? ""} fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
        </div>
      )}

      <div className="mt-10">
        <Markdown source={post.body} />
      </div>

      <div className="mt-16 rounded-3xl border border-violet/40 bg-plum p-6 sm:p-8">
        <p className="display text-3xl">Want a digital team behind your music?</p>
        <ButtonLink href="/apply" className="mt-5">
          Apply to work with SHOWGUY
        </ButtonLink>
      </div>
    </article>
  );
}

import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { formatDate, getPosts, hasPublishedPosts } from "@/lib/journal";
import { ButtonLink } from "@/components/Button";

/** Until there is a real published article, this page exists but is kept out of search engines. */
export function generateMetadata() {
  return pageMetadata({
    fullTitle: "SHOWGUY Journal — Digital Campaign Ideas for Music",
    description: "Practical ideas and observations on releases, campaigns, websites and the digital side of music projects.",
    path: "/journal",
    noindex: !hasPublishedPosts(),
  });
}

export default function JournalPage() {
  const posts = getPosts();
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24">
      <p className="mb-4 inline-block rounded-full border-2 border-lav px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-lav">Journal</p>
      <h1 className="display text-huge">Digital campaign ideas for music.</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/85 sm:text-xl">
        Practical ideas and observations on releases, campaigns, websites and the digital side of music projects.
      </p>

      {posts.length === 0 ? (
        <div className="mt-14 rounded-[2rem] border border-line bg-surface p-8 sm:p-12">
          <h2 className="display text-4xl">The first pieces are on the way.</h2>
          <p className="mt-4 max-w-lg text-paper/85">We&rsquo;re writing things worth reading. In the meantime, if you have a release or project in mind, here&rsquo;s where to start.</p>
          <ButtonLink href="/apply" className="mt-8">
            Start a project
          </ButtonLink>
        </div>
      ) : (
        <ul className="mt-14 border-t border-line">
          {posts.map((p) => (
            <li key={p.slug} className="border-b border-line">
              <Link href={`/journal/${p.slug}`} className="group block py-7">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-lav">
                  {p.category} <span className="text-mute-text">·</span> {formatDate(p.date)}
                  {p.draft && <span className="ml-3 rounded-full bg-violet-strong px-2 py-0.5 text-paper">Draft preview</span>}
                </p>
                <h2 className="display mt-2 text-3xl transition-colors group-hover:text-lav sm:text-4xl">{p.title}</h2>
                <p className="mt-2 max-w-2xl text-paper/75">{p.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

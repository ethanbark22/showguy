import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Shared layout and building blocks for the legal pages (Privacy, Cookies, Terms).
 * Dark SHOWGUY styling, a readable column and plain headings.
 */
export function LegalPage({
  title,
  intro,
  lastUpdated,
  children,
}: {
  title: string;
  intro: ReactNode;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <article className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45rem_28rem_at_90%_0%,rgb(139_92_246/0.16),transparent_70%)]" />
      <div className="relative mx-auto max-w-3xl px-5 py-14 sm:px-8 lg:py-24">
        <p className="mb-4 inline-block rounded-full border-2 border-lav px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-lav">Legal</p>
        <h1 className="display text-[clamp(2.4rem,7vw,5rem)] text-balance">{title}</h1>
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-paper/90 sm:text-xl">{intro}</div>

        <div className="mt-12 space-y-12">{children}</div>

        <footer className="mt-16 border-t border-line pt-6 text-sm text-mute-text">
          <p>Last updated: {lastUpdated}</p>
          <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
            <Link href="/privacy" className="font-bold text-lav underline underline-offset-4">Privacy Policy</Link>
            <Link href="/cookies" className="font-bold text-lav underline underline-offset-4">Cookie Policy</Link>
            <Link href="/terms" className="font-bold text-lav underline underline-offset-4">Website Terms of Use</Link>
          </p>
        </footer>
      </div>
    </article>
  );
}

/** A headed section. */
export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="display text-[clamp(1.6rem,3.6vw,2.4rem)] text-balance">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-paper/90 sm:text-lg">{children}</div>
    </section>
  );
}

export function Sub({ children }: { children: ReactNode }) {
  return <h3 className="pt-2 text-sm font-bold uppercase tracking-[0.14em] text-lav">{children}</h3>;
}

/** A bullet list. */
export function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.65em] size-1.5 shrink-0 rotate-45 bg-violet" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** An inline link (internal or external). */
export function A({ href, children }: { href: string; children: ReactNode }) {
  const external = /^https?:|^mailto:/.test(href);
  return external ? (
    <a href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="font-bold text-lav underline underline-offset-4 hover:text-paper">
      {children}
    </a>
  ) : (
    <Link href={href} className="font-bold text-lav underline underline-offset-4 hover:text-paper">
      {children}
    </Link>
  );
}

/** "Name, Company number…" block, only showing details that are configured. */
export function Details({ lines }: { lines: (string | false | undefined)[] }) {
  const shown = lines.filter(Boolean) as string[];
  return (
    <p className="rounded-2xl border border-line bg-surface p-5">
      {shown.map((l, i) => (
        <span key={i} className="block">
          {l}
        </span>
      ))}
    </p>
  );
}

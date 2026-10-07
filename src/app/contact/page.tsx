import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { site, activeSocials } from "@/config/site";
import { ContactForm } from "@/components/ContactForm";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Get in touch with SHOWGUY about a release, campaign or digital project, press or anything else.",
  path: "/contact",
});

export default function ContactPage() {
  const socials = activeSocials();
  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
      <div className="grid gap-12 lg:grid-cols-12">
        <header className="lg:col-span-5">
          <h1 className="display text-huge">Say hello.</h1>
          <p className="mt-6 text-lg leading-relaxed text-paper/90 sm:text-xl">
            For a general question, press or something else. If you have a project in mind,{" "}
            <Link href="/apply" className="font-bold underline underline-offset-4">
              start an enquiry here
            </Link>{" "}
            instead.
          </p>
          <dl className="mt-8 space-y-4">
            {site.email && (
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.18em] text-mute-text">Email</dt>
                <dd>
                  <a href={`mailto:${site.email}`} className="text-xl font-bold underline underline-offset-4">
                    {site.email}
                  </a>
                </dd>
              </div>
            )}
            {socials.map((s) => (
              <div key={s.label}>
                <dt className="text-xs font-bold uppercase tracking-[0.18em] text-mute-text">{s.label}</dt>
                <dd>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-xl font-bold underline underline-offset-4">
                    {s.href.replace(/^https?:\/\/(www\.)?/, "")}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
          {process.env.NODE_ENV !== "production" && !site.email && socials.length === 0 && (
            <p className="mt-8 rounded-2xl border-2 border-dashed border-paper/40 p-4 text-sm">
              Developer note (only shown locally): add the SHOWGUY email and social links in <code>src/config/site.ts</code> and they&rsquo;ll appear here.
            </p>
          )}
        </header>
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

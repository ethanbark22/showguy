import { pageMetadata } from "@/lib/metadata";
import { activeSocials } from "@/config/site";
import { ButtonLink } from "@/components/Button";
import { Mascot } from "@/components/Mascot";
import { Star } from "@/components/Star";
import { WhatHappensNext } from "@/components/WhatHappensNext";

/** People land here after sending an application. Not for search engines. */
export const metadata = pageMetadata({
  title: "Application received",
  description: "Thanks for applying to work with SHOWGUY.",
  path: "/apply/success",
  noindex: true,
});

export default function ApplySuccessPage() {
  const social = activeSocials()[0];
  return (
    <div className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(55rem_35rem_at_85%_0%,rgb(139_92_246/0.25),transparent_70%)]" />
      <Star fill="var(--color-violet)" className="pointer-events-none absolute -right-24 top-10 size-[30rem] opacity-[0.07]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-7">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border-2 border-lav px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-lav">
            <Star className="size-3" />
            Application received
          </p>
          <h1 className="display text-hero">
            <span className="line" style={{ "--i": 0 } as React.CSSProperties}>
              <span>Nice one.</span>
            </span>
            <span className="line" style={{ "--i": 1 } as React.CSSProperties}>
              <span>
                We&rsquo;ve <em className="mark">got it.</em>
              </span>
            </span>
          </h1>
          <p className="fade-up mt-8 max-w-xl text-lg leading-relaxed text-paper/90 sm:text-xl" style={{ "--d": "0.5s" } as React.CSSProperties}>
            We&rsquo;ll take a look at your project and the information you&rsquo;ve sent over. If it feels like SHOWGUY could be a good fit, we&rsquo;ll get in touch to arrange a conversation.
          </p>
          <div className="fade-up mt-8 flex flex-col gap-3 sm:flex-row" style={{ "--d": "0.65s" } as React.CSSProperties}>
            <ButtonLink href="/">Back to SHOWGUY</ButtonLink>
            {social && (
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[3.25rem] items-center justify-center rounded-full border-2 border-current px-7 py-3 text-base font-bold uppercase tracking-wide transition hover:border-violet-strong hover:bg-violet-strong"
              >
                Follow SHOWGUY
              </a>
            )}
          </div>
          <p className="mt-6 flex max-w-md items-start gap-2 text-sm text-mute-text">
            <Star className="mt-0.5 size-4 shrink-0" />
            No automated sales funnel. A real person reviews each application.
          </p>
          <div className="mt-10 max-w-md rounded-2xl border border-line bg-surface p-5">
            <WhatHappensNext done={1} />
          </div>
        </div>

        <div className="relative mx-auto w-52 sm:w-60 lg:col-span-5 lg:w-72">
          <div aria-hidden="true" className="absolute inset-x-[6%] bottom-0 aspect-square rounded-full bg-violet" />
          <Mascot variant="wave" float eager className="relative" sizes="(min-width: 1024px) 288px, 240px" />
        </div>
      </div>
    </div>
  );
}

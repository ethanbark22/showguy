import { heroTags } from "@/config/services";
import { offer } from "@/config/pricing";
import { ButtonLink } from "./Button";
import { Marquee } from "./Marquee";
import { Mascot } from "./Mascot";
import { Star } from "./Star";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-ink">
      {/* Faint purple light from the top right, plus an oversized star for depth */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_40rem_at_85%_0%,rgb(139_92_246/0.22),transparent_70%)]" />
      <Star fill="var(--color-violet)" className="pointer-events-none absolute -left-32 top-1/3 hidden size-[34rem] opacity-[0.07] lg:block" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-12 lg:gap-6 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-8">
          <p className="fade-up mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-lav sm:text-sm" style={{ "--d": "0s" } as React.CSSProperties}>
            <Star className="size-4 shrink-0" />
            {heroTags.join(" / ")}
          </p>
          <h1 id="hero-title" className="display text-hero">
            <span className="line" style={{ "--i": 0 } as React.CSSProperties}>
              <span>You make the music.</span>
            </span>
            <span className="line" style={{ "--i": 1 } as React.CSSProperties}>
              <span>
                We make <em className="mark">people care.</em>
              </span>
            </span>
          </h1>
          <p className="fade-up mt-8 max-w-xl text-lg leading-relaxed text-paper/85 sm:text-xl" style={{ "--d": "0.6s" } as React.CSSProperties}>
            SHOWGUY is the digital team behind ambitious independent artists. We turn releases, footage and ideas into content, campaigns and fan growth.
          </p>
          <div className="fade-up mt-8 flex flex-col gap-3 sm:flex-row" style={{ "--d": "0.75s" } as React.CSSProperties}>
            <ButtonLink href="/apply">Work with SHOWGUY</ButtonLink>
            <ButtonLink href="#what-we-do" variant="outline" arrow={false}>
              See what we do
            </ButtonLink>
          </div>
          <p className="fade-up mt-6 max-w-xl text-sm font-medium text-mute-text sm:text-base" style={{ "--d": "0.9s" } as React.CSSProperties}>
            Founding artist roster: <span className="text-paper">{offer.price}{offer.period}</span>, {offer.term}. By application.
          </p>
        </div>

        {/* The mascot stands on a purple stage and breaks out of the top of it */}
        <div className="relative mx-auto mt-10 w-full max-w-sm sm:max-w-md lg:col-span-4 lg:mt-0 lg:max-w-none">
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 top-[26%] overflow-hidden rounded-[2.5rem] bg-violet">
            <Star fill="var(--color-lav)" className="absolute -right-16 -top-16 size-72 opacity-40" />
            <div className="grid-lines absolute inset-0 opacity-40 mix-blend-overlay" />
          </div>
          <div aria-hidden="true" className="spin-slow absolute -left-3 top-[16%] z-10 grid size-24 place-items-center rounded-full bg-star text-center text-[0.62rem] font-bold uppercase leading-tight tracking-widest text-ink sm:size-28 lg:-left-6">
            Digital
            <br />
            team for
            <br />
            artists
          </div>
          <Mascot float eager className="relative z-[5] mx-auto w-[96%]" sizes="(min-width: 1024px) 400px, 80vw" />
        </div>
      </div>

      <Marquee
        items={heroTags.map((t) => t.toUpperCase())}
        className="display border-y border-ink bg-violet py-4 text-3xl text-ink sm:text-5xl"
      />
    </section>
  );
}

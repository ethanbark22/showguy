import { heroTags } from "@/config/services";
import { ButtonLink } from "./Button";
import { Marquee } from "./Marquee";
import { Mascot } from "./Mascot";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-14 pt-10 sm:px-8 lg:grid-cols-12 lg:pb-20 lg:pt-16">
        <div className="lg:col-span-8">
          <p className="fade-up mb-6 text-xs font-bold uppercase tracking-[0.2em] sm:text-sm" style={{ "--d": "0s" } as React.CSSProperties}>
            {heroTags.join(" / ")}
          </p>
          <h1 id="hero-title" className="display text-hero">
            <span className="line" style={{ "--i": 0 } as React.CSSProperties}>
              <span>You make the music.</span>
            </span>
            <span className="line" style={{ "--i": 1 } as React.CSSProperties}>
              <span>
                We make{" "}
                <em className="mark">people care.</em>
              </span>
            </span>
          </h1>
          <p className="fade-up mt-8 max-w-xl text-lg leading-relaxed sm:text-xl" style={{ "--d": "0.6s" } as React.CSSProperties}>
            SHOWGUY is the digital team behind ambitious independent artists. We turn releases, footage and ideas into content, campaigns and fan growth.
          </p>
          <div className="fade-up mt-8 flex flex-col gap-3 sm:flex-row" style={{ "--d": "0.75s" } as React.CSSProperties}>
            <ButtonLink href="/apply">Work with SHOWGUY</ButtonLink>
            <ButtonLink href="#what-we-do" variant="outline" arrow={false}>
              See what we do
            </ButtonLink>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:col-span-4 lg:max-w-none">
          <div aria-hidden="true" className="absolute inset-x-4 bottom-0 top-10 rounded-[3rem] border-2 border-ink bg-sun" />
          <div aria-hidden="true" className="spin-slow absolute -right-2 top-0 grid size-24 place-items-center rounded-full bg-flame text-center text-[0.65rem] font-bold uppercase leading-tight tracking-widest sm:size-28">
            Digital
            <br />
            team
            <br />
            ✦ for artists
          </div>
          <Mascot float eager className="relative" sizes="(min-width: 1024px) 400px, 80vw" />
        </div>
      </div>

      <Marquee
        items={heroTags.map((t) => t.toUpperCase())}
        className="display border-y-2 border-ink bg-ink py-4 text-3xl text-paper sm:text-5xl"
      />
    </section>
  );
}

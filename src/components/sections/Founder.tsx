import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { founder } from "@/config/site";
import { SectionHeading } from "../SectionHeading";
import { Star } from "../Star";

/** True once the real photo has been dropped into /public. */
const hasPhoto = fs.existsSync(path.join(process.cwd(), "public", founder.photo));

/**
 * The human face of SHOWGUY (and the home of the nav's "About" link).
 * The portrait sits in a fixed 4:5 frame, so nothing jumps while it loads.
 */
export function Founder() {
  return (
    <section id="about" aria-labelledby="about-title" className="on-light overflow-hidden bg-paper text-ink">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="reveal mx-auto w-full max-w-[17rem] sm:max-w-xs lg:col-span-4 lg:max-w-none">
            <div className="relative">
              <div aria-hidden="true" className="absolute -bottom-3 -right-3 h-full w-full rounded-[2rem] bg-violet" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-2 border-ink bg-plum">
                {hasPhoto ? (
                  <Image
                    src={founder.photo}
                    alt={founder.alt}
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 320px, 272px"
                    style={{ objectPosition: founder.objectPosition }}
                    className="object-cover"
                  />
                ) : (
                  <div className="grid h-full place-items-center p-6 text-center text-paper" role="img" aria-label="Founder photo coming soon">
                    <div>
                      <Star className="mx-auto size-14" />
                      <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-lav">Founder photo</p>
                      {process.env.NODE_ENV !== "production" && (
                        <p className="mt-2 text-xs text-mute-text">Add it at public{founder.photo}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="reveal lg:col-span-8">
            <SectionHeading id="about-title" eyebrow="About" size="huge" title="The person behind SHOWGUY." />
            <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed sm:text-xl">
              <p className="display text-[clamp(1.3rem,2.4vw,1.85rem)] leading-[1.02]">
                SHOWGUY was started with a simple idea: artists should be able to focus more on making great music without having to become full-time content marketers at the same time.
              </p>
              <p>
                The goal is bigger than building another marketing agency. SHOWGUY is being built as a music company &mdash; starting with digital growth and expanding around the artists we work with.
              </p>
            </div>
            <p className="mt-8 flex items-center gap-3">
              <Star className="size-5 shrink-0" />
              <span>
                <span className="block text-lg font-bold">{founder.name}</span>
                <span className="block text-sm text-ink-soft">{founder.role}</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

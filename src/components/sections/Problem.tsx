import { artistJobs } from "@/config/services";
import { SectionHeading } from "../SectionHeading";
import { Mascot } from "../Mascot";
import { Star } from "../Star";

/* Pill styles, in order of the list. Shades of purple, plus a star-yellow one for the most annoying task. */
const pills: Record<string, string> = {
  violet: "bg-violet text-ink",
  lav: "bg-lav text-ink",
  paper: "bg-paper text-ink",
  outline: "border-2 border-paper/60 text-paper",
  star: "bg-star text-ink",
};
const order = ["violet", "outline", "lav", "paper", "star", "outline", "violet", "lav", "outline", "paper", "star"];
const tilts = ["-rotate-2", "rotate-1", "rotate-2", "-rotate-1", "rotate-3", "-rotate-3"];

export function Problem() {
  return (
    <section aria-labelledby="problem" className="relative overflow-hidden bg-plum">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading id="problem" eyebrow="The problem" size="huge" title={"Being an artist is already a full-time job."} className="reveal max-w-5xl" />
        <p className="mt-8 max-w-2xl text-lg text-paper/85 sm:text-xl">
          Modern independent artists are expected to&hellip;
        </p>
        <ul className="mt-6 flex flex-wrap gap-3 sm:gap-4">
          {artistJobs.map((job, i) => (
            <li
              key={job}
              className={`reveal rounded-full px-5 py-3 text-base font-bold transition hover:rotate-0 hover:scale-105 sm:text-xl ${pills[order[i % order.length]]} ${tilts[i % tilts.length]}`}
            >
              {job}
            </li>
          ))}
        </ul>

        <div className="mt-20 grid items-end gap-8 lg:grid-cols-12">
          <div className="reveal lg:col-span-8">
            <p className="display text-big text-lav">That&rsquo;s where SHOWGUY comes in.</p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper/90 sm:text-xl">
              We become the digital team around the artist so they can spend more time being an artist.
            </p>
          </div>
          {/* The mascot peeks up from the bottom edge of the section */}
          <div className="relative mx-auto -mb-20 w-44 sm:w-56 lg:col-span-4 lg:ml-auto lg:-mb-28 lg:w-64">
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 aspect-square rounded-full bg-violet" />
            <Star className="absolute -right-2 top-2 size-6" />
            <Mascot variant="reach" className="relative" sizes="256px" />
          </div>
        </div>
      </div>
    </section>
  );
}

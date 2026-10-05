import { artistJobs } from "@/config/services";
import { SectionHeading } from "../SectionHeading";
import { Mascot } from "../Mascot";

const tilts = ["-rotate-2", "rotate-1", "rotate-2", "-rotate-1", "rotate-3", "-rotate-3"];
const fills = ["bg-sun", "bg-lilac", "bg-mint", "bg-paper", "bg-flame"];

export function Problem() {
  return (
    <section aria-labelledby="problem" className="on-dark relative overflow-hidden bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <SectionHeading id="problem" eyebrow="The problem" size="huge" title={"Being an artist is already a full-time job."} className="reveal max-w-5xl" />
        <p className="mt-8 max-w-2xl text-lg text-paper/85 sm:text-xl">
          Modern independent artists are expected to&hellip;
        </p>
        <ul className="mt-6 flex flex-wrap gap-3 sm:gap-4">
          {artistJobs.map((job, i) => (
            <li
              key={job}
              className={`reveal rounded-full px-5 py-3 text-base font-bold text-ink transition hover:rotate-0 hover:scale-105 sm:text-xl ${fills[i % fills.length]} ${tilts[i % tilts.length]}`}
            >
              {job}
            </li>
          ))}
        </ul>

        <div className="mt-16 grid items-end gap-8 lg:grid-cols-12">
          <div className="reveal lg:col-span-9">
            <p className="display text-big text-sun">That&rsquo;s where SHOWGUY comes in.</p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed sm:text-xl">
              We become the digital team around the artist so they can spend more time being an artist.
            </p>
          </div>
          <div className="mx-auto w-40 sm:w-52 lg:col-span-3 lg:ml-auto">
            <Mascot variant="wave" sizes="208px" />
          </div>
        </div>
      </div>
    </section>
  );
}

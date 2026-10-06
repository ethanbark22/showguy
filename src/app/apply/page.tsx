import { pageMetadata } from "@/lib/metadata";
import { ApplicationForm } from "@/components/ApplicationForm";
import { Mascot } from "@/components/Mascot";

export const metadata = pageMetadata({
  title: "Apply to work with SHOWGUY",
  description: "Tell us about your music, your next release and where you want to go. We're selecting a small number of independent artists for the SHOWGUY founding roster.",
  path: "/apply",
});

export default function ApplyPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-12">
        <header className="lg:col-span-5">
          <p className="mb-4 inline-block rounded-full border-2 border-lav px-3 py-1 text-lav text-xs font-bold uppercase tracking-[0.18em]">Founding roster</p>
          <h1 className="display text-huge">Apply to work with SHOWGUY.</h1>
          <p className="mt-6 text-lg leading-relaxed text-paper/90 sm:text-xl">
            Tell us about your music, your next release and where you&rsquo;re trying to go. It takes about ten minutes, and the more honestly you answer, the better we can tell whether we&rsquo;re the right fit.
          </p>
          <p className="mt-4 text-base text-mute-text">Questions marked * are needed. Everything else helps.</p>
          <div className="relative mt-10 hidden w-44 lg:block">
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 aspect-square rounded-full bg-violet" />
            <Mascot variant="wave" sizes="176px" className="relative" />
          </div>
        </header>
        <div className="lg:col-span-7">
          <ApplicationForm />
        </div>
      </div>
    </div>
  );
}

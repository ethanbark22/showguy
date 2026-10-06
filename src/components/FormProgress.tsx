"use client";

import { useEffect, useState } from "react";

type Section = { id: string; number: string; short: string };

/**
 * A quiet "you are here" for a long form. It watches which section is near the
 * top of the screen and highlights it. It's one form, not steps: every item is
 * just a link to that section.
 */
export function FormProgress({ sections, variant }: { sections: Section[]; variant: "rail" | "row" }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.38;
      let current = 0;
      sections.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) current = i;
      });
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sections]);

  if (variant === "row") {
    return (
      <nav aria-label="Application sections">
        <ol className="grid grid-cols-4 gap-2">
          {sections.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`} aria-current={i === active ? "step" : undefined} className="group block">
                <span className={`block h-1 rounded-full transition-colors duration-300 ${i <= active ? "bg-violet" : "bg-line"}`} />
                <span className={`mt-2 block text-[0.7rem] font-bold uppercase tracking-[0.12em] transition-colors ${i === active ? "text-lav" : "text-mute-text"}`}>
                  <span className="text-violet">{s.number}</span> {s.short}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    );
  }

  return (
    <nav aria-label="Application sections">
      <ol className="relative space-y-1">
        <span aria-hidden="true" className="absolute bottom-3 left-[0.45rem] top-3 w-px bg-line" />
        {sections.map((s, i) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              aria-current={i === active ? "step" : undefined}
              className={`relative flex min-h-8 items-center gap-3 text-sm font-bold uppercase tracking-[0.1em] transition-colors ${i === active ? "text-paper" : "text-mute-text hover:text-lav"}`}
            >
              <span
                aria-hidden="true"
                className={`relative z-10 size-[0.9rem] shrink-0 rounded-full border-2 transition-colors duration-300 ${i === active ? "border-violet bg-violet" : i < active ? "border-violet bg-ink" : "border-line-strong bg-ink"}`}
              />
              <span className="text-violet">{s.number}</span>
              {s.short}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

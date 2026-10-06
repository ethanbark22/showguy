"use client";

import { useId, useState } from "react";
import type { FaqItem } from "@/config/faq";
import { track, events } from "@/lib/track";

/**
 * An accordion of real buttons. Each answer stays in the page (good for search
 * engines) but is hidden from sight, screen readers and the Tab key until opened.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const base = useId();

  return (
    <ul className="border-t border-paper/20">
      {items.map((item, i) => {
        const isOpen = open === item.id;
        const btn = `${base}-q-${item.id}`;
        const panel = `${base}-a-${item.id}`;
        return (
          <li key={item.id} className="border-b border-paper/20">
            <h3>
              <button
                id={btn}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => {
                  setOpen(isOpen ? null : item.id);
                  if (!isOpen) track(events.faqOpened, { question: item.id });
                }}
                className="group flex min-h-[4.5rem] w-full items-center gap-4 py-5 text-left sm:gap-6"
              >
                <span aria-hidden="true" className="display w-8 shrink-0 text-lg text-violet sm:w-10 sm:text-2xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="display flex-1 text-[clamp(1.2rem,2.3vw,1.85rem)] leading-[1.02] transition-colors group-hover:text-lav">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={`grid size-10 shrink-0 place-items-center rounded-full border-2 transition-all duration-300 sm:size-11 ${
                    isOpen ? "rotate-45 border-violet bg-violet-strong" : "border-paper/40 group-hover:border-violet"
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={panel}
              role="region"
              aria-labelledby={btn}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <div className="space-y-3 pb-7 pl-12 pr-2 text-base leading-relaxed text-paper/85 sm:pl-16 sm:pr-16 sm:text-lg">
                  {item.lead && <p className="display text-2xl text-violet sm:text-3xl">{item.lead}</p>}
                  {item.body.map((block, bi) =>
                    block.type === "p" ? (
                      <p key={bi}>{block.text}</p>
                    ) : (
                      <ul key={bi} className="space-y-1.5">
                        {block.items.map((li) => (
                          <li key={li} className="flex gap-3">
                            <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-violet" />
                            {li}
                          </li>
                        ))}
                      </ul>
                    ),
                  )}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

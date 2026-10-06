"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { primaryCta, type NavItem } from "@/config/navigation";

/** Menu button + full-screen panel for phones and tablets. */
export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-paper/60 px-4 text-sm font-bold uppercase tracking-wide"
      >
        {open ? "Close" : "Menu"}
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-16 z-40 h-[calc(100dvh-4rem)] overflow-y-auto bg-plum px-5 py-8 text-paper"
        >
          <nav aria-label="Mobile">
            <ul className="space-y-1">
              {[...items, primaryCta].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`display block py-3 text-5xl ${item === primaryCta ? "text-violet" : ""}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

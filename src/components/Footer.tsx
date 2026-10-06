import Link from "next/link";
import { site, activeSocials } from "@/config/site";
import { legalNav, mainNav } from "@/config/navigation";
import { needsConsent } from "@/config/analytics";
import { Logo } from "./Logo";
import { CookieSettingsButton } from "./Analytics";

export function Footer() {
  const socials = activeSocials();
  return (
    <footer className="relative overflow-hidden border-t border-paper/10 bg-plum text-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-10 pt-16 sm:px-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo tone="dark" />
          <p className="mt-5 max-w-sm text-mute-text">
            The digital team behind ambitious independent artists, built by people who like music.
          </p>
          {site.email && (
            <a href={`mailto:${site.email}`} className="mt-5 inline-block font-bold underline underline-offset-4">
              {site.email}
            </a>
          )}
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-violet">Explore</h2>
          <ul className="space-y-2">
            {[...mainNav, { label: "Apply", href: "/apply" }, { label: "Contact", href: "/contact" }].map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="hover:text-lav">
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          {socials.length > 0 && (
            <>
              <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-violet">Follow</h2>
              <ul className="mb-8 flex flex-wrap gap-3">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center rounded-full border-2 border-paper/30 px-4 text-sm font-bold hover:border-violet hover:text-lav"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-violet">Small print</h2>
          <ul className="space-y-2 text-sm">
            {legalNav.map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="hover:text-lav">
                  {i.label}
                </Link>
              </li>
            ))}
            {needsConsent && (
              <li>
                <CookieSettingsButton />
              </li>
            )}
          </ul>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="display pointer-events-none select-none whitespace-nowrap text-center text-[clamp(3.5rem,17vw,16rem)] leading-[0.8] text-paper/[0.07]"
      >
        SHOWGUY
      </p>
      <p className="px-5 pb-8 pt-4 text-center text-xs text-mute-text">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </p>
    </footer>
  );
}

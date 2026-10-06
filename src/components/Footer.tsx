import Link from "next/link";
import { site, activeSocials, companyLines } from "@/config/site";
import { legalNav } from "@/config/navigation";
import { needsConsent } from "@/config/analytics";
import { getMainNav } from "@/lib/nav";
import { Logo } from "./Logo";
import { CookieSettingsButton } from "./Analytics";

export function Footer() {
  const socials = activeSocials();
  const company = companyLines();
  const explore = [...getMainNav(), { label: "Apply", href: "/apply" }, { label: "Contact", href: "/contact" }];
  return (
    <footer className="relative overflow-hidden border-t border-paper/10 bg-plum text-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-8 pt-14 sm:px-8 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <Logo tone="dark" />
          <p className="mt-4 max-w-xs text-mute-text">Digital growth for ambitious independent artists.</p>
          {site.email && (
            <a href={`mailto:${site.email}`} className="mt-4 inline-block font-bold underline underline-offset-4 hover:text-lav">
              {site.email}
            </a>
          )}
          {socials.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2.5" aria-label="SHOWGUY on social media">
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
          )}
        </div>

        {/* Two columns side by side, even on a phone, to keep the footer short */}
        <div className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-2 md:pl-10">
          <nav aria-label="Footer">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-violet">Explore</h2>
            <ul className="space-y-1">
              {explore.map((i) => (
                <li key={i.href}>
                  <Link href={i.href} className="inline-flex min-h-9 items-center hover:text-lav">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Legal">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-violet">Legal</h2>
            <ul className="space-y-1 text-[0.95rem]">
              {legalNav.map((i) => (
                <li key={i.href}>
                  <Link href={i.href} className="inline-flex min-h-9 items-center hover:text-lav">
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
          </nav>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="display pointer-events-none select-none whitespace-nowrap text-center text-[clamp(3.5rem,17vw,16rem)] leading-[0.8] text-paper/[0.07]"
      >
        SHOWGUY
      </p>
      <div className="px-5 pb-8 pt-4 text-center text-xs leading-relaxed text-mute-text">
        {company.length > 0 && <p>{company.join(" · ")}</p>}
        <p>© {new Date().getFullYear()} {company.length > 0 ? company[0] : site.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}

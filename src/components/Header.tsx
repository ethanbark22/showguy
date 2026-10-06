import Link from "next/link";
import { primaryCta } from "@/config/navigation";
import { getMainNav } from "@/lib/nav";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

export function Header() {
  const mainNav = getMainNav();
  return (
    <header className="sticky top-0 z-50 border-b border-paper/10 bg-ink/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Logo tone="dark" />
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-bold uppercase tracking-wide decoration-violet decoration-2 underline-offset-8 hover:text-lav hover:underline"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={primaryCta.href}
            className="rounded-full bg-violet-strong px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-paper transition hover:bg-lav hover:text-ink active:scale-95"
          >
            {primaryCta.label}
          </Link>
        </nav>
        <MobileNav items={mainNav} />
      </div>
    </header>
  );
}

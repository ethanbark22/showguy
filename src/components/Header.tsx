import Link from "next/link";
import { mainNav, primaryCta } from "@/config/navigation";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-bold uppercase tracking-wide underline-offset-8 decoration-2 hover:underline"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={primaryCta.href}
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-paper transition hover:bg-flame hover:text-ink active:scale-95"
          >
            {primaryCta.label}
          </Link>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}

import Image from "next/image";
import Link from "next/link";
import { brand } from "@/config/brand";

/** The SHOWGUY logo as a link home. `tone="dark"` is for dark backgrounds. */
export function Logo({ tone = "dark", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <Link href="/" aria-label="SHOWGUY home" className={`flex min-h-11 shrink-0 items-center ${className}`}>
      <Image
        src={tone === "dark" ? brand.logo.onDark : brand.logo.onLight}
        alt={brand.logo.alt}
        width={brand.logo.width}
        height={brand.logo.height}
        unoptimized
        className="h-7 w-auto max-w-none sm:h-9"
      />
    </Link>
  );
}

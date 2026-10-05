import Image from "next/image";
import Link from "next/link";
import { brand } from "@/config/brand";

/** The SHOWGUY logo as a link home. `tone="dark"` is for dark backgrounds. */
export function Logo({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <Link href="/" aria-label="SHOWGUY home" className={`inline-block ${className}`}>
      <Image
        src={tone === "dark" ? brand.logo.onDark : brand.logo.onLight}
        alt={brand.logo.alt}
        width={brand.logo.width}
        height={brand.logo.height}
        unoptimized
        className="h-8 w-auto sm:h-9"
      />
    </Link>
  );
}

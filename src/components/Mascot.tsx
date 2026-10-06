import Image from "next/image";
import { brand } from "@/config/brand";

type Props = {
  variant?: "mic" | "wave" | "reach" | "point";
  className?: string;
  /** Gentle floating motion (switched off for reduced-motion users). */
  float?: boolean;
  /** Use for the first mascot on a page so it loads straight away. */
  eager?: boolean;
  sizes?: string;
  /** Decorative mascots get empty alt text so screen readers skip them. */
  decorative?: boolean;
};

/** The SHOWGUY mascot. Pick a pose with `variant`; swap the files in /public/brand to change him everywhere. */
export function Mascot({
  variant = "mic",
  className = "",
  float = false,
  eager = false,
  sizes = "(min-width: 1024px) 520px, 70vw",
  decorative = true,
}: Props) {
  const pose = brand.mascot[variant];
  return (
    <Image
      src={pose.src}
      alt={decorative ? "" : brand.mascot.alt}
      width={pose.width}
      height={pose.height}
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      className={`h-auto w-full select-none ${float ? "float" : ""} ${className}`}
    />
  );
}

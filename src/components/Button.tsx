import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "ink" | "sun" | "paper" | "outline";

const styles: Record<Variant, string> = {
  ink: "bg-ink text-paper hover:bg-flame hover:text-ink",
  sun: "bg-sun text-ink hover:bg-paper",
  paper: "bg-paper text-ink hover:bg-sun",
  outline: "border-2 border-ink text-ink hover:bg-ink hover:text-paper",
};

const base =
  "group inline-flex min-h-[3.25rem] items-center justify-center gap-3 rounded-full px-7 py-3 text-base font-bold uppercase tracking-wide transition duration-200 active:scale-[0.97] sm:text-[1.05rem]";

type Common = { variant?: Variant; arrow?: boolean };

/** A link that looks like a button. */
export function ButtonLink({
  variant = "ink",
  arrow = true,
  className = "",
  children,
  ...props
}: Common & ComponentProps<typeof Link>) {
  return (
    <Link className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

/** A real <button>, for forms. */
export function Button({
  variant = "ink",
  arrow = true,
  className = "",
  children,
  ...props
}: Common & ComponentProps<"button">) {
  return (
    <button className={`${base} ${styles[variant]} disabled:opacity-60 ${className}`} {...props}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5 transition-transform duration-200 group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12h16M14 5l7 7-7 7" />
    </svg>
  );
}

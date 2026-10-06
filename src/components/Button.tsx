import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * primary: the main purple call to action (use for "apply" everywhere)
 * outline: secondary, takes the text colour of whatever section it sits in
 * dark:    near-black, for the rare spot where purple would be lost
 */
type Variant = "primary" | "outline" | "dark";

const styles: Record<Variant, string> = {
  primary: "bg-violet-strong text-paper hover:bg-lav hover:text-ink",
  outline: "border-2 border-current hover:border-violet-strong hover:bg-violet-strong hover:text-paper",
  dark: "bg-ink text-paper hover:bg-violet-strong",
};

const base =
  "group inline-flex min-h-[3.25rem] items-center justify-center gap-3 rounded-full px-7 py-3 text-base font-bold uppercase tracking-wide transition duration-200 active:scale-[0.97] sm:text-[1.05rem]";

type Common = { variant?: Variant; arrow?: boolean };

/** A link that looks like a button. */
export function ButtonLink({
  variant = "primary",
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
  variant = "primary",
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

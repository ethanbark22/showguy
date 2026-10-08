export type NavItem = { label: string; href: string };

/** Header links. Anchors point at sections on the homepage. */
export const mainNav: NavItem[] = [
  { label: "What We Do", href: "/#what-we-do" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Our Work", href: "/#results" },
  { label: "About", href: "/#about" },
];

export const primaryCta: NavItem = { label: "Work With Us", href: "/apply" };

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Website Terms", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];

/*
 * FUTURE SECTIONS (not built yet)
 * When SHOWGUY grows, add a folder for each under src/app, e.g.
 * src/app/journal/page.tsx, and add it to mainNav above. Planned:
 * /artists /media /sessions /management /records /live /shop /journal /careers
 */

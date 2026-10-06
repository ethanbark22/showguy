/** The founding artist offer. Change the price or the list here. */
export const offer = {
  name: "SHOWGUY Founding Artist",
  price: "£400",
  period: "/month",
  term: "3 month initial term",
  /** Shown in "What actually happens each month". */
  includes: [
    "Monthly digital strategy",
    "8–12 edited short-form videos",
    "Content plan",
    "Captions and hooks",
    "Content scheduling",
    "Release strategy",
    "Creator/influencer outreach where appropriate",
    "Monthly performance report",
    "Monthly strategy call",
  ],
  smallPrint: [
    "Artists provide the raw footage.",
    "Additional production, paid advertising, creator fees and third-party costs are separate.",
  ],
  cta: { label: "Apply to work with SHOWGUY", href: "/apply" },
  note: "We're looking for ambitious independent artists who are already taking their careers seriously.",
} as const;

/** The explanation beside the price. No countdowns, no fixed number of places, no promised future price. */
export const foundingRate = {
  label: "Founding rate",
  paragraphs: [
    "£400/month is our introductory rate while we build the first SHOWGUY client roster and case studies.",
    "Founding artists receive direct founder involvement and our lowest planned monthly rate. As the roster grows and SHOWGUY builds a proven track record, pricing will increase.",
  ],
  includesLine:
    "Includes the full monthly workflow above: strategy, 8–12 edited short-form videos, scheduling, outreach where appropriate, reporting and a monthly call.",
} as const;

/** Options for the budget question on the application form. */
export const budgetOptions = [
  "Under £250",
  "£250–£500",
  "£500–£1,000",
  "£1,000–£2,500",
  "£2,500+",
];

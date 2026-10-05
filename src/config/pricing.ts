/** The founding artist offer. Change the price or the list here. */
export const offer = {
  name: "SHOWGUY Founding Artist",
  price: "£400",
  period: "/month",
  term: "3 month initial term",
  includes: [
    "Monthly digital strategy",
    "8–12 edited short-form videos",
    "Content planning",
    "Captions and hooks",
    "Scheduling",
    "Release strategy",
    "Creator and influencer outreach, where appropriate",
    "Monthly analytics",
    "Monthly strategy call",
  ],
  smallPrint: [
    "Artists provide the raw footage.",
    "Additional production, paid advertising, creator fees and third-party costs are separate.",
  ],
  cta: { label: "Apply to work with SHOWGUY", href: "/apply" },
  note: "We're looking for ambitious independent artists who are already taking their careers seriously.",
} as const;

/** Options for the budget question on the application form. */
export const budgetOptions = [
  "Under £250",
  "£250–£500",
  "£500–£1,000",
  "£1,000–£2,500",
  "£2,500+",
];

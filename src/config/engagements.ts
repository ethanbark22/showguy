/**
 * The two ways to work with SHOWGUY. There are deliberately NO public prices:
 * scope and cost are agreed in conversation. Edit the words here.
 */
export type Engagement = {
  id: "project" | "partnership";
  label: string;
  blurb: string;
  /** What the work is typically suited to (small print under the blurb). */
  suits?: string;
  /** Heading for the list: makes clear these are examples, not a fixed package. */
  listLabel: string;
  examples: string[];
  /** The highlighted line at the bottom of the card. */
  copy: string;
  /** How the work is scoped (honest, no "unlimited"). */
  scope: string;
  cta: { label: string; href: string };
};

export const engagements: Engagement[] = [
  {
    id: "project",
    label: "Project work",
    blurb: "Got a release, tour or artist project coming up? Bring SHOWGUY in to build the digital campaign around it.",
    suits: "Single releases, EP and album campaigns, tour launches, artist websites, campaign pages and larger defined projects.",
    listLabel: "A project might include",
    examples: [
      "Campaign strategy",
      "Artist & release websites",
      "Landing pages & fan journeys",
      "Digital campaign assets",
      "Launch communications",
      "Campaign reporting",
    ],
    copy: "One project. Clear deliverables. Proper execution.",
    scope: "Each project includes what it needs. Scope and deliverables are agreed before work begins.",
    cta: { label: "Discuss a project", href: "/apply" },
  },
  {
    id: "partnership",
    label: "Ongoing partnerships",
    blurb: "For artists, managers and labels with releases, campaigns and digital work that never really stop.",
    listLabel: "A partnership might cover",
    examples: [
      "Release campaign planning",
      "Digital campaign execution",
      "Websites & campaign pages",
      "Fan communications",
      "Creative project coordination",
      "Monthly strategy & reporting",
    ],
    copy: "Your external digital team, keeping releases, campaigns and artist projects moving every month.",
    scope: "Delivered to an agreed monthly scope, confirmed before work begins.",
    cta: { label: "Explore a partnership", href: "/apply" },
  },
];

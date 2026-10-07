/**
 * The two ways to work with SHOWGUY. There are deliberately NO public prices:
 * scope and cost are agreed in conversation. Edit the words here.
 */
export type Engagement = {
  id: "project" | "partnership";
  label: string;
  blurb: string;
  examples: string[];
  copy: string;
  cta: { label: string; href: string };
};

export const engagements: Engagement[] = [
  {
    id: "project",
    label: "Project work",
    blurb: "For customers who need a specific piece of creative or digital work.",
    examples: ["New artist website", "Campaign landing page", "Digital launch assets", "Campaign strategy project"],
    copy: "Clear scope. Defined deliverables. A finished project you can actually use.",
    cta: { label: "Discuss a project", href: "/apply" },
  },
  {
    id: "partnership",
    label: "Ongoing partnerships",
    blurb: "For artists, labels or music businesses needing regular digital and creative support.",
    examples: ["Monthly digital operations", "Campaign coordination", "Website management", "Creative support", "Digital communications"],
    copy: "An external creative and digital partner working with your team on an agreed monthly scope.",
    cta: { label: "Explore a partnership", href: "/apply" },
  },
];

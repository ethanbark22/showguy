/**
 * What SHOWGUY does, who it's for, and how it works.
 * Edit the words here; the homepage sections read from this file.
 */

export type Service = {
  number: string;
  /** Small label above the headline. */
  category: string;
  /** Use \n to break the headline over two lines. */
  headline: string;
  body: string;
  /** Examples of the kind of work. Not a fixed package. */
  examples: string[];
  /** A short line about how this kind of work is scoped. */
  note: string;
  /** Card colour: shades of the purple/dark palette. */
  tone: "deep" | "lav" | "dark";
};

export const services: Service[] = [
  {
    number: "01",
    category: "Plan",
    headline: "Start with a proper campaign.",
    body: "We define the story, the timeline, the digital touchpoints and what actually needs to happen around the release or project.",
    examples: ["Campaign strategy", "Release timelines", "Creative direction", "Audience journey", "Launch planning"],
    note: "The plan everything else hangs on.",
    tone: "deep",
  },
  {
    number: "02",
    category: "Build",
    headline: "Create the digital experience.",
    body: "We build the pages, assets and communications the campaign needs.",
    examples: ["Artist websites", "Release pages", "Landing pages", "Fan signup journeys", "Digital assets", "Email campaigns"],
    note: "Made to fit the campaign, not bolted on.",
    tone: "lav",
  },
  {
    number: "03",
    category: "Run",
    headline: "Keep the campaign moving.",
    body: "We coordinate the digital execution, keep priorities organised and help your team stay on top of the campaign.",
    examples: [
      "Campaign coordination",
      "Website updates",
      "Launch communications",
      "Asset coordination",
      "Reporting",
      "Monthly planning",
    ],
    note: "Scope is agreed before work begins.",
    tone: "dark",
  },
];

/** The same work, grouped by capability: a quick-scan summary under the three pillars. */
export const capabilities = [
  { area: "Strategy", items: ["Release planning", "Campaign concepts", "Timelines", "Creative direction"] },
  { area: "Web", items: ["Artist websites", "Release pages", "Landing pages", "Fan signup journeys"] },
  { area: "Communications", items: ["Email campaigns", "Release announcements", "Fan communications", "Launch messaging"] },
  { area: "Digital execution", items: ["Campaign coordination", "Asset organisation", "Digital rollout", "Updates and implementation"] },
  { area: "Insights", items: ["Reporting", "Campaign review", "Lessons for the next project"] },
];

export const processSteps = [
  {
    title: "Discover",
    body: "We understand the artist, release, project and team.",
  },
  {
    title: "Plan",
    body: "We define the campaign, deliverables and timeline.",
  },
  {
    title: "Build & execute",
    body: "We create the digital pieces and keep the campaign moving.",
  },
  {
    title: "Review",
    body: "We look at what happened, what worked and what should happen next.",
  },
];

/** Floating labels in "Releasing the music is only half the job." */
export const musicWork = [
  "Build the release page",
  "Plan the campaign",
  "Coordinate the assets",
  "Update the website",
  "Send the launch email",
  "Brief the creatives",
  "Build the fan journey",
  "Track the deadlines",
  "Publish the campaign",
  "Review the results",
];

/** "Built for people with music to launch." */
export const audiences = [
  {
    title: "Independent artists",
    body: "Releasing music and building a professional project around it.",
    tone: "deep",
  },
  {
    title: "Artist managers",
    body: "Coordinating artists, releases and all the digital work that comes with them.",
    tone: "lav",
  },
  {
    title: "Independent labels",
    body: "Running release pipelines across multiple artists and campaigns.",
    tone: "dark",
  },
  {
    title: "Promoters & music businesses",
    body: "Launching shows, projects and music-led digital experiences.",
    tone: "violet",
  },
] as const;

/** Brand vision teaser. These are ambitions, not current products. */
export const visionWords = [
  "Artist Services",
  "Media",
  "Management",
  "Records",
  "Live",
  "Entertainment",
];

/** The small line of words above the hero headline. */
export const heroTags = ["Strategy", "Websites", "Communications", "Execution"];

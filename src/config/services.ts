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
    category: "Digital & Creative",
    headline: "Build something worth looking at.",
    body: "From artist websites to digital campaign experiences, we create the online assets that give music projects a proper home.",
    examples: [
      "Artist and music business websites",
      "Electronic press kits",
      "Campaign landing pages",
      "Release pages",
      "Fan signup experiences",
      "Digital creative assets",
    ],
    note: "Project-based. Scoped around what you need.",
    tone: "deep",
  },
  {
    number: "02",
    category: "Campaigns",
    headline: "Give the release a proper plan.",
    body: "Great releases deserve more than an announcement post. We help plan and coordinate creative digital campaigns around music, artists and events.",
    examples: [
      "Release campaign planning",
      "Campaign concepts",
      "Digital campaign strategy",
      "Creative direction",
      "Campaign timelines",
      "Audience communication planning",
      "Digital launch coordination",
    ],
    note: "Defined strategy and deliverables, not guaranteed outcomes.",
    tone: "lav",
  },
  {
    number: "03",
    category: "Digital Partnership",
    headline: "Your digital work.\nHandled.",
    body: "For artists and music teams that need ongoing support, SHOWGUY can become an external creative and digital partner.",
    examples: [
      "Ongoing digital project coordination",
      "Website and landing-page updates",
      "Campaign support",
      "Digital communications",
      "Asset coordination",
      "Email campaign management",
      "Monthly planning and reporting",
    ],
    note: "An agreed monthly scope, confirmed before work begins.",
    tone: "dark",
  },
];

export const processSteps = [
  {
    title: "Discover",
    body: "We get to know your project, your team and what you're trying to achieve.",
  },
  {
    title: "Plan",
    body: "We define the work, agree the deliverables and build a clear plan.",
  },
  {
    title: "Create",
    body: "We bring the project to life through creative direction, digital production and coordinated execution.",
  },
  {
    title: "Deliver",
    body: "You get the finished work, clear communication and support throughout.",
  },
];

/** Floating labels in "There's more to music than making music." */
export const musicWork = [
  "Build the website",
  "Launch the campaign",
  "Update the artist pages",
  "Plan the release",
  "Coordinate the assets",
  "Create the landing page",
  "Send the newsletter",
  "Track the results",
  "Brief the creatives",
  "Keep everything moving",
];

/** "Built for people who take music seriously." */
export const audiences = [
  {
    title: "Independent artists",
    body: "Building your career, releasing music and developing your identity.",
    tone: "deep",
  },
  {
    title: "Artist managers",
    body: "Managing artists and juggling the digital work behind their careers.",
    tone: "lav",
  },
  {
    title: "Independent labels",
    body: "Releasing music and coordinating creative projects across a roster.",
    tone: "dark",
  },
  {
    title: "Promoters & music businesses",
    body: "Creating experiences, promoting shows and building a stronger digital presence.",
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
export const heroTags = ["Websites", "Campaigns", "Creative", "Digital"];

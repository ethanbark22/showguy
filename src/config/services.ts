export type Service = {
  title: string;
  body: string;
  /** Card colour: all shades of the purple/dark palette. */
  tone: "deep" | "lav" | "dark" | "violet" | "paper" | "plum";
};

export const services: Service[] = [
  {
    title: "Content Strategy",
    body: "We plan what the artist should create, how it should be positioned and how content supports upcoming releases.",
    tone: "deep",
  },
  {
    title: "Short-Form Content",
    body: "We turn artist footage into TikToks, Instagram Reels and YouTube Shorts designed for attention and discovery.",
    tone: "lav",
  },
  {
    title: "Release Campaigns",
    body: "We create structured marketing plans before, during and after releases rather than letting songs disappear after release day.",
    tone: "dark",
  },
  {
    title: "Creator Outreach",
    body: "We identify relevant creators and opportunities to help music reach new audiences through legitimate outreach and collaborations.",
    tone: "violet",
  },
  {
    title: "Fan Growth",
    body: "We help convert passive viewers and listeners into followers, subscribers and genuine fans.",
    tone: "paper",
  },
  {
    title: "Analytics & Strategy",
    body: "We track what is working, explain why and adapt the following month's strategy accordingly.",
    tone: "plum",
  },
];

export const processSteps = [
  {
    title: "Strategy",
    body: "We understand the artist, audience, upcoming music and goals.",
  },
  {
    title: "Create",
    body: "The artist captures music, performances, behind-the-scenes footage and moments from their life and career. SHOWGUY turns that raw material into marketing assets.",
  },
  {
    title: "Distribute",
    body: "We package, schedule and deploy content around the artist's releases and wider story.",
  },
  {
    title: "Learn & Grow",
    body: "Every month we analyse the results and use what we learn to improve the next campaign.",
  },
];

/** Everything an artist deals with on top of the music itself. */
export const artistJobs = [
  "write music",
  "record music",
  "rehearse",
  "perform",
  "make TikToks. Constantly.",
  "edit videos",
  "understand algorithms",
  "plan releases",
  "contact creators",
  "analyse performance",
  "look after fans",
];

/** "SHOWGUY works best when…" split section. Respectful, not exclusive. */
export const goodFit = [
  "you're actively releasing music",
  "you're serious about building a career",
  "you're willing to capture raw content",
  "you're prepared to experiment",
  "you already invest time or money into your artist project",
  "you want to build genuine fans rather than vanity numbers",
];

export const notYet = [
  "music is purely a casual hobby",
  "you expect guaranteed viral results",
  "you want fake streams or followers",
  "you do not want to create any content",
  "you want someone else to build the entire artist career without your involvement",
];

/** The monthly cycle. `who` says whether the artist or SHOWGUY does the step. */
export const monthlyFlow: { step: string; who: "You" | "SHOWGUY" }[] = [
  { step: "Plan", who: "SHOWGUY" },
  { step: "Create", who: "You" },
  { step: "Edit", who: "SHOWGUY" },
  { step: "Publish", who: "SHOWGUY" },
  { step: "Outreach", who: "SHOWGUY" },
  { step: "Analyse", who: "SHOWGUY" },
  { step: "Improve", who: "SHOWGUY" },
];

/** Brand vision teaser. These are ambitions, not current products. */
export const visionWords = [
  "Artist Services",
  "Media",
  "Management",
  "Records",
  "Live",
  "Entertainment",
];

export const heroTags = ["Artist growth", "Content", "Releases", "Fans"];

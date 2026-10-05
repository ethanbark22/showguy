export type Service = {
  title: string;
  body: string;
  /** Card colour. One of: sun, flame, lilac, mint, paper */
  tone: "sun" | "flame" | "lilac" | "mint" | "paper";
};

export const services: Service[] = [
  {
    title: "Content Strategy",
    body: "We plan what the artist should create, how it should be positioned and how content supports upcoming releases.",
    tone: "sun",
  },
  {
    title: "Short-Form Content",
    body: "We turn artist footage into TikToks, Instagram Reels and YouTube Shorts designed for attention and discovery.",
    tone: "lilac",
  },
  {
    title: "Release Campaigns",
    body: "We create structured marketing plans before, during and after releases rather than letting songs disappear after release day.",
    tone: "flame",
  },
  {
    title: "Creator Outreach",
    body: "We identify relevant creators and opportunities to help music reach new audiences through legitimate outreach and collaborations.",
    tone: "mint",
  },
  {
    title: "Fan Growth",
    body: "We help convert passive viewers and listeners into followers, subscribers and genuine fans.",
    tone: "paper",
  },
  {
    title: "Analytics & Strategy",
    body: "We track what is working, explain why and adapt the following month's strategy accordingly.",
    tone: "sun",
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

export const idealArtist = [
  "release music consistently",
  "are serious about building a career",
  "are prepared to create content",
  "already invest in their music",
  "perform live or are actively developing their audience",
  "are willing to experiment",
  "want to build real fans rather than buy meaningless numbers",
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

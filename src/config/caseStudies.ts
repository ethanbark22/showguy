export type CaseStudy = {
  slug: string;
  artist: string;
  campaign: string;
  challenge: string;
  strategy: string;
  /** e.g. { label: "Instagram followers", value: "+1,200", note: "over 3 months" } */
  metrics: { label: string; value: string; note?: string }[];
  /** Optional headline growth figure, e.g. "42%" */
  growthPercent?: string;
  /** Image paths, e.g. "/case-studies/artist-name/1.jpg" */
  contentExamples?: { src: string; alt: string }[];
  testimonial?: { quote: string; name: string; role?: string };
  /** NEVER set this on a real case study. See DEV_SAMPLE_CASE_STUDIES below. */
  isSample?: boolean;
};

/**
 * REAL CASE STUDIES. This is empty on purpose, because SHOWGUY does not have
 * any yet. When you have a real result (with the artist's permission), add it
 * here. See the README ("How to add case studies later").
 */
export const caseStudies: CaseStudy[] = [];

/**
 * DEVELOPMENT SAMPLE DATA. Fake, only to preview the layout while building.
 * It is never shown in production, and only appears locally if you set
 * NEXT_PUBLIC_SHOW_SAMPLE_CASE_STUDIES=true. Every card is stamped "SAMPLE".
 */
export const DEV_SAMPLE_CASE_STUDIES: CaseStudy[] = [
  {
    slug: "sample",
    artist: "Sample Artist",
    campaign: "Sample single campaign",
    challenge: "Placeholder text describing the artist's problem.",
    strategy: "Placeholder text describing what SHOWGUY did.",
    metrics: [
      { label: "Metric one", value: "000" },
      { label: "Metric two", value: "000" },
    ],
    growthPercent: "00%",
    testimonial: { quote: "Placeholder quote.", name: "Sample Artist" },
    isSample: true,
  },
];

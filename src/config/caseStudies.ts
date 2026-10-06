export type CaseStudyMetric = {
  label: string;
  /** e.g. "1,200" */
  before?: string;
  /** e.g. "3,400" */
  after?: string;
  /** e.g. "+183%". Only ever a real, measured figure. */
  change?: string;
  note?: string;
};

export type CaseStudy = {
  slug: string;
  artist: string;
  /** Photo of the artist: { src: "/case-studies/name/artist.jpg", alt: "…" } */
  artistImage?: { src: string; alt: string };
  campaign: string;
  /** e.g. "March – May 2027" */
  period?: string;
  problem: string;
  strategy: string;
  /** Before / after numbers and the change. */
  metrics: CaseStudyMetric[];
  /** The posts that did best. */
  topContent?: { title: string; stat?: string; image?: { src: string; alt: string } }[];
  testimonial?: { quote: string; name: string; role?: string };
  /**
   * REQUIRED. A case study is only shown on the site when this is true,
   * meaning the artist has agreed (in writing) to it being published.
   */
  artistPermission: boolean;
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
    period: "Sample period",
    problem: "Placeholder text describing the artist's problem.",
    strategy: "Placeholder text describing what SHOWGUY did.",
    metrics: [
      { label: "Metric one", before: "000", after: "000", change: "00%" },
      { label: "Metric two", before: "000", after: "000", change: "00%" },
    ],
    topContent: [{ title: "Placeholder top post", stat: "000 views" }],
    testimonial: { quote: "Placeholder quote.", name: "Sample Artist" },
    artistPermission: true,
    isSample: true,
  },
];

export type CaseStudyOutput = {
  label: string;
  /** e.g. "1,200". Only ever a real, measured figure. */
  value?: string;
  /** Optional before / after, e.g. before "3,400" after "5,100", change "+50%". */
  before?: string;
  after?: string;
  change?: string;
  note?: string;
};

export type CaseStudy = {
  slug: string;
  /** The artist, label or business the work was for. */
  client: string;
  /** Photo or logo of the client: { src: "/case-studies/name/client.jpg", alt: "…" } */
  clientImage?: { src: string; alt: string };
  /** e.g. "Release campaign", "Artist website", "Digital launch", "Ongoing partnership" */
  projectType: string;
  /** e.g. "March – May 2027" */
  timeline?: string;
  challenge: string;
  /** How we approached the campaign or project. */
  approach: string;
  /** What was delivered, e.g. ["Release website", "Launch email series"]. */
  deliverables: string[];
  /** Screenshots of websites or campaign pages: { src: "/case-studies/name/site.jpg", alt: "…" } */
  screenshots?: { src: string; alt: string }[];
  /** Measurable outputs (only real, measured ones). */
  outputs?: CaseStudyOutput[];
  testimonial?: { quote: string; name: string; role?: string };
  /**
   * REQUIRED. A case study is only shown on the site when this is true,
   * meaning the client has agreed (in writing) to it being published.
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
    client: "Sample Client",
    projectType: "Sample release campaign",
    timeline: "Sample timeline",
    challenge: "Placeholder text describing the challenge.",
    approach: "Placeholder text describing what SHOWGUY did.",
    deliverables: ["Placeholder deliverable one", "Placeholder deliverable two"],
    outputs: [{ label: "Placeholder output", before: "000", after: "000", change: "00%" }],
    testimonial: { quote: "Placeholder quote.", name: "Sample Client" },
    artistPermission: true,
    isSample: true,
  },
];

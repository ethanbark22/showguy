import {
  caseStudies,
  DEV_SAMPLE_CASE_STUDIES,
  type CaseStudy,
} from "@/config/caseStudies";

/**
 * The only way pages should read case studies. Samples are dropped in
 * production no matter what, so fake numbers can never reach the live site.
 */
export function getCaseStudies(): CaseStudy[] {
  // A real case study only appears with the artist's permission flag set
  const real = caseStudies.filter((c) => !c.isSample && c.artistPermission === true);
  const showSamples =
    process.env.NODE_ENV !== "production" &&
    process.env.NEXT_PUBLIC_SHOW_SAMPLE_CASE_STUDIES === "true";
  return showSamples ? [...real, ...DEV_SAMPLE_CASE_STUDIES] : real;
}

import { track as vercelTrack } from "@vercel/analytics";
import { analytics } from "@/config/analytics";

/**
 * Sends a simple event (e.g. "faq_opened") to whichever analytics tools are on.
 * Google, Meta and TikTok only exist on the page after a visitor accepts
 * cookies, so nothing is sent for people who decline. Never put personal
 * details (names, emails, form answers) in `props`.
 */
type Props = Record<string, string | number | boolean>;
type Win = {
  gtag?: (...a: unknown[]) => void;
  fbq?: (...a: unknown[]) => void;
  ttq?: { track: (...a: unknown[]) => void };
};

export function track(name: string, props?: Props) {
  if (typeof window === "undefined") return;
  const w = window as unknown as Win;
  try {
    if (analytics.vercel) vercelTrack(name, props);
  } catch {}
  try {
    w.gtag?.("event", name, props);
    w.fbq?.("trackCustom", name, props);
    w.ttq?.track(name, props);
  } catch {}
}

/** Known events, so names stay consistent. */
export const events = {
  applicationStarted: "application_started",
  applicationSubmitted: "application_submitted",
  workWithUsClicked: "work_with_us_clicked",
  faqOpened: "faq_opened",
  journalArticleViewed: "journal_article_viewed",
} as const;

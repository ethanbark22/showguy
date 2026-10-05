/**
 * Core business details. Edit this file to change the site name, contact
 * details and social links everywhere on the site.
 *
 * Leave a value as "" and it simply won't be shown. Nothing here is invented:
 * add the real details when you have them.
 */

const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const site = {
  name: "SHOWGUY",
  tagline: "Digital growth for independent artists",
  title: "SHOWGUY — Digital Growth for Independent Artists",
  description:
    "SHOWGUY is the digital team behind ambitious independent artists, helping with content, releases, audience growth and fan development.",
  locale: "en_GB",

  /**
   * The public web address. Set NEXT_PUBLIC_SITE_URL once you have your domain
   * (e.g. https://yourdomain.com). On Vercel it falls back to the project URL.
   */
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000")
  ).replace(/\/$/, ""),

  /** The general SHOWGUY email address. e.g. "hello@yourdomain.com" */
  email: "",

  /** Optional: a booking link (Calendly, Cal.com…) shown after someone applies. */
  bookingUrl: "",
} as const;

export type SocialLink = { label: string; href: string };

/** Paste full profile links between the quotes, e.g. "https://www.instagram.com/yourname". */
export const socialLinks: SocialLink[] = [
  { label: "Instagram", href: "" },
  { label: "TikTok", href: "" },
  { label: "YouTube", href: "" },
];

/** Only the socials that have a link filled in. */
export const activeSocials = () => socialLinks.filter((s) => s.href);

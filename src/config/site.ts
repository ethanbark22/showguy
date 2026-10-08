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
  tagline: "Digital campaigns for music",
  title: "SHOWGUY — Digital Campaigns for Music",
  description:
    "SHOWGUY helps artists, managers and independent labels plan, build and execute the digital side of releases, campaigns and music projects.",
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
  email: "hello@showguy.co.uk",

  /** Optional: a booking link (Calendly, Cal.com…) shown after someone applies. */
  bookingUrl: "",
} as const;

export type SocialLink = { label: string; href: string };

/** Paste full profile links between the quotes, e.g. "https://www.instagram.com/yourname". */
export const socialLinks: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/showguyhq" },
  { label: "TikTok", href: "" },
  { label: "YouTube", href: "" },
];

/** Only the socials that have a link filled in. */
export const activeSocials = () => socialLinks.filter((s) => s.href);

/**
 * Company details for the footer. The footer only shows this block once
 * `number` is filled in, so nothing half-finished ever appears on the live site.
 */
export const company = {
  name: "SHOWGUY LTD",
  /** The Companies House number. Leave "" until you have it. */
  number: "16169255",
  registeredIn: "England & Wales",
} as const;

/** Footer lines for the company, or an empty list if no company number is set yet. */
export function companyLines(): string[] {
  if (!company.number) return [];
  return [company.name, `Company No. ${company.number}`, `Registered in ${company.registeredIn}`];
}

/**
 * The founder section. Put the photo at public/brand/founder.jpg (portrait,
 * about 4:5 works best). Until it exists, a tidy placeholder shows instead.
 */
export const founder = {
  name: "Ethan",
  role: "Founder, SHOWGUY",
  photo: "/brand/founder.jpg",
  alt: "Ethan, founder of SHOWGUY",
  /** Keeps faces in frame when the photo is cropped. "50% 20%" = centred, a little above the middle. */
  objectPosition: "50% 20%",
} as const;

/**
 * LEGAL DETAILS used by the Privacy Policy, Cookie Policy and Website Terms.
 * Anything left as "" is simply not shown to visitors (no placeholders ever appear).
 */
export const legal = {
  /** Registered office address, e.g. "1 Example Street, Leeds, LS1 1AA". Shown only when filled in. */
  registeredOffice: "",
  /** Where privacy requests go. If empty, the general email in `site.email` is used. */
  privacyEmail: "",
  /** How long general enquiries are kept, e.g. "12 months". Left empty until you approve a period. */
  enquiryRetentionPeriod: "",
  /** "Last updated" dates shown at the bottom of each legal page. Update when you change the wording. */
  privacyLastUpdated: "8 October 2026",
  cookieLastUpdated: "8 October 2026",
  termsLastUpdated: "8 October 2026",
} as const;

/** The email to show for privacy questions (falls back to the general email). */
export const privacyContactEmail = () => legal.privacyEmail || site.email;

/**
 * Companies SHOWGUY actually uses that handle personal information. Only those
 * with `inUse: true` are named on the Privacy Policy. Switch one on when you start using it.
 */
export const serviceProviders = [
  { name: "Vercel", does: "website hosting and privacy-friendly website analytics", inUse: true },
  { name: "Resend", does: "delivering enquiry notifications and emails", inUse: true },
  { name: "Google Workspace", does: "email and file storage", inUse: false },
  { name: "Brevo", does: "email communications", inUse: false },
  { name: "Stripe", does: "payment processing", inUse: false },
] as const;

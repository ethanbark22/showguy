/**
 * ANALYTICS SETTINGS
 *
 * Nothing here is required to launch. Add an ID as an environment variable
 * (in Vercel: Project → Settings → Environment Variables) and that tool
 * switches on. Google, Meta and TikTok only load AFTER a visitor accepts the
 * cookie banner (UK PECR/GDPR). Vercel Analytics is cookieless, so it needs no banner.
 */
export const analytics = {
  /** Vercel Analytics. On by default; set NEXT_PUBLIC_VERCEL_ANALYTICS=false to turn off. */
  vercel: process.env.NEXT_PUBLIC_VERCEL_ANALYTICS !== "false",
  /** Google Analytics 4, looks like "G-XXXXXXXXXX" */
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "",
  /** Meta (Facebook/Instagram) Pixel ID, digits only */
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
  /** TikTok Pixel ID */
  tiktokPixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID ?? "",
};

/** True when any cookie-based tool is configured, so the banner should show. */
export const needsConsent = Boolean(
  analytics.googleAnalyticsId ||
    analytics.metaPixelId ||
    analytics.tiktokPixelId,
);

/** Which consent categories apply right now (a category only appears in the banner if a tool in it is switched on). */
export const consentCategories = {
  analytics: Boolean(analytics.googleAnalyticsId),
  marketing: Boolean(analytics.metaPixelId || analytics.tiktokPixelId),
};

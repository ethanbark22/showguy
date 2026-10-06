/**
 * Where the brand assets live and how they are described.
 * Drop your final files into /public/brand with the SAME file names and they
 * appear everywhere. See public/brand/README.md.
 *
 * If you replace a mascot image with a different shape, update its width/height here.
 */
export const brand = {
  logo: {
    /** Dark-coloured logo, for LIGHT backgrounds (the site is mostly dark now, so this is rarely used). */
    onLight: "/brand/logo.svg",
    /** Light-coloured logo, for DARK backgrounds (used in the header and footer). */
    onDark: "/brand/logo-dark.svg",
    width: 1380, // the logo's exact proportions (1380 × 234); update if you ever replace it with a different shape
    height: 234,
    alt: "SHOWGUY",
  },
  /**
   * The mascot poses (transparent PNGs in /public/brand). Width/height are each
   * image's real size, so nothing jumps while it loads.
   *   mic   – full body, microphone, hand reaching out
   *   wave  – full body, waving
   *   reach – chest-up version of "mic"
   *   point – chest-up, pointing at you
   */
  mascot: {
    mic: { src: "/brand/mascot-mic.png", width: 589, height: 1100 },
    wave: { src: "/brand/mascot-wave.png", width: 669, height: 1100 },
    reach: { src: "/brand/mascot-reach.png", width: 854, height: 900 },
    point: { src: "/brand/mascot-point.png", width: 799, height: 900 },
    alt: "The SHOWGUY mascot: a smiling, bearded man in a star-logo cap, black sleeveless T-shirt and jeans, holding a microphone",
  },
  socialCard: "/brand/social-card.jpg",
  favicon: "/brand/favicon.svg",
} as const;

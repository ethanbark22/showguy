/**
 * Where the brand assets live and how they are described.
 * Drop your final files into /public/brand with the SAME file names and they
 * appear everywhere. See public/brand/README.md.
 *
 * If your final mascot images are a different shape, update width/height here.
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
  mascot: {
    default: "/brand/mascot.png",
    wave: "/brand/mascot-wave.png",
    width: 800,
    height: 1000,
    alt: "The SHOWGUY mascot: a smiling, bearded cartoon man in a baseball cap, black sleeveless T-shirt and jeans",
  },
  socialCard: "/brand/social-card.jpg",
  favicon: "/brand/favicon.svg",
} as const;

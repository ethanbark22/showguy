/**
 * Where the brand assets live and how they are described.
 * Drop your final files into /public/brand with the SAME file names and they
 * appear everywhere. See public/brand/README.md.
 *
 * If your final mascot images are a different shape, update width/height here.
 */
export const brand = {
  logo: {
    /** Dark logo, used on light backgrounds (the header). */
    onLight: "/brand/logo.svg",
    /** Light logo, used on dark backgrounds (the footer). */
    onDark: "/brand/logo-dark.svg",
    width: 220,
    height: 48,
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

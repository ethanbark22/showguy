# Brand assets: put your final files here

Replace each placeholder with the real file, **keeping the same file name**. The whole site updates automatically.

| File | What it is | Suggested size |
|---|---|---|
| `logo.svg` | Logo coloured for **light** backgrounds (rarely needed: the site is mostly dark). **Final logo installed.** | SVG |
| `logo-dark.svg` | White logo for **dark** backgrounds (**used in the header and footer**). **Final logo installed.** | SVG |
| `mascot.png` | Main mascot (hero, About) | PNG with transparent background, 800 × 1000 |
| `mascot-wave.png` | Waving / pointing mascot (CTA, problem section, apply page) | PNG, transparent, 800 × 1000 |
| `favicon.svg` | Browser tab icon | SVG, square |
| `founder.jpg` | Founder portrait for the homepage About section (a tidy placeholder shows until it exists) | JPG, portrait ~4:5, e.g. 1200 × 1500 |
| `social-card.jpg` | Picture shown when the site is shared on social media | JPG, 1200 × 630 |

Convert any text in your logo to outlines before exporting, so it can never be clipped or change font on someone else's device.

The mascot is placed on purple discs and panels around the site, so a transparent background matters. If your mascot images are a different shape, change `width` and `height` in `src/config/brand.ts`.
To add more mascot poses later, add the file here and a new entry in `brand.ts`.

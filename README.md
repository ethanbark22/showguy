# SHOWGUY website

The marketing site for SHOWGUY: a one-page homepage, an application form (`/apply`), a contact page (`/contact`) and placeholder legal pages. Built with Next.js, TypeScript and Tailwind CSS, ready for Vercel. No database, no logins.

> Short on time? You only ever need to edit files in **`src/config/`** and **`public/brand/`**. Everything else is layout.

---

## 1. Install

You need [Node.js](https://nodejs.org) 20 or newer. Then, in this folder:

```bash
npm install
```

## 2. Run it on your computer

```bash
npm run dev
```

Open http://localhost:3000. Changes you save appear instantly. Stop it with `Ctrl+C`.

Before you publish a change, run these three checks. All should finish without errors:

```bash
npm run lint
npm run typecheck
npm run build
```

## 3. Edit the website copy

| What you want to change | File |
|---|---|
| Hero text, section headlines, "Why SHOWGUY?" | `src/components/Hero.tsx` and `src/components/sections/*.tsx` (each section is one file; the words are in plain sight) |
| The six services, the four steps, the "who we're looking for" list, the vision words | `src/config/services.ts` |
| Menu links | `src/config/navigation.ts` |
| Site name, page description (Google result text) | `src/config/site.ts` |

Tip: ask Claude Code, "change the hero text to …", and it will find the right file.

**Colours:** the whole palette is defined once at the top of `src/app/globals.css` (near-black, dark purple, purple, light purple, off-white, plus the SHOWGUY star yellow, used sparingly). Change a hex value there and the whole site follows.

Copy rules we've followed: British English, no fake clients, testimonials, results or press. Please keep it that way until you have the real thing.

## 4. Change the pricing

Open **`src/config/pricing.ts`**. Change `price`, `term` or the `includes` list. The homepage offer card updates. The application form's budget dropdown options are in the same file.

## 5. Add your email and social links

Open **`src/config/site.ts`**. Paste your real details between the quotes (`email`, and the Instagram, TikTok and YouTube links). Anything left as `""` is hidden, so nothing broken or invented shows. They appear in the footer and on `/contact`. You can also add a Calendly/Cal.com link as `bookingUrl`, shown after someone applies.

## 6. Where to put the logo and mascot

Put the final files in **`public/brand/`**, using exactly these names (they currently hold placeholders):

| File | Notes |
|---|---|
| `logo.svg` | Logo for light backgrounds (header) |
| `logo-dark.svg` | Logo for dark backgrounds (footer) |
| `mascot.png` | Main mascot, transparent background, 800 × 1000 |
| `mascot-wave.png` | Waving mascot, transparent background, 800 × 1000 |
| `favicon.svg` | Browser tab icon |
| `social-card.jpg` | Share image, 1200 × 630 |

Different mascot proportions? Update `width` and `height` in `src/config/brand.ts`. See also `public/brand/README.md`.

## 7. How the application form works

- Questions are defined once in `src/lib/forms.ts`. Add, remove or reword a question there, and both the page and the checks update.
- The same file controls how the page is laid out: each section's number, title and one-line intro; which questions sit side by side (`full: true` gives a question the whole row); and the helper text under each label. Social links accept a full URL or just a handle (`@artistname`), and are tidied into full links before they reach you.
- The form is checked in the browser as people fill it in (so mistakes show straight away) and again on the server. The left-hand column stays in view on a desktop while the form scrolls. Its text lives in `src/components/ApplySidebar.tsx`.
- When someone presses **Send application**, the answers go to a server function (`src/app/actions.ts`) which checks them again (never trusting the browser), then passes them on (`src/lib/deliver.ts`).
- Spam protection: a hidden trap field real people never fill in, a minimum time on the page, a limit of 5 sends per 10 minutes per visitor, and length limits. This stops most basic bots. If spam still gets through, add Cloudflare Turnstile (free) or Vercel BotID later.
- **Running locally with nothing configured:** the form works and prints the answers in your terminal, so you can test.
- **On the live site with nothing configured:** the form shows an error rather than pretending to send. You must connect a destination (next section) before launch.

## 8. Environment variables

Settings that must stay secret live in "environment variables", not in the code. Locally, copy `.env.example` to `.env.local` and fill it in. On Vercel, add them under **Project → Settings → Environment Variables**. Nothing here is committed to git.

| Variable | What it does |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Your real address, e.g. `https://yourdomain.com` (used for sitemap, sharing links) |
| `FORM_WEBHOOK_URL` | **Option A for forms.** Receives each submission as JSON. Works with Google Sheets (via Apps Script), Zapier, Make, a CRM… |
| `RESEND_API_KEY`, `FORM_TO_EMAIL`, `FORM_FROM_EMAIL` | **Option B for forms.** Emails each submission to you via [Resend](https://resend.com). The "from" address must be on a domain you've verified in Resend |
| `NEXT_PUBLIC_VERCEL_ANALYTICS` | `false` turns off Vercel Analytics (on by default) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics, e.g. `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel |
| `NEXT_PUBLIC_TIKTOK_PIXEL_ID` | TikTok Pixel |
| `NEXT_PUBLIC_SHOW_SAMPLE_CASE_STUDIES` | Local testing only (see section 12) |

Use either form option or both. The simplest to start: Resend. Supabase can be added later by pointing the webhook at a Supabase Edge Function.

## 9. Deploy to Vercel

1. Push this repo to GitHub (it already is).
2. Go to [vercel.com/new](https://vercel.com/new), choose **Import** next to the `showguy` repo, and click **Deploy**. The defaults are right.
3. In **Settings → Environment Variables** add the form variables from section 8, then **Deployments → ⋯ → Redeploy**.
4. Submit a test application on the live site and check it arrives.

## 10. Connect a custom domain

1. In Vercel: your project → **Settings → Domains → Add**, type your domain.
2. Vercel shows the DNS records to add. Add them where you bought the domain (usually a "DNS" or "Manage domain" page).
3. Wait a few minutes to a few hours. Vercel shows a green tick when it works.
4. Set `NEXT_PUBLIC_SITE_URL` to the new address and redeploy.

## 11. Add analytics later

All settings are in `src/config/analytics.ts`. To switch a tool on, just add its ID as an environment variable (section 8) and redeploy.

- **Vercel Analytics** is on by default; also turn it on in Vercel (Project → Analytics). It doesn't use cookies.
- **Google Analytics, Meta Pixel, TikTok Pixel** use cookies. As soon as any one is configured, a cookie banner appears automatically and those tools load **only after a visitor clicks Accept**, as UK law (PECR/GDPR) expects. A "Cookie settings" link appears in the footer.
- Before turning them on, update the Cookie Policy and Privacy Policy pages.

## 12. Add case studies later

Open **`src/config/caseStudies.ts`** and add an entry to the `caseStudies` list (the field names show what to fill in: artist, campaign, challenge, strategy, metrics, growth %, images, testimonial). The "Results" section then switches from the "we're building our first case studies" message to your real cards automatically.

Only add real results, with the artist's permission. Put any images in `public/case-studies/`.

There is also fake sample data in the same file, stamped "Sample · not real". It only shows if you run locally with `NEXT_PUBLIC_SHOW_SAMPLE_CASE_STUDIES=true`, and the code blocks it in production, so it can never appear on the live site.

---

## Before launch checklist

- [ ] Final logo, mascot, favicon and social card in `public/brand/`
- [ ] Email and social links in `src/config/site.ts`
- [ ] Form destination set (section 8) and tested on the live site
- [ ] Real Privacy Policy, Terms and Cookie Policy copy (pages in `src/app/privacy`, `terms`, `cookies`). Then remove `noindex: true` from each page and add them to `src/app/sitemap.ts`
- [ ] Custom domain connected and `NEXT_PUBLIC_SITE_URL` set

## Growing the site later

Each new area is just a new folder in `src/app/`, with its own `page.tsx` (e.g. `src/app/journal/page.tsx`), added to `src/config/navigation.ts` and `src/app/sitemap.ts`. Planned ideas: `/artists`, `/media`, `/sessions`, `/management`, `/records`, `/live`, `/shop`, `/journal`, `/careers`. For a blog or journal later, MDX files or a headless CMS plug in without changing anything existing.

## Project map

```
public/brand/        logo, mascot, favicon, social card
src/config/          ← the files you edit: site, navigation, services, pricing, analytics, case studies, brand
src/components/      reusable pieces (Header, Hero, ServiceCard, PricingCard, forms…)
src/components/sections/   the homepage sections, one file each
src/app/             pages: /, /apply, /contact, legal, sitemap, robots
src/lib/             form definitions, delivery, metadata helpers
```

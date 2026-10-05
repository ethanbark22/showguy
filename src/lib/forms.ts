import { z } from "zod";
import { budgetOptions } from "@/config/pricing";

/**
 * Form fields are described once, here. The page renders them and the server
 * validates them from the same list, so they can't drift apart.
 * To add or remove a question, edit the lists below.
 */
export type FieldKind = "text" | "email" | "tel" | "url" | "textarea" | "select";

export type Field = {
  name: string;
  label: string;
  kind: FieldKind;
  required?: boolean;
  hint?: string;
  placeholder?: string;
  options?: string[];
  /** Max characters. Defaults: 200 for short fields, 2000 for textareas. */
  max?: number;
  autoComplete?: string;
};

export type FieldGroup = { title: string; fields: Field[] };

const yesNo = ["Yes", "No"];

export const applicationGroups: FieldGroup[] = [
  {
    title: "About you",
    fields: [
      { name: "artistName", label: "Artist / band name", kind: "text", required: true, autoComplete: "organization" },
      { name: "contactName", label: "Contact name", kind: "text", required: true, autoComplete: "name" },
      { name: "email", label: "Email", kind: "email", required: true, autoComplete: "email" },
      { name: "phone", label: "Phone / WhatsApp", kind: "tel", hint: "Optional", autoComplete: "tel" },
      { name: "location", label: "Location", kind: "text", required: true, placeholder: "Town or city", autoComplete: "address-level2" },
    ],
  },
  {
    title: "Your music online",
    fields: [
      { name: "instagram", label: "Instagram URL", kind: "url", placeholder: "instagram.com/…" },
      { name: "tiktok", label: "TikTok URL", kind: "url", placeholder: "tiktok.com/@…" },
      { name: "spotify", label: "Spotify URL", kind: "url", placeholder: "open.spotify.com/artist/…" },
      { name: "youtube", label: "YouTube URL", kind: "url", placeholder: "youtube.com/@…" },
      { name: "website", label: "Website", kind: "url", hint: "Optional" },
      { name: "genre", label: "Genre", kind: "text", required: true },
      { name: "monthlyListeners", label: "Spotify monthly listeners", kind: "text", hint: "Approximate is fine", placeholder: "e.g. 1,500" },
      { name: "largestFollowing", label: "Largest social following", kind: "text", hint: "Which platform, and roughly how many", placeholder: "e.g. TikTok, 8,000" },
      { name: "nextRelease", label: "Next release date", kind: "text", hint: "A date, or “not sure yet”" },
    ],
  },
  {
    title: "Where you are now",
    fields: [
      { name: "description", label: "Tell us about the artist", kind: "textarea", required: true, hint: "A few sentences. Who are you and what do you sound like?" },
      { name: "releaseFrequency", label: "How often do you release music?", kind: "select", required: true, options: ["Every month or so", "Every 2–3 months", "Every 4–6 months", "Once or twice a year", "Not yet released anything"] },
      { name: "captureVideo", label: "Can you regularly capture raw video content?", kind: "select", required: true, options: ["Yes, regularly", "Sometimes", "Not yet, but I could"] },
      { name: "management", label: "Do you currently have management?", kind: "select", required: true, options: yesNo },
      { name: "label", label: "Do you currently work with a label?", kind: "select", required: true, options: yesNo },
      { name: "budget", label: "Approximate monthly marketing budget", kind: "select", required: true, options: budgetOptions },
    ],
  },
  {
    title: "Where you want to go",
    fields: [
      { name: "goals", label: "What are you trying to achieve over the next 6 months?", kind: "textarea", required: true },
      { name: "biggestProblem", label: "What is currently your biggest marketing problem?", kind: "textarea", required: true },
      { name: "why", label: "Why do you want to work with SHOWGUY?", kind: "textarea", required: true },
    ],
  },
];

export const contactFields: Field[] = [
  { name: "name", label: "Name", kind: "text", required: true, autoComplete: "name" },
  { name: "email", label: "Email", kind: "email", required: true, autoComplete: "email" },
  { name: "company", label: "Artist / company", kind: "text", autoComplete: "organization", hint: "Optional" },
  { name: "reason", label: "Reason for contacting", kind: "select", required: true, options: ["Working together", "General question", "Press or media", "Something else"] },
  { name: "message", label: "Message", kind: "textarea", required: true },
];

/** Adds https:// if someone types "instagram.com/me". */
export function normaliseUrl(value: string): string {
  const v = value.trim();
  if (!v) return "";
  return /^https?:\/\//i.test(v) ? v : `https://${v}`;
}

function isValidUrl(v: string): boolean {
  try {
    const u = new URL(v);
    return /^https?:$/.test(u.protocol) && u.hostname.includes(".");
  } catch {
    return false;
  }
}

function fieldSchema(f: Field): z.ZodType<string> {
  const max = f.max ?? (f.kind === "textarea" ? 2000 : 200);
  const tooLong = `Please keep this under ${max} characters.`;
  const missing = "This one is needed.";

  if (f.kind === "select") {
    const options = f.options ?? [];
    const base = z.string().trim().refine((v) => !v || options.includes(v), "Please choose one of the options.");
    return f.required ? base.refine((v) => v !== "", missing) : base;
  }
  if (f.kind === "email") {
    const email = z.string().trim().max(max, tooLong).refine((v) => z.email().safeParse(v).success, "That doesn't look like an email address.");
    return f.required ? email : z.string().trim().max(max, tooLong).refine((v) => !v || z.email().safeParse(v).success, "That doesn't look like an email address.");
  }
  if (f.kind === "url") {
    return z
      .string()
      .max(max, tooLong)
      .transform(normaliseUrl)
      .refine((v) => !v || isValidUrl(v), "Please paste the full link, e.g. instagram.com/yourname");
  }
  const text = z.string().trim().max(max, tooLong);
  return f.required ? text.min(1, missing) : text;
}

function buildSchema(fields: Field[]) {
  return z.object(Object.fromEntries(fields.map((f) => [f.name, fieldSchema(f)])));
}

export const applicationFields = applicationGroups.flatMap((g) => g.fields);
export const applicationSchema = buildSchema(applicationFields).refine(
  (d) => ["instagram", "tiktok", "spotify", "youtube"].some((k) => (d as Record<string, string>)[k]),
  { message: "Please add at least one link to your music or socials.", path: ["spotify"] },
);
export const contactSchema = buildSchema(contactFields);

/** Result passed back from the server to the form on screen. */
export type FormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: Record<string, string> };

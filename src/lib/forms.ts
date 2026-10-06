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
  /** Short helper text, shown between the label and the box. */
  hint?: string;
  placeholder?: string;
  options?: string[];
  /** Max characters. Defaults: 200 for short fields, 2000 for textareas. */
  max?: number;
  autoComplete?: string;
  /** Takes the full row. Long answers (textareas) always do. Otherwise fields sit two to a row. */
  full?: boolean;
  /** Visible height of a long answer, in lines. */
  rows?: number;
  /** For social links: lets people type just a handle, e.g. "@artistname". */
  handleBase?: string;
  /** Example link shown in the error message for link fields. */
  example?: string;
};

export type FieldGroup = {
  /** Shown as the section heading. Leave empty for a form with one plain section. */
  title: string;
  fields: Field[];
  /** "01", "02"… shown beside the heading. */
  number?: string;
  /** One-line explanation under the heading. */
  intro?: string;
  /** Short name for the progress indicator. */
  short?: string;
};

const yesNo = ["Yes", "No"];

export const applicationGroups: FieldGroup[] = [
  {
    number: "01",
    title: "About you",
    short: "About",
    intro: "The basics, so we know who we're talking to.",
    fields: [
      { name: "artistName", label: "Artist / band name", kind: "text", required: true, autoComplete: "organization" },
      { name: "contactName", label: "Contact name", kind: "text", required: true, autoComplete: "name" },
      { name: "email", label: "Email", kind: "email", required: true, autoComplete: "email" },
      { name: "phone", label: "Phone / WhatsApp", kind: "tel", hint: "Optional", autoComplete: "tel" },
      { name: "location", label: "Location", kind: "text", required: true, placeholder: "Town or city", autoComplete: "address-level2", full: true },
    ],
  },
  {
    number: "02",
    title: "Your music online",
    short: "Music",
    intro: "Add at least one link so we can hear you. A handle like @artistname is fine.",
    fields: [
      { name: "instagram", label: "Instagram", kind: "url", placeholder: "@artistname", handleBase: "https://www.instagram.com/" },
      { name: "tiktok", label: "TikTok", kind: "url", placeholder: "@artistname", handleBase: "https://www.tiktok.com/@" },
      { name: "spotify", label: "Spotify", kind: "url", placeholder: "open.spotify.com/artist/…", example: "open.spotify.com/artist/…" },
      { name: "youtube", label: "YouTube", kind: "url", placeholder: "@artistname", handleBase: "https://www.youtube.com/@" },
      { name: "website", label: "Website", kind: "url", hint: "Optional", placeholder: "yourwebsite.com", autoComplete: "url" },
      { name: "genre", label: "Genre", kind: "text", required: true, placeholder: "e.g. Alternative rock" },
      { name: "monthlyListeners", label: "Spotify monthly listeners", kind: "text", hint: "Approximate is completely fine.", placeholder: "e.g. 1,500" },
      { name: "largestFollowing", label: "Largest social following", kind: "text", hint: "Which platform, and roughly how many.", placeholder: "e.g. TikTok, 8,000" },
      { name: "nextRelease", label: "Next release date", kind: "text", hint: "A rough date is fine, or say you're not sure yet.", placeholder: "e.g. 18/11/2026 or Not sure yet", full: true },
    ],
  },
  {
    number: "03",
    title: "Where you are now",
    short: "Now",
    intro: "A quick picture of your set-up.",
    fields: [
      { name: "description", label: "Tell us about the artist", kind: "textarea", required: true, rows: 4, hint: "Tell us who you are, what you sound like and what makes the project interesting." },
      { name: "releaseFrequency", label: "How often do you release music?", kind: "select", required: true, options: ["Every month or so", "Every 2–3 months", "Every 4–6 months", "Once or twice a year", "Not yet released anything"] },
      { name: "captureVideo", label: "Can you regularly capture raw video content?", kind: "select", required: true, options: ["Yes, regularly", "Sometimes", "Not yet, but I could"] },
      { name: "management", label: "Do you currently have management?", kind: "select", required: true, options: yesNo },
      { name: "label", label: "Do you currently work with a label?", kind: "select", required: true, options: yesNo },
      { name: "budget", label: "Approximate monthly marketing budget", kind: "select", required: true, options: budgetOptions, hint: "Just helps us understand where you are. There's no wrong answer.", full: true },
    ],
  },
  {
    number: "04",
    title: "Where you want to go",
    short: "Goals",
    intro: "The part that helps us most. Take your time.",
    fields: [
      { name: "goals", label: "What are you trying to achieve over the next 6 months?", kind: "textarea", required: true, rows: 3, hint: "Releases, audience growth, live goals, fanbase, career milestones. Whatever matters most." },
      { name: "biggestProblem", label: "What is currently your biggest marketing problem?", kind: "textarea", required: true, rows: 3, hint: "What feels hardest, inconsistent or most frustrating right now?" },
      { name: "why", label: "Why do you want to work with SHOWGUY?", kind: "textarea", required: true, rows: 3, hint: "What caught your attention, and what would you want us to help with?" },
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

/** Looks like a web address rather than a bare handle (has a slash, www., or a known platform domain). */
const looksLikeAddress = /(\/|^www\.|^(?:[\w-]+\.)*(?:instagram|tiktok|youtube|youtu|spotify)\.)/i;

/**
 * Makes link entry forgiving: "instagram.com/me" gets https://, and for
 * social fields a bare "@artistname" (or "artistname") becomes the full profile link.
 */
export function normaliseUrl(value: string, handleBase?: string): string {
  const v = value.trim();
  if (!v) return "";
  if (/^https?:\/\//i.test(v)) return v;
  if (handleBase && /^@?[\w.]+$/.test(v) && (v.startsWith("@") || !looksLikeAddress.test(v))) {
    return handleBase + v.replace(/^@/, "");
  }
  return `https://${v.replace(/^@/, "")}`;
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
      .transform((v) => normaliseUrl(v, f.handleBase))
      .refine(
        (v) => !v || isValidUrl(v),
        f.handleBase ? "Paste the link, or just your @handle." : `That doesn't look like a link. Try something like ${f.example ?? "yourwebsite.com"}`,
      );
  }
  const text = z.string().trim().max(max, tooLong);
  return f.required ? text.min(1, missing) : text;
}

function buildSchema(fields: Field[]) {
  return z.object(Object.fromEntries(fields.map((f) => [f.name, fieldSchema(f)])));
}

export const applicationFields = applicationGroups.flatMap((g) => g.fields);
const linkFields = ["instagram", "tiktok", "spotify", "youtube"];
const LINK_RULE_MESSAGE = "Please add at least one link to your music or socials.";
export const applicationSchema = buildSchema(applicationFields).refine(
  (d) => linkFields.some((k) => (d as Record<string, string>)[k]),
  { message: LINK_RULE_MESSAGE, path: ["spotify"] },
);

/** The same "at least one link" rule, for the browser to check before sending. */
export const applicationCross = {
  fields: linkFields,
  check: (values: Record<string, string>): Record<string, string> =>
    linkFields.some((k) => values[k]?.trim()) ? {} : { spotify: LINK_RULE_MESSAGE },
};

const fieldSchemas = new Map<string, z.ZodType<string>>();

/** Checks one answer. Returns an error message, or undefined if it's fine. Used for inline validation. */
export function validateField(f: Field, value: string): string | undefined {
  let schema = fieldSchemas.get(f.name);
  if (!schema) {
    schema = fieldSchema(f);
    fieldSchemas.set(f.name, schema);
  }
  const r = schema.safeParse(value);
  return r.success ? undefined : r.error.issues[0]?.message;
}
export const contactSchema = buildSchema(contactFields);

/** Result passed back from the server to the form on screen. */
export type FormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: Record<string, string> };

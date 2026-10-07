import { z } from "zod";
import { budgetOptions } from "@/config/pricing";

/**
 * Form fields are described once, here. The page renders them and the server
 * validates them from the same list, so they can't drift apart.
 * To add or remove a question, edit the lists below.
 */
export type FieldKind = "text" | "email" | "tel" | "url" | "textarea" | "select" | "checkboxes";

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

const roles = ["Independent artist", "Artist manager", "Record label", "Promoter", "Music business", "Other"];
const needs = [
  "Website or digital project",
  "Campaign planning",
  "Creative direction",
  "Digital communications",
  "Ongoing digital support",
  "Not sure yet",
];

/**
 * The enquiry form. It works for artists, managers, labels, promoters and
 * other music businesses, so no streaming or social links are required.
 */
export const applicationGroups: FieldGroup[] = [
  {
    number: "01",
    title: "About you",
    short: "About",
    intro: "The basics, so we know who we're talking to.",
    fields: [
      { name: "name", label: "Name", kind: "text", required: true, autoComplete: "name" },
      { name: "email", label: "Email", kind: "email", required: true, autoComplete: "email" },
      { name: "company", label: "Company / artist / project name", kind: "text", required: true, autoComplete: "organization" },
      { name: "location", label: "Location", kind: "text", placeholder: "Town or city", autoComplete: "address-level2" },
      { name: "phone", label: "Phone", kind: "tel", hint: "Optional", autoComplete: "tel" },
      { name: "role", label: "Which best describes you?", kind: "select", required: true, options: roles },
    ],
  },
  {
    number: "02",
    title: "What you need",
    short: "Needs",
    intro: "Pick as many as you like. It's fine if you're not sure yet.",
    fields: [
      { name: "helpWith", label: "What do you need help with?", kind: "checkboxes", required: true, options: needs, full: true },
      {
        name: "engagement",
        label: "Are you looking for?",
        kind: "select",
        required: true,
        options: ["One-off project", "Ongoing partnership", "Both", "Not sure yet"],
        full: true,
      },
    ],
  },
  {
    number: "03",
    title: "Your project",
    short: "Project",
    intro: "A few lines is plenty. We'll ask if we need more.",
    fields: [
      { name: "project", label: "What's your project?", kind: "textarea", required: true, rows: 4, hint: "What are you working on, and what do you need from us?" },
      { name: "outcome", label: "What would a successful outcome look like?", kind: "textarea", rows: 3, hint: "Optional" },
      { name: "start", label: "When would you like to start?", kind: "select", required: true, options: ["Immediately", "Within 30 days", "Within 1–3 months", "Just exploring"] },
      { name: "budget", label: "What's your approximate budget?", kind: "select", required: true, options: budgetOptions, hint: "Just helps us suggest the right approach." },
    ],
  },
  {
    number: "04",
    title: "Links",
    short: "Links",
    intro: "Optional. Share whatever helps us understand your project.",
    fields: [
      { name: "website", label: "Website", kind: "url", placeholder: "yourwebsite.com", autoComplete: "url" },
      { name: "instagram", label: "Instagram", kind: "url", placeholder: "@yourname", handleBase: "https://www.instagram.com/" },
      { name: "spotify", label: "Spotify", kind: "url", placeholder: "open.spotify.com/artist/…", example: "open.spotify.com/artist/…" },
      { name: "otherLinks", label: "Other relevant links", kind: "text", placeholder: "A deck, a reference site, a Linktree…", max: 500 },
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

  if (f.kind === "checkboxes") {
    const options = f.options ?? [];
    const base = z
      .string()
      .trim()
      .refine((v) => !v || v.split(", ").every((x) => options.includes(x)), "Please choose from the options.");
    return f.required ? base.refine((v) => v !== "", "Please choose at least one.") : base;
  }
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
export const applicationSchema = buildSchema(applicationFields);

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

/** Reads one answer from submitted form data. Tick-box groups are joined as "A, B". */
export function readField(f: Field, formData: FormData): string {
  return f.kind === "checkboxes"
    ? formData.getAll(f.name).map(String).join(", ")
    : String(formData.get(f.name) ?? "");
}

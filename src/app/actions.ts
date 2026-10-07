"use server";

import { headers } from "next/headers";
import { z } from "zod";
import {
  applicationFields,
  applicationSchema,
  contactFields,
  contactSchema,
  readField,
  type Field,
  type FormState,
} from "@/lib/forms";
import { deliver } from "@/lib/deliver";
import { tooManyRequests } from "@/lib/rateLimit";

const GENERIC_ERROR: FormState = {
  status: "error",
  message: "Your answers haven't been lost. Try again, or contact SHOWGUY directly if the problem continues.",
};

/** Runs the shared spam checks, validation and delivery for either form. */
async function handle(
  kind: "application" | "contact",
  formData: FormData,
  fields: Field[],
  schema: z.ZodType<Record<string, string>>,
  subject: (d: Record<string, string>) => string,
): Promise<FormState> {
  // 1. Spam trap: a hidden field humans never fill in, and a minimum fill time.
  //    Bots get a fake "success" so they don't learn what tripped them.
  const honeypot = String(formData.get("nickname_confirm") ?? "");
  const startedAt = Number(formData.get("_t"));
  const tooFast = !startedAt || Date.now() - startedAt < 3000;
  if (honeypot || tooFast) {
    return tooFast && !honeypot
      ? { status: "error", message: "That was very quick. Please take a moment and send it again." }
      : { status: "success" };
  }

  // 2. Rate limit per visitor.
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (tooManyRequests(`${kind}:${ip}`)) {
    return { status: "error", message: "You've sent a few of these already. Please wait a few minutes and try again." };
  }

  // 3. Validate on the server (never trust the browser).
  const raw = Object.fromEntries(fields.map((f) => [f.name, readField(f, formData)]));
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "");
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Some answers need another look. They're marked below.", fieldErrors };
  }
  const data = parsed.data;

  // 4. Deliver.
  const ok = await deliver({
    kind,
    subject: subject(data),
    replyTo: data.email,
    entries: fields.map((f) => ({ label: f.label, value: data[f.name] ?? "" })),
  });
  return ok ? { status: "success" } : GENERIC_ERROR;
}

export async function submitApplication(formData: FormData): Promise<FormState> {
  return handle("application", formData, applicationFields, applicationSchema, (d) => `New SHOWGUY enquiry: ${d.company} (${d.role})`);
}

export async function submitContact(formData: FormData): Promise<FormState> {
  return handle("contact", formData, contactFields, contactSchema, (d) => `SHOWGUY contact (${d.reason}): ${d.name}`);
}

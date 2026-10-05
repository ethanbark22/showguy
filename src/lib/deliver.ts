import "server-only";

/**
 * Sends a finished form to wherever you want it. Configure ANY of these in
 * environment variables (see README). If more than one is set, all are used.
 *
 *  - FORM_WEBHOOK_URL  → receives the form as JSON (Google Sheets via Apps
 *                        Script, Zapier, Make, a CRM, Supabase function…)
 *  - RESEND_API_KEY + FORM_TO_EMAIL + FORM_FROM_EMAIL → emails you via Resend
 *
 * With nothing configured, running locally just prints the form in your
 * terminal. On the live site it reports an error rather than quietly losing
 * someone's application.
 */

export type Submission = {
  kind: "application" | "contact";
  /** Human readable question/answer pairs, in order. */
  entries: { label: string; value: string }[];
  replyTo: string;
  subject: string;
};

async function sendWebhook(url: string, s: Submission): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: s.kind,
        submittedAt: new Date().toISOString(),
        data: Object.fromEntries(s.entries.map((e) => [e.label, e.value])),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    return res.ok;
  } catch (err) {
    console.error("[forms] webhook failed", err);
    return false;
  }
}

async function sendResend(s: Submission): Promise<boolean> {
  const { RESEND_API_KEY, FORM_TO_EMAIL, FORM_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !FORM_TO_EMAIL || !FORM_FROM_EMAIL) return false;
  const text = s.entries.map((e) => `${e.label}\n${e.value || "(blank)"}`).join("\n\n");
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FORM_FROM_EMAIL,
        to: FORM_TO_EMAIL.split(",").map((e) => e.trim()),
        reply_to: s.replyTo,
        subject: s.subject,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) console.error("[forms] resend rejected", res.status, await res.text());
    return res.ok;
  } catch (err) {
    console.error("[forms] resend failed", err);
    return false;
  }
}

/** Returns true if the submission reached at least one destination. */
export async function deliver(s: Submission): Promise<boolean> {
  const webhook = process.env.FORM_WEBHOOK_URL;
  const resendConfigured = Boolean(
    process.env.RESEND_API_KEY && process.env.FORM_TO_EMAIL && process.env.FORM_FROM_EMAIL,
  );

  if (!webhook && !resendConfigured) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`\n[forms] DEV FALLBACK: no destination set, printing instead.\n${s.subject}`);
      for (const e of s.entries) console.log(`  ${e.label}: ${e.value}`);
      return true;
    }
    console.error("[forms] No form destination configured. Set FORM_WEBHOOK_URL or the Resend variables.");
    return false;
  }

  const results = await Promise.all([
    webhook ? sendWebhook(webhook, s) : Promise.resolve(false),
    resendConfigured ? sendResend(s) : Promise.resolve(false),
  ]);
  return results.some(Boolean);
}

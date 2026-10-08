"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition, type ReactNode } from "react";
import { readField, validateField, type Field, type FieldGroup, type FormState } from "@/lib/forms";
import { site } from "@/config/site";
import { Button } from "./Button";

type Props = {
  groups: FieldGroup[];
  action: (formData: FormData) => Promise<FormState>;
  submitLabel: string;
  /** Shown instead of the form once it has been sent (unless `successHref` is set). */
  success?: ReactNode;
  /** Go to this page after a successful send, instead of showing `success`. */
  successHref?: string;
  /** Called once, the first time someone interacts with the form. */
  onStart?: () => void;
  /** Called after a successful send. */
  onSuccess?: () => void;
  /** Used to prefix element ids so two forms never clash. */
  idPrefix: string;
  /** Optional rule that looks across several answers (e.g. "at least one link"). */
  cross?: { fields: string[]; check: (values: Record<string, string>) => Record<string, string> };
  /** Optional heading and text for the closing panel above the send button. */
  closing?: { title: string; body: string };
  /** Shows "Fields marked * are required." above the form. */
  showRequiredNote?: boolean;
  /** Extra content inside the closing panel (e.g. "what happens next" on phones). */
  closingExtra?: ReactNode;
};

type Banner = { kind: "fields"; count: number } | { kind: "failed"; message: string } | null;

const FAILED_BODY = "Your answers haven't been lost. Try again, or contact SHOWGUY directly if the problem continues.";

/** One look for every input, select and textarea. */
const fieldBase =
  "block w-full min-h-[3.25rem] rounded-xl border-2 border-line-strong bg-field px-4 py-3 text-base text-paper outline-none placeholder:text-mute-text/80 transition-[border-color,box-shadow] duration-200 focus:border-violet focus:shadow-[0_0_0_4px_rgb(139_92_246/0.28)] aria-[invalid=true]:border-danger aria-[invalid=true]:focus:shadow-[0_0_0_4px_rgb(255_154_168/0.22)]";

/** Renders a form from field definitions and sends it to a server action. */
export function DynamicForm({ groups, action, submitLabel, success, successHref, onStart, onSuccess, idPrefix, cross, closing, showRequiredNote, closingExtra }: Props) {
  const router = useRouter();
  const started = useRef(false);
  const [redirecting, setRedirecting] = useState(false);
  const allFields = groups.flatMap((g) => g.fields);
  const byName = Object.fromEntries(allFields.map((f) => [f.name, f]));

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [banner, setBanner] = useState<Banner>(null);
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const crossErrorKeys = useRef<Set<string>>(new Set());

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (done) {
      successRef.current?.scrollIntoView({ block: "start" });
      successRef.current?.focus({ preventScroll: true });
    }
  }, [done]);

  const readValues = () => {
    const fd = new FormData(formRef.current!);
    return Object.fromEntries(allFields.map((f) => [f.name, readField(f, fd)]));
  };

  /** Move the person to the first answer that needs fixing. */
  const focusFirst = (errs: Record<string, string>) => {
    const first = allFields.find((f) => errs[f.name]);
    const found = first && formRef.current?.elements.namedItem(first.name);
    // A group of tick boxes comes back as a list: go to the first box
    const el = (found && "length" in found ? (found as RadioNodeList)[0] : found) as HTMLElement | null | undefined;
    if (el) {
      el.scrollIntoView({ block: "center" });
      el.focus({ preventScroll: true });
    }
  };

  const setFieldError = (name: string, message?: string) =>
    setErrors((prev) => {
      if (!message && !(name in prev)) return prev;
      const next = { ...prev };
      if (message) next[name] = message;
      else delete next[name];
      return next;
    });

  function onBlur(e: React.FocusEvent<HTMLFormElement>) {
    const t = e.target as unknown as HTMLInputElement;
    const f = byName[t.name];
    // Tick boxes are checked when ticked, not when tabbed past
    if (f && f.kind !== "checkboxes") setFieldError(f.name, validateField(f, t.value));
  }

  function onChange(e: React.ChangeEvent<HTMLFormElement>) {
    const t = e.target as unknown as HTMLInputElement;
    const f = byName[t.name];
    if (!f) return;
    // Once a problem is showing, re-check as they type so it clears straight away
    if (errors[f.name] && !crossErrorKeys.current.has(f.name)) {
      setFieldError(f.name, validateField(f, f.kind === "checkboxes" ? readValues()[f.name] : t.value));
    }
    if (cross && cross.fields.includes(f.name) && crossErrorKeys.current.size) {
      const still = cross.check(readValues());
      crossErrorKeys.current.forEach((k) => {
        if (!still[k]) {
          setFieldError(k, undefined);
          crossErrorKeys.current.delete(k);
        }
      });
    }
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const values = readValues();

    // 1. Check everything in the browser first, so mistakes show up instantly
    const found: Record<string, string> = {};
    for (const f of allFields) {
      const msg = validateField(f, values[f.name]);
      if (msg) found[f.name] = msg;
    }
    const crossFound = cross?.check(values) ?? {};
    crossErrorKeys.current = new Set(Object.keys(crossFound));
    for (const [k, v] of Object.entries(crossFound)) if (!found[k]) found[k] = v;
    if (Object.keys(found).length) {
      setErrors(found);
      setBanner({ kind: "fields", count: Object.keys(found).length });
      focusFirst(found);
      return;
    }

    // 2. Send. The server checks everything again.
    const formData = new FormData(formRef.current!);
    formData.set("_t", String(startedAt.current));
    setBanner(null);
    startTransition(async () => {
      try {
        const result = await action(formData);
        if (result.status === "success") {
          onSuccess?.();
          if (successHref) {
            setRedirecting(true);
            router.push(successHref);
          } else {
            setDone(true);
          }
        } else if (result.status === "error") {
          const fieldErrors = result.fieldErrors ?? {};
          setErrors(fieldErrors);
          if (Object.keys(fieldErrors).length) {
            setBanner({ kind: "fields", count: Object.keys(fieldErrors).length });
            focusFirst(fieldErrors);
          } else {
            setBanner({ kind: "failed", message: result.message });
            requestAnimationFrame(() => bannerRef.current?.focus());
          }
        }
      } catch {
        setBanner({ kind: "failed", message: FAILED_BODY });
        requestAnimationFrame(() => bannerRef.current?.focus());
      }
    });
  }

  if (done) {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="scroll-mt-24 outline-none">
        {success}
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={() => {
        if (!started.current) {
          started.current = true;
          onStart?.();
        }
      }}
      noValidate
      aria-busy={pending}
      className="rounded-[1.75rem] border border-line bg-surface p-5 sm:p-8 lg:p-10"
    >
      {showRequiredNote && (
        <p className="mb-8 text-sm text-mute-text">
          Fields marked <span className="font-bold text-lav">*</span> are required.
        </p>
      )}

      <div className="space-y-10">
        {groups.map((group, gi) => (
          <section
            key={group.title || gi}
            id={group.number ? `${idPrefix}-section-${gi + 1}` : undefined}
            aria-labelledby={group.title ? `${idPrefix}-heading-${gi + 1}` : undefined}
            className={gi > 0 ? "border-t border-line pt-10" : ""}
          >
            {group.title && (
              <header className="mb-6">
                <h2 id={`${idPrefix}-heading-${gi + 1}`} className="display flex items-baseline gap-3 text-[clamp(1.6rem,3.4vw,2.3rem)]">
                  {group.number && (
                    <span aria-hidden="true" className="text-violet">
                      {group.number}
                    </span>
                  )}
                  {group.title}
                </h2>
                {group.intro && <p className="mt-2 text-[0.95rem] text-mute-text">{group.intro}</p>}
              </header>
            )}
            <div className="-mb-5 grid gap-x-5 sm:grid-cols-2">
              {group.fields.map((f) => (
                <FieldControl key={f.name} field={f} id={`${idPrefix}-${f.name}`} error={errors[f.name]} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Spam trap: invisible to people, tempting to bots. Leave it empty. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input type="text" name="nickname_confirm" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* The closing panel: the problem banner, a short note, and the send button */}
      <div className="mt-12 rounded-3xl border border-violet/40 bg-plum p-6 sm:p-8">
        {closing && (
          <>
            <h2 className="display text-[clamp(1.8rem,4vw,2.8rem)]">{closing.title}</h2>
            <p className="mt-3 max-w-lg text-base text-paper/85">{closing.body}</p>
          </>
        )}

        {banner && (
          <div
            ref={bannerRef}
            tabIndex={-1}
            role="alert"
            className="mt-6 rounded-2xl border-2 border-danger bg-danger/10 p-4 outline-none"
          >
            {banner.kind === "fields" ? (
              <p className="font-bold text-danger">
                {banner.count === 1 ? "One answer needs another look." : `${banner.count} answers need another look.`}{" "}
                <span className="font-medium text-paper/85">They&rsquo;re marked above.</span>
              </p>
            ) : (
              <>
                <p className="display text-2xl text-danger">We couldn&rsquo;t send that.</p>
                <p className="mt-2 text-paper/90">{banner.message}</p>
                <p className="mt-2 text-sm">
                  <Link href="/contact" className="font-bold text-lav underline underline-offset-4">
                    Contact SHOWGUY
                  </Link>
                  {site.email && (
                    <>
                      {" "}
                      or email{" "}
                      <a href={`mailto:${site.email}`} className="font-bold text-lav underline underline-offset-4">
                        {site.email}
                      </a>
                    </>
                  )}
                </p>
              </>
            )}
          </div>
        )}

        <Button type="submit" disabled={pending || redirecting} className={`w-full sm:w-auto ${closing || banner ? "mt-6" : ""}`}>
          {redirecting ? "Sent. One moment…" : pending ? "Sending…" : submitLabel}
        </Button>
        <p className="mt-4 max-w-md text-sm text-mute-text">
          By sending this form, you agree that SHOWGUY may use the information you provide to review and respond to your enquiry. See our{" "}
          <Link href="/privacy" className="font-bold text-lav underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>
        {closingExtra}
      </div>
    </form>
  );
}

function FieldControl({ field: f, id, error }: { field: Field; id: string; error?: string }) {
  const full = f.full || f.kind === "textarea";
  const hintId = f.hint ? `${id}-hint` : undefined;
  const errId = error ? `${id}-error` : undefined;
  const common = {
    id,
    name: f.name,
    required: f.required,
    "aria-required": f.required || undefined,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": [hintId, errId].filter(Boolean).join(" ") || undefined,
    autoComplete: f.autoComplete,
  } as const;

  if (f.kind === "checkboxes") {
    return (
      <div
        role="group"
        aria-labelledby={`${id}-label`}
        className={`row-span-3 grid grid-rows-subgrid pb-5 ${full ? "sm:col-span-2" : ""}`}
        aria-describedby={[hintId, errId].filter(Boolean).join(" ") || undefined}
      >
        <div>
          <p id={`${id}-label`} className="block text-[0.95rem] font-bold leading-snug">
            {f.label}
            {f.required && (
              <span aria-hidden="true" className="text-lav">
                {"\u00a0"}*
              </span>
            )}
          </p>
          {f.hint && (
            <p id={hintId} className="mt-1 text-[0.82rem] leading-snug text-mute-text">
              {f.hint}
            </p>
          )}
        </div>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {f.options?.map((o, i) => (
            <label key={o} className="cursor-pointer">
              <input id={i === 0 ? id : undefined} type="checkbox" name={f.name} value={o} className="peer sr-only" />
              <span
                className={`block min-h-11 rounded-full border-2 px-4 py-2.5 text-[0.95rem] font-bold leading-snug transition-colors duration-200 peer-checked:border-violet peer-checked:bg-violet-strong peer-checked:text-paper peer-focus-visible:shadow-[0_0_0_4px_rgb(139_92_246/0.35)] hover:border-violet ${
                  error ? "border-danger" : "border-line-strong"
                } bg-field text-paper`}
              >
                {o}
              </span>
            </label>
          ))}
        </div>
        {error ? (
          <p id={errId} className="mt-1.5 flex items-start gap-1.5 text-sm font-semibold leading-snug text-danger">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-0.5 size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v6M12 16.5v.5" />
            </svg>
            {error}
          </p>
        ) : (
          <span aria-hidden="true" />
        )}
      </div>
    );
  }

  return (
    <div className={`row-span-3 grid grid-rows-subgrid pb-5 ${full ? "sm:col-span-2" : ""}`}>
      <div>
      <label htmlFor={id} className="block text-[0.95rem] font-bold leading-snug">
        {f.label}
        {f.required && (
          <span aria-hidden="true" className="text-lav">
            {"\u00a0"}*
          </span>
        )}
      </label>
      {f.hint && (
        <p id={hintId} className="mt-1 text-[0.82rem] leading-snug text-mute-text">
          {f.hint}
        </p>
      )}
      </div>
      <div className="mt-2">
        {f.kind === "textarea" ? (
          <textarea
            {...common}
            rows={f.rows ?? 4}
            maxLength={f.max ?? 2000}
            placeholder={f.placeholder}
            className={`${fieldBase} min-h-[6.5rem] resize-y leading-relaxed`}
          />
        ) : f.kind === "select" ? (
          <select {...common} defaultValue="" className={`${fieldBase} field-select`}>
            <option value="" disabled={f.required}>
              {f.required ? "Choose one" : "—"}
            </option>
            {f.options?.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        ) : (
          <input
            {...common}
            type={f.kind}
            inputMode={f.kind === "url" ? "url" : undefined}
            autoCapitalize={f.kind === "url" || f.kind === "email" ? "none" : undefined}
            spellCheck={f.kind === "url" || f.kind === "email" ? false : undefined}
            maxLength={f.max ?? 200}
            placeholder={f.placeholder}
            className={fieldBase}
          />
        )}
      </div>
      {error ? (
        <p id={errId} className="mt-1.5 flex items-start gap-1.5 text-sm font-semibold leading-snug text-danger">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-0.5 size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v6M12 16.5v.5" />
          </svg>
          {error}
        </p>
      ) : (
        <span aria-hidden="true" />
      )}
    </div>
  );
}

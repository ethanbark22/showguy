"use client";

import { useRef, useState, useTransition, useEffect } from "react";
import type { Field, FieldGroup, FormState } from "@/lib/forms";
import { Button } from "./Button";
import Link from "next/link";

type Props = {
  groups: FieldGroup[];
  action: (formData: FormData) => Promise<FormState>;
  submitLabel: string;
  successTitle: string;
  successBody: string;
  successExtra?: React.ReactNode;
  /** Used to prefix element ids so two forms never clash. */
  idPrefix: string;
};

const inputStyles =
  "w-full min-h-12 rounded-2xl border-2 border-paper/25 bg-plum px-4 py-3 text-base text-paper placeholder:text-mute-text focus:border-violet aria-[invalid=true]:border-danger";

/** Renders a form from field definitions and sends it to a server action. */
export function DynamicForm({ groups, action, submitLabel, successTitle, successBody, successExtra, idPrefix }: Props) {
  const [state, setState] = useState<FormState>({ status: "idle" });
  const [pending, startTransition] = useTransition();
  const startedAt = useRef(0);
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (state.status === "error") errorRef.current?.focus();
  }, [state]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("_t", String(startedAt.current));
    startTransition(async () => {
      try {
        setState(await action(formData));
      } catch {
        setState({ status: "error", message: "We couldn't reach the server. Check your connection and try again." });
      }
    });
  }

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-[2rem] bg-lav p-8 text-ink sm:p-12">
        <h2 className="display text-big">{successTitle}</h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed">{successBody}</p>
        {successExtra}
        <Link href="/" className="mt-6 inline-block font-bold underline underline-offset-4">
          Back to the homepage
        </Link>
      </div>
    );
  }

  const fieldErrors = state.status === "error" ? (state.fieldErrors ?? {}) : {};

  return (
    <form onSubmit={onSubmit} noValidate={false} className="space-y-10" aria-busy={pending}>
      {state.status === "error" && (
        <div ref={errorRef} tabIndex={-1} role="alert" className="rounded-2xl border-2 border-danger bg-danger/10 p-4 font-medium">
          {state.message}
        </div>
      )}

      {groups.map((group) => (
        <fieldset key={group.title} className="space-y-5">
          {group.title && <legend className="display mb-2 text-3xl">{group.title}</legend>}
          <div className="grid gap-5 sm:grid-cols-2">
            {group.fields.map((f) => (
              <FieldControl key={f.name} field={f} id={`${idPrefix}-${f.name}`} error={fieldErrors[f.name]} />
            ))}
          </div>
        </fieldset>
      ))}

      {/* Spam trap: invisible to people, tempting to bots. Leave it empty. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input type="text" name="nickname_confirm" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
          {pending ? "Sending…" : submitLabel}
        </Button>
        <p className="mt-4 max-w-xl text-sm text-mute-text">
          We&rsquo;ll only use your details to reply to you. See our{" "}
          <Link href="/privacy" className="font-bold text-lav underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}

function FieldControl({ field: f, id, error }: { field: Field; id: string; error?: string }) {
  const wide = f.kind === "textarea";
  const hintId = f.hint ? `${id}-hint` : undefined;
  const errId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errId].filter(Boolean).join(" ") || undefined;
  const common = {
    id,
    name: f.name,
    required: f.required,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    autoComplete: f.autoComplete,
    className: inputStyles,
  } as const;

  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="mb-1.5 block font-bold">
        {f.label}
        {f.required && (
          <span aria-hidden="true" className="text-lav">
            {" "}
            *
          </span>
        )}
      </label>
      {f.hint && (
        <p id={hintId} className="mb-1.5 text-sm text-mute-text">
          {f.hint}
        </p>
      )}
      {f.kind === "textarea" ? (
        <textarea {...common} rows={4} maxLength={f.max ?? 2000} placeholder={f.placeholder} />
      ) : f.kind === "select" ? (
        <select {...common} defaultValue="">
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
          // URL fields use type=text so "instagram.com/me" is accepted; we tidy it on the server.
          type={f.kind === "url" ? "text" : f.kind}
          inputMode={f.kind === "url" ? "url" : undefined}
          maxLength={f.max ?? 200}
          placeholder={f.placeholder}
        />
      )}
      {error && (
        <p id={errId} className="mt-1.5 text-sm font-bold text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

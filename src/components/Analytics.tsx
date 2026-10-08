"use client";

import Script from "next/script";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { analytics, consentCategories, needsConsent } from "@/config/analytics";
import { events, track } from "@/lib/track";

/**
 * Loads analytics. Vercel Analytics is cookieless. Google, Meta and TikTok
 * only load after the visitor clicks Accept on the cookie banner.
 * Settings live in src/config/analytics.ts.
 */

const KEY = "showguy-cookie-consent";
const EVENT = "showguy:consent-changed";

type Choice = { analytics: boolean; marketing: boolean };
/** Used for the server render and when no choice exists: nothing optional is switched on. */
const NONE = JSON.stringify({ analytics: false, marketing: false });

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}
/** The raw stored choice, or null if the visitor hasn't chosen yet. */
function read(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}
function write(v: Choice | null) {
  try {
    if (v) localStorage.setItem(KEY, JSON.stringify(v));
    else localStorage.removeItem(KEY);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}
function parse(raw: string | null): Choice {
  if (!raw) return { analytics: false, marketing: false };
  if (raw === "granted") return { analytics: true, marketing: true }; // older format
  try {
    const v = JSON.parse(raw);
    return { analytics: v.analytics === true, marketing: v.marketing === true };
  } catch {
    return { analytics: false, marketing: false };
  }
}

export function Analytics() {
  // Server render: treat as "already decided, nothing optional on" so no banner flashes and nothing loads early.
  const raw = useSyncExternalStore(subscribe, read, () => NONE);
  const decided = raw !== null;
  const choice = parse(raw);
  const { googleAnalyticsId: ga, metaPixelId: meta, tiktokPixelId: tt } = analytics;

  // Counts clicks on any "work with us" / apply link, noting only WHERE on the page it was
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href='/apply']");
      if (!link) return;
      const where = link.closest("header") ? "header" : link.closest("footer") ? "footer" : (link.closest("section")?.id || "page");
      track(events.workWithUsClicked, { placement: where });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      {analytics.vercel && <VercelAnalytics />}

      {choice.analytics && ga && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">{`
            window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
            gtag('js',new Date());gtag('config','${ga}');
          `}</Script>
        </>
      )}
      {choice.marketing && meta && (
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init','${meta}');fbq('track','PageView');
        `}</Script>
      )}
      {choice.marketing && tt && (
        <Script id="tiktok-pixel" strategy="afterInteractive">{`
          !function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],
          ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
          for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
          ttq.load=function(e){var n="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=n;
          var o=document.createElement("script");o.type="text/javascript";o.async=!0;o.src=n+"?sdkid="+e+"&lib="+t;
          var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
          ttq.load('${tt}');ttq.page()}(window,document,'ttq');
        `}</Script>
      )}

      {needsConsent && !decided && <ConsentBanner />}
    </>
  );
}

function ConsentBanner() {
  const [managing, setManaging] = useState(false);
  const [draft, setDraft] = useState<Choice>({ analytics: false, marketing: false });
  // Accept and Reject are deliberately identical in size and style
  const same =
    "min-h-11 rounded-full border-2 border-paper bg-paper px-6 text-sm font-bold uppercase tracking-wide text-ink hover:bg-lav hover:border-lav";
  const cats = [
    consentCategories.analytics && { key: "analytics" as const, title: "Analytics", text: "Helps us understand how the site is used (Google Analytics)." },
    consentCategories.marketing && { key: "marketing" as const, title: "Marketing", text: "Measures advertising (Meta Pixel and/or TikTok Pixel)." },
  ].filter(Boolean) as { key: "analytics" | "marketing"; title: string; text: string }[];

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-2xl rounded-3xl border-2 border-violet bg-plum p-5 text-paper sm:p-6"
    >
      <p className="text-sm leading-relaxed">
        We&rsquo;d like to use optional cookies to see how people find us and which of our ads are working. Nothing optional loads unless you say yes. Strictly necessary technologies don&rsquo;t need your consent.{" "}
        <Link href="/cookies" className="font-bold text-lav underline underline-offset-2">
          Cookie Policy
        </Link>
      </p>

      {managing && (
        <div className="mt-4 space-y-3">
          <div className="rounded-2xl border border-line p-3 text-sm">
            <p className="font-bold">Strictly necessary</p>
            <p className="text-mute-text">Needed for the site to work and remember this choice. Always on.</p>
          </div>
          {cats.map((c) => (
            <label key={c.key} className="flex cursor-pointer items-start gap-3 rounded-2xl border border-line p-3 text-sm">
              <input
                type="checkbox"
                checked={draft[c.key]}
                onChange={(e) => setDraft((d) => ({ ...d, [c.key]: e.target.checked }))}
                className="mt-0.5 size-5 shrink-0 accent-violet"
              />
              <span>
                <span className="block font-bold">{c.title}</span>
                <span className="text-mute-text">{c.text}</span>
              </span>
            </label>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={() => write({ analytics: true, marketing: true })} className={same}>
          Accept all
        </button>
        <button type="button" onClick={() => write({ analytics: false, marketing: false })} className={same}>
          Reject all
        </button>
        {managing ? (
          <button
            type="button"
            onClick={() => write(draft)}
            className="min-h-11 rounded-full border-2 border-paper/60 px-6 text-sm font-bold uppercase tracking-wide hover:border-violet hover:bg-violet-strong"
          >
            Save choices
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setManaging(true)}
            className="min-h-11 rounded-full border-2 border-paper/60 px-6 text-sm font-bold uppercase tracking-wide hover:border-violet hover:bg-violet-strong"
          >
            Manage preferences
          </button>
        )}
      </div>
    </div>
  );
}

/** Footer link that lets people change their mind. */
export function CookieSettingsButton() {
  return (
    <button type="button" onClick={() => write(null)} className="text-left hover:text-lav">
      Cookie settings
    </button>
  );
}

/** A proper button for the Cookie Policy page. Only rendered when optional tools are on. */
export function ManageCookiesButton() {
  return (
    <button
      type="button"
      onClick={() => {
        write(null);
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }}
      className="min-h-[3.25rem] rounded-full border-2 border-lav bg-violet-strong px-7 text-base font-bold uppercase tracking-wide text-paper transition hover:bg-lav hover:text-ink"
    >
      Manage cookie preferences
    </button>
  );
}

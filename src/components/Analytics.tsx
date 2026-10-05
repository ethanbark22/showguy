"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { analytics, needsConsent } from "@/config/analytics";

/**
 * Loads analytics. Vercel Analytics is cookieless. Google, Meta and TikTok
 * only load after the visitor clicks Accept on the cookie banner.
 * Settings live in src/config/analytics.ts.
 */

const KEY = "showguy-cookie-consent";
type Consent = "granted" | "denied" | null;
const EVENT = "showguy:consent-changed";

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}
function read(): Consent {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}
function write(v: Consent) {
  try {
    if (v) localStorage.setItem(KEY, v);
    else localStorage.removeItem(KEY);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

export function Analytics() {
  const consent = useSyncExternalStore(subscribe, read, () => "denied" as Consent);
  const { googleAnalyticsId: ga, metaPixelId: meta, tiktokPixelId: tt } = analytics;

  return (
    <>
      {analytics.vercel && <VercelAnalytics />}

      {consent === "granted" && ga && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">{`
            window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
            gtag('js',new Date());gtag('config','${ga}');
          `}</Script>
        </>
      )}
      {consent === "granted" && meta && (
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init','${meta}');fbq('track','PageView');
        `}</Script>
      )}
      {consent === "granted" && tt && (
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

      {needsConsent && consent === null && <ConsentBanner />}
    </>
  );
}

function ConsentBanner() {
  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-2xl rounded-3xl border-2 border-ink bg-paper p-5 shadow-[6px_6px_0_0_#111] sm:p-6"
    >
      <p className="text-sm leading-relaxed">
        We&rsquo;d like to use cookies to see how people find us and which of our ads are working. Nothing loads unless you say yes.{" "}
        <a href="/cookies" className="font-bold underline underline-offset-2">
          Cookie Policy
        </a>
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => write("granted")}
          className="min-h-11 rounded-full bg-ink px-6 text-sm font-bold uppercase tracking-wide text-paper hover:bg-flame hover:text-ink"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => write("denied")}
          className="min-h-11 rounded-full border-2 border-ink px-6 text-sm font-bold uppercase tracking-wide hover:bg-ink hover:text-paper"
        >
          Reject
        </button>
      </div>
    </div>
  );
}

/** Footer link that lets people change their mind. */
export function CookieSettingsButton() {
  return (
    <button type="button" onClick={() => write(null)} className="text-left hover:text-sun">
      Cookie settings
    </button>
  );
}

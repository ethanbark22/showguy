import { pageMetadata } from "@/lib/metadata";
import { analytics, consentCategories, needsConsent } from "@/config/analytics";
import { legal, privacyContactEmail } from "@/config/site";
import { ManageCookiesButton } from "@/components/Analytics";
import { A, LegalPage, List, Section, Sub } from "@/components/LegalPage";

export const metadata = pageMetadata({
  title: "Cookie Policy",
  description: "How SHOWGUY uses cookies and similar technologies on this website.",
  path: "/cookies",
});

type Row = { name: string; provider: string; purpose: string; category: string; duration: string };

/**
 * The cookie table only lists technologies that are actually switched on for this
 * build (see src/config/analytics.ts). Add a row here whenever you enable a new tool.
 */
function currentRows(): Row[] {
  const rows: Row[] = [];
  if (needsConsent) {
    rows.push({
      name: "showguy-cookie-consent (browser local storage)",
      provider: "SHOWGUY",
      purpose: "Remembers your cookie choices",
      category: "Strictly necessary",
      duration: "Until you change your choice or clear your browser storage",
    });
  }
  if (analytics.googleAnalyticsId) {
    rows.push({ name: "_ga, _ga_*", provider: "Google", purpose: "Measures how the website is used (Google Analytics)", category: "Analytics", duration: "Up to 2 years" });
  }
  if (analytics.metaPixelId) {
    rows.push({ name: "_fbp", provider: "Meta", purpose: "Measures and attributes advertising (Meta Pixel)", category: "Marketing", duration: "Up to 3 months" });
  }
  if (analytics.tiktokPixelId) {
    rows.push({ name: "_ttp", provider: "TikTok", purpose: "Measures and attributes advertising (TikTok Pixel)", category: "Marketing", duration: "Up to 13 months" });
  }
  return rows;
}

export default function CookiePolicyPage() {
  const email = privacyContactEmail();
  const rows = currentRows();

  return (
    <LegalPage
      title="Cookie Policy"
      lastUpdated={legal.cookieLastUpdated}
      intro={<p>This Cookie Policy explains how SHOWGUY uses cookies and similar technologies on this website.</p>}
    >
      <Section title="What are cookies?">
        <p>Cookies are small files or pieces of information stored on, or accessed from, a user&rsquo;s device when a website is used.</p>
        <p>Similar technologies include:</p>
        <List items={["local storage", "pixels", "scripts", "tags", "other storage or access technologies"]} />
      </Section>

      <Section title="How SHOWGUY uses them">
        <p>SHOWGUY may use cookies or similar technologies for the following purposes.</p>

        <Sub>1. Strictly necessary</Sub>
        <p>These help the website function correctly and securely. Examples may include security, form functionality, remembering essential settings and the infrastructure needed to serve the website.</p>

        <Sub>2. Analytics</Sub>
        <p>
          Where enabled, analytics technologies help us understand which pages are visited, how visitors arrive at the site, general website performance and how the site is used.
          {analytics.vercel
            ? " We currently use Vercel Web Analytics, which measures page views without using cookies or similar identifiers stored on your device."
            : ""}
          {consentCategories.analytics ? " We also use Google Analytics, which is only switched on if you accept analytics cookies." : ""}
        </p>

        <Sub>3. Preference or functional</Sub>
        <p>
          These remember choices you make or improve functionality.
          {needsConsent ? " The only one we use is a record of your cookie choices." : " We do not currently use any."}
        </p>

        <Sub>4. Advertising or marketing</Sub>
        <p>
          {consentCategories.marketing
            ? "Where you accept marketing cookies, we use advertising measurement tools (for example Meta Pixel or TikTok Pixel). They are switched off unless you opt in."
            : "SHOWGUY does not currently use advertising or behavioural marketing cookies. If we add tools such as Meta Pixel, TikTok Pixel or Google Ads in future, we will update this policy and ask for your consent first."}
        </p>
      </Section>

      <Section title="Consent">
        <p>
          Where consent is legally required for non-essential cookies or similar technologies, we do not switch them on until you have made a choice. You can accept, reject or manage non-essential technologies, and change your mind at any time. Continuing to browse the website is not treated as consent.
        </p>
        <p>Strictly necessary technologies may be used without optional consent where they are required for the operation or security of the site or for something you have asked for.</p>
      </Section>

      <Section title="Cookies and similar technologies we currently use">
        {rows.length === 0 ? (
          <p>
            At the moment the SHOWGUY website does not set cookies or use other technologies that need your consent. We are keeping this under review, and this table will be updated if non-essential cookies or similar technologies are enabled.
          </p>
        ) : (
          <>
            <div className="overflow-x-auto rounded-2xl border border-line">
              <table className="w-full min-w-[40rem] border-collapse text-left text-sm sm:text-base">
                <caption className="sr-only">Cookies and similar technologies currently used on this website</caption>
                <thead className="bg-surface text-xs uppercase tracking-[0.12em] text-lav">
                  <tr>
                    {["Name", "Provider", "Purpose", "Category", "Duration"].map((h) => (
                      <th key={h} scope="col" className="px-4 py-3 font-bold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.name} className="border-t border-line align-top">
                      <td className="px-4 py-3 font-bold">{r.name}</td>
                      <td className="px-4 py-3">{r.provider}</td>
                      <td className="px-4 py-3">{r.purpose}</td>
                      <td className="px-4 py-3">{r.category}</td>
                      <td className="px-4 py-3">{r.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-mute-text">Durations are set by each provider and may change.</p>
          </>
        )}
      </Section>

      {needsConsent && (
        <Section title="Managing your preferences">
          <p>You can change your choices at any time.</p>
          <ManageCookiesButton />
        </Section>
      )}

      <Section title="Changes">
        <p>We may update this Cookie Policy where technologies or legal requirements change.</p>
      </Section>

      <Section title="Contact">
        <p>
          Questions about cookies or privacy can be sent to {email ? <A href={`mailto:${email}`}>{email}</A> : "us through our contact page"}. See also our <A href="/privacy">Privacy Policy</A>.
        </p>
      </Section>
    </LegalPage>
  );
}

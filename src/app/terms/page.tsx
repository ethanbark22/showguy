import { pageMetadata } from "@/lib/metadata";
import { company, legal, site } from "@/config/site";
import { A, Details, LegalPage, List, Section } from "@/components/LegalPage";

export const metadata = pageMetadata({
  title: "Website Terms of Use",
  description: "The terms that apply to your use of the SHOWGUY website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Website Terms of Use"
      lastUpdated={legal.termsLastUpdated}
      intro={
        <>
          <p>These terms apply to your use of the SHOWGUY website.</p>
          <p>By using the website, you agree to these terms. If you do not agree, please do not use the website.</p>
        </>
      }
    >
      <Section title="About SHOWGUY">
        <p>This website is operated by:</p>
        <Details
          lines={[
            company.name,
            company.number && `Company number: ${company.number}`,
            `Registered in ${company.registeredIn}`,
            legal.registeredOffice && `Registered office: ${legal.registeredOffice}`,
            site.email && `Contact: ${site.email}`,
          ]}
        />
      </Section>

      <Section title="Website purpose">
        <p>The website provides information about SHOWGUY and its creative and digital services for the music industry.</p>
        <p>Information on this site is provided for general information only. Nothing on the site constitutes a binding offer to provide services.</p>
        <p>Any project or ongoing engagement is subject to a separate written agreement, scope and commercial terms.</p>
      </Section>

      <Section title="No guaranteed results">
        <p>SHOWGUY may provide services relating to digital campaigns, websites, creative projects, communications, campaign strategy, digital execution and reporting.</p>
        <p>Results in music and marketing depend on many factors outside SHOWGUY&rsquo;s control. Nothing on this website should be interpreted as a guarantee of:</p>
        <List items={["streams", "followers", "playlist placements", "ticket sales", "media coverage", "revenue", "audience growth", "viral performance", "commercial success"]} />
        <p>Specific deliverables are agreed separately for each project.</p>
      </Section>

      <Section title="Intellectual property">
        <p>Unless otherwise stated, the content and design of this website belong to SHOWGUY or are used with permission. This may include branding, logos, graphics, illustrations, website design, written content, layouts, photographs, video, code and other materials.</p>
        <p>You may view the site for personal or legitimate business purposes.</p>
        <p>You must not reproduce, copy, distribute, modify, republish or commercially exploit SHOWGUY website content without permission, except where allowed by law.</p>
        <p>Third-party trademarks, artist names, artwork and materials remain the property of their respective owners.</p>
      </Section>

      <Section title="Acceptable use">
        <p>You must not misuse the website. This includes attempting to:</p>
        <List
          items={[
            "gain unauthorised access",
            "interfere with site security",
            "introduce malicious software",
            "scrape or harvest data unlawfully",
            "submit fraudulent or abusive enquiries",
            "use the site for unlawful purposes",
          ]}
        />
      </Section>

      <Section title="External links">
        <p>The site may link to third-party websites or services.</p>
        <p>SHOWGUY does not control those websites and is not responsible for their content, availability or privacy practices.</p>
      </Section>

      <Section title="Website availability">
        <p>We aim to keep the website available and accurate, but we do not guarantee that:</p>
        <List
          items={[
            "the website will always be available;",
            "all content will always be error-free;",
            "all links will remain active; or",
            "the website will be free from interruptions.",
          ]}
        />
        <p>We may change, suspend or withdraw parts of the website without notice.</p>
      </Section>

      <Section title="Limitation of liability">
        <p>Nothing in these terms excludes or limits liability where it would be unlawful to do so.</p>
        <p>To the fullest extent permitted by law, SHOWGUY will not be liable for losses arising solely from reliance on general website information or from temporary unavailability of the site.</p>
      </Section>

      <Section title="Services">
        <p>Any SHOWGUY services are governed by separate proposals, statements of work, contracts or service agreements.</p>
        <p>If there is any conflict between these website terms and a signed client agreement, the signed client agreement governs the services covered by that agreement.</p>
      </Section>

      <Section title="Privacy and cookies">
        <p>
          Our use of personal information is explained in the <A href="/privacy">Privacy Policy</A>. Our use of cookies and similar technologies is explained in the <A href="/cookies">Cookie Policy</A>.
        </p>
      </Section>

      <Section title="Changes to these terms">
        <p>SHOWGUY may update these terms from time to time. The current version will be published on this page.</p>
      </Section>

      <Section title="Governing law">
        <p>These terms are governed by the laws of England and Wales.</p>
      </Section>
    </LegalPage>
  );
}

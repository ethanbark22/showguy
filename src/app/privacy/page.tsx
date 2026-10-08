import { pageMetadata } from "@/lib/metadata";
import { analytics } from "@/config/analytics";
import { company, legal, privacyContactEmail, serviceProviders } from "@/config/site";
import { A, Details, LegalPage, List, Section } from "@/components/LegalPage";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How SHOWGUY collects, uses and protects personal information, and the rights you have.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const email = privacyContactEmail();
  const providers = serviceProviders.filter((p) => p.inUse);
  const contact = email ? <A href={`mailto:${email}`}>{email}</A> : "the contact details on our website";

  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated={legal.privacyLastUpdated}
      intro={
        <>
          <p>SHOWGUY respects your privacy and is committed to protecting your personal information.</p>
          <p>
            This Privacy Policy explains what information we collect when you use our website, contact us or submit an enquiry, how we use that information, and the rights you have in relation to it.
          </p>
        </>
      }
    >
      <Section title="Who we are">
        <p>SHOWGUY is a creative and digital business working with artists, managers, labels, promoters and other music businesses.</p>
        <p>The data controller is:</p>
        <Details
          lines={[
            company.name,
            company.number && `Company number: ${company.number}`,
            `Registered in ${company.registeredIn}`,
            legal.registeredOffice && `Registered office: ${legal.registeredOffice}`,
            email && `Contact: ${email}`,
          ]}
        />
      </Section>

      <Section title="Information we collect">
        <p>We may collect information that you provide directly to us, including:</p>
        <List
          items={[
            "your name",
            "artist, company or project name",
            "email address",
            "telephone or WhatsApp number",
            "location",
            "website and social media links",
            "project information",
            "music-related information",
            "budget information",
            "information about which services you are interested in",
            "any other information you include in an enquiry",
          ]}
        />
        <p>We may also collect limited technical information when you use the website, such as:</p>
        <List items={["IP address", "device and browser information", "pages visited", "referral source", "website usage information"]} />
        <p>
          The exact technical information collected depends on the hosting and analytics tools we have configured at the time.
          {analytics.vercel && " We currently use Vercel for hosting and Vercel Web Analytics, which measures page views without using cookies."}
        </p>
      </Section>

      <Section title="How we use your information">
        <p>We may use your information to:</p>
        <List
          items={[
            "respond to enquiries",
            "assess whether SHOWGUY may be a suitable partner for your project",
            "discuss and prepare proposed work",
            "communicate with you about projects or services",
            "manage an existing client relationship",
            "provide services you have asked us to provide",
            "maintain records relating to enquiries, proposals and contracts",
            "improve the website and understand how it is used",
            "protect the website and our systems from abuse or security threats",
            "comply with legal or regulatory obligations",
          ]}
        />
        <p>We do not sell personal data.</p>
      </Section>

      <Section title="Lawful bases">
        <p>Depending on the circumstances, we may process personal data because:</p>
        <List
          items={[
            "it is necessary to respond to your request or take steps before entering into a contract;",
            "it is necessary to perform a contract with you;",
            "it is in our legitimate interests to operate, improve and protect our business;",
            "we have your consent; or",
            "we are required to do so by law.",
          ]}
        />
        <p>Where we rely on legitimate interests, those interests may include:</p>
        <List
          items={[
            "responding to genuine business enquiries;",
            "managing client relationships;",
            "improving our services;",
            "preventing fraud or misuse;",
            "operating the SHOWGUY website effectively.",
          ]}
        />
      </Section>

      <Section title="Marketing">
        <p>SHOWGUY will not automatically add someone to a marketing mailing list simply because they submit a project enquiry.</p>
        <p>Where we send direct marketing communications, we will do so only where permitted by applicable law.</p>
        <p>
          You may unsubscribe from marketing communications at any time using the unsubscribe link in the relevant message{email ? <> or by contacting {contact}</> : ""}.
        </p>
      </Section>

      <Section title="Who we share information with">
        <p>
          We may use trusted service providers to operate SHOWGUY. These may include providers involved in website hosting, analytics, email, CRM, payment processing, cloud storage, project management, document signing and professional advice.
        </p>
        {providers.length > 0 && (
          <>
            <p>Providers we currently use include:</p>
            <List items={providers.map((p) => `${p.name} (${p.does})`)} />
            <p>We may use other suppliers from time to time.</p>
          </>
        )}
        <p>Where appropriate, these providers process information on our behalf or provide services necessary for us to operate.</p>
        <p>We may also disclose information if required by law or where necessary to establish, exercise or defend legal claims.</p>
      </Section>

      <Section title="International transfers">
        <p>Some service providers used by SHOWGUY may process or store information outside the United Kingdom.</p>
        <p>Where this happens, we will take appropriate steps required under applicable UK data protection law to protect personal information.</p>
      </Section>

      <Section title="How long we keep information">
        <p>
          We keep personal information only for as long as reasonably necessary for the purpose for which it was collected, including to respond to enquiries, manage client relationships and meet legal, accounting or contractual requirements.
        </p>
        {legal.enquiryRetentionPeriod && (
          <p>Information from general or unsuccessful enquiries is normally kept for {legal.enquiryRetentionPeriod}, unless we need to keep it for longer for one of the reasons above.</p>
        )}
        <p>Client and project records may be kept for longer where necessary for contractual, tax, accounting or legal purposes.</p>
      </Section>

      <Section title="Security">
        <p>We take reasonable technical and organisational measures to protect personal information.</p>
        <p>However, no website, email system or internet transmission can be guaranteed to be completely secure.</p>
      </Section>

      <Section title="Your rights">
        <p>Under UK data protection law, depending on the circumstances, you may have rights relating to your personal information, including the right to:</p>
        <List
          items={[
            "request access to your data",
            "ask us to correct inaccurate information",
            "ask us to erase information in certain circumstances",
            "ask us to restrict processing in certain circumstances",
            "object to certain processing",
            "request data portability in certain circumstances",
            "withdraw consent where processing is based on consent",
          ]}
        />
        <p>To exercise a right, contact {contact}.</p>
        <p>
          You may also complain to the <A href="https://ico.org.uk">Information Commissioner&rsquo;s Office (ICO)</A>.
        </p>
      </Section>

      <Section title="Children">
        <p>SHOWGUY&rsquo;s services are primarily intended for professional artists, representatives and music businesses.</p>
        <p>The website is not specifically directed at children.</p>
      </Section>

      <Section title="Third-party links">
        <p>The website may contain links to third-party websites.</p>
        <p>SHOWGUY is not responsible for the privacy practices or content of third-party websites.</p>
      </Section>

      <Section title="Changes to this policy">
        <p>We may update this Privacy Policy from time to time.</p>
        <p>The latest version will be published on this page with an updated date.</p>
      </Section>
    </LegalPage>
  );
}

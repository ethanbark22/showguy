import { pageMetadata } from "@/lib/metadata";
import { site, activeSocials } from "@/config/site";
import { brand } from "@/config/brand";
import { JsonLd } from "@/components/JsonLd";
import { Hero } from "@/components/Hero";
import { CTA } from "@/components/CTA";
import { Problem } from "@/components/sections/Problem";
import { Services } from "@/components/sections/Services";
import { Capabilities } from "@/components/sections/Capabilities";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Offer } from "@/components/sections/Offer";
import { WhoFor } from "@/components/sections/WhoFor";
import { Faq } from "@/components/sections/Faq";
import { Results } from "@/components/sections/Results";
import { Vision } from "@/components/sections/Vision";
import { Founder } from "@/components/sections/Founder";

export const metadata = pageMetadata({ path: "/" });

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: site.name,
          url: site.url,
          description: site.description,
          logo: `${site.url}${brand.logo.onLight}`,
          ...(site.email ? { email: site.email } : {}),
          ...(activeSocials().length > 0 ? { sameAs: activeSocials().map((s) => s.href) } : {}),
        }}
      />
      <Hero />
      <Problem />
      <Services />
      <Capabilities />
      <HowItWorks />
      <Offer />
      <WhoFor />
      <Results />
      <Founder />
      <Vision />
      <Faq />
      <CTA />
    </>
  );
}

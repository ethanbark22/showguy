import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/LegalPage";

export const metadata = pageMetadata({ title: "Cookie Policy", path: "/cookies", noindex: true });

export default function Page() {
  return (
    <LegalPage
      title="Cookie Policy"
      sections={[
        { heading: "Replace this page", body: ["List the cookies and similar technologies the site uses, what each is for, and how people can change their choice. Update it whenever you switch on Google Analytics, Meta Pixel or TikTok Pixel."] },
      ]}
    />
  );
}

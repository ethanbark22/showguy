import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/LegalPage";

export const metadata = pageMetadata({ title: "Privacy Policy", path: "/privacy", noindex: true });

export default function Page() {
  return (
    <LegalPage
      title="Privacy Policy"
      sections={[
        { heading: "Replace this page", body: ["Add your approved privacy policy here: who runs SHOWGUY, what personal data the forms collect, why, how long it is kept, who it is shared with, and how people can exercise their rights."] },
      ]}
    />
  );
}

import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/LegalPage";

export const metadata = pageMetadata({ title: "Terms", path: "/terms", noindex: true });

export default function Page() {
  return (
    <LegalPage
      title="Terms"
      sections={[
        { heading: "Replace this page", body: ["Add your approved website terms here, and link your client service agreement if you have one."] },
      ]}
    />
  );
}

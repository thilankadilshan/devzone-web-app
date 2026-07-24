import { Metadata } from "next";
import ContactContent from "../../components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact | Thilanka Dilshan",
  description:
    "Get in touch with Thilanka Dilshan for freelance projects, collaborations, or just to say hi.",
};

export default function ContactPage() {
  return (
    <main>
      <ContactContent />
    </main>
  );
}

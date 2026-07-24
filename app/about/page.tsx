import { Metadata } from "next";
import AboutContent from "../../components/about/AboutContent";

export const metadata: Metadata = {
  title: "About | Thilanka Dilshan",
  description:
    "Software Engineer based in Sri Lanka. BSc from University of Plymouth. Building scalable digital experiences at Sharper Labs.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutContent />
    </main>
  );
}

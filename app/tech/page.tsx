import { Metadata } from "next";
import TechContent from "../../components/tech/TechContent";
export const metadata: Metadata = {
  title: "Tech Stack & Expertise | Thilanka Dilshan",
  description:
    "Explore the technologies, tools, and engineering expertise behind Thilanka Dilshan's digital solutions — from MERN stack and Laravel to DevOps and Mobile Development.",
};

export default function TechPage() {
  return (
    <main>
      <TechContent />
    </main>
  );
}

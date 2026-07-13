import type { Metadata } from "next";
import Projects from "../../components/sections/Projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Thilanka Dilshan's portfolio of web applications — AI Stock Agent, Red Carpet VIP, VJ Fans Club, and CeyloneTourify. Built with Next.js, TypeScript, and passion.",
  openGraph: {
    title: "Projects | Thilanka Dilshan",
    description: "Four builds. Four stories. Full project breakdowns.",
  },
};

export default function ProjectsPage() {
  return <Projects />;
}

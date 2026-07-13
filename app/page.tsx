import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import TechStack from "../components/sections/TechStack";
import ProjectsPreview from "../components/sections/ProjectsPreview";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <TechStack />
      <ProjectsPreview />
    </>
  );
}

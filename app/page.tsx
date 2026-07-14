import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import TechStack from "../components/sections/TechStack";
import ProjectsPreview from "../components/sections/ProjectsPreview";
import ContentCreator from "../components/sections/ContentCreator";
import Contact from "../components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <TechStack />
      <ContentCreator />
      <ProjectsPreview />
      <Contact />
    </>
  );
}

import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import TechStack from "../components/sections/TechStack";
import ProjectsPreview from "../components/sections/ProjectsPreview";
import ContentCreator from "../components/sections/ContentCreator";
import Contact from "../components/sections/Contact";
import ProfilePageSchema from "../components/seo/ProfilePageSchema";

export default function Home() {
  return (
    <>
      <ProfilePageSchema />
      <Hero />
      <About />
      <TechStack />
      <ContentCreator />
      <ProjectsPreview />
      <Contact />
    </>
  );
}

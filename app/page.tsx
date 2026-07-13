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
      {/* Next scenes coming soon... */}
      <section
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ color: "var(--text-muted)", fontSize: "2rem" }}>
          Projects loading...
        </p>
      </section>
    </>
  );
}

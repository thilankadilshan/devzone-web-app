import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import TechStack from "../components/sections/TechStack";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <TechStack />
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

import Hero from "../components/sections/Hero";

export default function Home() {
  return (
    <>
      <Hero />
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
          More scenes loading...
        </p>
      </section>
    </>
  );
}

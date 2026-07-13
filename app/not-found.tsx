import Link from "next/link";

export default function NotFound() {
  return (
    <section style={{ padding: "10rem 2rem", textAlign: "center" }}>
      <h1
        style={{
          fontSize: "6rem",
          fontWeight: 900,
          color: "var(--accent)",
          margin: 0,
        }}
      >
        404
      </h1>
      <p style={{ color: "var(--text-muted)", margin: "1rem 0 2rem" }}>
        This scene doesn&apos;t exist.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-block",
          padding: "0.9rem 2rem",
          border: "1px solid rgba(229, 9, 20, 0.4)",
          borderRadius: "100px",
          color: "var(--text-main)",
          textDecoration: "none",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "1px",
          fontSize: "0.85rem",
        }}
      >
        Back to Home
      </Link>
    </section>
  );
}

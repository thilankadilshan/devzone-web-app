"use client";

import { useRouter } from "next/navigation";

interface Category {
  slug: string;
  name: string;
}

export default function CategoryFilter({
  categories,
  activeCategory,
}: {
  categories: Category[];
  activeCategory: string;
}) {
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = e.target.value;
    if (slug) {
      router.push(`/blog?category=${encodeURIComponent(slug)}`);
    } else {
      router.push("/blog");
    }
  };

  return (
    <div style={styles.categoryFilter}>
      <select
        value={activeCategory}
        onChange={handleChange}
        style={styles.categorySelect}
      >
        {/* FIX: Forced dark background and light text on the dropdown options */}
        <option value="" style={styles.option}>
          All Categories
        </option>
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug} style={styles.option}>
            {cat.name}
          </option>
        ))}
      </select>
      <svg
        style={styles.categoryFilterArrow}
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  categoryFilter: {
    position: "relative",
    minWidth: "180px",
    flexShrink: 0,
  },
  categorySelect: {
    width: "100%",
    padding: "0.875rem 2.5rem 0.875rem 1rem",
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "12px",
    color: "#f0f0f5",
    fontSize: "0.95rem",
    cursor: "pointer",
    appearance: "none",
    WebkitAppearance: "none",
    transition: "all 0.3s ease",
    outline: "none",
  },
  // NEW: Explicit styles for the dropdown items
  option: {
    background: "#0f0f13", // Your var(--bg-secondary)
    color: "#f0f0f5",
    padding: "10px",
  },
  categoryFilterArrow: {
    position: "absolute",
    right: "1rem",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#6b6b7b",
    pointerEvents: "none",
  },
};

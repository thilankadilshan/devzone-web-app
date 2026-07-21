"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/blog?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/blog");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.searchForm}>
      <div style={styles.searchBox}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles..."
          style={styles.searchInput}
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              router.push("/blog");
            }}
            style={styles.searchClear}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
}

const styles = {
  searchForm: {
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto 1.5rem",
  } as React.CSSProperties,

  searchBox: {
    position: "relative" as const,
    display: "flex",
    alignItems: "center",
  } as React.CSSProperties,

  searchInput: {
    width: "100%",
    padding: "0.875rem 2.75rem",
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "12px",
    color: "#f0f0f5",
    fontSize: "0.95rem",
    transition: "all 0.3s ease",
    outline: "none",
  } as React.CSSProperties,

  searchClear: {
    position: "absolute" as const,
    right: "1rem",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    color: "#6b6b7b",
    cursor: "pointer",
    padding: "0.25rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as React.CSSProperties,
};

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import Link from "next/link";
import styles from "@/styles/Dashboard.module.css";

interface PostSearchProps {
  initialSearch: string;
  initialStatus: string;
  totalPosts: number;
}

export default function PostSearch({
  initialSearch,
  initialStatus,
  totalPosts,
}: PostSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(initialSearch);
  const [status, setStatus] = useState(initialStatus);
  const [isPending, startTransition] = useTransition();

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    params.set("status", status);
    params.set("page", "1");

    startTransition(() => {
      router.push(`/dashboard/posts?${params.toString()}`);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.postsToolbar}>
      <div className={styles.searchBar}>
        <div className={styles.searchInputWrapper}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search posts by title, excerpt, or tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className={styles.searchInput}
          />
        </div>

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            const params = new URLSearchParams(searchParams.toString());
            params.set("status", e.target.value);
            params.set("page", "1");
            startTransition(() => {
              router.push(`/dashboard/posts?${params.toString()}`);
            });
          }}
          className={styles.statusSelect}
        >
          <option value="all">All Posts</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
        </select>

        <button
          onClick={handleSearch}
          className={styles.searchBtn}
          disabled={isPending}
        >
          {isPending ? "Searching..." : "Search"}
        </button>
      </div>

      <div className={styles.toolbarRight}>
        <span className={styles.postsCount}>
          {totalPosts} post{totalPosts !== 1 ? "s" : ""}
        </span>
        <Link href="/dashboard/posts/new" className={styles.newPostBtn}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          New Post
        </Link>
      </div>
    </div>
  );
}

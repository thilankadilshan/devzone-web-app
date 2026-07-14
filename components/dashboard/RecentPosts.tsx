"use client";

import Link from "next/link";
import styles from "@/styles/Dashboard.module.css";

export default function RecentPosts() {
  return (
    <div>
      <div className={styles.sectionHeader}>
        <h2>Recent Posts</h2>
        <Link href="/dashboard/posts/new" className={styles.newPostBtn}>
          + New Post
        </Link>
      </div>

      <div className={styles.emptyState}>
        <p>No posts yet. Create your first blog post!</p>
      </div>
    </div>
  );
}

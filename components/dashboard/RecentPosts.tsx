"use client";

import Link from "next/link";
import styles from "@/styles/Dashboard.module.css";

interface Post {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  created_at: string;
  views: number;
}

interface RecentPostsProps {
  posts: Post[];
}

export default function RecentPosts({ posts }: RecentPostsProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div>
      <div className={styles.sectionHeader}>
        <h2>Recent Posts</h2>
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

      {posts.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No posts yet. Create your first blog post!</p>
        </div>
      ) : (
        <div className={styles.recentPostsList}>
          {posts.map((post) => (
            <div key={post.id} className={styles.recentPostItem}>
              <div className={styles.recentPostInfo}>
                <Link
                  href={`/dashboard/posts/${post.id}/edit`}
                  className={styles.recentPostTitle}
                >
                  {post.title}
                </Link>
                <div className={styles.recentPostMeta}>
                  <span
                    className={`${styles.statusBadge} ${post.published ? styles.published : styles.draft}`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                  <span className={styles.recentPostDate}>
                    {formatDate(post.created_at)}
                  </span>
                  <span className={styles.recentPostViews}>
                    {post.views?.toLocaleString() || 0} views
                  </span>
                </div>
              </div>
              <div className={styles.recentPostActions}>
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className={styles.actionBtn}
                  title="View"
                >
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
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </Link>
                <Link
                  href={`/dashboard/posts/${post.id}/edit`}
                  className={styles.actionBtn}
                  title="Edit"
                >
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
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

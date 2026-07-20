"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import styles from "@/styles/Dashboard.module.css";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  published: boolean | null;
  featured: boolean | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  views: number | null;
  tags: string[] | null;
  cover_image: string | null;
  categories?: Category[] | null;
}

interface PostsTableProps {
  posts: Post[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
}

export default function PostsTable({
  posts,
  currentPage,
  totalPages,
  totalPosts,
}: PostsTableProps) {
  const router = useRouter();
  const supabase = createClient();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (
      !confirm(
        `Are you sure you want to delete "${title}"? This cannot be undone.`,
      )
    ) {
      return;
    }

    setDeletingId(id);

    // Use API route instead of direct Supabase
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const result = await response.json();
      alert("Error deleting post: " + (result.error || "Unknown error"));
      setDeletingId(null);
      return;
    }

    router.refresh();
    setDeletingId(null);
  };

  const handleTogglePublish = async (post: Post) => {
    const response = await fetch(`/api/posts/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !post.published }),
    });

    if (!response.ok) {
      const result = await response.json();
      alert("Error updating post: " + (result.error || "Unknown error"));
      return;
    }

    router.refresh();
  };

  const handleToggleFeatured = async (post: Post) => {
    const { error } = await supabase
      .from("posts")
      .update({ featured: !post.featured })
      .eq("id", post.id);

    if (error) {
      alert("Error updating post: " + error.message);
      return;
    }

    router.refresh();
  };

  if (posts.length === 0) {
    return (
      <div className={styles.emptyState}>
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginBottom: "1rem", opacity: 0.3 }}
        >
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
        <p>No posts found. Create your first blog post to get started!</p>
        <Link
          href="/dashboard/posts/new"
          className={styles.newPostBtn}
          style={{ marginTop: "1rem" }}
        >
          Create First Post
        </Link>
      </div>
    );
  }

  const formatDate = (date: string | null) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      <div className={styles.tableWrapper}>
        <table className={styles.postsTable}>
          <thead>
            <tr>
              <th>Post</th>
              <th>Status</th>
              <th>Views</th>
              <th>Published</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr
                key={post.id}
                className={post.published ? "" : styles.draftRow}
              >
                <td className={styles.postCell}>
                  <div className={styles.postInfo}>
                    {post.cover_image && (
                      <img
                        src={post.cover_image}
                        alt=""
                        className={styles.postThumb}
                        loading="lazy"
                      />
                    )}
                    <div className={styles.postMeta}>
                      <span className={styles.postTitle}>{post.title}</span>
                      <span className={styles.postSlug}>/{post.slug}</span>
                      {post.categories && post.categories.length > 0 && (
                        <div className={styles.postTags}>
                          {post.categories.map((cat) => (
                            <span
                              key={cat.id}
                              className={styles.tag}
                              style={{
                                background: "rgba(255, 255, 255, 0.06)",
                                color: "var(--text-muted)",
                              }}
                            >
                              {cat.name}
                            </span>
                          ))}
                        </div>
                      )}
                      {post.tags && post.tags.length > 0 && (
                        <div className={styles.postTags}>
                          {post.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className={styles.tag}>
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className={styles.tag}>
                              +{post.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td>
                  <div className={styles.statusBadges}>
                    <button
                      onClick={() => handleTogglePublish(post)}
                      className={`${styles.statusBadge} ${post.published ? styles.published : styles.draft}`}
                      title={
                        post.published
                          ? "Click to unpublish"
                          : "Click to publish"
                      }
                    >
                      {post.published ? "Published" : "Draft"}
                    </button>
                    {post.featured && (
                      <button
                        onClick={() => handleToggleFeatured(post)}
                        className={`${styles.statusBadge} ${styles.featured}`}
                        title="Click to unfeature"
                      >
                        Featured
                      </button>
                    )}
                    {!post.featured && post.published && (
                      <button
                        onClick={() => handleToggleFeatured(post)}
                        className={`${styles.statusBadge} ${styles.featureBtn}`}
                        title="Click to feature"
                      >
                        Feature
                      </button>
                    )}
                  </div>
                </td>
                <td className={styles.viewsCell}>
                  {post.views?.toLocaleString() || "0"}
                </td>
                <td className={styles.dateCell}>
                  <div className={styles.dateInfo}>
                    <span>
                      {formatDate(post.published_at || post.created_at)}
                    </span>
                    <span className={styles.dateLabel}>
                      {post.published ? "Published" : "Created"}
                    </span>
                  </div>
                </td>
                <td>
                  <div className={styles.actionButtons}>
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className={styles.actionBtn}
                      title="View on site"
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
                      title="Edit post"
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
                    <button
                      onClick={() => handleDelete(post.id, post.title)}
                      className={`${styles.actionBtn} ${styles.deleteBtn}`}
                      disabled={deletingId === post.id}
                      title="Delete post"
                    >
                      {deletingId === post.id ? (
                        <span className={styles.spinner} />
                      ) : (
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
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => {
              const params = new URLSearchParams(window.location.search);
              params.set("page", String(currentPage - 1));
              router.push(`/dashboard/posts?${params.toString()}`);
            }}
            disabled={currentPage <= 1}
            className={styles.pageBtn}
          >
            Previous
          </button>
          <span className={styles.pageInfo}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => {
              const params = new URLSearchParams(window.location.search);
              params.set("page", String(currentPage + 1));
              router.push(`/dashboard/posts?${params.toString()}`);
            }}
            disabled={currentPage >= totalPages}
            className={styles.pageBtn}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPublishedPostsStatic, formatDate } from "@/lib/blog";
import styles from "@/styles/Blog.module.css";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getPublishedPostsStatic();
  const allTags = [...new Set(posts.flatMap((p) => p.tags))];
  return allTags.map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  return {
    title: `Posts tagged #${decodedTag} | Thilanka Dilshan`,
    description: `Articles tagged with #${decodedTag} by Thilanka Dilshan.`,
  };
}

interface PostWithCategories {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  published: boolean;
  tags: string[];
  views: number;
  reading_time: number | null;
  featured: boolean;
  published_at: string | null;
  created_at: string;
  author_name: string;
  author_image: string | null;
  categories?: { name: string; slug: string }[];
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const allPosts = await getPublishedPostsStatic();
  const posts = allPosts.filter((p: PostWithCategories) =>
    p.tags.includes(decodedTag),
  );

  return (
    <main className={styles.blogPage}>
      <section className={styles.blogHero}>
        <div className={styles.blogHeroInner}>
          <span className={styles.blogLabel}>Tag</span>
          <h1 className={styles.blogTitle}>#{decodedTag}</h1>
          <p className={styles.blogDescription}>{posts.length} articles</p>
        </div>
      </section>

      <section className={styles.postsGrid}>
        {posts.length === 0 ? (
          <div className={styles.emptyState}>
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <h3>No articles found</h3>
            <p>No posts tagged with #{decodedTag} yet.</p>
          </div>
        ) : (
          posts.map((post: PostWithCategories) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className={styles.postCard}
            >
              <div className={styles.postCardImage}>
                {post.cover_image ? (
                  <Image
                    src={post.cover_image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    priority={post.featured}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%)",
                    }}
                  />
                )}
                {post.featured && (
                  <span className={styles.postCardFeatured}>Featured</span>
                )}
                <div className={styles.postCardOverlay} />
              </div>

              <div className={styles.postCardContent}>
                {post.categories && post.categories.length > 0 && (
                  <span className={styles.postCardCategory}>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                      <line x1="7" y1="7" x2="7.01" y2="7" />
                    </svg>
                    {post.categories[0].name}
                  </span>
                )}

                <h2 className={styles.postCardTitle}>{post.title}</h2>

                {post.excerpt && (
                  <p className={styles.postCardExcerpt}>{post.excerpt}</p>
                )}

                <div className={styles.postCardMeta}>
                  <span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {formatDate(post.published_at || post.created_at)}
                  </span>
                  <span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    {post.views.toLocaleString()} views
                  </span>
                </div>

                <div className={styles.postCardFooter}>
                  <div className={styles.postCardAuthor}>
                    {post.author_image ? (
                      <Image
                        src={post.author_image}
                        alt={post.author_name}
                        width={28}
                        height={28}
                        className="rounded-full"
                      />
                    ) : (
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #e50914, #b20710)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          color: "#fff",
                        }}
                      >
                        {post.author_name.charAt(0)}
                      </div>
                    )}
                    <span>{post.author_name}</span>
                  </div>
                  <span className={styles.postCardReadTime}>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {post.reading_time || 5} min read
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </section>
    </main>
  );
}

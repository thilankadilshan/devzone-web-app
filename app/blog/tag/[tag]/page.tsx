import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPublishedPosts, formatDate } from "@/lib/blog";
import styles from "@/styles/Blog.module.css";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
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

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const allPosts = await getPublishedPosts();
  const posts = allPosts.filter((p) => p.tags.includes(decodedTag));

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
        {posts.map((post) => (
          // Same post card as blog listing
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className={styles.postCard}
          >
            {/* ... post card content */}
          </Link>
        ))}
      </section>
    </main>
  );
}

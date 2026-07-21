import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import {
  getPostBySlugStatic,
  getAllPostSlugs,
  getRelatedPostsStatic,
  formatDate,
  formatDateISO,
  calculateReadingTime,
} from "@/lib/blog";
import styles from "@/styles/BlogPost.module.css";
import ViewTracker from "@/components/blog/ViewTracker";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlugStatic(slug);

  if (!post) {
    return {
      title: "Post Not Found | Thilanka Dilshan",
    };
  }

  const title = post.meta_title || post.title;
  const description =
    post.meta_description ||
    post.excerpt ||
    "Read this article by Thilanka Dilshan.";
  const url = `https://thilankadilshan.vercel.app/blog/${post.slug}`;
  const ogImage = post.og_image || post.cover_image || "/images/og-image.jpg";

  return {
    title: `${title} | Thilanka Dilshan`,
    description,
    keywords: [
      ...post.tags,
      "Thilanka Dilshan",
      "Software Engineer",
      "web development",
    ],
    alternates: {
      canonical: post.canonical_url || url,
    },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      publishedTime: formatDateISO(post.published_at),
      modifiedTime: formatDateISO(post.updated_at),
      authors: [post.author_name],
      tags: post.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@thilankadilshan",
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlugStatic(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPostsStatic(post.slug, post.tags, 3);

  const readingTime = post.reading_time || calculateReadingTime(post.content);
  const publishedDate = formatDate(post.published_at || post.created_at);
  const publishedISO = formatDateISO(post.published_at || post.created_at);
  const updatedISO = formatDateISO(post.updated_at);

  const siteUrl = "https://thilankadilshan.vercel.app";
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || post.meta_description,
    image: post.cover_image || `${siteUrl}/images/og-image.jpg`,
    datePublished: publishedISO,
    dateModified: updatedISO,
    author: {
      "@type": "Person",
      name: post.author_name,
      description: post.author_bio,
      image: post.author_image || `${siteUrl}/images/og-image.jpg`,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Thilanka Dilshan",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/og-image.jpg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    keywords: post.tags.join(", "),
    articleSection: post.categories?.[0]?.name || "Technology",
    wordCount: post.content.split(/\s+/).length,
    timeRequired: `PT${readingTime}M`,
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
  };

  return (
    <main className={styles.postPage}>
      <ViewTracker slug={slug} />

      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Article Header */}
      <header className={styles.articleHeader}>
        <div className={styles.articleHeaderInner}>
          <nav className={styles.articleBreadcrumb}>
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/blog">Blog</Link>
            <span>/</span>
            <span style={{ color: "var(--text-muted)" }}>{post.title}</span>
          </nav>

          {post.categories && post.categories.length > 0 && (
            <span className={styles.articleCategory}>
              <svg
                width="14"
                height="14"
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

          <h1 className={styles.articleTitle}>{post.title}</h1>

          {post.excerpt && (
            <p className={styles.articleExcerpt}>{post.excerpt}</p>
          )}

          <div className={styles.articleMeta}>
            <span className={styles.articleAuthor}>
              {post.author_image ? (
                <Image
                  src={post.author_image}
                  alt={post.author_name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <div className={styles.articleAuthorAvatar}>
                  {post.author_name.charAt(0)}
                </div>
              )}
              <span>{post.author_name}</span>
            </span>
            <span className={styles.articleMetaDivider} />
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
              {publishedDate}
            </span>
            <span className={styles.articleMetaDivider} />
            <span>
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
              {readingTime} min read
            </span>
            <span className={styles.articleMetaDivider} />
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
        </div>
      </header>

      {/* Cover Image */}
      {post.cover_image && (
        <div className={styles.articleCover}>
          <div className={styles.articleCoverImage}>
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              sizes="(max-width: 1100px) 100vw, 1100px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Article Content */}
      <article
        className={styles.articleContent}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className={styles.articleTags}>
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${encodeURIComponent(tag)}`}
              className={styles.articleTag}
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}

      {/* Share */}
      <div className={styles.articleShare}>
        <h3>Share this article</h3>
        <div className={styles.shareButtons}>
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.shareBtn}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Twitter
          </a>
          <a
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.shareBtn}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
          <a
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.shareBtn}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </a>
        </div>
      </div>

      {/* Author Bio */}
      <div className={styles.authorBio}>
        {post.author_image ? (
          <Image
            src={post.author_image}
            alt={post.author_name}
            width={64}
            height={64}
            className={styles.authorBioImage}
          />
        ) : (
          <div className={styles.authorBioImagePlaceholder}>
            {post.author_name.charAt(0)}
          </div>
        )}
        <div className={styles.authorBioContent}>
          <h4>{post.author_name}</h4>
          <p>
            {post.author_bio ||
              "Software Engineer at Sharper Labs. MERN, TypeScript, Laravel. Sharing what I learn."}
          </p>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className={styles.relatedPosts}>
          <h3>Related Articles</h3>
          <div className={styles.relatedGrid}>
            {relatedPosts.map((related) => (
              <Link
                key={related.id}
                href={`/blog/${related.slug}`}
                className={styles.postCard}
              >
                <div className={styles.postCardImage}>
                  {related.cover_image ? (
                    <Image
                      src={related.cover_image}
                      alt={related.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
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
                  <div className={styles.postCardOverlay} />
                </div>
                <div className={styles.postCardContent}>
                  <h4 className={styles.postCardTitle}>{related.title}</h4>
                  <div className={styles.postCardMeta}>
                    <span>
                      {formatDate(related.published_at || related.created_at)}
                    </span>
                    <span>{related.reading_time || 5} min read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

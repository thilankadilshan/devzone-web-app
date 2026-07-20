import { getPublishedPosts, formatDateISO } from "@/lib/blog";

export async function GET() {
  const posts = await getPublishedPosts();
  const siteUrl = "https://thilankadilshan.vercel.app";

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Thilanka Dilshan | Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Articles on MERN stack, TypeScript, Next.js, Laravel, Prisma, and modern web development by Thilanka Dilshan.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${siteUrl}/images/og-image.jpg</url>
      <title>Thilanka Dilshan | Blog</title>
      <link>${siteUrl}/blog</link>
    </image>
    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.published_at || post.created_at).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt || post.meta_description || ""}]]></description>
      <content:encoded><![CDATA[${post.content}]]></content:encoded>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join("\n      ")}
      <author>${post.author_name}</author>
    </item>`,
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

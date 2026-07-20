// import { MetadataRoute } from "next";

// export default function sitemap(): MetadataRoute.Sitemap {
//   return [
//     {
//       url: "https://thilankadilshan.vercel.app",
//       lastModified: new Date(),
//       changeFrequency: "weekly",
//       priority: 1,
//     },
//   ];
// }

import { getAllPostSlugs } from "@/lib/blog";

export default async function sitemap() {
  const siteUrl = "https://thilankadilshan.vercel.app";

  const staticRoutes = [
    { url: `${siteUrl}/`, lastModified: new Date(), priority: 1.0 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), priority: 0.9 },
  ];

  const slugs = await getAllPostSlugs();
  const blogRoutes = slugs.map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes];
}

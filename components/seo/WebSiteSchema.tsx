export default function WebSiteSchema() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Thilanka Dilshan",
    url: "https://thilankadilshan.vercel.app",
    description:
      "Official portfolio of Thilanka Dilshan - Software Engineer, Content Creator, and Singer from Sri Lanka.",
    publisher: {
      "@type": "Person",
      name: "Thilanka Dilshan",
      url: "https://thilankadilshan.vercel.app",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://thilankadilshan.vercel.app/blog?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en",
    copyrightHolder: {
      "@type": "Person",
      name: "Thilanka Dilshan",
    },
    copyrightYear: 2026,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
    />
  );
}

export default function PersonSchema() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Thilanka Dilshan",
    alternateName: "Dilshan DevZone",
    url: "https://thilankadilshan.vercel.app",
    image: "https://thilankadilshan.vercel.app/images/profile.jpg",
    jobTitle: "Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Sharper Labs",
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "University of Plymouth",
        url: "https://www.plymouth.ac.uk",
      },
      {
        "@type": "EducationalOrganization",
        name: "NSBM Green University",
        url: "https://www.nsbm.ac.lk",
      },
    ],
    knowsAbout: [
      "MERN Stack Development",
      "TypeScript",
      "Next.js",
      "React",
      "Laravel",
      "Prisma",
      "Node.js",
      "MongoDB",
      "Software Engineering",
      "Full-Stack Development",
    ],
    sameAs: [
      "https://www.linkedin.com/in/thilankadilshan",
      "https://github.com/thilankadilshan",
      "https://www.youtube.com/@DilshanDevZone",
      "https://twitter.com/thilankadilshan",
    ],
    nationality: {
      "@type": "Country",
      name: "Sri Lanka",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}

export default function ProfilePageSchema() {
  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Thilanka Dilshan",
      alternateName: ["Dilshan DevZone", "TD"],
      url: "https://thilankadilshan.vercel.app/",
      image: "https://thilankadilshan.vercel.app/images/profile.jpg",
      jobTitle: ["Software Engineer", "Web Developer"],
      description:
        "Thilanka Dilshan is a Software Engineer, Web Developer, Content Creator, and Singer from Nochchiyagama, Anuradhapura, Sri Lanka. He specializes in full-stack web development, creates content on YouTube and TikTok, and shares his singing talent. Graduate of NSBM Green University and University of Plymouth.",
      worksFor: {
        "@type": "Organization",
        name: "Sharper Labs",
        url: "https://sharperlabs.com",
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
        "Web Development",
        "Full-Stack Development",
        "Content Creation",
        "YouTube Content Creation",
        "Social Media Marketing",
        "Singing",
        "Music Production",
      ],
      sameAs: [
        "https://www.linkedin.com/in/thilanka-dilshan",
        "https://github.com/thilankadilshan",
        "https://www.youtube.com/@DilshanDevZone",
        "https://x.com/thilankadshan",
        "https://www.tiktok.com/@thilanka.dilshan",
        "https://www.instagram.com/thilankadilshann",
        "https://facebook.com/thilankadilshann",
        "https://thilankadilshan.vercel.app/",
      ],
      nationality: {
        "@type": "Country",
        name: "Sri Lanka",
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "Sri Lanka",
        addressLocality: "Nochchiyagama, Anuradhapura",
        addressRegion: "North Central Province",
      },
      birthPlace: {
        "@type": "Place",
        name: "Sri Lanka",
      },
      gender: "Male",
      email: "mailto:thilanka.cv@gmail.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
    />
  );
}

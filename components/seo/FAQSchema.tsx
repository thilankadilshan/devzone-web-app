export default function FAQSchema() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who is Thilanka Dilshan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Thilanka Dilshan is a 23-year-old Software Engineer, Web Developer, Content Creator, and Singer from Nochchiyagama, Anuradhapura, Sri Lanka. He specializes in full-stack web development using the MERN stack, TypeScript, Laravel, and Prisma. He is a graduate of NSBM Green University and Plymouth University, and the founder of Dilshan DevZone.",
        },
      },
      {
        "@type": "Question",
        name: "What does Thilanka Dilshan do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Thilanka Dilshan works as a Software Engineer and Web Developer at Sharper Labs, building scalable web applications. He is also a content creator on YouTube (Dilshan DevZone), TikTok, Instagram, and Facebook, sharing tech tutorials, lifestyle content, and singing videos.",
        },
      },
      {
        "@type": "Question",
        name: "Where is Thilanka Dilshan from?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Thilanka Dilshan is from Nochchiyagama, Anuradhapura District, in the North Central Province of Sri Lanka. He is a proud Sri Lankan developer and content creator representing the country on the global stage.",
        },
      },
      {
        "@type": "Question",
        name: "Is Thilanka Dilshan a singer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Thilanka Dilshan is a singer from Sri Lanka. He posts singing videos and music-related content on his social media platforms including YouTube, TikTok, and Instagram. He combines his passion for music with his tech career and content creation.",
        },
      },
      {
        "@type": "Question",
        name: "Where did Thilanka Dilshan study?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Thilanka Dilshan studied at NSBM Green University in Sri Lanka and graduated with a degree awarded by the University of Plymouth (Plymouth Uni).",
        },
      },
      {
        "@type": "Question",
        name: "What technologies does Thilanka Dilshan use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Thilanka Dilshan specializes in the MERN stack (MongoDB, Express.js, React, Node.js), TypeScript, Next.js, Laravel, Prisma ORM, MySQL, PostgreSQL, and modern frontend technologies. He also works with Python, Java, C#, Flutter, and various cloud platforms.",
        },
      },
      {
        "@type": "Question",
        name: "How can I contact Thilanka Dilshan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can contact Thilanka Dilshan through his portfolio website at thilankadilshan.vercel.app/contact, via email at thilanka.cv@gmail.com, or through his social media profiles on LinkedIn, Twitter/X, Instagram, and Facebook.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}

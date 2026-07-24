"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import TechStack from "../sections/TechStack";
import styles from "../../styles/TechPage.module.css";

const comprehensiveExpertise = [
  {
    category: "Languages & Core Web",
    icon: "💻",
    skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", "PHP", "Java"],
    description:
      "Solid foundational languages driving both client-side interactivity and robust server-side architecture.",
  },
  {
    category: "Frontend Frameworks & Ecosystem",
    icon: "⚛️",
    skills: [
      "React",
      "Next.js",
      "MERN Stack",
      "Angular",
      "Astro",
      "Svelte",
      "Laravel Blade",
      "GSAP & Framer Motion",
    ],
    description:
      "Creating blazing-fast, cinematic, and modern user interfaces with smooth animations and server-side rendering.",
  },
  {
    category: "Mobile App Development",
    icon: "📱",
    skills: [
      "React Native",
      "Flutter",
      "Dart",
      "Cross-Platform UI",
      "Mobile State Management",
    ],
    description:
      "Developing cross-platform mobile applications for Android and iOS delivering native-level performance.",
  },
  {
    category: "Backend, Databases & BaaS",
    icon: "🗄️",
    skills: [
      "Node.js",
      "Express",
      "Laravel",
      "Prisma ORM",
      "PostgreSQL",
      "MongoDB",
      "Supabase",
      "Firebase",
      "XAMPP",
    ],
    description:
      "Designing scalable relational and non-relational database schemas, authentication systems, and secure API endpoints.",
  },
  {
    category: "AI & Modern SDKs",
    icon: "🤖",
    skills: [
      "Gemini API",
      "Vercel AI SDK",
      "Generative AI Integration",
      "AI-Assisted Workflows",
    ],
    description:
      "Integrating next-generation intelligence, real-time analytics, and automated features directly into web platforms.",
  },
  {
    category: "DevOps & Infrastructure",
    icon: "🚀",
    skills: [
      "CI/CD Pipelines",
      "GitHub Actions",
      "Docker",
      "Vercel",
      "AWS Cloud",
      "DNS Management",
      "Postman API Testing",
    ],
    description:
      "Automating deployment workflows, containerizing microservices, managing cloud hosting, and ensuring 99.9% uptime.",
  },
  {
    category: "Design, Tools & Prototyping",
    icon: "🎨",
    skills: [
      "Figma",
      "LottieFiles",
      "Replit (Prototyping)",
      "Git & GitHub Version Control",
      "Audacity",
    ],
    description:
      "Translating wireframes into pixel-perfect web components, managing version control branches, and handling media assets.",
  },
  {
    category: "SEO & Quality Assurance",
    icon: "🔍",
    skills: [
      "Search Engine Optimization",
      "Core Web Vitals",
      "API Validation",
      "Manual & Automated QA",
      "Performance Auditing",
    ],
    description:
      "Optimizing sites for search engine indexing, executing rigorous bug testing, and maintaining elite performance metrics.",
  },
];

export default function TechContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.heroTitle} span`,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.2,
        },
      );
      gsap.fromTo(
        `.${styles.heroSubtitle}`,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: "power2.out" },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={styles.techPage}>
      <div className={styles.ambientGlowRed} />
      <div className={styles.ambientGlowBlue} />

      {/* --- HERO SECTION --- */}
      <section className={styles.heroSection}>
        <div className={styles.heroBgWrap}>
          <img
            src="/images/tech-bg.jpg"
            alt="Tech Hero Background"
            className={styles.heroBgImage}
          />
          <div className={styles.heroBgOverlay} />
        </div>

        <div className={styles.heroContent}>
          <span className={styles.label}>Engineering Arsenal</span>
          <h1 className={styles.heroTitle}>
            <span>Full-Stack</span>
            <span>Architecture &amp;</span>
            <span className={styles.accentText}>Capabilities.</span>
          </h1>
          <p className={styles.heroSubtitle}>
            The complete spectrum of technologies, languages, deployment
            pipelines, and quality assurance standards I utilize to engineer
            production-ready digital solutions.
          </p>
        </div>
      </section>

      {/* --- TECH STACK COMPONENT --- */}
      <div className={styles.techStackWrapper}>
        <TechStack />
      </div>

      {/* --- COMPREHENSIVE EXPERTISE GRID --- */}
      <section className={styles.expertiseSection}>
        <div className={styles.sectionHeader}>
          <h2>Comprehensive Tech Stack</h2>
          <p>
            Every language, framework, tool, and pipeline mastered throughout my
            career.
          </p>
        </div>

        <div className={styles.expertiseGrid}>
          {comprehensiveExpertise.map((area, index) => (
            <motion.div
              key={area.category}
              className={styles.expertiseCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              whileHover={{ y: -5, borderColor: "rgba(229, 9, 20, 0.3)" }}
            >
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>{area.icon}</span>
                <h3>{area.category}</h3>
              </div>
              <p className={styles.cardDescription}>{area.description}</p>

              <div className={styles.skillsTagList}>
                {area.skills.map((skill) => (
                  <span key={skill} className={styles.skillTag}>
                    {skill}
                  </span>
                ))}
              </div>

              <div className={styles.cardGlow} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../../styles/Projects.module.css";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  liveUrl: string;
  image: string;
  accent: string;
  sceneNumber: string;
}

const projects: Project[] = [
  {
    id: "ai-stock-agent",
    title: "AI Stock Agent",
    tagline: "Intelligence Meets the Market",
    description:
      "An AI-powered stock analysis platform that delivers real-time market insights, predictive analytics, and intelligent portfolio recommendations. Built with Next.js 16 and the Vercel AI SDK.",
    tech: ["Next.js", "TypeScript", "Vercel AI SDK", "Tailwind"],
    liveUrl: "https://ai-stock-agent.vercel.app/",
    image: "/images/project-ai-stock.png",
    accent: "#00d4aa",
    sceneNumber: "03",
  },
  {
    id: "red-carpet",
    title: "Red Carpet VIP",
    tagline: "Where Luxury Meets Digital",
    description:
      "A premium VIP experience platform designed for exclusive events and high-end clientele. Elegant interfaces, seamless booking, and a touch of Hollywood glamour in every interaction.",
    tech: ["Next.js", "TypeScript", "Framer Motion", "GSAP"],
    liveUrl: "https://red-carpet.vip/",
    image: "/images/project-red-carpet.png",
    accent: "#e50914",
    sceneNumber: "04",
  },
  {
    id: "vjfans",
    title: "VJ Fans Club",
    tagline: "The Movement Has Begun",
    description:
      "A sleek, minimal fan community platform celebrating actor VJ's legacy. Global connectivity, exclusive content, and community-driven experiences for fans worldwide.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    liveUrl: "https://vjfans.club/",
    image: "/images/project-vjfans.png",
    accent: "#f5f5f5",
    sceneNumber: "05",
  },
  {
    id: "ceylonetourify",
    title: "CeyloneTourify",
    tagline: "Discover Paradise",
    description:
      "A travel adventure platform showcasing the beauty of Sri Lanka. From ancient temples to pristine beaches, curated itineraries and immersive experiences for wanderlust souls.",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    liveUrl: "https://ceylonetourify.vercel.app/",
    image: "/images/project-ceylone.png",
    accent: "#ff9f43",
    sceneNumber: "06",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    if (!card || !image || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 100, rotateX: isEven ? 8 : -8 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 40%",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        image,
        { scale: 1.2, y: 50 },
        {
          scale: 1,
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      const contentChildren = content.querySelectorAll(`.${styles.animateIn}`);
      gsap.fromTo(
        contentChildren,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, card);

    return () => ctx.revert();
  }, [isEven]);

  return (
    <div
      ref={cardRef}
      className={`${styles.projectCard} ${isEven ? styles.cardLeft : styles.cardRight}`}
      style={{ "--project-accent": project.accent } as React.CSSProperties}
    >
      <span className={styles.sceneNumber}>{project.sceneNumber}</span>

      <div className={styles.imageSide}>
        <div ref={imageRef} className={styles.imageWrapper}>
          {/* REAL IMAGE - REPLACES PLACEHOLDER */}
          <img
            src={project.image}
            alt={`${project.title} - Project by Thilanka Dilshan`}
            className={styles.projectImage}
            loading="lazy"
          />
          <div className={styles.imageOverlay} />
          <div
            className={styles.accentGlow}
            style={{ backgroundColor: project.accent }}
          />
        </div>
      </div>

      <div ref={contentRef} className={styles.contentSide}>
        <span className={`${styles.animateIn} ${styles.projectLabel}`}>
          Featured Project
        </span>
        <h3 className={`${styles.animateIn} ${styles.projectTitle}`}>
          {project.title}
        </h3>
        <p className={`${styles.animateIn} ${styles.projectTagline}`}>
          {project.tagline}
        </p>
        <p className={`${styles.animateIn} ${styles.projectDescription}`}>
          {project.description}
        </p>

        <div className={`${styles.animateIn} ${styles.techStack}`}>
          {project.tech.map((t) => (
            <span key={t} className={styles.techBadge}>
              {t}
            </span>
          ))}
        </div>

        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.animateIn} ${styles.projectLink}`}
        >
          <span>View Live Site</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const progress = progressRef.current;
    if (!section || !title || !progress) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        title,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        progress,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.projects} id="projects">
      <div ref={progressRef} className={styles.progressBar} />
      <div className={styles.bgGradient} />

      <div ref={titleRef} className={styles.titleSection}>
        <span className={styles.sectionLabel}>The Reel</span>
        <h2 className={styles.heading}>Featured Works</h2>
        <p className={styles.subtitle}>
          Four projects. Four stories. Built with precision and passion.
        </p>
      </div>

      <div className={styles.projectsContainer}>
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

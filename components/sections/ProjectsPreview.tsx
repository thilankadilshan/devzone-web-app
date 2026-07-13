"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import styles from "../../styles/ProjectsPreview.module.css";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  tagline: string;
  image: string;
  accent: string;
}

const projects: Project[] = [
  {
    id: "ai-stock-agent",
    title: "AI Stock Agent",
    tagline: "Intelligence Meets the Market",
    image: "/images/project-ai-stock.png",
    accent: "#00d4aa",
  },
  {
    id: "red-carpet",
    title: "Red Carpet VIP",
    tagline: "Where Luxury Meets Digital",
    image: "/images/project-red-carpet.png",
    accent: "#e50914",
  },
  {
    id: "vjfans",
    title: "VJ Fans Club",
    tagline: "The Movement Has Begun",
    image: "/images/project-vjfans.png",
    accent: "#f5f5f5",
  },
  {
    id: "ceylonetourify",
    title: "CeyloneTourify",
    tagline: "Discover Paradise",
    image: "/images/project-ceylone.png",
    accent: "#ff9f43",
  },
];

function PreviewCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, card);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={styles.card}
      style={{ "--card-accent": project.accent } as React.CSSProperties}
    >
      <div className={styles.cardImageWrap}>
        <img
          src={project.image}
          alt={`${project.title} - Project by Thilanka Dilshan`}
          className={styles.cardImage}
          loading="lazy"
        />
        <div className={styles.cardOverlay} />
        <div
          className={styles.cardAccentGlow}
          style={{ backgroundColor: project.accent }}
        />
      </div>

      <div className={styles.cardContent}>
        <span className={styles.cardNumber}>0{index + 3}</span>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardTagline}>{project.tagline}</p>
      </div>

      <a
        href={`https://${project.id === "ai-stock-agent" ? "ai-stock-agent.vercel.app" : project.id === "red-carpet" ? "red-carpet.vip" : project.id === "vjfans" ? "vjfans.club" : "ceylonetourify.vercel.app"}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.cardLiveLink}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 17L17 7" />
          <path d="M7 7h10v10" />
        </svg>
      </a>
    </div>
  );
}

export default function ProjectsPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        title,
        { y: 50, opacity: 0 },
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
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.preview} id="projects">
      <div className={styles.bgGradient} />

      <div ref={titleRef} className={styles.titleSection}>
        <span className={styles.sectionLabel}>The Reel</span>
        <h2 className={styles.heading}>Featured Works</h2>
        <p className={styles.subtitle}>
          Four builds. Four stories. One engineer.
        </p>
      </div>

      <div className={styles.grid}>
        {projects.map((project, index) => (
          <PreviewCard key={project.id} project={project} index={index} />
        ))}
      </div>

      <div className={styles.ctaWrap}>
        <Link href="/projects" className={styles.showMoreBtn}>
          <span>View Full Reel</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

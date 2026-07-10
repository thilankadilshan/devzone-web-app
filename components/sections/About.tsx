"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../../styles/About.module.css";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: "Years Coding", value: 4, suffix: "+" },
  { label: "Projects Shipped", value: 15, suffix: "+" },
  { label: "Cups of Coffee", value: 999, suffix: "+" },
  { label: "F1 Races Watched", value: 50, suffix: "+" },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const text = textRef.current;
    const statsEl = statsRef.current;

    if (!section || !image || !text || !statsEl) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=250%",
        pin: true,
        scrub: 1,
      },
    });

    // PHASE 1: Image slides in from left, silhouette to reveal (0% to 30%)
    tl.fromTo(
      image,
      { x: "-100%", opacity: 0, filter: "brightness(0) blur(10px)" },
      {
        x: "0%",
        opacity: 1,
        filter: "brightness(1) blur(0px)",
        ease: "power2.out",
      },
      0,
    );

    // PHASE 2: Text reveals line by line (20% to 50%)
    const textLines = text.querySelectorAll(`.${styles.revealLine}`);
    textLines.forEach((line, i) => {
      tl.fromTo(
        line,
        { y: 40, opacity: 0, filter: "blur(4px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", ease: "power2.out" },
        0.2 + i * 0.08,
      );
    });

    // PHASE 3: Stats count up and slide in (50% to 80%)
    const statItems = statsEl.querySelectorAll(`.${styles.statItem}`);
    statItems.forEach((stat, i) => {
      tl.fromTo(
        stat,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.out" },
        0.5 + i * 0.06,
      );
    });

    // PHASE 4: Everything fades, section exits (80% to 100%)
    tl.to(
      [image, text, statsEl],
      { opacity: 0, y: -50, ease: "power2.in" },
      0.8,
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.about} id="about">
      {/* Background accent */}
      <div className={styles.bgAccent} />

      <div className={styles.container}>
        {/* Image Side */}
        <div ref={imageRef} className={styles.imageSide}>
          <div className={styles.imageWrapper}>
            <img src="/images/profile.jpg" alt="Thilanka Dilshan" />
            <div className={styles.imageOverlay} />
            <div className={styles.imageBorder} />
          </div>
          <div className={styles.imageGlow} />
        </div>

        {/* Text Side */}
        <div ref={textRef} className={styles.textSide}>
          <span className={`${styles.revealLine} ${styles.sectionLabel}`}>
            01 — About
          </span>

          <h2 className={`${styles.revealLine} ${styles.heading}`}>
            The Engineer
            <br />
            Behind the Code
          </h2>

          <p className={`${styles.revealLine} ${styles.paragraph}`}>
            I'm Thilanka Dilshan, a 23-year-old Software Engineer from Sri
            Lanka, crafting digital experiences at Sharper Labs since May 2025.
          </p>

          <p className={`${styles.revealLine} ${styles.paragraph}`}>
            Graduated BSc Computer Science from University of Plymouth (UK) via
            NSBM Green University in December 2025. I build with MERN,
            TypeScript, Laravel, and Prisma — no Tailwind unless the stack
            demands it.
          </p>

          <p className={`${styles.revealLine} ${styles.paragraph}`}>
            When I'm not shipping code, I'm running Dilshan DevZone on YouTube,
            watching F1, or leading the Next Gen youth club. I believe in clean
            architecture, aggressive performance, and interfaces that feel like
            movies.
          </p>

          <div className={`${styles.revealLine} ${styles.signature}`}>
            <span>Thilanka Dilshan</span>
            <div className={styles.signatureLine} />
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div ref={statsRef} className={styles.statsBar}>
        {stats.map((stat, i) => (
          <div key={i} className={styles.statItem}>
            <span className={styles.statValue}>
              <Counter from={0} to={stat.value} />
              {stat.suffix}
            </span>
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// Animated counter component
function Counter({ from, to }: { from: number; to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView || !ref.current) return;

    const node = ref.current;
    const duration = 2000;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = Math.floor(from + (to - from) * eased);
      node.textContent = current.toString();

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, from, to]);

  return <span ref={ref}>{from}</span>;
}

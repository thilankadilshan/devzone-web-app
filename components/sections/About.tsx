"use client";

import { useRef, useEffect, useState } from "react";
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
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const section = sectionRef.current;
    const image = imageRef.current;
    const text = textRef.current;
    const statsEl = statsRef.current;

    if (!section || !image || !text || !statsEl) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 0.5,
      },
    });

    tl.fromTo(
      image,
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, ease: "power2.out" },
      0,
    );

    const textLines = text.querySelectorAll(`.${styles.revealLine}`);
    textLines.forEach((line, i) => {
      tl.fromTo(
        line,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.out" },
        0.1 + i * 0.05,
      );
    });

    const statItems = statsEl.querySelectorAll(`.${styles.statItem}`);
    statItems.forEach((stat, i) => {
      tl.fromTo(
        stat,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.out" },
        0.35 + i * 0.04,
      );
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
    };
  }, [ready]);

  return (
    <section ref={sectionRef} className={styles.about} id="about">
      <div className={styles.bgImage} />
      <div className={styles.bgOverlay} />

      <div className={styles.contentWrapper}>
        <div className={styles.container}>
          <div ref={imageRef} className={styles.imageSide}>
            <div className={styles.imageWrapper}>
              <img src="/images/profile.jpg" alt="Thilanka Dilshan" />
              <div className={styles.imageOverlay} />
              <div className={styles.imageBorder} />
            </div>
            <div className={styles.imageGlow} />
          </div>

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
              Lanka, crafting digital experiences at Sharper Labs since May
              2025.
            </p>

            <p className={`${styles.revealLine} ${styles.paragraph}`}>
              Graduated BSc Computer Science from University of Plymouth (UK)
              via NSBM Green University in December 2025. I build with MERN,
              TypeScript, Laravel, and Prisma — no Tailwind unless the stack
              demands it.
            </p>

            <p className={`${styles.revealLine} ${styles.paragraph}`}>
              When I'm not shipping code, I'm running Dilshan DevZone on
              YouTube, watching F1, or leading the Next Gen youth club.
            </p>

            <div className={`${styles.revealLine} ${styles.signature}`}>
              <span>Thilanka Dilshan</span>
              <div className={styles.signatureLine} />
            </div>
          </div>
        </div>

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
      </div>
    </section>
  );
}

function Counter({ from, to }: { from: number; to: number }) {
  const [value, setValue] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 1500;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(from + (to - from) * eased);
      setValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, from, to]);

  return <span ref={ref}>{value}</span>;
}

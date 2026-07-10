"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroBackground from "../canvas/HeroBackground";
import styles from "../../styles/Hero.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const videoContainer = videoContainerRef.current;
    const videoOverlay = videoOverlayRef.current;

    if (!section || !content || !videoContainer || !videoOverlay) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1,
      },
    });

    // PHASE 1: Text and buttons fade out (0% to 40% of scroll)
    tl.to(
      content,
      {
        opacity: 0,
        y: -80,
        filter: "blur(8px)",
        ease: "power2.inOut",
      },
      0,
    );

    // PHASE 2: Video overlay fades out — video becomes clearer (40% to 70%)
    tl.to(
      videoOverlay,
      {
        opacity: 0,
        ease: "power2.inOut",
      },
      0.4,
    );

    // PHASE 3: Video container fades out completely (70% to 100%)
    tl.to(
      videoContainer,
      {
        opacity: 0,
        scale: 1.1,
        ease: "power2.inOut",
      },
      0.7,
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero}>
      {/* VIDEO BACKGROUND */}
      <div ref={videoContainerRef} className={styles.videoContainer}>
        <video className={styles.video} autoPlay muted loop playsInline>
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div ref={videoOverlayRef} className={styles.videoOverlay} />
      </div>

      {/* PARTICLES OVER VIDEO */}
      <div className={styles.particleLayer}>
        <HeroBackground />
      </div>

      {/* VIGNETTE */}
      <div className={styles.vignette} />

      {/* CONTENT */}
      <div ref={contentRef} className={styles.content}>
        <motion.span
          className={styles.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        >
          Software Engineer • Sri Lanka
        </motion.span>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.8,
            duration: 1.2,
            ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
          }}
        >
          THILANKA DILSHAN
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Building the future, one line of code at a time.
        </motion.p>

        <motion.div
          className={styles.ctaGroup}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <a href="#projects" className={styles.ctaPrimary}>
            View My Work
          </a>
          <a href="#contact" className={styles.ctaSecondary}>
            Get In Touch
          </a>
        </motion.div>
      </div>

      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <span>Scroll to Enter</span>
        <div className={styles.scrollLine} />
      </motion.div>
    </section>
  );
}

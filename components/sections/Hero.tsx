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
  const particleLayerRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const videoContainer = videoContainerRef.current;
    const videoOverlay = videoOverlayRef.current;
    const particleLayer = particleLayerRef.current;
    const scrollIndicator = scrollIndicatorRef.current;

    if (
      !section ||
      !content ||
      !videoContainer ||
      !videoOverlay ||
      !particleLayer ||
      !scrollIndicator
    )
      return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=150%", // Reduced from 300% to 150%
        pin: true,
        scrub: 1,
      },
    });

    // PHASE 1: Content zooms out and fades (0% to 40%)
    tl.to(
      content,
      {
        opacity: 0,
        scale: 1.1,
        y: 0,
        filter: "blur(12px)",
        ease: "power2.inOut",
      },
      0,
    );

    // Scroll indicator fades with content
    tl.to(
      scrollIndicator,
      {
        opacity: 0,
        y: 30,
        ease: "power2.inOut",
      },
      0.1,
    );

    // PHASE 2: Video overlay fades (40% to 60%)
    tl.to(
      videoOverlay,
      {
        opacity: 0,
        ease: "power2.inOut",
      },
      0.35,
    );

    // PHASE 3: Particles fade (50% to 70%)
    tl.to(
      particleLayer,
      {
        opacity: 0,
        ease: "power2.inOut",
      },
      0.5,
    );

    // PHASE 4: Video fades and zooms out (70% to 100%) — then unpins
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
      <div ref={videoContainerRef} className={styles.videoContainer}>
        <video className={styles.video} autoPlay muted loop playsInline>
          <source src="/videos/hero-bg.webm" type="video/webm" />
        </video>
        <div ref={videoOverlayRef} className={styles.videoOverlay} />
      </div>

      <div ref={particleLayerRef} className={styles.particleLayer}>
        <HeroBackground />
      </div>

      <div className={styles.vignette} />

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
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
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
        ref={scrollIndicatorRef}
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

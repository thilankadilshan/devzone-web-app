"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../../styles/ScrollScene.module.css";

gsap.registerPlugin(ScrollTrigger);

interface ScrollSceneProps {
  children: React.ReactNode;
  className?: string;
  pin?: boolean;
  pinDuration?: string;
  id?: string;
}

export default function ScrollScene({
  children,
  className = "",
  pin = true,
  pinDuration = "200%",
  id,
}: ScrollSceneProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Refresh ScrollTrigger on mount
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.scene} ${className}`}
      id={id}
      data-pin={pin}
      style={{ "--pin-duration": pinDuration } as React.CSSProperties}
    >
      {children}
    </section>
  );
}

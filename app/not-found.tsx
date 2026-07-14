"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import styles from "@/styles/NotFound.module.css";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glitchRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      gsap.set(glitchRef.current, {
        opacity: 0,
        scale: 1.3,
        filter: "blur(15px)",
      });
      gsap.set(robotRef.current, { opacity: 0, y: 40, scale: 0.85 });
      gsap.set(messageRef.current?.children || [], { opacity: 0, y: 20 });
      gsap.set(buttonRef.current, { opacity: 0, y: 30 });

      tl.to(glitchRef.current, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "expo.out",
      })
        .to(
          robotRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.4)",
          },
          "-=0.5",
        )
        .to(
          messageRef.current?.children || [],
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .to(
          buttonRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3",
        );

      gsap.to(glitchRef.current, {
        x: "random(-2, 2)",
        duration: 0.05,
        repeat: -1,
        repeatRefresh: true,
        ease: "none",
      });

      gsap.to(robotRef.current, {
        y: -10,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.gridBg} />
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <div ref={glitchRef} className={styles.glitchContainer}>
        <span className={styles.glitchDigit} data-text="4">
          4
        </span>
        <span className={styles.glitchDigit} data-text="0">
          0
        </span>
        <span className={styles.glitchDigit} data-text="4">
          4
        </span>
      </div>

      <div ref={robotRef} className={styles.robotWrapper}>
        <svg className={styles.robotSvg} viewBox="0 0 140 170" fill="none">
          <line
            x1="70"
            y1="25"
            x2="70"
            y2="8"
            stroke="#e50914"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle
            cx="70"
            cy="6"
            r="4"
            fill="#e50914"
            className={styles.blink}
          />
          <rect
            x="35"
            y="25"
            width="70"
            height="55"
            rx="12"
            fill="#1a1a1f"
            stroke="#e50914"
            strokeWidth="1.5"
          />
          <rect
            x="48"
            y="42"
            width="16"
            height="10"
            rx="3"
            fill="#e50914"
            className={styles.eyeBlink}
          />
          <rect
            x="76"
            y="42"
            width="16"
            height="10"
            rx="3"
            fill="#e50914"
            className={styles.eyeBlink}
            style={{ animationDelay: "0.3s" }}
          />
          <path
            d="M55 65 Q70 60 85 65"
            stroke="#e50914"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <rect
            x="62"
            y="80"
            width="16"
            height="8"
            fill="#1a1a1f"
            stroke="#e50914"
            strokeWidth="1"
          />
          <rect
            x="40"
            y="88"
            width="60"
            height="50"
            rx="10"
            fill="#0f0f13"
            stroke="#e50914"
            strokeWidth="1.5"
          />
          <rect
            x="52"
            y="98"
            width="36"
            height="22"
            rx="4"
            fill="#0a0a0e"
            stroke="#e50914"
            strokeWidth="0.8"
          />
          <text
            x="70"
            y="113"
            textAnchor="middle"
            fill="#e50914"
            fontSize="8"
            fontFamily="monospace"
            fontWeight="bold"
          >
            ERR_404
          </text>
          <rect
            x="18"
            y="95"
            width="20"
            height="8"
            rx="4"
            fill="#1a1a1f"
            stroke="#e50914"
            strokeWidth="1"
            transform="rotate(-15 18 95)"
          />
          <rect
            x="102"
            y="95"
            width="20"
            height="8"
            rx="4"
            fill="#1a1a1f"
            stroke="#e50914"
            strokeWidth="1"
            transform="rotate(15 102 95)"
          />
          <rect
            x="48"
            y="140"
            width="12"
            height="18"
            rx="3"
            fill="#1a1a1f"
            stroke="#e50914"
            strokeWidth="1"
          />
          <rect
            x="80"
            y="140"
            width="12"
            height="18"
            rx="3"
            fill="#1a1a1f"
            stroke="#e50914"
            strokeWidth="1"
          />
          <circle
            cx="54"
            cy="162"
            r="6"
            fill="#1a1a1f"
            stroke="#e50914"
            strokeWidth="1"
          />
          <circle
            cx="86"
            cy="162"
            r="6"
            fill="#1a1a1f"
            stroke="#e50914"
            strokeWidth="1"
          />
        </svg>

        <div className={styles.speechBubble}>
          <p>{"Oops! Wrong sector..."}</p>
          <div className={styles.speechArrow} />
        </div>
      </div>

      <div ref={messageRef} className={styles.message}>
        <p className={styles.subtitle}>SYSTEM MALFUNCTION</p>
        <h2 className={styles.title}>Page Not Found</h2>
        <p className={styles.description}>
          The coordinates don&apos;t exist in this dimension.
        </p>
      </div>

      <Link ref={buttonRef} href="/" className={styles.backButton}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
        Return to Base
      </Link>

      <div className={styles.cornerTL} />
      <div className={styles.cornerTR} />
      <div className={styles.cornerBL} />
      <div className={styles.cornerBR} />

      <div className={styles.scanline} />
    </div>
  );
}

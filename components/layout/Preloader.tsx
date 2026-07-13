"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styles from "../../styles/Preloader.module.css";

const loadingPhases = [
  "Initializing...",
  "Loading Assets...",
  "Preparing Experience...",
  "Welcome to the Zone.",
];

const cinematicEase = [0.76, 0, 0.24, 1];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "exiting" | "done">("loading");
  const hasCalledComplete = useRef(false);

  useEffect(() => {
    if (phase === "done" && !hasCalledComplete.current) {
      hasCalledComplete.current = true;
      onComplete();
    }
  }, [phase, onComplete]);

  useEffect(() => {
    if (phase !== "loading") return;

    const phaseInterval = setInterval(() => {
      setPhaseIndex((prev) => (prev + 1) % loadingPhases.length);
    }, 800);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(phaseInterval);
          setTimeout(() => setPhase("exiting"), 400);
          setTimeout(() => setPhase("done"), 1600);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    return () => {
      clearInterval(phaseInterval);
      clearInterval(progressInterval);
    };
  }, [phase]);

  // Don't render anything if done (let parent unmount us)
  if (phase === "done") return null;

  const isExiting = phase === "exiting";

  return (
    <div className={styles.preloader} style={{ opacity: isExiting ? 0 : 1 }}>
      {/* Top Shutter */}
      <div
        className={`${styles.curtain} ${styles.curtainTop}`}
        style={{
          transform: isExiting ? "translateY(-100vh)" : "translateY(0)",
          transition: "transform 1.2s cubic-bezier(0.76, 0, 0.24, 1) 0.2s",
        }}
      />

      {/* Bottom Shutter */}
      <div
        className={`${styles.curtain} ${styles.curtainBottom}`}
        style={{
          transform: isExiting ? "translateY(100vh)" : "translateY(0)",
          transition: "transform 1.2s cubic-bezier(0.76, 0, 0.24, 1) 0.2s",
        }}
      />

      {/* Center Content */}
      <div
        className={styles.content}
        style={{
          opacity: isExiting ? 0 : 1,
          transform: isExiting ? "scale(0.9)" : "scale(1)",
          transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
        }}
      >
        <h1
          className={styles.logo}
          style={{
            opacity: 1,
            letterSpacing: "8px",
            transition: "letter-spacing 1.5s cubic-bezier(0.76, 0, 0.24, 1)",
          }}
        >
          Hang Tight!
        </h1>

        <div className={styles.textWrapper}>
          <div
            className={styles.text}
            key={phaseIndex}
            style={{
              animation: "fadeInUp 0.4s ease forwards",
            }}
          >
            {loadingPhases[phaseIndex]}
          </div>
        </div>

        <div className={styles.progressContainer}>
          <div
            className={styles.progressFill}
            style={{
              width: `${Math.min(progress, 100)}%`,
              transition: "width 0.2s ease-out",
            }}
          />
        </div>

        <span className={styles.percentage}>
          {Math.min(Math.floor(progress), 100)}%
        </span>
      </div>

      {/* Add this keyframe to your Preloader.module.css */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

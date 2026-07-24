"use client";

import { useState, useEffect, useRef } from "react";
import styles from "../../styles/Preloader.module.css";

const loadingPhases = [
  "Initializing...",
  "Loading Assets...",
  "Preparing Experience...",
  "Welcome to the Zone.",
];

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
    }, 600);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(phaseInterval);
          setTimeout(() => setPhase("exiting"), 200);
          // FIX: Symmetrical timing so exit curtains finish right as content fades in
          setTimeout(() => setPhase("done"), 1000);
          return 100;
        }
        return prev + Math.random() * 20 + 10;
      });
    }, 120);

    return () => {
      clearInterval(phaseInterval);
      clearInterval(progressInterval);
    };
  }, [phase]);

  if (phase === "done") return null;

  const isExiting = phase === "exiting";

  return (
    <div className={styles.preloader} style={{ opacity: isExiting ? 0 : 1 }}>
      {/* Top Shutter */}
      <div
        className={`${styles.curtain} ${styles.curtainTop}`}
        style={{
          transform: isExiting ? "translateY(-100vh)" : "translateY(0)",
          transition: "transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      />

      {/* Bottom Shutter */}
      <div
        className={`${styles.curtain} ${styles.curtainBottom}`}
        style={{
          transform: isExiting ? "translateY(100vh)" : "translateY(0)",
          transition: "transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      />

      {/* Center Content */}
      <div
        className={styles.content}
        style={{
          opacity: isExiting ? 0 : 1,
          transform: isExiting ? "scale(0.95)" : "scale(1)",
          transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
        }}
      >
        <h1 className={styles.logo}>Hang Tight!</h1>

        <div className={styles.textWrapper}>
          <div className={styles.text} key={phaseIndex}>
            {loadingPhases[phaseIndex]}
          </div>
        </div>

        <div className={styles.progressContainer}>
          <div
            className={styles.progressFill}
            style={{
              width: `${Math.min(progress, 100)}%`,
              transition: "width 0.15s ease-out",
            }}
          />
        </div>

        <span className={styles.percentage}>
          {Math.min(Math.floor(progress), 100)}%
        </span>
      </div>
    </div>
  );
}

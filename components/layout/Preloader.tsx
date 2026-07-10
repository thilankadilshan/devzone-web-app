"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import styles from "../../styles/Preloader.module.css";

const loadingPhases = [
  "Initializing...",
  "Loading Assets...",
  "Preparing Experience...",
  "Welcome to the Zone.",
];

const cinematicEase = cubicBezier(0.76, 0, 0.24, 1);

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Phase cycling
    const phaseInterval = setInterval(() => {
      setPhaseIndex((prev) => (prev + 1) % loadingPhases.length);
    }, 800);

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(phaseInterval);
          setTimeout(() => setIsExiting(true), 400); // Small pause at 100%
          setTimeout(() => onComplete(), 2000); // Wait for exit animation
          return 100;
        }
        return prev + Math.random() * 15 + 5; // Random jumps for realism
      });
    }, 200);

    return () => {
      clearInterval(phaseInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className={styles.preloader}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Top Shutter */}
          <motion.div
            className={`${styles.curtain} ${styles.curtainTop}`}
            initial={{ y: 0 }}
            exit={{ y: "-100vh" }}
            transition={{ duration: 1.2, ease: cinematicEase, delay: 0.2 }}
          />

          {/* Bottom Shutter */}
          <motion.div
            className={`${styles.curtain} ${styles.curtainBottom}`}
            initial={{ y: 0 }}
            exit={{ y: "100vh" }}
            transition={{ duration: 1.2, ease: cinematicEase, delay: 0.2 }}
          />

          {/* Center Content */}
          <motion.div
            className={styles.content}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Your Logo / Name Reveal */}
            <motion.h1
              className={styles.logo}
              initial={{ opacity: 0, letterSpacing: "20px" }}
              animate={{ opacity: 1, letterSpacing: "8px" }}
              transition={{ duration: 1.5, ease: cinematicEase }}
            >
              Hang Tight!
            </motion.h1>

            <div className={styles.textWrapper}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={phaseIndex}
                  className={styles.text}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  {loadingPhases[phaseIndex]}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className={styles.progressContainer}>
              <motion.div
                className={styles.progressFill}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>

            {/* Percentage Counter */}
            <motion.span className={styles.percentage}>
              {Math.min(Math.floor(progress), 100)}%
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

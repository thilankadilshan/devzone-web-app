"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../../styles/Preloader.module.css";

const loadingPhases = [
  "INITIALIZING SCENE",
  "LOADING GEOMETRY",
  "COMPILING SHADERS",
  "THILANKA DILSHAN",
];

// Custom cinematic easing curve
const cinematicEase = [0.76, 0, 0.24, 1] as const;

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);

  useEffect(() => {
    // Simulated R3F loading sequence
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 1;
        if (next >= 100) {
          clearInterval(interval);
          setPhaseIndex(loadingPhases.length - 1); // Lock to final text
          setTimeout(() => setIsLoading(false), 800); // Dramatic pause at 100%
          return 100;
        }

        // Update text phase based on progress percentage
        if (next > 25 && next <= 50) setPhaseIndex(1);
        if (next > 50 && next <= 85) setPhaseIndex(2);
        if (next > 85) setPhaseIndex(3);

        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className={styles.preloader}
          exit="exit" // Triggers exit variants on children
        >
          {/* Top Shutter */}
          <motion.div
            className={`${styles.curtain} ${styles.curtainTop}`}
            variants={{
              exit: {
                y: "-100vh",
                transition: { duration: 1.2, ease: cinematicEase, delay: 0.2 },
              },
            }}
          />

          {/* Bottom Shutter */}
          <motion.div
            className={`${styles.curtain} ${styles.curtainBottom}`}
            variants={{
              exit: {
                y: "100vh",
                transition: { duration: 1.2, ease: cinematicEase, delay: 0.2 },
              },
            }}
          />

          {/* Content (Text & Line) */}
          <motion.div
            className={styles.content}
            variants={{
              exit: {
                opacity: 0,
                scale: 0.9,
                transition: { duration: 0.4, ease: "easeOut" },
              },
            }}
          >
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
                style={{ width: `${progress}%` }}
                layout
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

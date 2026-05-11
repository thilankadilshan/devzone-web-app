"use client";

import { useEffect, useState, memo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import styles from "../../styles/Cursor.module.css";

const NeonTriangle = memo(() => (
  <svg
    viewBox="0 0 26 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "26px", height: "32px" }}
  >
    <path
      d="M2 2L24 16L12 18L2 30V2Z"
      fill="#050505"
      strokeWidth="2.5"
      stroke="#ff0000" /* Hardcoded red for immediate visibility */
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
));

NeonTriangle.displayName = "NeonTriangle";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Ultra-responsive physics
  const springConfig = { damping: 50, stiffness: 1200, mass: 0.1 };

  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      // Force visibility as soon as the mouse moves
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveMouse);
    return () => window.removeEventListener("mousemove", moveMouse);
  }, [mouseX, mouseY, isVisible]);

  return (
    <motion.div
      className={styles.cursorWrapper}
      style={{
        x,
        y,
        opacity: isVisible ? 1 : 0,
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 999999, // Force it above the preloader and everything else
        filter: "drop-shadow(0 0 8px #ff0000)",
      }}
    >
      <NeonTriangle />
    </motion.div>
  );
}

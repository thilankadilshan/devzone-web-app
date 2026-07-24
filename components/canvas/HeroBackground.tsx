"use client";

import { useRef, useEffect } from "react";
import styles from "../../styles/HeroBackground.module.css";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  pulse: number;
  pulseSpeed: number;
}

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let lastWidth = window.innerWidth;
    const mouse = { x: -1000, y: -1000, active: false };

    function resize() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      if (ctx) ctx.scale(dpr, dpr);
    }

    function createParticles() {
      if (!canvas) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      particles = [];

      // OPTIMIZATION: Reduce particles on mobile to fix Android lag
      const isMobile = w <= 768;
      const particleCount = isMobile ? 12 : 25;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 4 + 3,
          opacity: Math.random() * 0.5 + 0.3,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.03 + 0.01,
        });
      }
    }

    function draw() {
      if (!canvas || !ctx) return;
      const w = window.innerWidth;
      const h = window.innerHeight;

      // OPTIMIZATION: Reduce massive gradient paint area on small screens
      const isMobile = w <= 768;
      const glowMultiplier = isMobile ? 8 : 12;

      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        p.pulse += p.pulseSpeed;
        const pulseSize = p.size + Math.sin(p.pulse) * 2;

        // Mouse/touch repulsion
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 250 && dist > 0) {
            const force = (250 - dist) / 250;
            p.vx -= (dx / dist) * force * 3;
            p.vy -= (dy / dist) * force * 3;
          }
        }

        p.vx *= 0.95;
        p.vy *= 0.95;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -50) p.x = w + 50;
        if (p.x > w + 50) p.x = -50;
        if (p.y < -50) p.y = h + 50;
        if (p.y > h + 50) p.y = -50;

        // MASSIVE outer glow
        const outerGlow = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          pulseSize * glowMultiplier,
        );
        outerGlow.addColorStop(0, `rgba(229, 9, 20, ${p.opacity * 0.3})`);
        outerGlow.addColorStop(0.3, `rgba(229, 9, 20, ${p.opacity * 0.1})`);
        outerGlow.addColorStop(1, "rgba(229, 9, 20, 0)");
        ctx.fillStyle = outerGlow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulseSize * glowMultiplier, 0, Math.PI * 2);
        ctx.fill();

        // Inner glow
        const innerGlow = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          pulseSize * 4,
        );
        innerGlow.addColorStop(0, `rgba(255, 100, 110, ${p.opacity * 0.5})`);
        innerGlow.addColorStop(1, "rgba(229, 9, 20, 0)");
        ctx.fillStyle = innerGlow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulseSize * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 220, 220, ${p.opacity})`;
        ctx.fill();

        // Bright center
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulseSize * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.9})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();

    const handleResize = () => {
      const currentWidth = window.innerWidth;
      resize(); // Always resize canvas so it fits the new height

      // FIX: Only recreate particles if the device WIDTH changes.
      // This stops particles from resetting when mobile address bar hides/shows.
      if (currentWidth !== lastWidth) {
        createParticles();
        lastWidth = currentWidth;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    // Touch events — only react when finger moves, not on tap
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.active = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.active = true;
      }
    };

    const handleTouchEnd = () => {
      mouse.active = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}

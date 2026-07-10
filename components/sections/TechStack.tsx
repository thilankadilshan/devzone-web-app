"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../../styles/TechStack.module.css";

gsap.registerPlugin(ScrollTrigger);

const techLogos = [
  { name: "React", url: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Node.js", url: "https://skillicons.dev/icons?i=nodejs" },
  { name: "MongoDB", url: "https://skillicons.dev/icons?i=mongodb" },
  { name: "Express", url: "https://skillicons.dev/icons?i=express" },
  { name: "TypeScript", url: "https://skillicons.dev/icons?i=ts" },
  { name: "Laravel", url: "https://skillicons.dev/icons?i=laravel" },
  { name: "Prisma", url: "https://skillicons.dev/icons?i=prisma" },
  { name: "Next.js", url: "https://skillicons.dev/icons?i=nextjs" },
  { name: "MySQL", url: "https://skillicons.dev/icons?i=mysql" },
  { name: "JavaScript", url: "https://skillicons.dev/icons?i=js" },
  { name: "HTML5", url: "https://skillicons.dev/icons?i=html" },
  { name: "CSS3", url: "https://skillicons.dev/icons?i=css" },
  { name: "Tailwind", url: "https://skillicons.dev/icons?i=tailwind" },
  { name: "Python", url: "https://skillicons.dev/icons?i=py" },
  { name: "Java", url: "https://skillicons.dev/icons?i=java" },
  { name: "C", url: "https://cdn.simpleicons.org/c/A8B9CC" },
  {
    name: "C#",
    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  },
  { name: "PHP", url: "https://cdn.simpleicons.org/php/777BB4" },
  { name: "Dart", url: "https://skillicons.dev/icons?i=dart" },
  { name: "Flutter", url: "https://skillicons.dev/icons?i=flutter" },
  { name: ".NET", url: "https://skillicons.dev/icons?i=dotnet" },
  { name: "Git", url: "https://skillicons.dev/icons?i=git" },
  { name: "GitHub", url: "https://skillicons.dev/icons?i=github" },
  { name: "Docker", url: "https://cdn.simpleicons.org/docker/2496ED" },
  { name: "Firebase", url: "https://skillicons.dev/icons?i=firebase" },
  { name: "Vercel", url: "https://skillicons.dev/icons?i=vercel" },
  { name: "Vite", url: "https://skillicons.dev/icons?i=vite" },
  { name: "Three.js", url: "https://skillicons.dev/icons?i=threejs" },
  { name: "Figma", url: "https://skillicons.dev/icons?i=figma" },
  { name: "Postman", url: "https://skillicons.dev/icons?i=postman" },
  { name: "VS Code", url: "https://skillicons.dev/icons?i=vscode" },
  { name: "SQLite", url: "https://skillicons.dev/icons?i=sqlite" },
  { name: "WordPress", url: "https://skillicons.dev/icons?i=wordpress" },
  { name: "Bootstrap", url: "https://cdn.simpleicons.org/bootstrap/7952B3" },
  { name: "Arduino", url: "https://cdn.simpleicons.org/arduino/00979D" },
  { name: "Gradle", url: "https://cdn.simpleicons.org/gradle/02303A" },
  { name: "ESLint", url: "https://cdn.simpleicons.org/eslint/4B32C3" },
  { name: "MATLAB", url: "https://skillicons.dev/icons?i=matlab" },
  { name: "Apache", url: "https://cdn.simpleicons.org/apache/D22128" },
  { name: "Photoshop", url: "https://skillicons.dev/icons?i=ps" },
  { name: "Audition", url: "https://skillicons.dev/icons?i=au" },
  { name: "Canva", url: "https://skillicons.dev/icons?i=canva" },
];

const row1 = techLogos.slice(0, 14);
const row2 = techLogos.slice(14, 28);
const row3 = techLogos.slice(28);

export default function TechStack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const left = leftRef.current;
    const right = rightRef.current;

    if (!section || !title || !left || !right) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "center center",
          scrub: 0.5,
        },
      });

      tl.fromTo(
        title,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.out" },
        0,
      );
      tl.fromTo(
        left,
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, ease: "power2.out" },
        0.1,
      );
      tl.fromTo(
        right,
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, ease: "power2.out" },
        0.15,
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.techStack} id="tech">
      <div className={styles.bgGradient} />

      <div ref={titleRef} className={styles.titleSection}>
        <span className={styles.sectionLabel}>02 — Arsenal</span>
        <h2 className={styles.heading}>Weapons of Choice</h2>
      </div>

      <div className={styles.splitContainer}>
        {/* LEFT: Tech Logos */}
        <div ref={leftRef} className={styles.stackSide}>
          <p className={styles.stackDescription}>
            The stack I wield to build scalable, high-performance applications.
          </p>

          <div className={styles.marqueeWrapper}>
            <div className={`${styles.marqueeRow} ${styles.rowLeft}`}>
              <div className={styles.marqueeTrack}>
                {[...row1, ...row1].map((tech, i) => (
                  <div key={`r1-${i}`} className={styles.logoItem}>
                    <img src={tech.url} alt={tech.name} />
                    <span className={styles.logoTooltip}>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${styles.marqueeRow} ${styles.rowRight}`}>
              <div className={styles.marqueeTrack}>
                {[...row2, ...row2].map((tech, i) => (
                  <div key={`r2-${i}`} className={styles.logoItem}>
                    <img src={tech.url} alt={tech.name} />
                    <span className={styles.logoTooltip}>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${styles.marqueeRow} ${styles.rowLeft}`}>
              <div className={styles.marqueeTrack}>
                {[...row3, ...row3].map((tech, i) => (
                  <div key={`r3-${i}`} className={styles.logoItem}>
                    <img src={tech.url} alt={tech.name} />
                    <span className={styles.logoTooltip}>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Robot */}
        <div ref={rightRef} className={styles.robotSide}>
          <div className={styles.robotWrapper}>
            <img
              src="/images/pet-robot.gif"
              alt="Pet Robot"
              className={styles.robotGif}
            />
            <div className={styles.robotGlow} />
          </div>
        </div>
      </div>
    </section>
  );
}

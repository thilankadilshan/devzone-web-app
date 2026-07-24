"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../../styles/AboutPage.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function AboutContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Text Reveal
      gsap.fromTo(
        `.${styles.heroTitle} span`,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.2,
        },
      );

      gsap.fromTo(
        `.${styles.heroSubtitle}`,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: "power2.out" },
      );

      // 2. Profile Image Reveal
      gsap.fromTo(
        `.${styles.profileImageWrap}`,
        { opacity: 0, scale: 0.9, x: 30 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1.5,
          delay: 0.6,
          ease: "power3.out",
        },
      );

      // 3. Timeline Reveal Animation
      const timelineItems = gsap.utils.toArray(`.${styles.timelineItem}`);
      timelineItems.forEach((item: any) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // 4. Education & Certs Animation
      const eduCards = gsap.utils.toArray(`.${styles.eduCard}`);
      gsap.fromTo(
        eduCards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.${styles.eduSection}`,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // 5. Bento Grid Reveal Animation
      const bentoCards = gsap.utils.toArray(`.${styles.bentoCard}`);
      gsap.fromTo(
        bentoCards,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.${styles.bentoGrid}`,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={styles.aboutPage}>
      {/* Global Background Effects */}
      <div className={styles.bgGradient} />
      <div className={styles.noiseOverlay} />

      {/* ACT 1: HERO */}
      <section className={styles.heroSection}>
        {/* Hero Background Image */}
        <div className={styles.heroBgWrap}>
          <img
            src="/images/about-bg.jpg" /* Make sure to add a background image here (e.g. a dark workspace or abstract texture) */
            alt="Hero Background"
            className={styles.heroBgImage}
          />
          <div className={styles.heroBgOverlay} />
        </div>

        <div className={styles.heroLayout}>
          {/* Left: Text */}
          <div className={styles.heroContent}>
            <span className={styles.label}>Origin Story</span>
            <h1 className={styles.heroTitle}>
              <span>Engineering</span>
              <span>Digital</span>
              <span className={styles.accentText}>Reality.</span>
            </h1>
            <p className={styles.heroSubtitle}>
              I'm Thilanka Dilshan, a 23-year-old Software Engineer based in Sri
              Lanka. I specialize in the MERN stack, TypeScript, and Laravel. I
              write clean, scalable code — and keep Tailwind out of my CSS
              modules unless absolutely necessary.
            </p>
          </div>

          {/* Right: Profile Image */}
          <div className={styles.profileImageWrap}>
            <div className={styles.profileImageContainer}>
              <img
                src="/images/profile.jpg"
                alt="Thilanka Dilshan"
                className={styles.profileImage}
              />
              <div className={styles.profileImageOverlay} />
            </div>
            <div className={styles.profileGlow} />
          </div>
        </div>

        <div className={styles.scrollIndicator}>
          <div className={styles.mouse}>
            <div className={styles.wheel} />
          </div>
        </div>
      </section>

      {/* ACT 2: PROFESSIONAL EXPERIENCE */}
      <section className={styles.timelineSection}>
        <div className={styles.sectionHeader}>
          <h2>Experience</h2>
          <p>Building robust systems and delivering value.</p>
        </div>

        <div className={styles.timeline}>
          <div className={styles.timelineLine} />

          {/* Sharper Labs */}
          <div className={styles.timelineItem}>
            <div className={styles.timelineDot} />
            <div className={styles.timelineContent}>
              <span className={styles.timelineDate}>
                May 2025 — Present | United Kingdom
              </span>
              <h3>Software Engineer Mid</h3>
              <h4>Sharper Labs</h4>
              <ul>
                <li>
                  Develop scalable, user-centric web applications and robust
                  backend services supporting 1,000+ active users.
                </li>
                <li>
                  Collaborate within a cross-functional team of 10 to translate
                  requirements into dynamic interfaces.
                </li>
                <li>
                  Execute the full SDLC, contributing to sprint planning,
                  backlog refinement, and rapid feature delivery.
                </li>
                <li>
                  Optimize backend systems, apply secure coding practices, and
                  perform API validation to ensure reliability under load.
                </li>
                <li>
                  Participate actively in code reviews to uphold quality
                  standards, share lessons learned, and maintain technical
                  documentation.
                </li>
              </ul>
            </div>
          </div>

          {/* ISD International */}
          <div className={styles.timelineItem}>
            <div className={styles.timelineDot} />
            <div className={styles.timelineContent}>
              <span className={styles.timelineDate}>Dec 2024 — May 2025</span>
              <h3>Full Stack Developer - Internship</h3>
              <h4>ISD International</h4>
              <ul>
                <li>
                  Developed and maintained web applications using Laravel PHP
                  framework. Collaborated with the team on feature
                  implementation and bug fixes.
                </li>
                <li>
                  Migrated legacy PHP code to modern Laravel standards,
                  improving code maintainability for the core development team.
                </li>
              </ul>
            </div>
          </div>

          {/* Codex Solutions */}
          <div className={styles.timelineItem}>
            <div className={styles.timelineDot} />
            <div className={styles.timelineContent}>
              <span className={styles.timelineDate}>Dec 2023 — Dec 2024</span>
              <h3>Software Developer</h3>
              <h4>Codex Solutions</h4>
              <ul>
                <li>
                  Built and enhanced client web projects using modern web
                  technologies. Assisted with frontend and backend development
                  tasks.
                </li>
              </ul>
            </div>
          </div>

          {/* Fiverr */}
          <div className={styles.timelineItem}>
            <div className={styles.timelineDot} />
            <div className={styles.timelineContent}>
              <span className={styles.timelineDate}>Ongoing</span>
              <h3>Freelance Software Developer</h3>
              <h4>Fiverr</h4>
              <ul>
                <li>
                  Delivered custom web and software solutions for international
                  clients.
                </li>
                <li>
                  Managed projects independently from requirements gathering to
                  deployment.
                </li>
                <li>
                  Built full-stack applications and UI prototypes based on
                  client needs and timelines.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ACT 3: EDUCATION & CERTIFICATIONS */}
      <section className={styles.eduSection}>
        <div className={styles.sectionHeader}>
          <h2>Education & Credentials</h2>
          <p>Continuous learning and academic foundation.</p>
        </div>

        <div className={styles.eduGrid}>
          {/* Education Column */}
          <div className={styles.eduColumn}>
            <h3 className={styles.columnTitle}>Academic Degrees</h3>

            <div className={`${styles.eduCard} ${styles.degreeCard}`}>
              <div className={styles.cardHeader}>
                <span className={styles.yearBadge}>Graduated: Dec 2025</span>
              </div>
              <h4>B.Sc. (Hons) in Software Engineering</h4>
              <p className={styles.university}>
                NSBM Green University, Sri Lanka
              </p>
              <p className={styles.awardedBy}>
                Degree awarded by <strong>University of Plymouth, UK</strong>
              </p>
            </div>

            <div className={`${styles.eduCard} ${styles.degreeCard}`}>
              <div className={styles.cardHeader}>
                <span className={styles.yearBadge}>2025</span>
              </div>
              <h4>Trainee Full-Stack Development Program</h4>
              <p className={styles.university}>University of Moratuwa</p>
            </div>
          </div>

          {/* Certifications Column */}
          <div className={styles.certColumn}>
            <h3 className={styles.columnTitle}>Certifications</h3>
            <div className={styles.certList}>
              <div className={styles.eduCard}>
                <span className={styles.certTitle}>
                  Full-Stack Web Development with MERN Stack
                </span>
                <span className={styles.certIssuer}>Coursera — 2025</span>
              </div>
              <div className={styles.eduCard}>
                <span className={styles.certTitle}>
                  Flutter & Dart - Android & iOS Apps
                </span>
                <span className={styles.certIssuer}>
                  LinkedIn Learning — 2025
                </span>
              </div>
              <div className={styles.eduCard}>
                <span className={styles.certTitle}>
                  Cloud Computing with AWS
                </span>
                <span className={styles.certIssuer}>
                  LinkedIn Learning — 2024
                </span>
              </div>
              <div className={styles.eduCard}>
                <span className={styles.certTitle}>
                  Artificial Intelligence & Machine Learning Fundamentals
                </span>
                <span className={styles.certIssuer}>
                  LinkedIn Learning — 2024
                </span>
              </div>
              <div className={styles.eduCard}>
                <span className={styles.certTitle}>
                  Career Essentials in Generative AI
                </span>
                <span className={styles.certIssuer}>
                  Microsoft & LinkedIn Learning — 2024
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACT 4: BEYOND THE IDE (BENTO GRID) */}
      <section className={styles.personalSection}>
        <div className={styles.sectionHeader}>
          <h2>Beyond the IDE</h2>
          <p>Because there is more to life than a flashing cursor.</p>
        </div>

        <div className={styles.bentoGrid}>
          {/* Bento 1: YouTube */}
          <div className={`${styles.bentoCard} ${styles.bentoYoutube}`}>
            <div className={styles.bentoInner}>
              <div className={styles.bentoIcon}>▶</div>
              <h3>Content Creation</h3>
              <p>
                Creator of <strong>Dilshan DevZone</strong>. I love sharing tech
                insights, coding tutorials, and my journey as an engineer to
                help others build their careers in tech.
              </p>
            </div>
            <div className={styles.bentoGlow} />
          </div>

          {/* Bento 2: Cats */}
          <div className={`${styles.bentoCard} ${styles.bentoCats}`}>
            <div className={styles.bentoInner}>
              <div className={styles.bentoIcon}>🐾</div>
              <h3>Feline Friend</h3>
              <p>
                A massive cat lover. When the code isn't compiling, a purring
                cat is usually the best debugging rubber duck I could ask for.
              </p>
            </div>
            <div className={styles.bentoGlow} />
          </div>

          {/* Bento 3: F1 */}
          <div className={`${styles.bentoCard} ${styles.bentoF1}`}>
            <div className={styles.bentoInner}>
              <div className={styles.bentoIcon}>🏎️</div>
              <h3>Formula 1 Fanatic</h3>
              <p>
                Watching the grid line up is my weekend ritual. Precision
                engineering on the track inspires precision engineering in my
                codebase.
              </p>
            </div>
            <div className={styles.bentoGlow} />
          </div>

          {/* Bento 4: Travel & Singing */}
          <div className={`${styles.bentoCard} ${styles.bentoTravel}`}>
            <div className={styles.bentoInner}>
              <div className={styles.bentoIcon}>🌍 🎶</div>
              <h3>Wanderlust & Melodies</h3>
              <p>
                I love traveling to experience new cultures, landscapes, and
                perspectives. Whether I'm on the road or taking a break from the
                screen, I'm usually singing along to my favorite tracks.
              </p>
            </div>
            <div className={styles.bentoGlow} />
          </div>
        </div>
      </section>
    </div>
  );
}

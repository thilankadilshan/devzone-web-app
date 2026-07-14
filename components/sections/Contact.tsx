"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import styles from "@/styles/Contact.module.css";

gsap.registerPlugin(ScrollTrigger);

// Rocket animation component - ONLY for success state
function RocketAnimation({ isLaunching }: { isLaunching: boolean }) {
  const rocketRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLaunching && rocketRef.current) {
      const tl = gsap.timeline();

      tl.to(rocketRef.current, {
        x: "random(-5, 5)",
        y: "random(-3, 3)",
        duration: 0.05,
        repeat: 10,
        ease: "none",
      }).to(
        rocketRef.current,
        {
          y: -800,
          x: 100,
          rotation: -15,
          scale: 0.3,
          opacity: 0,
          duration: 2,
          ease: "power4.in",
        },
        "+=0.2",
      );

      if (trailRef.current) {
        gsap.to(trailRef.current, {
          scaleY: 3,
          opacity: 0.8,
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.to(trailRef.current, {
          scaleY: 0,
          opacity: 0,
          duration: 1.5,
          delay: 0.5,
          ease: "power2.in",
        });
      }

      return () => {
        tl.kill();
      };
    }
  }, [isLaunching]);

  return (
    <div className={styles.rocketContainer}>
      <div ref={trailRef} className={styles.rocketTrail} />
      <div ref={rocketRef} className={styles.rocket}>
        <svg width="80" height="120" viewBox="0 0 80 120" fill="none">
          <path
            d="M40 5C40 5 15 35 15 65C15 85 25 100 40 100C55 100 65 85 65 65C65 35 40 5 40 5Z"
            fill="#e50914"
          />
          <circle
            cx="40"
            cy="45"
            r="12"
            fill="#0f0f13"
            stroke="#fafafa"
            strokeWidth="2"
          />
          <circle cx="40" cy="45" r="8" fill="#1a1a2e" />
          <path d="M15 70L5 95L20 85L15 70Z" fill="#b30710" />
          <path d="M65 70L75 95L60 85L65 70Z" fill="#b30710" />
          <path
            d="M30 100C30 100 35 115 40 118C45 115 50 100 50 100H30Z"
            fill="#ff6b35"
          />
          <path
            d="M33 100C33 100 36 110 40 112C44 110 47 100 47 100H33Z"
            fill="#ffd700"
          />
        </svg>
      </div>
    </div>
  );
}

// Success message component with particles
function SuccessMessage({ onReset }: { onReset: () => void }) {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (particlesRef.current) {
      const particles = particlesRef.current.querySelectorAll(".particle");
      particles.forEach((p, i) => {
        gsap.fromTo(
          p,
          { scale: 0, opacity: 1, x: 0, y: 0 },
          {
            scale: Math.random() * 1.5 + 0.5,
            opacity: 0,
            x: (Math.random() - 0.5) * 300,
            y: (Math.random() - 0.5) * 300,
            duration: 1.5 + Math.random(),
            delay: i * 0.05,
            ease: "power2.out",
          },
        );
      });
    }
  }, []);

  return (
    <motion.div
      className={styles.successContainer}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div ref={particlesRef} className={styles.particles}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              position: "absolute",
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              backgroundColor: i % 2 === 0 ? "#e50914" : "#ff6b35",
              borderRadius: "50%",
              top: "50%",
              left: "50%",
            }}
          />
        ))}
      </div>

      <motion.div
        className={styles.successIcon}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
      >
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle
            cx="32"
            cy="32"
            r="30"
            stroke="#e50914"
            strokeWidth="2"
            fill="none"
          />
          <motion.path
            d="M20 32L28 40L44 24"
            stroke="#e50914"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          />
        </svg>
      </motion.div>

      <motion.h3
        className={styles.successTitle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        Message Launched!
      </motion.h3>

      <motion.p
        className={styles.successText}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        Your message is rocketing through cyberspace. I will get back to you
        faster than an F1 pit stop!
      </motion.p>

      <motion.p
        className={styles.successSubtext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        A confirmation email has been sent to your inbox.
      </motion.p>

      <motion.button
        className={styles.resetButton}
        onClick={onReset}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 30px rgba(229, 9, 20, 0.3)",
        }}
        whileTap={{ scale: 0.95 }}
      >
        Send Another Message
      </motion.button>
    </motion.div>
  );
}

// WhatsApp Button Component
function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/qr/QDCAX4SBRGD5F1"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.whatsappButton}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 0 50px rgba(37, 211, 102, 0.35)",
      }}
      whileTap={{ scale: 0.97 }}
    >
      <div className={styles.whatsappIcon}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </div>
      <div className={styles.whatsappContent}>
        <span className={styles.whatsappLabel}>Prefer WhatsApp?</span>
        <span className={styles.whatsappText}>Chat with me directly</span>
      </div>
      <div className={styles.whatsappArrow}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </motion.a>
  );
}

// Contact Info Card
function ContactInfoCard({
  icon,
  label,
  value,
  href,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  delay: number;
}) {
  const content = (
    <motion.div
      className={styles.infoCard}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 40px rgba(229, 9, 20, 0.1)",
        borderColor: "rgba(229, 9, 20, 0.25)",
      }}
    >
      <div className={styles.infoIcon}>{icon}</div>
      <div className={styles.infoContent}>
        <span className={styles.infoLabel}>{label}</span>
        <span className={styles.infoValue}>{value}</span>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.infoCardLink}
      >
        {content}
      </a>
    );
  }
  return content;
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    [],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.ok) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(result.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again or use WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = useCallback(() => {
    setIsSuccess(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-title-line",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".contact-header",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        ".form-field",
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className={styles.contactSection}>
      <div className={styles.bgGradient} />
      <div className={styles.bgGrid} />
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <div className={styles.container}>
        {/* Centered Section Header */}
        <div className="contact-header" style={{ textAlign: "center" }}>
          <motion.div
            className={styles.sectionLabel}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            04 — Get In Touch
          </motion.div>
          <h2 className={styles.sectionTitle}>
            <span className="contact-title-line">Let&apos;s Build</span>
            <span className="contact-title-line">Something</span>
            <span
              className="contact-title-line"
              style={{ color: "var(--accent)" }}
            >
              Extraordinary
            </span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Have a project in mind? Want to collaborate? Or just want to talk
            about the latest F1 race? Drop me a message and let&apos;s create
            something amazing together.
          </p>
        </div>

        <div className={styles.contactGrid}>
          {/* Left Column - Image + Info */}
          <div className={styles.leftColumn}>
            {/* Contact Image */}
            <motion.div
              className={styles.contactImageWrapper}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className={styles.contactImageContainer}>
                <Image
                  src="/images/contact.jpg"
                  alt="Thilanka Dilshan"
                  fill
                  className={styles.contactImage}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
                <div className={styles.contactImageOverlay} />
              </div>
              <div className={styles.contactImageGlow} />
            </motion.div>

            <WhatsAppButton />

            <div className={styles.contactInfo}>
              <ContactInfoCard
                icon={
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                }
                label="Email"
                value="thilanka.cv@gmail.com"
                href="mailto:thilanka.cv@gmail.com"
                delay={0.2}
              />

              <ContactInfoCard
                icon={
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                }
                label="Location"
                value="Sri Lanka"
                delay={0.3}
              />
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className={styles.rightColumn}>
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <RocketAnimation isLaunching={true} />
                  <SuccessMessage onReset={handleReset} />
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className={styles.contactForm}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                >
                  <div className={styles.formHeader}>
                    <h3 className={styles.formTitle}>Send a Message</h3>
                    <p className={styles.formSubtitle}>
                      Fill out the form below and I will get back to you within
                      24 hours.
                    </p>
                  </div>

                  <div className={styles.formGrid}>
                    <div className="form-field">
                      <motion.div
                        className={styles.inputWrapper}
                        animate={{
                          borderColor:
                            focusedField === "name"
                              ? "#e50914"
                              : "rgba(255,255,255,0.08)",
                          boxShadow:
                            focusedField === "name"
                              ? "0 0 25px rgba(229, 9, 20, 0.12)"
                              : "none",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className={styles.inputLabel}>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField(null)}
                          required
                          className={styles.input}
                          placeholder="John Doe"
                        />
                        <motion.div
                          className={styles.inputLine}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: focusedField === "name" ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    </div>

                    <div className="form-field">
                      <motion.div
                        className={styles.inputWrapper}
                        animate={{
                          borderColor:
                            focusedField === "email"
                              ? "#e50914"
                              : "rgba(255,255,255,0.08)",
                          boxShadow:
                            focusedField === "email"
                              ? "0 0 25px rgba(229, 9, 20, 0.12)"
                              : "none",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className={styles.inputLabel}>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                          </svg>
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          required
                          className={styles.input}
                          placeholder="john@example.com"
                        />
                        <motion.div
                          className={styles.inputLine}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: focusedField === "email" ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    </div>
                  </div>

                  <div className="form-field">
                    <motion.div
                      className={styles.inputWrapper}
                      animate={{
                        borderColor:
                          focusedField === "subject"
                            ? "#e50914"
                            : "rgba(255,255,255,0.08)",
                        boxShadow:
                          focusedField === "subject"
                            ? "0 0 25px rgba(229, 9, 20, 0.12)"
                            : "none",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <label className={styles.inputLabel}>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                          <polyline points="10 9 9 9 8 9" />
                        </svg>
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("subject")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={styles.input}
                        placeholder="Project Collaboration"
                      />
                      <motion.div
                        className={styles.inputLine}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: focusedField === "subject" ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </div>

                  <div className="form-field">
                    <motion.div
                      className={`${styles.inputWrapper} ${styles.textareaWrapper}`}
                      animate={{
                        borderColor:
                          focusedField === "message"
                            ? "#e50914"
                            : "rgba(255,255,255,0.08)",
                        boxShadow:
                          focusedField === "message"
                            ? "0 0 25px rgba(229, 9, 20, 0.12)"
                            : "none",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <label className={styles.inputLabel}>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="17" y1="10" x2="3" y2="10" />
                          <line x1="21" y1="6" x2="3" y2="6" />
                          <line x1="21" y1="14" x2="3" y2="14" />
                          <line x1="17" y1="18" x2="3" y2="18" />
                        </svg>
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        required
                        rows={5}
                        className={styles.textarea}
                        placeholder="Tell me about your project, idea, or just say hi..."
                      />
                      <motion.div
                        className={styles.inputLine}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: focusedField === "message" ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </div>

                  <motion.button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isSubmitting}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 0 50px rgba(229, 9, 20, 0.35)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <AnimatePresence mode="wait">
                      {isSubmitting ? (
                        <motion.span
                          key="loading"
                          className={styles.buttonContent}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                        >
                          <span className={styles.spinner} />
                          Launching...
                        </motion.span>
                      ) : (
                        <motion.span
                          key="send"
                          className={styles.buttonContent}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                          </svg>
                          Launch Message
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

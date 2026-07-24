"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../../styles/Navbar.module.css";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/tech", label: "Tech" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (pathname === href) {
      e.preventDefault();
      setMenuOpen(false);
      return;
    }

    e.preventDefault();
    setMenuOpen(false);

    // FIX: Preemptively kill all GSAP ScrollTriggers and pin spacers before page swapping
    ScrollTrigger.getAll().forEach((t) => t.kill());
    ScrollTrigger.clearMatchMedia();
    gsap.globalTimeline.clear();

    // Broadcast navigation start so ClientLayout fires preloader instantly
    window.dispatchEvent(new CustomEvent("start-preloader"));

    setTimeout(() => {
      router.push(href);
    }, 200);
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.navInner}>
        <Link
          href="/"
          className={styles.logo}
          onClick={(e) => handleNavClick(e, "/")}
        >
          TD
        </Link>

        <button
          className={`${styles.burger} ${menuOpen ? styles.open : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${styles.link} ${isActive ? styles.active : ""}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

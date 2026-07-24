"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Preloader from "./Preloader";
import CustomCursor from "./CustomCursor";
import Navbar from "./Navbar";
import Footer from "../sections/Footer";

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = dynamic(() => import("./SmoothScroll"), {
  ssr: false,
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  const isDashboard =
    pathname?.startsWith("/dashboard") || pathname === "/login";

  // Listen for custom navigation event from Navbar
  useEffect(() => {
    if (isDashboard) return;

    const handlePreloadTrigger = () => {
      setShowPreloader(true);
      setIsLoaded(false);
    };

    window.addEventListener("start-preloader", handlePreloadTrigger);
    return () => {
      window.removeEventListener("start-preloader", handlePreloadTrigger);
    };
  }, [isDashboard]);

  // Clean up GSAP on route changes
  useEffect(() => {
    if (isDashboard) {
      setShowPreloader(false);
      setIsLoaded(true);
      return;
    }

    // FIX: Pass `true` to kill() to revert DOM wrappers and satisfy TypeScript
    ScrollTrigger.getAll().forEach((t) => t.kill(true));
    ScrollTrigger.clearMatchMedia();

    setShowPreloader(true);
    setIsLoaded(false);

    return () => {
      // FIX: Unmount cleanup using kill(true) as well
      ScrollTrigger.getAll().forEach((t) => t.kill(true));
    };
  }, [pathname, isDashboard]);

  return (
    <>
      <CustomCursor />

      {!isDashboard && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            pointerEvents: showPreloader ? "auto" : "none",
            opacity: showPreloader ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          {showPreloader && (
            <Preloader
              onComplete={() => {
                // FIX: Reveal main content *before* hiding preloader completely to prevent black flash
                setIsLoaded(true);

                requestAnimationFrame(() => {
                  setTimeout(() => {
                    setShowPreloader(false);
                    ScrollTrigger.refresh();
                  }, 200);
                });
              }}
            />
          )}
        </div>
      )}

      <div
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.4s ease-in",
        }}
      >
        {!isDashboard && <Navbar />}

        <SmoothScroll>
          <main>{children}</main>
        </SmoothScroll>

        {!isDashboard && <Footer />}
      </div>
    </>
  );
}

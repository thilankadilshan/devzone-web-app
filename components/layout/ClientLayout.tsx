"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Preloader from "./Preloader";
import CustomCursor from "./CustomCursor";
import Navbar from "./Navbar";
import Footer from "../sections/Footer";

// Lenis ONLY loads on client — never on server
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

  // Hide preloader/navbar/footer on dashboard routes
  const isDashboard =
    pathname?.startsWith("/dashboard") || pathname === "/login";

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Skip preloader on dashboard/login pages
  useEffect(() => {
    if (isDashboard) {
      setShowPreloader(false);
      setIsLoaded(true);
    }
  }, [isDashboard]);

  return (
    <>
      <CustomCursor />

      {/* Preloader — hidden on dashboard/login */}
      {!isDashboard && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            pointerEvents: showPreloader ? "auto" : "none",
            opacity: showPreloader ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          {showPreloader && (
            <Preloader
              onComplete={() => {
                setShowPreloader(false);
                setIsLoaded(true);
              }}
            />
          )}
        </div>
      )}

      <div
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        {/* Navbar — hidden on dashboard/login */}
        {!isDashboard && <Navbar />}

        <SmoothScroll>
          <main>{children}</main>
        </SmoothScroll>

        {/* Footer — hidden on dashboard/login */}
        {!isDashboard && <Footer />}
      </div>
    </>
  );
}

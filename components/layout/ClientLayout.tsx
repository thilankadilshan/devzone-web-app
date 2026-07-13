"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Preloader from "./Preloader";
import CustomCursor from "./CustomCursor";
import Navbar from "./Navbar";

// Lenis ONLY loads on client — never on server
const SmoothScroll = dynamic(() => import("./SmoothScroll"), {
  ssr: false,
  loading: () => <>{null}</>,
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // CRITICAL: Only render interactive stuff after hydration completes
  useEffect(() => {
    setMounted(true);
  }, []);

  // Phase 1: Server render / initial hydration — plain children only
  // This MUST match exactly what server renders
  if (!mounted) {
    return <>{children}</>;
  }

  // Phase 2: Client mounted — add cursor, preloader, smooth scroll
  return (
    <>
      <CustomCursor />

      {!isLoaded && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999 }}>
          <Preloader onComplete={() => setIsLoaded(true)} />
        </div>
      )}

      <div
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        <Navbar />
        <SmoothScroll>
          <main>{children}</main>
        </SmoothScroll>
      </div>
    </>
  );
}

"use client"; // Convert to client component for state

import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useState } from "react";
import SmoothScroll from "../components/layout/SmoothScroll";
import Preloader from "../components/layout/Preloader";
import CustomCursor from "../components/layout/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Custom Cursor - Always On */}
        <CustomCursor />

        {/* Preloader - Disappears after load */}
        {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

        {/* Main Content - Hidden until preloader done */}
        <div
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.5s ease",
            pointerEvents: isLoaded ? "auto" : "none",
          }}
        >
          <SmoothScroll>
            <main>{children}</main>
          </SmoothScroll>
        </div>
      </body>
    </html>
  );
}

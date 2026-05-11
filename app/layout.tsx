import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SmoothScroll from "../components/layout/SmoothScroll";
import Preloader from "../components/layout/Preloader";
import CustomCursor from "../components/layout/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thilanka Dilshan | Software Engineer",
  description:
    "Cinematic digital portfolio of Thilanka Dilshan. Specializing in modern full-stack development, UI/UX, and high-performance web architecture.",
  keywords: [
    "Thilanka Dilshan",
    "Software Engineer",
    "Full Stack",
    "Next.js",
    "Sri Lanka",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Interaction Layer: Top priority */}
        <CustomCursor />

        {/* Orchestration Layer: Handles the intro */}
        <Preloader />

        {/* Content Layer: Smooth scroll wrapper */}
        <SmoothScroll>
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}

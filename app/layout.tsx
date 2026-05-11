import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SmoothScroll from "../components/layout/SmoothScroll";

// Loading the font efficiently at the server level
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

// This is your global SEO. This is what shows up on Google and Discord embeds.
export const metadata: Metadata = {
  title: "Thilanka Dilshan | Software Engineer",
  description:
    "Cinematic digital portfolio of Thilanka Dilshan. Specializing in modern full-stack development and high-performance system architecture.",
  keywords: [
    "Thilanka Dilshan",
    "Software Engineer",
    "Full Stack Developer",
    "Next.js",
    "TypeScript",
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
        {/* Everything inside here now glides smoothly */}
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

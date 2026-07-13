import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import ClientLayout from "../components/layout/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050507",
};

export const metadata: Metadata = {
  title: {
    default: "Thilanka Dilshan | Software Engineer & Full-Stack Developer",
    template: "%s | Thilanka Dilshan",
  },
  description:
    "Thilanka Dilshan is a 23-year-old Software Engineer from Sri Lanka specializing in MERN stack, TypeScript, Laravel, and Prisma. Building scalable applications at Sharper Labs. Founder of Dilshan DevZone on YouTube.",
  keywords: [
    "Thilanka Dilshan",
    "Software Engineer Sri Lanka",
    "MERN Stack Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Laravel Developer",
    "Prisma Developer",
    "Full Stack Developer",
    "Sharper Labs",
    "Dilshan DevZone",
    "NSBM Green University",
    "University of Plymouth",
    "Sri Lankan Developer",
    "React Developer",
    "Node.js Developer",
    "MongoDB Developer",
  ],
  authors: [
    { name: "Thilanka Dilshan", url: "https://thilankadilshan.vercel.app" },
  ],
  creator: "Thilanka Dilshan",
  publisher: "Thilanka Dilshan",

  metadataBase: new URL("https://thilankadilshan.vercel.app"),
  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thilankadilshan.vercel.app",
    siteName: "Thilanka Dilshan",
    title: "Thilanka Dilshan | Software Engineer & Full-Stack Developer",
    description:
      "23-year-old Software Engineer from Sri Lanka. MERN Stack, TypeScript, Laravel, Prisma. Building at Sharper Labs. YouTube: Dilshan DevZone.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Thilanka Dilshan - Software Engineer Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Thilanka Dilshan | Software Engineer & Full-Stack Developer",
    description:
      "23-year-old Software Engineer from Sri Lanka. MERN Stack, TypeScript, Laravel. Building at Sharper Labs.",
    images: ["/images/og-image.jpg"],
    creator: "@thilankadilshan",
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/icon.svg",
        color: "#e50914",
      },
    ],
  },

  manifest: "/manifest.json",

  verification: {
    google: "YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE",
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Thilanka Dilshan",
  },

  category: "technology",
  classification: "Personal Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import ClientLayout from "../components/layout/ClientLayout";
import PersonSchema from "../components/seo/PersonSchema";
import WebSiteSchema from "../components/seo/WebSiteSchema";
import FAQSchema from "../components/seo/FAQSchema";

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
    default: "Thilanka Dilshan | Software Engineer, Content Creator & Singer",
    template: "%s | Thilanka Dilshan",
  },
  description:
    "Thilanka Dilshan is a 23-year-old Software Engineer from Nochchiyagama, Sri Lanka, Content Creator on YouTube/TikTok/Instagram, and Singer. Specializing in MERN stack, TypeScript, Laravel, and Prisma. Building scalable applications at Sharper Labs. Founder of Dilshan DevZone.",
  keywords: [
    "Thilanka Dilshan",
    "Thilanka Dilshan singer",
    "Thilanka Dilshan content creator",
    "Thilanka Dilshan YouTube",
    "Thilanka Dilshan TikTok",
    "Thilanka Dilshan Instagram",
    "Thilanka Dilshan Facebook",
    "Thilanka Dilshan Sri Lanka",
    "Thilanka Dilshan Nochchiyagama",
    "Thilanka Dilshan software engineer",
    "Thilanka Dilshan developer",
    "Thilanka Dilshan portfolio",
    "Thilanka Dilshan blog",
    "Thilanka Dilshan Dilshan DevZone",
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
    "Sri Lankan singer",
    "Sri Lankan content creator",
    "Sri Lankan YouTuber",
    "Sri Lankan software engineer",
    "web developer Sri Lanka",
    "full stack developer Sri Lanka",
    "Nochchiyagama developer",
    "Anuradhapura developer",
    "Sri Lankan tech YouTuber",
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
    title: "Thilanka Dilshan | Software Engineer, Content Creator & Singer",
    description:
      "23-year-old Software Engineer from Nochchiyagama, Sri Lanka. MERN Stack, TypeScript, Laravel, Prisma. Content Creator on YouTube, TikTok, Instagram. Singer. Building at Sharper Labs.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Thilanka Dilshan - Software Engineer, Content Creator & Singer from Sri Lanka",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Thilanka Dilshan | Software Engineer, Content Creator & Singer",
    description:
      "23-year-old Software Engineer from Sri Lanka. MERN Stack, TypeScript, Laravel. Content Creator & Singer. Building at Sharper Labs.",
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
    google: "DZ874L8ryzcn2OxoonqlnVYq5vl54KPsiAxGD82hYcU",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="dns-prefetch"
          href="https://kzzemykpkxrhehuyntew.supabase.co"
        />
        <link rel="dns-prefetch" href="https://cdn.simpleicons.org" />
        <link rel="dns-prefetch" href="https://skillicons.dev" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <PersonSchema />
        <WebSiteSchema />
        <FAQSchema />
        {/* Google Analytics 4 */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-3TZZ6TKCVK"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-3TZZ6TKCVK', {
                page_title: document.title,
                send_page_view: true
              });
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

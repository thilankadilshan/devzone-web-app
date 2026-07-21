import type { Metadata } from "next";
import NotFoundClient from "@/components/NotFoundClient";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Thilanka Dilshan",
  description:
    "The page you are looking for does not exist. Return to Thilanka Dilshan's portfolio.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return <NotFoundClient />;
}

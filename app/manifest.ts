import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Thilanka Dilshan - Portfolio",
    short_name: "Thilanka Dilshan",
    description:
      "Portfolio of Thilanka Dilshan, Software Engineer from Sri Lanka",
    start_url: "/",
    display: "standalone",
    background_color: "#050507",
    theme_color: "#e50914",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

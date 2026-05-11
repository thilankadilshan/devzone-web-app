"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      {/* We cast to any to bypass the React 18/19 type mismatch in Lenis */}
      {children as any}
    </ReactLenis>
  );
}

"use client";

import { useEffect, useState } from "react";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenisLoaded, setLenisLoaded] = useState(false);

  useEffect(() => {
    let lenis: any;

    const init = async () => {
      const { ReactLenis } = await import("@studio-freight/react-lenis");
      // Lenis handles itself via ReactLenis component
      setLenisLoaded(true);
    };

    init();

    return () => {
      // Cleanup if needed
    };
  }, []);

  // Fallback — render children immediately, Lenis wraps after load
  if (!lenisLoaded) return <>{children}</>;

  return <LenisWrapper>{children}</LenisWrapper>;
}

// Separate component to avoid hook issues
function LenisWrapper({ children }: { children: React.ReactNode }) {
  const [Component, setComponent] = useState<any>(null);

  useEffect(() => {
    import("@studio-freight/react-lenis").then((mod) => {
      setComponent(() => mod.ReactLenis);
    });
  }, []);

  if (!Component) return <>{children}</>;

  return (
    <Component root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      {children}
    </Component>
  );
}

"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image, PerspectiveCamera, Float } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

function Portrait() {
  // Using 'any' here is a strategic move to bypass the complex R3F internal types
  // for the Image component while maintaining performance.
  const meshRef = useRef<any>(null);
  const { mouse } = useThree();

  useFrame(() => {
    if (!meshRef.current) return;

    // High-precision lerping: no lag, just butter-smooth response
    const targetX = mouse.x * 0.15;
    const targetY = -mouse.y * 0.15;

    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetX,
      0.1,
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetY,
      0.1,
    );
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
      <Image
        ref={meshRef}
        url="/profile.JPEG"
        transparent
        opacity={0.9}
        scale={[3.8, 5]}
        // Note: toneMapped is omitted here to avoid the TS number/undefined conflict
      />
    </Float>
  );
}

export default function HeroCanvas() {
  const accentColor = "#e50914";

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1,
        pointerEvents: "none",
      }}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        // We define the camera here to ensure proper FOV for the cinematic look
        camera={{ position: [0, 0, 8], fov: 50 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />

          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            // We use a simple number here, but ensure it's within TS expectations
            intensity={150}
            color={accentColor}
            castShadow
          />

          <Portrait />
        </Suspense>
      </Canvas>
    </div>
  );
}

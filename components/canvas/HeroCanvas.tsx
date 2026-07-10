"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Stars, Float } from "@react-three/drei";
import { Suspense } from "react";

// A simple abstract monolith to act as a placeholder centerpiece
function Monolith() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <octahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial
          color="#0f0f13"
          wireframe={true}
          emissive="#e50914"
          emissiveIntensity={0.8}
        />
      </mesh>
    </Float>
  );
}

export default function HeroCanvas() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
      }}
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        {/* Cinematic Fog matches your CSS variable for a seamless blend */}
        <fog attach="fog" args={["#050507", 5, 15]} />

        <ambientLight intensity={0.2} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          color="#ffffff"
        />

        <Suspense fallback={null}>
          <Monolith />
          <Environment preset="city" />

          {/* Subtle red-tinted particles */}
          <Stars
            radius={100}
            depth={50}
            count={2000}
            factor={4}
            saturation={1}
            fade
            speed={1}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

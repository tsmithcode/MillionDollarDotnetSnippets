"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

function OrbitingForms() {
  const core = useRef<Mesh>(null);
  const ring = useRef<Mesh>(null);

  useFrame((_state, delta) => {
    if (core.current) {
      core.current.rotation.x += delta * 0.12;
      core.current.rotation.y += delta * 0.26;
    }

    if (ring.current) {
      ring.current.rotation.z += delta * 0.18;
    }
  });

  return (
    <>
      <ambientLight intensity={0.95} />
      <pointLight position={[2.6, 2.2, 3]} intensity={18} color="#ffd8ab" />
      <pointLight position={[-2.5, -1.8, 2.4]} intensity={8} color="#d88942" />
      <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.38}>
        <mesh ref={core} rotation={[0.45, 0.42, 0.15]}>
          <icosahedronGeometry args={[1.05, 1]} />
          <meshStandardMaterial color="#efb570" emissive="#8b5521" emissiveIntensity={0.24} metalness={0.24} roughness={0.34} />
        </mesh>
      </Float>
      <mesh ref={ring} rotation={[1.18, 0.2, 0.35]} scale={1.6}>
        <torusGeometry args={[1.05, 0.045, 20, 72]} />
        <meshStandardMaterial color="#ffe0b2" metalness={0.52} roughness={0.28} />
      </mesh>
      <mesh rotation={[-1.1, 0, 0]} position={[0, -1.45, 0]}>
        <circleGeometry args={[2.8, 32]} />
        <meshStandardMaterial color="#171614" />
      </mesh>
    </>
  );
}

export function CanvasStage() {
  return (
    <div className="stage-shell" aria-label="Framework cinematic stage preview">
      <Canvas camera={{ position: [0, 0, 4.35], fov: 34 }} dpr={[1, 1.35]} gl={{ antialias: false, powerPreference: "high-performance" }}>
        <OrbitingForms />
      </Canvas>
      <div className="three-caption">Flagship motion layer: controlled, deferred, and non-blocking.</div>
    </div>
  );
}

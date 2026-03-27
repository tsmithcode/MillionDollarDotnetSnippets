"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Html, OrbitControls } from "@react-three/drei";
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
      <Environment preset="warehouse" />
      <ambientLight intensity={1.05} />
      <directionalLight position={[4, 5, 3]} intensity={2.1} />
      <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.38}>
        <mesh ref={core} rotation={[0.45, 0.42, 0.15]}>
          <icosahedronGeometry args={[1.05, 1]} />
          <meshStandardMaterial color="#efb570" emissive="#8b5521" emissiveIntensity={0.18} metalness={0.38} roughness={0.18} />
        </mesh>
      </Float>
      <mesh ref={ring} rotation={[1.18, 0.2, 0.35]} scale={1.6}>
        <torusGeometry args={[1.05, 0.05, 32, 120]} />
        <meshStandardMaterial color="#ffe0b2" metalness={0.68} roughness={0.22} />
      </mesh>
      <mesh rotation={[-1.1, 0, 0]} position={[0, -1.45, 0]}>
        <circleGeometry args={[2.8, 64]} />
        <meshStandardMaterial color="#171614" />
      </mesh>
      <Html position={[0, -1.62, 0]} center>
        <div className="three-caption">Flagship motion layer: controlled, reduced-motion safe, and non-blocking.</div>
      </Html>
      <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.45} />
    </>
  );
}

export function CanvasStage() {
  return (
    <div className="stage-shell" aria-label="Framework cinematic stage preview">
      <Canvas camera={{ position: [0, 0, 4.35], fov: 34 }}>
        <OrbitingForms />
      </Canvas>
    </div>
  );
}

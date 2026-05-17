"use client";

import { Canvas } from "@react-three/fiber";
import { Sparkles, Float } from "@react-three/drei";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AmbientWorld() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* 3D Dust and Sparkles */}
      <div className="absolute inset-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <Float speed={1} rotationIntensity={1} floatIntensity={1}>
            <Sparkles count={150} scale={10} size={2} speed={0.2} opacity={0.4} color="#ffd1dc" />
            <Sparkles count={50} scale={12} size={4} speed={0.4} opacity={0.6} color="#ff69b4" />
          </Float>
        </Canvas>
      </div>

      {/* Floating Orbs / Bokeh Lights */}
      <motion.div
        className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-pink-500/10 blur-[100px]"
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -50, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-purple-500/10 blur-[120px]"
        animate={{
          x: [0, -80, 40, 0],
          y: [0, 60, -60, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-rose-400/5 blur-[150px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Shimmer Overlay */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
    </div>
  );
}

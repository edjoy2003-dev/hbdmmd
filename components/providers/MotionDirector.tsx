"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

interface MotionContextType {
  activeScene: string;
  setActiveScene: (scene: string) => void;
  scrollY: number;
}

const MotionContext = createContext<MotionContextType>({
  activeScene: "intro",
  setActiveScene: () => {},
  scrollY: 0,
});

export const useMotion = () => useContext(MotionContext);

export default function MotionDirector({ children }: { children: React.ReactNode }) {
  const [activeScene, setActiveScene] = useState("intro");
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useLenis(({ scroll }) => {
    setScrollY(scroll);
    ScrollTrigger.update();
  });

  useEffect(() => {
    // Global GSAP setup
    gsap.ticker.add((time) => {
      // Custom global ticking if needed
    });

    return () => {
      ScrollTrigger.killAll();
      gsap.ticker.remove(() => {});
    };
  }, []);

  return (
    <MotionContext.Provider value={{ activeScene, setActiveScene, scrollY }}>
      <div ref={containerRef} className="relative w-full min-h-screen overflow-hidden">
        {children}
      </div>
    </MotionContext.Provider>
  );
}

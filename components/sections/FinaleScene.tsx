"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import confetti from "canvas-confetti";

export default function FinaleScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.5 });
  const [hasExploded, setHasExploded] = useState(false);

  useEffect(() => {
    if (isInView && !hasExploded) {
      setHasExploded(true);
      
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults, particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#ff69b4', '#ffd1dc', '#e6e6fa', '#ffffff']
        });
        confetti({
          ...defaults, particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#ff69b4', '#ffd1dc', '#e6e6fa', '#ffffff']
        });
      }, 250);

      // Heart shaped confetti
      const scalar = 2;
      // @ts-ignore: canvas-confetti accepts an array at runtime but types expect DOMMatrix
      const heart = confetti.shapeFromPath({
        path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z',
        matrix: [0.03333333333333333, 0, 0, 0.03333333333333333, -5.566666666666666, -5.533333333333333]
      });

      setTimeout(() => {
        confetti({
          particleCount: 100,
          scalar,
          spread: 180,
          origin: { y: 0.6 },
          shapes: [heart],
          colors: ['#ff69b4', '#ff1493']
        });
      }, 1000);
    } else if (!isInView) {
      setHasExploded(false);
    }
  }, [isInView, hasExploded]);

  return (
    <section ref={containerRef} className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden snap-start">
      
      {/* Background explode effect */}
      <motion.div
        className="absolute inset-0 bg-pink-500/20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: [0, 0.8, 0], scale: [0.8, 1.5, 1] } : {}}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      <div className="z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0, filter: "blur(20px)" }}
          animate={isInView ? { scale: 1, opacity: 1, filter: "blur(0px)" } : {}}
          transition={{ type: "spring", damping: 15, stiffness: 50, duration: 2 }}
          className="relative"
        >
          {/* Main glowing typography */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-white via-pink-200 to-pink-500 font-bold mb-4 drop-shadow-[0_0_30px_rgba(255,105,180,0.8)] text-center leading-tight">
            HAPPY<br/>BIRTHDAY<br/>MARY
          </h1>
          
          <motion.div
            className="absolute -inset-4 bg-pink-500/20 blur-[50px] -z-10 rounded-full"
            animate={isInView ? { scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2, duration: 1 }}
        >
          <p className="text-xl md:text-3xl text-pink-100 font-serif mt-8 mb-12">
            You deserve the world ❤️
          </p>
          
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-8 py-4 glass-card rounded-full text-pink-100 hover:text-white hover:bg-white/10 transition-all font-sans tracking-widest text-sm uppercase group relative overflow-hidden"
          >
            <span className="relative z-10">Replay Experience</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/20 to-pink-500/0 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </button>
        </motion.div>
      </div>

    </section>
  );
}

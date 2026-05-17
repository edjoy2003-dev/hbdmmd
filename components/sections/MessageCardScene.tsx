"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const messageLines = [
  "To the most beautiful soul,",
  "You bring light to every shadow,",
  "And warmth to every cold day.",
  "Your smile is my favorite melody,",
  "And your heart is my favorite place.",
  "I hope today brings you as much joy",
  "As you bring to the world.",
];

export default function MessageCardScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen py-32 flex items-center justify-center overflow-hidden perspective-1000"
    >
      <motion.div 
        style={{ scale, opacity, rotateX }}
        className="relative z-10 w-full max-w-2xl mx-auto px-6"
      >
        <div className="glass-card p-10 md:p-16 rounded-3xl relative overflow-hidden group shadow-[0_0_50px_rgba(255,105,180,0.15)]">
          {/* Animated Glowing Borders */}
          <div className="absolute inset-0 border-2 border-transparent rounded-3xl [background:linear-gradient(45deg,transparent,rgba(255,255,255,0.4),transparent)_border-box] [mask-composite:exclude] [-webkit-mask-composite:destination-out] [mask-image:linear-gradient(#fff_0_0),linear-gradient(#fff_0_0)]" />
          
          <div className="absolute top-0 left-[-100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[45deg] group-hover:animate-[shimmer_2s_infinite]" />

          <div className="relative z-10 flex flex-col items-center text-center gap-6">
            {messageLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
                className="text-lg md:text-2xl font-serif text-pink-50"
              >
                {line}
              </motion.p>
            ))}
          </div>
          
          {/* Internal floating elements */}
          <motion.div
            className="absolute top-10 left-10 w-3 h-3 bg-pink-300 rounded-full blur-[2px]"
            animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-4 h-4 bg-purple-300 rounded-full blur-[3px]"
            animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [loadingText, setLoadingText] = useState("Preparing something special");

  useEffect(() => {
    const texts = [
      "Gathering stardust...",
      "Weaving memories...",
      "Lighting the candles...",
      "For Mary ❤️",
    ];
    let step = 0;
    
    const interval = setInterval(() => {
      if (step < texts.length) {
        setLoadingText(texts[step]);
        step++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 1000);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0510]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(20px)", scale: 1.1 }}
      transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        className="w-12 h-12 relative mb-8"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 border-t-2 border-r-2 border-pink-300 rounded-full blur-[2px]" />
        <div className="absolute inset-0 border-t-2 border-r-2 border-pink-400 rounded-full" />
      </motion.div>
      
      <AnimatePresence mode="wait">
        <motion.p
          key={loadingText}
          initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
          transition={{ duration: 0.8 }}
          className="text-pink-100/80 font-serif tracking-widest text-sm uppercase"
        >
          {loadingText}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}

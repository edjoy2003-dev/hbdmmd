"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export default function IntroScene() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Cinematic timeline
    const t1 = setTimeout(() => setStage(1), 2000); // Today is not just...
    const t2 = setTimeout(() => setStage(2), 6000); // For the world celebrates...
    const t3 = setTimeout(() => setStage(3), 10000); // Mary ❤️
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden snap-start">
      {/* Background depth blur overlay */}
      <motion.div 
        className="absolute inset-0 bg-pink-900/10"
        initial={{ filter: "blur(50px)", opacity: 0 }}
        animate={{ filter: "blur(0px)", opacity: 1 }}
        transition={{ duration: 4 }}
      />

      <div className="z-10 text-center flex flex-col items-center justify-center h-full max-w-4xl px-6">
        
        {/* Stage 1 Text */}
        <motion.p
          className="text-xl md:text-3xl font-serif text-pink-100/80 mb-8 absolute"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={stage === 1 ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          Today is not just another day...
        </motion.p>

        {/* Stage 2 Text */}
        <motion.p
          className="text-2xl md:text-4xl font-serif text-pink-50 absolute"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={stage === 2 ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          For the world celebrates someone beautiful...
        </motion.p>

        {/* Stage 3 - Final Reveal */}
        <motion.div
          className="absolute flex flex-col items-center justify-center"
          initial={{ scale: 0.8, opacity: 0, filter: "blur(20px)" }}
          animate={stage >= 3 ? { scale: 1, opacity: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 3, ease: "easeOut" }}
        >
          <motion.div
            animate={stage >= 3 ? { 
              scale: [1, 1.05, 1],
              textShadow: [
                "0 0 20px rgba(255,105,180,0.2)", 
                "0 0 60px rgba(255,105,180,0.6)", 
                "0 0 20px rgba(255,105,180,0.2)"
              ]
            } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-6xl md:text-9xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-white to-pink-300 tracking-wider font-bold mb-6"
          >
            Mary
          </motion.div>
          
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={stage >= 3 ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 1, duration: 2, type: "spring" }}
          >
            <Heart className="w-16 h-16 text-pink-500 fill-pink-500 drop-shadow-[0_0_15px_rgba(255,105,180,0.8)]" />
          </motion.div>

          {/* Lens Flare effect */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[20px] bg-white opacity-0 rotate-45 blur-[5px]"
            animate={stage >= 3 ? { opacity: [0, 0.5, 0], scale: [0, 2, 0] } : {}}
            transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={stage >= 3 ? { opacity: 0.6 } : {}}
        transition={{ delay: 3, duration: 1 }}
      >
        <div className="text-xs uppercase tracking-widest font-sans mb-2 text-pink-200">Scroll gently</div>
        <motion.div
          className="w-[1px] h-[60px] bg-gradient-to-b from-pink-300/50 to-transparent"
          animate={{ scaleY: [0, 1, 0], translateY: [0, 20, 40] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

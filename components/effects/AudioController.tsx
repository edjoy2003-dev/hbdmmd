"use client";

import { useEffect, useState } from "react";
import { Howl } from "howler";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

let bgMusic: Howl | null = null;

export default function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Initialize audio only once
    if (!bgMusic) {
      bgMusic = new Howl({
        src: ["/audio/ambient.mp3"], // Placeholder path
        loop: true,
        volume: 0.3,
        html5: true, // Good for larger files
      });
    }

    // Attempt to auto-play (browsers often block this until interaction)
    const handleFirstInteraction = () => {
      if (!hasInteracted && bgMusic) {
        bgMusic.play();
        setIsPlaying(true);
        setHasInteracted(true);
      }
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("scroll", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
    };
  }, [hasInteracted]);

  const toggleMute = () => {
    if (!bgMusic) return;
    
    if (isPlaying) {
      bgMusic.pause();
    } else {
      bgMusic.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 1 }}
      onClick={toggleMute}
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full glass-card hover:bg-white/10 transition-colors flex items-center justify-center group"
      aria-label="Toggle audio"
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 text-pink-200 group-hover:text-white transition-colors" />
      ) : (
        <VolumeX className="w-5 h-5 text-pink-200/50 group-hover:text-white transition-colors" />
      )}
    </motion.button>
  );
}

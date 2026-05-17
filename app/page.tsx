"use client";

import { useState } from "react";
import Preloader from "@/components/sections/Preloader";
import IntroScene from "@/components/sections/IntroScene";
import MemoryGalleryScene from "@/components/sections/MemoryGalleryScene";
import MessageCardScene from "@/components/sections/MessageCardScene";
import FinaleScene from "@/components/sections/FinaleScene";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="w-full relative bg-transparent selection:bg-pink-500/30">
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <>
          <IntroScene />
          
          <div className="relative">
            {/* Transition gradient overlay between Intro and Gallery */}
            <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-[#0a0510] to-transparent z-20 pointer-events-none" />
            <MemoryGalleryScene />
          </div>

          <div className="relative">
             {/* Transition gradient overlay between Gallery and Message */}
            <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-transparent via-[#0a0510]/50 to-transparent z-20 pointer-events-none" />
            <MessageCardScene />
          </div>

          <div className="relative">
            {/* Transition gradient overlay between Message and Finale */}
            <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-transparent to-[#0a0510] z-20 pointer-events-none" />
            <FinaleScene />
          </div>
        </>
      )}
    </main>
  );
}

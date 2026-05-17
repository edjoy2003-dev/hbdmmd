"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Memory = {
  id: number;
  type: "image" | "video";
  src: string;
  caption: string;
};

const memories: Memory[] = [
  { id: 1, type: "video", src: "/videos/mary-vid-1.mp4", caption: "The way you carry yourself with so much joy." },
  { id: 2, type: "image", src: "/images/mary-1.jpeg", caption: "Your radiant smile lights up the room." },
  { id: 3, type: "video", src: "/videos/mary-vid-2.mp4", caption: "Laughter that makes everything better." },
  { id: 4, type: "image", src: "/images/mary-2.jpeg", caption: "Every moment with you is magic." },
  { id: 5, type: "video", src: "/videos/mary-vid-3.mp4", caption: "A beautiful soul shining through." },
  { id: 6, type: "image", src: "/images/mary-3.jpeg", caption: "Elegance and grace in everything you do." },
  { id: 7, type: "video", src: "/videos/mary-vid-4.mp4", caption: "Creating memories that will last a lifetime." },
  { id: 8, type: "image", src: "/images/mary-4.jpeg", caption: "The world is better with you in it." },
  { id: 9, type: "image", src: "/images/mary-5.jpeg", caption: "Unforgettable moments." },
];

export default function MemoryGalleryScene() {
  const [focusedId, setFocusedId] = useState<number | null>(null);

  const focusedMemory = memories.find((m) => m.id === focusedId);

  return (
    <section className="relative w-full min-h-[150vh] py-20 md:py-32 flex items-center justify-center overflow-hidden snap-center">
      <div className="z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16 relative">
        {memories.map((memory, index) => {
          // Calculate offset position for floating effect
          const yOffset = index % 2 === 0 ? "10vh" : "-5vh";
          const rotation = index % 2 === 0 ? 3 : -3;
          
          return (
            <motion.div
              key={memory.id}
              className="relative w-full aspect-[3/4] cursor-pointer group origin-center z-10"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.5, delay: index * 0.1, type: "spring", bounce: 0.2 }}
              style={{ marginTop: typeof window !== "undefined" && window.innerWidth > 640 ? yOffset : "0vh" }}
              animate={{ y: [0, -10, 0], rotate: [rotation, rotation + 1, rotation] }}
              // @ts-ignore
              transition={{
                y: { duration: 6 + index, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 8 + index, repeat: Infinity, ease: "easeInOut" }
              }}
              whileHover={{ scale: 1.03, rotate: 0, zIndex: 30 }}
              onClick={() => setFocusedId(memory.id)}
            >
              <div className="w-full h-full p-2 md:p-3 glass-card rounded-xl relative shadow-[0_0_20px_rgba(255,105,180,0.1)] group-hover:shadow-[0_0_40px_rgba(255,105,180,0.3)] transition-shadow duration-700">
                <div className="w-full h-full overflow-hidden rounded-lg bg-pink-900/20 relative">
                  {memory.type === "image" ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={memory.src}
                      alt="Memory of Mary"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmZmQxZGMiIC8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmZjY5YjQiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjIweCI+UGxhY2Vob2xkZXI8L3RleHQ+PC9zdmc+';
                      }}
                    />
                  ) : (
                    <video
                      src={memory.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100 pointer-events-none"
                    />
                  )}
                  
                  {/* Video Play Icon Indicator for Gallery View */}
                  {memory.type === "video" && (
                    <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-md rounded-full p-2 z-20">
                      <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0510]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Cinematic Focus Mode */}
      <AnimatePresence>
        {focusedId && focusedMemory && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Background Blur */}
            <motion.div 
              className="absolute inset-0 bg-[#0a0510]/80 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFocusedId(null)}
            />

            <div className="relative flex flex-col items-center max-w-4xl w-full max-h-screen overflow-y-auto no-scrollbar py-10">
              <motion.div
                className="relative w-full max-w-[85vw] sm:max-w-md md:max-w-xl aspect-[3/4] p-3 md:p-4 glass-card rounded-2xl z-10 shadow-[0_0_60px_rgba(255,105,180,0.3)] shrink-0"
                layoutId={`card-${focusedId}`}
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50, opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
              >
                {focusedMemory.type === "image" ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={focusedMemory.src}
                    alt="Focused Memory"
                    className="w-full h-full object-cover rounded-xl"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmZmQxZGMiIC8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmZjY5YjQiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjIweCI+UGxhY2Vob2xkZXI8L3RleHQ+PC9zdmc+';
                    }}
                  />
                ) : (
                  <video
                    src={focusedMemory.src}
                    autoPlay
                    loop
                    playsInline
                    controls
                    className="w-full h-full object-cover rounded-xl"
                  />
                )}
              </motion.div>

              <motion.p
                className="mt-6 md:mt-8 text-xl sm:text-2xl md:text-4xl font-serif text-pink-100 text-glow text-center z-10 px-4"
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{ delay: 0.3, duration: 1 }}
              >
                {focusedMemory.caption}
              </motion.p>
              
              <motion.button
                className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 sm:p-4 text-white/50 hover:text-white z-20 md:-mr-16 bg-black/20 rounded-full sm:bg-transparent"
                onClick={() => setFocusedId(null)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <span className="hidden sm:inline">✕ Close</span>
                <span className="sm:hidden text-xl">✕</span>
              </motion.button>
            </div>
            
            {/* Spotlight */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] md:w-[80vw] md:h-[80vw] rounded-full bg-pink-500/20 blur-[100px] md:blur-[150px] pointer-events-none z-0"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 1.5 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

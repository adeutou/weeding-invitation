import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Camera, Sparkles } from "lucide-react";
import { GalleryPhoto } from "../types";

interface GallerySectionProps {
  photos?: GalleryPhoto[];
}

export default function GallerySection({ photos = [] }: GallerySectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    if (photos.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    if (photos.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  if (!photos || photos.length === 0) {
    return (
      <section id="gallery-section" className="relative py-24 px-6 md:px-12 bg-[#121110] text-stone-300 border-b border-stone-800 select-none">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Camera className="w-12 h-12 text-gold/60 mx-auto mb-4 stroke-[1.25]" />
          <h2 className="font-serif text-3xl font-light tracking-wide text-white">La Galerie Des Souvenirs</h2>
          <div className="w-12 h-px bg-gold/40 mx-auto mt-3 mb-6" />
          <p className="font-serif italic text-sm text-stone-400 max-w-md mx-auto">
            Your custom memory room is clear of frames. Visit the couples atelier dashboard to upload your first wedding snapshots.
          </p>
        </div>
      </section>
    );
  }

  // Helper to compute wrap-around 3D indices for carousel projection
  const getVisibleCards = () => {
    const visible: { photo: GalleryPhoto; index: number; diff: number }[] = [];
    const len = photos.length;
    
    for (let i = 0; i < len; i++) {
      let diff = i - activeIndex;
      // Handle cyclical wrap-around offset calculation to find immediate neighbors
      if (diff > Math.floor(len / 2)) {
        diff -= len;
      } else if (diff < -Math.floor(len / 2)) {
        diff += len;
      }
      
      // Render only in the range of neighboring offsets [-2, -1, 0, 1, 2]
      if (Math.abs(diff) <= 2) {
        visible.push({
          photo: photos[i],
          index: i,
          diff
        });
      }
    }
    return visible;
  };

  const currentPhoto = photos[activeIndex];

  // Map offsets to 3D rotation, scales, translation and layered z-indices
  const cardAnimationVariants = {
    center: {
      x: "0%",
      scale: 1.05,
      rotateY: 0,
      opacity: 1,
      zIndex: 30,
    },
    left1: {
      x: "-50%",
      scale: 0.85,
      rotateY: 28,
      opacity: 0.75,
      zIndex: 20,
    },
    right1: {
      x: "50%",
      scale: 0.85,
      rotateY: -28,
      opacity: 0.75,
      zIndex: 20,
    },
    left2: {
      x: "-95%",
      scale: 0.68,
      rotateY: 42,
      opacity: 0.35,
      zIndex: 10,
    },
    right2: {
      x: "95%",
      scale: 0.68,
      rotateY: -42,
      opacity: 0.35,
      zIndex: 10,
    },
    hidden: {
      scale: 0.4,
      opacity: 0,
      zIndex: 0,
    }
  };

  const getVariant = (diff: number) => {
    if (diff === 0) return "center";
    if (diff === -1) return "left1";
    if (diff === 1) return "right1";
    if (diff === -2) return "left2";
    if (diff === 2) return "right2";
    return "hidden";
  };

  return (
    <section id="gallery-section" className="relative py-28 px-6 md:px-12 bg-[#0E0D0C] text-stone-200 border-b border-stone-900 overflow-hidden select-none">
      
      {/* Cinematic Ambient Blur Backdrop matching current image color tone */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15 blur-[120px] scale-125 pointer-events-none transition-all duration-1000 ease-in-out" 
        style={{ backgroundImage: `url(${currentPhoto.url})` }}
      />
      
      {/* Symmetrically aligned background frame lines */}
      <div className="absolute top-12 left-12 right-12 bottom-12 border border-white/5 pointer-events-none rounded-lg" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Cinematic Header */}
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-sans font-bold block mb-2">Moments in Provence</span>
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-white">Galerie de la Rose</h2>
          <div className="w-16 h-px bg-gold/30 mx-auto mt-4 mb-3" />
          <p className="font-serif italic text-xs sm:text-sm text-stone-400 max-w-md mx-auto leading-relaxed">
            A dynamic memory landscape of sweet interactions, local summer light, and cherished chapters.
          </p>
        </div>

        {/* 3D Stage Carousel viewport */}
        <div className="relative w-full h-[360px] sm:h-[480px] md:h-[540px] flex items-center justify-center [perspective:1400px] [transform-style:preserve-3d]">
          
          {/* Symmetrical arrows hugging container borders */}
          <div className="absolute left-2 md:left-6 z-50">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-white/10 hover:border-gold/40 bg-black/40 hover:bg-black/80 backdrop-blur-md text-stone-300 hover:text-white flex items-center justify-center transition-all cursor-pointer group shadow-2xl"
              aria-label="Previous Frame"
            >
              <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
            </button>
          </div>

          <div className="absolute right-2 md:right-6 z-50">
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-white/10 hover:border-gold/40 bg-black/40 hover:bg-black/80 backdrop-blur-md text-stone-300 hover:text-white flex items-center justify-center transition-all cursor-pointer group shadow-2xl"
              aria-label="Next Frame"
            >
              <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Cards Track wrapper */}
          <div className="relative w-full h-full max-w-lg flex items-center justify-center [transform-style:preserve-3d]">
            {getVisibleCards().map(({ photo, index, diff }) => {
              const variantName = getVariant(diff);
              const isActive = diff === 0;

              return (
                <motion.div
                  key={photo.id}
                  initial={false}
                  animate={variantName}
                  variants={cardAnimationVariants}
                  transition={{ duration: 0.65, ease: [0.25, 0.8, 0.25, 1] }}
                  onClick={() => !isActive && setActiveIndex(index)}
                  style={{ transformStyle: "preserve-3d" }}
                  className={`absolute w-[180px] h-[270px] sm:w-[250px] sm:h-[375px] md:w-[290px] md:h-[435px] rounded-2xl overflow-hidden cursor-pointer shadow-2xl select-none`}
                >
                  <div className="relative w-full h-full group">
                    {/* Golden accent inner frame for focused card */}
                    {isActive && (
                      <div className="absolute inset-0 border border-gold/40 rounded-2xl pointer-events-none z-30 m-3" />
                    )}

                    {/* Ambient light glow inside the frame */}
                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/80 pointer-events-none z-20" />

                    <img
                      src={photo.url}
                      alt={photo.caption}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 group-hover:scale-102"
                    />

                    {/* Play symbol on focused card to match look & feel of user's uploaded mockup */}
                    {isActive && (
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center z-40 pointer-events-none">
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.25, duration: 0.4 }}
                          className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg"
                        >
                          {/* Semicolon floral geometry or media play aspect */}
                          <div className="w-0 h-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-white ml-1.5 opacity-90" />
                        </motion.div>
                      </div>
                    )}

                    {/* Micro location hash banner on top right */}
                    {isActive && (
                      <div className="absolute top-6 right-6 z-30 bg-black/35 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-md text-[8px] font-sans uppercase tracking-[0.2em] font-medium text-gold">
                        #Château-Provence
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Caption and Footnotes of current focus photograph stacked with premium spacious typography */}
        <div className="mt-8 max-w-xl mx-auto text-center relative z-20 px-4 min-h-[120px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhoto.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45 }}
              className="space-y-3"
            >
              <h3 className="text-white font-sans text-2xl sm:text-3xl font-bold tracking-widest uppercase leading-tight">
                {currentPhoto.caption.split(". ")[0] || "PROVENCE STORY"}
              </h3>
              
              <div className="flex items-center gap-3 justify-center text-gold text-[9px] font-sans tracking-[0.25em] uppercase font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CHÂTEAU DE LA ROSE MEMORY</span>
                <Sparkles className="w-3.5 h-3.5" />
              </div>

              <div className="w-12 h-px bg-gold/30 mx-auto my-1" />

              <p className="font-serif italic text-xs sm:text-sm text-stone-400 max-w-md mx-auto leading-relaxed">
                {currentPhoto.caption.includes(". ") 
                  ? currentPhoto.caption.substring(currentPhoto.caption.indexOf(". ") + 2) 
                  : currentPhoto.caption}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Minimal dot indices pagination below */}
        <div className="mt-6 flex items-center justify-center gap-1.5">
          {photos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === activeIndex ? "w-8 bg-gold" : "w-1.5 bg-stone-700 hover:bg-stone-500"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

import React from "react";
import { motion } from "motion/react";
import { Heart, BookOpen, MapPin, Sparkles, Send } from "lucide-react";
import { StoryChapter } from "../types";

interface StorySectionProps {
  chapters?: StoryChapter[];
}

export default function StorySection({ chapters }: StorySectionProps) {
  // Fallback to beautiful default timeline eras if not provided
  const staticChapters = chapters && chapters.length > 0 ? chapters : [
    {
      id: "chapter-1",
      title: "Chapter I: The Boulevard Encounter",
      period: "October - Autumn In Paris",
      subtitle: "A serendipitous shelter from rain",
      content: "It began under a forest-green canopy on Rue Saint-André des Arts. A sudden autumn downpour forced Clara to seek shelter beneath the awning of an old bookshop where Charles was examining vintage maps. A shared umbrella and three hours of conversation over spiced tea in Saint-Germain-des-Prés set the trajectory for our hearts."
    },
    {
      id: "chapter-2",
      title: "Chapter II: The Lavender Epistles",
      period: "A Summer of Distance",
      subtitle: "Handwritten ink across oceans",
      content: "When Charles accepted a residency in Rome and Clara was documenting the botanics of southern France, letters became our lifeblood. Two hundred and fourteen hand-sealed envelopes traveled between Provence and Prague, preserving every dream, observation, and late-night reflection in dark ink on cotton paper."
    },
    {
      id: "chapter-3",
      title: "Chapter III: The Promises in the Ruins",
      period: "September - Sacred Provence",
      subtitle: "An oath of dynamic devotion",
      content: "Amidst the silent wind and silver olive groves of the Alpilles, Charles asked Clara to build a life of shared art and timeless architecture. It was simple, quiet, and sacred. We decided to return to these hills of Provence to share our vows with the souls who hold our stories dearest."
    }
  ];

  // Map icon decorations accordingly
  const icons = [
    <BookOpen className="w-4 h-4 text-rose" />,
    <Send className="w-4 h-4 text-sage" />,
    <Sparkles className="w-4 h-4 text-gold" />
  ];

  return (
    <section id="our-story-section" className="relative py-24 px-6 md:px-12 bg-cream text-charcoal overflow-hidden paper-texture">
      
      {/* Decorative Vector Florals */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.06] text-sage-light pointer-events-none">
        <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M50,0 Q65,40 100,50 Q65,60 50,100 Q35,60 0,50 Q35,40 50,0 Z" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-64 h-64 opacity-[0.06] text-sage-light pointer-events-none" style={{ transform: "scaleX(-1)" }}>
        <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M50,0 Q65,40 100,50 Q65,60 50,100 Q35,60 0,50 Q35,40 50,0 Z" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-sans font-medium block mb-2">Our Journey</span>
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-charcoal">The Chapters of Us</h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mt-4 mb-2" />
          <p className="font-serif italic text-sm text-stone-500 max-w-sm mx-auto">
            A linear journey of coffee spills, lavender gardens, and handwritten letters that led us to this moment.
          </p>
        </div>

        {/* Vertical Timeline Structure */}
        <div className="relative mt-12">
          {/* Central spine connector */}
          <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-px bg-dashed border-l border-gold/30" />

          {staticChapters.map((chap, index) => {
            const isEven = index % 2 === 0;
            const currentIcon = icons[index % icons.length];
            return (
              <div key={chap.id || index} className="relative mb-20 last:mb-0">
                {/* Indicator on Center Spine */}
                <div className="absolute left-1/2 -translate-x-1/2 top-1.5 z-10">
                  <motion.div
                    whileInView={{ scale: [1, 1.2, 1] }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="w-10 h-10 rounded-full bg-cream border border-gold/50 shadow-xs flex items-center justify-center p-0.5"
                  >
                    <div className="w-8 h-8 rounded-full bg-parchment border border-dashed border-gold/30 flex items-center justify-center">
                      {currentIcon}
                    </div>
                  </motion.div>
                </div>

                {/* Timeline Grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                  {/* Left Column */}
                  <div className={`md:text-right flex flex-col justify-center ${isEven ? "md:order-1" : "md:order-2 md:text-left"}`}>
                    {isEven ? (
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="pr-0 md:pr-12 pl-12 md:pl-0"
                      >
                        <span className="text-gold font-sans text-xs tracking-[0.25em] uppercase font-semibold">{chap.subtitle}</span>
                        <h3 className="font-serif text-2xl font-light text-charcoal mt-1 mb-2">{chap.title}</h3>
                        <p className="text-[11px] font-sans text-neutral-400 uppercase tracking-widest flex items-center md:justify-end gap-1 mb-4">
                          <MapPin className="w-3 h-3 text-gold/60" />
                          <span>{chap.period}</span>
                        </p>
                        <p className="font-serif text-[15px] leading-relaxed text-stone-600 font-light">
                          {chap.content}
                        </p>
                      </motion.div>
                    ) : (
                      /* Display label spacer on desktop */
                      <div className="hidden md:flex flex-col items-end justify-center pr-12 text-right">
                        <span className="font-serif text-xl italic font-extralight text-gold/40 tracking-wide select-none">
                          {chap.period.split(" - ")[0]}
                        </span>
                        <div className="text-[9px] font-sans text-stone-400 tracking-widest uppercase mt-1">THE SCENE</div>
                      </div>
                    )}
                  </div>

                  {/* Right Column */}
                  <div className={`flex flex-col justify-center ${isEven ? "md:order-2" : "md:order-1 md:text-right"}`}>
                    {!isEven ? (
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="pl-12 md:pl-12 pr-0 md:pr-0 text-left"
                      >
                        <span className="text-gold font-sans text-xs tracking-[0.25em] uppercase font-semibold">{chap.subtitle}</span>
                        <h3 className="font-serif text-2xl font-light text-charcoal mt-1 mb-2">{chap.title}</h3>
                        <p className="text-[11px] font-sans text-neutral-400 uppercase tracking-widest flex items-center gap-1 mb-4">
                          <MapPin className="w-3 h-3 text-gold/60" />
                          <span>{chap.period}</span>
                        </p>
                        <p className="font-serif text-[15px] leading-relaxed text-stone-600 font-light">
                          {chap.content}
                        </p>
                      </motion.div>
                    ) : (
                      /* Display label spacer on desktop */
                      <div className="hidden md:flex flex-col items-start justify-center pl-12 text-left">
                        <span className="font-serif text-xl italic font-extralight text-gold/40 tracking-wide select-none">
                          {chap.period.split(" - ")[0]}
                        </span>
                        <div className="text-[9px] font-sans text-stone-400 tracking-widest uppercase mt-1">THE SCENE</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile Era Label Badge */}
                <div className="absolute top-2 left-4 md:hidden block">
                  <span className="font-sans text-[9px] tracking-widest font-bold bg-[#EFECE8] text-charcoal border border-taupe px-2 py-0.5 rounded shadow-2xs">
                    {chap.period.split(" - ")[0]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing vignette */}
        <div className="flex justify-center mt-20">
          <div className="text-center">
            <Heart className="w-5 h-5 text-rose animate-pulse mx-auto" />
            <div className="font-cursive text-3xl text-gold mt-2">To many more chapters together...</div>
          </div>
        </div>

      </div>
    </section>
  );
}


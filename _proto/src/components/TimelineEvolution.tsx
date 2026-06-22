import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, MapPin, Map, ChevronRight, Moon, Coffee, Heart, Music, GlassWater, Landmark } from "lucide-react";
import { WeddingPhase, TimelineEvent } from "../types";

const scheduleData: TimelineEvent[] = [
  // Phase 1: preWedding
  {
    id: "pre-1",
    phase: "preWedding",
    time: "18:00 - 21:00",
    title: "Bienvenue • Welcome Sunset Apéro",
    location: "Château Courtyard Lawn",
    description: "Join us for local organic French wines, cold artisan cheeses, and warm reunion laughter as the sun sinks beneath the lavender hills.",
    iconName: "glass"
  },
  {
    id: "pre-2",
    phase: "preWedding",
    time: "21:30",
    title: "Candlelit Garden Chords",
    location: "The Old Oak Fountain",
    description: "An acoustic classical guitar set under fairy lights to ease everyone into the calm country breeze before the grand day.",
    iconName: "music"
  },
  // Phase 2: bigDay
  {
    id: "day-1",
    phase: "bigDay",
    time: "14:30",
    title: "The Assembly & Welcoming",
    location: "Sainte-Marie Glass Orangery Entrance",
    description: "Please arrive and pick up your hand-bound botanical program booklets. Infused floral waters will be served.",
    iconName: "landmark"
  },
  {
    id: "day-2",
    phase: "bigDay",
    time: "15:00",
    title: "The Holy Exchange of Vows",
    location: "The Botanical Cathedral Ruins",
    description: "Pledging our lifetimes and exchanging antique gold rings under the shadow of the stone arches.",
    iconName: "heart"
  },
  {
    id: "day-3",
    phase: "bigDay",
    time: "16:30",
    title: "Le Cocktail de Royal Reception",
    location: "The Rose Trellis Maze Gardens",
    description: "Sip custom botanical gins and champagne with local lavender-infused hors d'oeuvres while live jazz strings serenade the terrace.",
    iconName: "glass"
  },
  {
    id: "day-4",
    phase: "bigDay",
    time: "19:00",
    title: "Candlelit Banquet of Provence",
    location: "The Grand Mirror Ballroom",
    description: "A seated 3-course French culinary experience curated by Chef Luc Besson. Organic pairing wines included.",
    iconName: "coffee"
  },
  {
    id: "day-5",
    phase: "bigDay",
    time: "22:00",
    title: "The First Waltz & Live Ball",
    location: "Grand Ballroom & Terrace",
    description: "Dancing under the twilight canopy, featuring the Midnight Chords live orchestra and cutting of the tiered macaron frame cake.",
    iconName: "music"
  },
  // Phase 3: afterglow
  {
    id: "after-1",
    phase: "afterglow",
    time: "11:30 - 14:30",
    title: "The Sunday Pastry & Espresso Recovery",
    location: "The Greenhouse Conservatory",
    description: "Wrap up the incredible weekend with fresh butter croissants, pain au chocolat, local honey, and warm rich espresso.",
    iconName: "coffee"
  },
  {
    id: "after-2",
    phase: "afterglow",
    time: "15:00",
    title: "Warm Departures & Keep Box Signatures",
    location: "The Foyer Courtyard",
    description: "Write your Polaroid blessings, place them on our rustic wood frame, and pick up your miniature olive-oil keepsake bottles before voyage.",
    iconName: "landmark"
  }
];

export default function TimelineEvolution() {
  const [activePhase, setActivePhase] = useState<WeddingPhase>("bigDay");

  const renderIcon = (name: string) => {
    switch (name) {
      case "glass":
        return <GlassWater className="w-5 h-5 text-rose" />;
      case "music":
        return <Music className="w-5 h-5 text-gold" />;
      case "landmark":
        return <Landmark className="w-5 h-5 text-sage" />;
      case "heart":
        return <Heart className="w-5 h-5 text-rose animate-pulse" />;
      case "coffee":
        return <Coffee className="w-5 h-5 text-sage" />;
      default:
        return <Clock className="w-5 h-5 text-gold" />;
    }
  };

  const currentEvents = scheduleData.filter((item) => item.phase === activePhase);

  return (
    <section id="schedule-timeline-section" className="relative py-24 px-6 md:px-12 bg-parchment text-charcoal border-y border-taupe/40 overflow-hidden">
      
      {/* Dynamic graphic subtle floral ring in the background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-gold/5 rounded-full pointer-events-none animate-slow-spin flex items-center justify-center">
        <div className="w-[500px] h-[500px] border border-dashed border-rose/10 rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Title Block */}
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-sans font-medium block mb-2">The Event Stages</span>
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-charcoal">The Evolutionary Chronicle</h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mt-4 mb-2" />
          <p className="font-serif italic text-sm text-stone-500 max-w-md mx-auto">
            Toggle between the evolutionary chapters of our celebrative weekend.
          </p>
        </div>

        {/* Vintage Tab Binder Selectors */}
        <div className="flex justify-center mb-12 sm:mb-16">
          <div className="inline-flex flex-wrap md:flex-nowrap bg-cream/70 backdrop-blur-md p-1.5 rounded-xl border border-taupe/60 shadow-sm max-w-full justify-center">
            
            {/* Tab 1: Pre-Wedding */}
            <button
              id="tab-pre-wedding"
              onClick={() => setActivePhase("preWedding")}
              className={`px-5 py-3 rounded-lg text-xs tracking-widest uppercase font-medium transition-all duration-300 cursor-pointer ${
                activePhase === "preWedding"
                  ? "bg-gradient-to-b from-cream to-taupe/10 text-gold font-semibold shadow-inner border border-gold/20"
                  : "text-stone-500 hover:text-charcoal"
              }`}
            >
              I. The Gathering (Eve)
            </button>

            {/* Tab 2: Big Day */}
            <button
              id="tab-wedding-day"
              onClick={() => setActivePhase("bigDay")}
              className={`px-5 py-3 rounded-lg text-xs tracking-widest uppercase font-medium transition-all duration-300 cursor-pointer ${
                activePhase === "bigDay"
                  ? "bg-gradient-to-b from-cream to-taupe/10 text-gold font-semibold shadow-inner border border-gold/20"
                  : "text-stone-500 hover:text-charcoal"
              }`}
            >
              II. The Wedding Day
            </button>

            {/* Tab 3: Afterglow */}
            <button
              id="tab-afterglow"
              onClick={() => setActivePhase("afterglow")}
              className={`px-5 py-3 rounded-lg text-xs tracking-widest uppercase font-medium transition-all duration-300 cursor-pointer ${
                activePhase === "afterglow"
                  ? "bg-gradient-to-b from-cream to-taupe/10 text-gold font-semibold shadow-inner border border-gold/20"
                  : "text-stone-500 hover:text-charcoal"
              }`}
            >
              III. The Afterglow (Brunch)
            </button>

          </div>
        </div>

        {/* Schedule List Content Container */}
        <div className="relative min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col gap-6"
            >
              {currentEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="group relative bg-[#fdfbf8]/80 backdrop-blur-xs p-6 md:p-8 rounded-xl border border-taupe/30 hover:border-gold/30 hover:bg-[#fdfbf6] shadow-sm hover:shadow-md transition-all duration-500 flex flex-col md:flex-row md:items-start gap-6 select-none"
                >
                  
                  {/* Outer delicate timeline connector indicator inside card */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1/3 bg-transparent rounded-r group-hover:bg-gold transition-all duration-500" />

                  {/* Left Column: Time & Icon Frame */}
                  <div className="flex items-center md:items-start gap-4 md:w-48 shrink-0">
                    <div className="w-10 h-10 rounded-full bg-cream border border-taupe flex items-center justify-center shadow-xs shrink-0 group-hover:border-gold/40 group-hover:rotate-6 transition-all duration-500">
                      {renderIcon(event.iconName)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-serif text-charcoal font-semibold text-lg md:text-xl tracking-tight">
                        {event.time}
                      </span>
                      <span className="text-[10px] text-stone-400 font-sans tracking-widest uppercase md:hidden block mt-0.5">
                        {event.location}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Title, Location and Description */}
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-serif text-xl md:text-2xl font-light text-charcoal tracking-wide group-hover:text-gold transition-colors duration-300">
                        {event.title}
                      </h3>
                    </div>

                    {/* Desktop Location Label */}
                    <div className="hidden md:flex items-center gap-1.5 text-stone-500 text-xs font-sans uppercase tracking-[0.1em] font-medium mb-3">
                      <MapPin className="w-3.5 h-3.5 text-sage" />
                      <span>{event.location}</span>
                    </div>

                    <p className="font-serif text-stone-600 text-sm md:text-[15px] leading-relaxed font-light">
                      {event.description}
                    </p>
                  </div>

                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dynamic shuttle assistance help card */}
        <div className="mt-16 bg-cream border border-gold/15 p-6 rounded-xl text-center shadow-inner relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-rose/20 via-gold/40 to-sage/20" />
          <Map className="w-6 h-6 text-gold/80 mb-3" />
          <h4 className="font-serif text-lg font-light text-charcoal tracking-wide mb-1">
            Complimentary Guest Shuttle Assistance
          </h4>
          <p className="font-serif text-stone-500 text-xs leading-relaxed max-w-lg mb-3">
            An elegant coach service will run between Saint-Sulpice Train Station, the local hotels (Le Clos &amp; Grand Saint-Jean), and the Château venue before the Eve and after Sunday departures. Please specify if you need shuttle transport in your RSVP below.
          </p>
          <div className="inline-flex items-center gap-1 text-[10px] text-gold uppercase tracking-[0.2em] font-sans font-semibold">
            <span>Schedule details available in guest-guide folder</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>

      </div>
    </section>
  );
}

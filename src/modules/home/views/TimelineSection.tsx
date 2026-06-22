'use client'

import { useState } from 'react'
import {
  FiClock,
  FiMapPin,
  FiMap,
  FiChevronRight,
  FiMusic,
  FiCoffee,
  FiHeart,
} from 'react-icons/fi'
import { RiGlassesFill, RiBuildingLine } from 'react-icons/ri'
import type { TimelineEventSelect } from '@/server/db/schema'

type WeddingPhase = 'preWedding' | 'bigDay' | 'afterglow'

interface TimelineSectionProps {
  events: TimelineEventSelect[]
}

function renderIcon(name: string) {
  switch (name) {
    case 'glass':
      return <RiGlassesFill className="w-5 h-5 text-rose" />
    case 'music':
      return <FiMusic className="w-5 h-5 text-gold" />
    case 'landmark':
      return <RiBuildingLine className="w-5 h-5 text-sage" />
    case 'heart':
      return <FiHeart className="w-5 h-5 text-rose animate-pulse" />
    case 'coffee':
      return <FiCoffee className="w-5 h-5 text-sage" />
    default:
      return <FiClock className="w-5 h-5 text-gold" />
  }
}

const PHASE_LABELS: Record<WeddingPhase, string> = {
  preWedding: 'I. The Gathering (Eve)',
  bigDay: 'II. The Wedding Day',
  afterglow: 'III. The Afterglow (Brunch)',
}

export function TimelineSection({ events }: TimelineSectionProps) {
  const [activePhase, setActivePhase] = useState<WeddingPhase>('bigDay')

  const currentEvents = events.filter(e => e.phase === activePhase)

  return (
    <section
      id="schedule-timeline-section"
      className="relative py-24 px-6 md:px-12 bg-parchment text-charcoal border-y border-taupe/40 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-gold/5 rounded-full pointer-events-none animate-slow-spin flex items-center justify-center">
        <div className="w-[500px] h-[500px] border border-dashed border-rose/10 rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-sans font-medium block mb-2">
            The Event Stages
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-charcoal">
            The Evolutionary Chronicle
          </h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mt-4 mb-2" />
          <p className="font-serif italic text-sm text-stone-500 max-w-md mx-auto">
            Toggle between the evolutionary chapters of our celebrative weekend.
          </p>
        </div>

        <div className="flex justify-center mb-12 sm:mb-16">
          <div className="inline-flex flex-wrap md:flex-nowrap bg-cream/70 backdrop-blur-md p-1.5 rounded-xl border border-taupe/60 shadow-sm max-w-full justify-center">
            {(Object.entries(PHASE_LABELS) as Array<[WeddingPhase, string]>).map(([phase, label]) => (
              <button
                key={phase}
                onClick={() => setActivePhase(phase)}
                className={`px-5 py-3 rounded-lg text-xs tracking-widest uppercase font-medium transition-all duration-300 cursor-pointer ${
                  activePhase === phase
                    ? 'bg-linear-to-b from-cream to-taupe/10 text-gold font-semibold shadow-inner border border-gold/20'
                    : 'text-stone-500 hover:text-charcoal'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative min-h-[350px]">
          <div className="flex flex-col gap-6">
            {currentEvents.map(event => (
              <div
                key={event.id}
                className="group relative bg-[#fdfbf8]/80 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-taupe/30 hover:border-gold/30 hover:bg-[#fdfbf6] shadow-sm hover:shadow-md transition-all duration-500 flex flex-col md:flex-row md:items-start gap-6 select-none"
              >
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1/3 bg-transparent rounded-r group-hover:bg-gold transition-all duration-500" />

                <div className="flex items-center md:items-start gap-4 md:w-48 shrink-0">
                  <div className="w-10 h-10 rounded-full bg-cream border border-taupe flex items-center justify-center shadow-sm shrink-0 group-hover:border-gold/40 group-hover:rotate-6 transition-all duration-500">
                    {renderIcon(event.iconName)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif text-charcoal font-semibold text-lg md:text-xl tracking-tight">
                      {event.eventTime}
                    </span>
                    <span className="text-[10px] text-stone-400 font-sans tracking-widest uppercase md:hidden block mt-0.5">
                      {event.location}
                    </span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-serif text-xl md:text-2xl font-light text-charcoal tracking-wide group-hover:text-gold transition-colors duration-300 mb-2">
                    {event.title}
                  </h3>
                  <div className="hidden md:flex items-center gap-1.5 text-stone-500 text-xs font-sans uppercase tracking-[0.1em] font-medium mb-3">
                    <FiMapPin className="w-3.5 h-3.5 text-sage" />
                    <span>{event.location}</span>
                  </div>
                  <p className="font-serif text-stone-600 text-sm md:text-[15px] leading-relaxed font-light">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}

            {currentEvents.length === 0 && (
              <div className="bg-[#fdfbf8]/85 p-12 rounded-xl border border-dashed border-taupe/80 text-center text-xs text-stone-400 font-serif">
                No events scheduled for this phase.
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 bg-cream border border-gold/15 p-6 rounded-xl text-center shadow-inner relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-rose/20 via-gold/40 to-sage/20" />
          <FiMap className="w-6 h-6 text-gold/80 mb-3" />
          <h4 className="font-serif text-lg font-light text-charcoal tracking-wide mb-1">
            Complimentary Guest Shuttle Assistance
          </h4>
          <p className="font-serif text-stone-500 text-xs leading-relaxed max-w-lg mb-3">
            An elegant coach service will run between Saint-Sulpice Train Station, the local hotels (Le Clos &amp; Grand
            Saint-Jean), and the Château venue before the Eve and after Sunday departures. Please specify if you need
            shuttle transport in your RSVP below.
          </p>
          <div className="inline-flex items-center gap-1 text-[10px] text-gold uppercase tracking-[0.2em] font-sans font-semibold">
            <span>Schedule details available in guest-guide folder</span>
            <FiChevronRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </section>
  )
}

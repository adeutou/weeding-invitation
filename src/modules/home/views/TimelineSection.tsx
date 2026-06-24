'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
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

const TIMELINE_BG =
  'https://res.cloudinary.com/dklupmul7/image/upload/v1782265808/IMG_20250601_203036_bprrwg.jpg'

type WeddingPhase = 'preWedding' | 'bigDay' | 'afterglow'

interface TimelineSectionProps {
  events: TimelineEventSelect[]
}

function renderIcon(name: string) {
  switch (name) {
    case 'glass':
      return <RiGlassesFill className="w-5 h-5 text-gold" />
    case 'music':
      return <FiMusic className="w-5 h-5 text-gold" />
    case 'landmark':
      return <RiBuildingLine className="w-5 h-5 text-gold/80" />
    case 'heart':
      return <FiHeart className="w-5 h-5 text-rose animate-pulse" />
    case 'coffee':
      return <FiCoffee className="w-5 h-5 text-gold/80" />
    default:
      return <FiClock className="w-5 h-5 text-gold" />
  }
}

const PHASE_LABELS: Record<WeddingPhase, string> = {
  preWedding: 'I. L\'Accueil (Veille)',
  bigDay: 'II. Le Jour J',
  afterglow: 'III. Le Lendemain (Brunch)',
}

export function TimelineSection({ events }: TimelineSectionProps) {
  const [activePhase, setActivePhase] = useState<WeddingPhase>('bigDay')
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onScroll() {
      if (!sectionRef.current || !bgRef.current) return
      const top = sectionRef.current.getBoundingClientRect().top
      bgRef.current.style.transform = `translateY(${-top * 0.38}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const currentEvents = events.filter(e => e.phase === activePhase)

  return (
    <section
      id="schedule-timeline-section"
      ref={sectionRef}
      className="relative py-24 px-6 md:px-12 text-cream border-y border-white/10 overflow-hidden"
    >
      {/* Parallax background */}
      <div
        ref={bgRef}
        className="absolute will-change-transform pointer-events-none"
        style={{ top: '-18%', left: 0, right: 0, height: '136%' }}
      >
        <Image
          src={TIMELINE_BG}
          alt="Le programme du mariage"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-[#060F1C]/75 pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-b from-[#060F1C]/60 via-transparent to-[#060F1C]/60 pointer-events-none" />

      {/* Decorative orbit rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/5 rounded-full pointer-events-none animate-slow-spin flex items-center justify-center">
        <div className="w-[500px] h-[500px] border border-dashed border-gold/10 rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-sans font-medium block mb-2">
            Les Étapes du Week-end
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-cream drop-shadow-[0_2px_15px_rgba(0,0,0,0.5)]">
            La Chronique de notre Union
          </h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mt-4 mb-2" />
          <p className="font-serif italic text-sm text-white/50 max-w-md mx-auto">
            Parcourez les différents moments clés de notre week-end de célébration.
          </p>
        </div>

        {/* Phase tabs */}
        <div className="flex justify-center mb-12 sm:mb-16">
          <div className="inline-flex flex-wrap md:flex-nowrap bg-[#060F1C]/60 backdrop-blur-md p-1.5 rounded-xl border border-white/10 shadow-sm max-w-full justify-center">
            {(Object.entries(PHASE_LABELS) as Array<[WeddingPhase, string]>).map(([phase, label]) => (
              <button
                key={phase}
                onClick={() => setActivePhase(phase)}
                className={`px-5 py-3 rounded-lg text-xs tracking-widest uppercase font-medium transition-all duration-300 cursor-pointer ${activePhase === phase
                    ? 'bg-white/15 text-gold font-semibold shadow-inner border border-gold/30 backdrop-blur-sm'
                    : 'text-white/50 hover:text-cream'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline cards */}
        <div className="relative min-h-[350px]">
          <div className="flex flex-col gap-6">
            {currentEvents.map(event => (
              <div
                key={event.id}
                className="group relative bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-xl border border-white/15 hover:border-gold/40 hover:bg-white/15 shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col md:flex-row md:items-start gap-6"
              >
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1/3 bg-transparent rounded-r group-hover:bg-gold transition-all duration-500" />

                <div className="flex items-center md:items-start gap-4 md:w-48 shrink-0">
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shadow-sm shrink-0 group-hover:border-gold/50 group-hover:rotate-6 transition-all duration-500">
                    {renderIcon(event.iconName)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif text-cream font-semibold text-lg md:text-xl tracking-tight">
                      {event.eventTime}
                    </span>
                    <span className="text-[10px] text-white/40 font-sans tracking-widest uppercase md:hidden block mt-0.5">
                      {event.location}
                    </span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-serif text-xl md:text-2xl font-light text-cream tracking-wide group-hover:text-gold transition-colors duration-300 mb-2">
                    {event.title}
                  </h3>
                  <div className="hidden md:flex items-center gap-1.5 text-white/40 text-xs font-sans uppercase tracking-widest font-medium mb-3">
                    <FiMapPin className="w-3.5 h-3.5 text-gold/60" />
                    <span>{event.location}</span>
                  </div>
                  <p className="font-serif text-white/65 text-sm md:text-[15px] leading-relaxed font-light">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}

            {currentEvents.length === 0 && (
              <div className="bg-white/10 backdrop-blur-md p-12 rounded-xl border border-dashed border-white/20 text-center text-xs text-white/40 font-serif">
                Aucun événement prévu pour cette étape.
              </div>
            )}
          </div>
        </div>

        {/* Shuttle service info */}
        <div className="mt-16 bg-white/10 backdrop-blur-md border border-white/15 p-6 rounded-xl text-center shadow-inner relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-gold/50 to-transparent" />
          <FiMap className="w-6 h-6 text-gold/80 mb-3" />
          <h4 className="font-serif text-lg font-light text-cream tracking-wide mb-1">
            Service de Navette pour les Invités
          </h4>
          <p className="font-serif text-white/55 text-xs leading-relaxed max-w-lg mb-3">
            Un service de navette élégant circulera entre la gare de Saint-Sulpice, les hôtels partenaires (Le Clos &amp; Grand
            Saint-Jean) et le Château avant la veille et après les départs du dimanche. Veuillez préciser si vous avez besoin
            d'une navette lors de votre RSVP ci-dessous.
          </p>
          <div className="inline-flex items-center gap-1 text-[10px] text-gold uppercase tracking-[0.2em] font-sans font-semibold">
            <span>Détails des horaires disponibles dans les informations pratiques</span>
            <FiChevronRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </section>
  )
}

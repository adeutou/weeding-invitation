'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { FiCalendar, FiMapPin, FiChevronDown } from 'react-icons/fi'
import { RiHeartFill, RiSparklingFill } from 'react-icons/ri'
import type { TCountdown, TWeddingConfig } from '../@types'

const HERO_BG =
  'https://images.unsplash.com/photo-1595576351013-42a3114b6113?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

interface HeroSectionProps {
  config: TWeddingConfig
  guestName: string
  onScrollToStory: () => void
}

export function HeroSection({ config, guestName, onScrollToStory }: HeroSectionProps) {
  const [countdown, setCountdown] = useState<TCountdown>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  const groomShort = config.groomName.replace('Monsieur ', '')
  const brideShort = config.brideName.replace('Madame ', '')
  const groomInitial = groomShort.charAt(0)
  const brideInitial = brideShort.charAt(0)

  const weddingDate = new Date(config.weddingDateStr)
  const weddingYear = isNaN(weddingDate.getTime()) ? 2026 : weddingDate.getFullYear()
  const weddingMonthIndex = isNaN(weddingDate.getTime()) ? 8 : weddingDate.getMonth()
  const weddingMonthName = isNaN(weddingDate.getTime())
    ? 'Septembre'
    : weddingDate.toLocaleString('fr-FR', { month: 'long' })
  const weddingDay = isNaN(weddingDate.getTime()) ? 19 : weddingDate.getDate()

  const firstDay = new Date(weddingYear, weddingMonthIndex, 1)
  const startDayOfWeek = isNaN(firstDay.getTime()) ? 2 : firstDay.getDay()
  const totalDays = isNaN(weddingDate.getTime())
    ? 30
    : new Date(weddingYear, weddingMonthIndex + 1, 0).getDate()

  const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1)
  const padArray = Array.from({ length: startDayOfWeek })

  useEffect(() => {
    function calculate() {
      const diff = new Date(config.weddingDateStr).getTime() - Date.now()
      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setCountdown({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    calculate()
    const id = setInterval(calculate, 1000)
    return () => clearInterval(id)
  }, [config.weddingDateStr])

  useEffect(() => {
    function onScroll() {
      if (!sectionRef.current || !bgRef.current) return
      const top = sectionRef.current.getBoundingClientRect().top
      bgRef.current.style.transform = `translateY(${-top * 0.38}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[105vh] flex items-center justify-center py-16 md:py-24 px-4 sm:px-6 lg:px-12 select-none border-b border-white/10 overflow-hidden"
    >
      {/* Parallax background */}
      <div
        className="absolute will-change-transform pointer-events-none"
        ref={bgRef}
        style={{ top: '-18%', left: 0, right: 0, height: '136%' }}
      >
        <Image
          src={HERO_BG}
          alt="Albert &amp; Lola"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </div>

      {/* Cinematic gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#060F1C]/88 via-[#060F1C]/65 to-[#060F1C]/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#060F1C]/70 via-transparent to-[#060F1C]/30 pointer-events-none" />

      {/* Corner registration marks */}
      <div className="absolute top-8 left-8 w-12 h-12 pointer-events-none opacity-30">
        <div className="absolute top-6 left-0 right-0 h-px bg-white/50" />
        <div className="absolute left-6 top-0 bottom-0 w-px bg-white/50" />
        <span className="absolute top-1 left-1 text-[8px] tracking-widest text-white/50 font-sans uppercase">
          {groomInitial} &amp; {brideInitial}
        </span>
      </div>
      <div className="absolute bottom-8 right-8 w-12 h-12 pointer-events-none opacity-30">
        <div className="absolute top-6 left-0 right-0 h-px bg-white/50" />
        <div className="absolute left-6 top-0 bottom-0 w-px bg-white/50" />
      </div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left — text content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm py-1.5 px-4 rounded-full border border-white/20 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <p className="font-serif italic text-xs text-white/80">
              Avec une immense joie, pour notre invité(e){' '}
              <span className="font-sans font-bold uppercase text-[10px] tracking-widest text-gold">
                {guestName}
              </span>
            </p>
          </div>

          <div className="space-y-2 max-w-4xl">
            <span className="text-gold uppercase tracking-[0.45em] text-[10px] font-sans font-semibold block">
              La Sainte Union &amp; Célébration
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-extralight tracking-tight text-cream leading-[1.05] whitespace-nowrap drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
              {config.brideName}
              <span className="handwriting text-gold text-5xl sm:text-7xl md:text-8xl lg:text-[104px] inline-block mx-3 -rotate-6 translate-y-2">
                &amp;
              </span>
              <span className="font-normal italic tracking-wide text-white/90">{config.groomName}</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 w-full max-w-md my-8">
            <div className="h-px flex-1 bg-white/20" />
            <span className="font-serif italic text-xs text-white/55 font-normal">
              &ldquo;{config.editorialQuote}&rdquo;
            </span>
            <div className="h-px flex-1 bg-white/20" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mb-10 text-white">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/15">
              <div className="w-9 h-9 rounded-full bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
                <FiCalendar className="w-4 h-4 text-gold" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/50 font-sans">Le Jour J</p>
                <p className="font-serif text-sm font-semibold text-cream">{config.weddingDateReadable}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/15">
              <div className="w-9 h-9 rounded-full bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
                <FiMapPin className="w-4 h-4 text-gold" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/50 font-sans">Le Lieu</p>
                <p className="font-serif text-sm font-semibold text-cream">{config.venueLocation}</p>
              </div>
            </div>
          </div>

          <div className="w-full max-w-lg">
            <p className="text-[10px] uppercase tracking-[0.3em] font-sans text-white/40 mb-3 font-medium">
              Compte à rebours avant les vœux
            </p>
            <div className="grid grid-cols-4 gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/15">
              {([
                { label: 'Jours', value: countdown.days },
                { label: 'Heures', value: countdown.hours },
                { label: 'Min', value: countdown.minutes },
                { label: 'Sec', value: countdown.seconds, accent: true },
              ] as Array<{ label: string; value: number; accent?: boolean }>).map(({ label, value, accent }, i) => (
                <div key={label} className={`flex flex-col items-center py-2 ${i > 0 ? 'border-l border-white/10' : ''}`}>
                  <span className={`font-serif text-3xl md:text-4xl font-light tracking-tight ${accent ? 'text-gold' : 'text-cream'}`}>
                    {value}
                  </span>
                  <span className={`text-[8px] text-white/40 font-sans tracking-[0.2em] uppercase mt-1 ${accent ? 'animate-pulse' : ''}`}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — calendar card */}
        <div className="lg:col-span-5 flex flex-col justify-center items-center lg:items-end w-full">
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-sm">
            <div className="absolute -top-10 -right-10 w-24 h-24 text-white/10 pointer-events-none -rotate-12">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M10,80 Q30,60 50,70 T90,20" />
                <path d="M40,55 C42,48 48,45 50,55" />
                <path d="M60,40 C65,30 75,32 70,42" />
              </svg>
            </div>

            <div className="bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/60 shadow-[0_25px_60px_rgba(6,15,28,0.35)] hover:shadow-[0_30px_70px_rgba(6,15,28,0.45)] transition-all duration-500 hover:rotate-[0.5deg]">
              <div className="flex items-center justify-between border-b border-taupe/50 pb-4 mb-5">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span className="font-sans uppercase text-[10px] tracking-[0.25em] text-stone-500 font-bold">Mairie Rueil-Malmaison</span>
                </div>
                <span className="handwriting text-gold text-lg">Été 2026</span>
              </div>

              <div className="relative w-full overflow-hidden rounded-xl border border-taupe/40 bg-parchment p-1.5 shadow-sm">
                <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: '400/240' }}>
                  <Image
                    src="https://justinehphotography.com/wp-content/uploads/2023/02/mariage-Morrigane-Titouan-1-1-scaled.jpg"
                    alt="Mariage en Provence"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
              </div>

              <div className="mt-6 border-t border-taupe/50 pt-5 text-center">
                <h4 className="font-serif text-sm text-charcoal uppercase tracking-widest font-semibold mb-3">
                  {weddingMonthName} {weddingYear}
                </h4>
                <div className="grid grid-cols-7 gap-2 text-[9px] font-sans font-bold tracking-wider text-stone-400 mb-2">
                  {['DI','LU','MA','ME','JE','VE','SA'].map(d => <span key={d}>{d}</span>)}
                </div>
                <div className="grid grid-cols-7 gap-y-1.5 gap-x-2 text-xs font-serif text-stone-600">
                  {padArray.map((_, idx) => (
                    <span key={`pad-${idx}`} className="text-stone-300" />
                  ))}
                  {daysArray.map(day => {
                    const isWeddingDay = day === weddingDay
                    if (isWeddingDay) {
                      return (
                        <span key={day} className="relative flex items-center justify-center font-bold text-gold-dark z-10 w-6 h-6 mx-auto">
                          {day}
                          <svg viewBox="0 0 24 24" fill="none" stroke="#5577BB" strokeWidth="1.75" className="absolute w-8 h-8 pointer-events-none scale-125 animate-pulse">
                            <path d="M12,21.35 L10.55,20.03 C5.4,15.36 2,12.28 2,8.5 C2,5.42 4.42,3 7.5,3 C9.24,3 10.91,3.81 12,5.09 C13.09,3.81 14.76,3 16.5,3 C19.58,3 22,5.42 22,8.5 C22,12.28 18.6,15.36 13.45,20.04 L12,21.35 Z" />
                          </svg>
                        </span>
                      )
                    }
                    return <span key={day}>{day}</span>
                  })}
                </div>
                <p className="handwriting text-gold text-lg mt-4 flex items-center justify-center gap-1.5">
                  <RiHeartFill className="w-3.5 h-3.5 text-rose" />
                  Le Jour J
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onScrollToStory}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/40 animate-bounce cursor-pointer z-10"
      >
        <span className="text-[8px] font-sans tracking-[0.3em] uppercase block mb-1">Défiler pour commencer</span>
        <FiChevronDown className="w-4 h-4 text-gold/60" />
      </button>

      <div className="absolute top-12 left-6 w-3 h-3 text-gold/30 pointer-events-none">
        <RiSparklingFill className="w-full h-full animate-pulse" />
      </div>
      <div className="absolute top-48 right-12 w-4 h-4 text-white/10 pointer-events-none" style={{ animationDelay: '2s' }}>
        <RiSparklingFill className="w-full h-full animate-pulse" />
      </div>
    </section>
  )
}

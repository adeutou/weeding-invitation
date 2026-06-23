'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { FiCalendar, FiMapPin, FiChevronDown } from 'react-icons/fi'
import { RiHeartFill, RiSparklingFill } from 'react-icons/ri'
import type { TCountdown, TWeddingConfig } from '../@types'

interface HeroSectionProps {
  config: TWeddingConfig
  guestName: string
  onScrollToStory: () => void
}

export function HeroSection({ config, guestName, onScrollToStory }: HeroSectionProps) {
  const [countdown, setCountdown] = useState<TCountdown>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

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

  return (
    <section className="relative min-h-[105vh] bg-cream selection:bg-gold/20 flex items-center justify-center py-16 md:py-24 px-4 sm:px-6 lg:px-12 select-none border-b border-taupe/40 overflow-hidden">
      <div className="absolute top-8 left-8 w-12 h-12 pointer-events-none opacity-40">
        <div className="absolute top-6 left-0 right-0 h-px bg-gold/40" />
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gold/40" />
        <span className="absolute top-1 left-1 text-[8px] tracking-widest text-gold/60 font-sans uppercase">
          {groomInitial} &amp; {brideInitial}
        </span>
      </div>
      <div className="absolute bottom-8 right-8 w-12 h-12 pointer-events-none opacity-40">
        <div className="absolute top-6 left-0 right-0 h-px bg-gold/40" />
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gold/40" />
      </div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <div className="inline-flex items-center gap-3 bg-parchment py-1.5 px-4 rounded-full border border-taupe/65 mb-8 animate-fade-in shadow-sm">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <p className="font-serif italic text-xs text-stone-600">
              Avec une immense joie, pour notre invité(e){' '}
              <span className="font-sans font-bold uppercase text-[10px] tracking-widest text-charcoal">
                {guestName}
              </span>
            </p>
          </div>

          <div className="space-y-2 max-w-4xl">
            <span className="text-gold uppercase tracking-[0.45em] text-[10px] font-sans font-semibold block">
              La Sainte Union &amp; Célébration
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-extralight tracking-tight text-charcoal leading-[1.05] whitespace-nowrap">
              {config.brideName}
              <span className="handwriting text-gold text-5xl sm:text-7xl md:text-8xl lg:text-[104px] inline-block mx-3 -rotate-6 translate-y-2">
                &amp;
              </span>
              <span className="font-normal italic tracking-wide text-stone-800">{config.groomName}</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 w-full max-w-md my-8">
            <div className="h-px flex-1 bg-gold/30" />
            <span className="font-serif italic text-xs text-stone-400 font-normal">
              &ldquo;{config.editorialQuote}&rdquo;
            </span>
            <div className="h-px flex-1 bg-gold/30" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mb-10 text-stone-600">
            <div className="flex items-center gap-3 bg-white/70 p-4 rounded-xl border border-taupe/40">
              <div className="w-9 h-9 rounded-full bg-parchment border border-taupe flex items-center justify-center shrink-0">
                <FiCalendar className="w-4 h-4 text-gold" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 font-sans">Le Jour J</p>
                <p className="font-serif text-sm font-semibold text-charcoal">{config.weddingDateReadable}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/70 p-4 rounded-xl border border-taupe/40">
              <div className="w-9 h-9 rounded-full bg-parchment border border-taupe flex items-center justify-center shrink-0">
                <FiMapPin className="w-4 h-4 text-sage" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 font-sans">Le Lieu</p>
                <p className="font-serif text-sm font-semibold text-charcoal">{config.venueLocation}</p>
              </div>
            </div>
          </div>

          <div className="w-full max-w-lg">
            <p className="text-[10px] uppercase tracking-[0.3em] font-sans text-stone-400 mb-3 font-medium">
              Compte à rebours avant les vœux
            </p>
            <div className="grid grid-cols-4 gap-3 bg-white/45 p-4 rounded-2xl border border-taupe shadow-sm backdrop-blur-sm">
              {([
                { label: 'Jours', value: countdown.days },
                { label: 'Heures', value: countdown.hours },
                { label: 'Min', value: countdown.minutes },
                { label: 'Sec', value: countdown.seconds, accent: true },
              ] as Array<{ label: string; value: number; accent?: boolean }>).map(({ label, value, accent }, i) => (
                <div key={label} className={`flex flex-col items-center py-2 ${i > 0 ? 'border-l border-gold/15' : ''}`}>
                  <span className={`font-serif text-3xl md:text-4xl font-light tracking-tight ${accent ? 'text-rose' : 'text-charcoal'}`}>
                    {value}
                  </span>
                  <span className={`text-[8px] text-stone-400 font-sans tracking-[0.2em] uppercase mt-1 ${accent ? 'animate-pulse' : ''}`}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-center items-center lg:items-end w-full">
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-sm">
            <div className="absolute -top-10 -right-10 w-24 h-24 text-gold/20 pointer-events-none -rotate-12">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M10,80 Q30,60 50,70 T90,20" />
                <path d="M40,55 C42,48 48,45 50,55" />
                <path d="M60,40 C65,30 75,32 70,42" />
              </svg>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-taupe shadow-[0_20px_50px_rgba(26,26,26,0.06)] hover:shadow-[0_25px_60px_rgba(26,26,26,0.09)] transition-all duration-500 hover:rotate-[0.5deg]">
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
                    priority
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
                          <svg viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1.75" className="absolute w-8 h-8 pointer-events-none scale-125 animate-pulse">
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
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-stone-400 animate-bounce cursor-pointer z-10"
      >
        <span className="text-[8px] font-sans tracking-[0.3em] uppercase block mb-1">Défiler pour commencer</span>
        <FiChevronDown className="w-4 h-4 text-gold-dark" />
      </button>

      <div className="absolute top-12 left-6 w-3 h-3 text-gold/30 pointer-events-none">
        <RiSparklingFill className="w-full h-full animate-pulse" />
      </div>
      <div className="absolute top-48 right-12 w-4 h-4 text-rose/20 pointer-events-none" style={{ animationDelay: '2s' }}>
        <RiSparklingFill className="w-full h-full animate-pulse" />
      </div>
    </section>
  )
}

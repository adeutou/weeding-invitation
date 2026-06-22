'use client'

import { FiBookOpen, FiSend, FiMapPin } from 'react-icons/fi'
import { RiHeartFill, RiSparklingFill } from 'react-icons/ri'
import type { StoryChapterRecord } from '@/server/db/schema'

interface StorySectionProps {
  chapters: StoryChapterRecord[]
}

const ICONS = [
  <FiBookOpen key="book" className="w-4 h-4 text-rose" />,
  <FiSend key="send" className="w-4 h-4 text-sage" />,
  <RiSparklingFill key="spark" className="w-4 h-4 text-gold" />,
]

export function StorySection({ chapters }: StorySectionProps) {
  return (
    <section
      id="our-story-section"
      className="relative py-24 px-6 md:px-12 bg-cream text-charcoal overflow-hidden paper-texture"
    >
      <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.06] text-sage-light pointer-events-none">
        <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M50,0 Q65,40 100,50 Q65,60 50,100 Q35,60 0,50 Q35,40 50,0 Z" />
        </svg>
      </div>
      <div
        className="absolute bottom-0 left-0 w-64 h-64 opacity-[0.06] text-sage-light pointer-events-none"
        style={{ transform: 'scaleX(-1)' }}
      >
        <svg viewBox="0 0 100 100" fill="currentColor">
          <path d="M50,0 Q65,40 100,50 Q65,60 50,100 Q35,60 0,50 Q35,40 50,0 Z" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-sans font-medium block mb-2">
            Notre Histoire
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-charcoal">
            Les Chapitres de Notre Vie
          </h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mt-4 mb-2" />
          <p className="font-serif italic text-sm text-stone-500 max-w-sm mx-auto">
            Un voyage parsemé de cafés partagés, de jardins de lavande et de lettres manuscrites qui nous ont menés jusqu'à ce jour.
          </p>
        </div>

        <div className="relative mt-12">
          <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-px border-l border-dashed border-gold/30" />

          {chapters.map((chap, index) => {
            const isEven = index % 2 === 0
            const icon = ICONS[index % ICONS.length]

            return (
              <div key={chap.id || index} className="relative mb-20 last:mb-0">
                <div className="absolute left-1/2 -translate-x-1/2 top-1.5 z-10">
                  <div className="w-10 h-10 rounded-full bg-cream border border-gold/50 shadow-sm flex items-center justify-center p-0.5">
                    <div className="w-8 h-8 rounded-full bg-parchment border border-dashed border-gold/30 flex items-center justify-center">
                      {icon}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                  <div
                    className={`flex flex-col justify-center ${
                      isEven ? 'md:order-1 md:text-right' : 'md:order-2 md:text-left'
                    }`}
                  >
                    {isEven ? (
                      <div className="pr-0 md:pr-12 pl-12 md:pl-0 animate-fade-in">
                        <span className="text-gold font-sans text-xs tracking-[0.25em] uppercase font-semibold">
                          {chap.subtitle}
                        </span>
                        <h3 className="font-serif text-2xl font-light text-charcoal mt-1 mb-2">{chap.title}</h3>
                        <p className="text-[11px] font-sans text-neutral-400 uppercase tracking-widest flex items-center md:justify-end gap-1 mb-4">
                          <FiMapPin className="w-3 h-3 text-gold/60" />
                          <span>{chap.period}</span>
                        </p>
                        <p className="font-serif text-[15px] leading-relaxed text-stone-600 font-light">
                          {chap.content}
                        </p>
                      </div>
                    ) : (
                      <div className="hidden md:flex flex-col items-end justify-center pr-12 text-right">
                        <span className="font-serif text-xl italic font-extralight text-gold/40 tracking-wide select-none">
                          {chap.period.split(' - ')[0]}
                        </span>
                        <div className="text-[9px] font-sans text-stone-400 tracking-widest uppercase mt-1">
                          LE CONTEXTE
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    className={`flex flex-col justify-center ${
                      isEven ? 'md:order-2' : 'md:order-1 md:text-right'
                    }`}
                  >
                    {!isEven ? (
                      <div className="pl-12 animate-fade-in">
                        <span className="text-gold font-sans text-xs tracking-[0.25em] uppercase font-semibold">
                          {chap.subtitle}
                        </span>
                        <h3 className="font-serif text-2xl font-light text-charcoal mt-1 mb-2">{chap.title}</h3>
                        <p className="text-[11px] font-sans text-neutral-400 uppercase tracking-widest flex items-center gap-1 mb-4">
                          <FiMapPin className="w-3 h-3 text-gold/60" />
                          <span>{chap.period}</span>
                        </p>
                        <p className="font-serif text-[15px] leading-relaxed text-stone-600 font-light">
                          {chap.content}
                        </p>
                      </div>
                    ) : (
                      <div className="hidden md:flex flex-col items-start justify-center pl-12">
                        <span className="font-serif text-xl italic font-extralight text-gold/40 tracking-wide select-none">
                          {chap.period.split(' - ')[0]}
                        </span>
                        <div className="text-[9px] font-sans text-stone-400 tracking-widest uppercase mt-1">
                          LE CONTEXTE
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="absolute top-2 left-4 md:hidden block">
                  <span className="font-sans text-[9px] tracking-widest font-bold bg-parchment text-charcoal border border-taupe px-2 py-0.5 rounded shadow-sm">
                    {chap.period.split(' - ')[0]}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex justify-center mt-20">
          <div className="text-center">
            <RiHeartFill className="w-5 h-5 text-rose animate-pulse mx-auto" />
            <div className="handwriting text-3xl text-gold mt-2">Pour encore bien d'autres chapitres ensemble...</div>
          </div>
        </div>
      </div>
    </section>
  )
}

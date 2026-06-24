import { FiMapPin } from 'react-icons/fi'
import type { StoryChapterRecord } from '@/server/db/schema'

interface StorySectionProps {
  chapters: StoryChapterRecord[]
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI']

const BLOOM_COLORS: ReadonlyArray<{ petal: string; inner: string; center: string }> = [
  { petal: '#5577BB', inner: '#E6EFF8', center: '#2D4A8A' },
  { petal: '#7B9BB5', inner: '#5577BB', center: '#2D4A8A' },
  { petal: '#2D4A8A', inner: '#7B9BB5', center: '#5577BB' },
]

const PETAL_COUNTS = [5, 6, 8]

function ChapterBloom({ index }: { index: number }) {
  const colors = BLOOM_COLORS[index % BLOOM_COLORS.length] ?? BLOOM_COLORS[0]!
  const petals = PETAL_COUNTS[index % PETAL_COUNTS.length] ?? 6
  const angleStep = 360 / petals

  return (
    <svg viewBox="-22 -22 44 44" className="w-full h-full" fill="none">
      {Array.from({ length: petals }, (_, i) => (
        <ellipse
          key={i}
          cx="0"
          cy="-12"
          rx="5.5"
          ry="12"
          fill={colors.petal}
          opacity="0.55"
          transform={`rotate(${i * angleStep})`}
        />
      ))}
      {Array.from({ length: petals }, (_, i) => (
        <ellipse
          key={`inner-${i}`}
          cx="0"
          cy="-7"
          rx="3.5"
          ry="7"
          fill={colors.inner}
          opacity="0.38"
          transform={`rotate(${i * angleStep + angleStep / 2})`}
        />
      ))}
      <circle cx="0" cy="0" r="5.5" fill={colors.inner} opacity="0.9" />
      <circle cx="0" cy="0" r="3" fill={colors.center} opacity="0.75" />
      <circle cx="0" cy="0" r="1.3" fill="#E6EFF8" opacity="0.95" />
    </svg>
  )
}

function BotanicalLeafCorner({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 60 60"
      className="w-full h-full"
      fill="none"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path d="M 5,55 Q 12,38 18,16 Q 21,38 34,46 Q 40,30 58,8 Q 50,33 38,50 Q 24,56 5,55 Z" fill="#5577BB" opacity="0.22" />
      <path d="M 8,50 Q 14,36 19,22 Q 22,36 30,43" stroke="#7B9BB5" strokeWidth="0.8" opacity="0.25" fill="none" />
      <circle cx="17" cy="14" r="2.5" fill="#5577BB" opacity="0.2" />
      <circle cx="36" cy="8" r="2" fill="#7B9BB5" opacity="0.18" />
    </svg>
  )
}

export function StorySection({ chapters }: StorySectionProps) {
  return (
    <section
      id="our-story-section"
      className="relative py-24 px-6 md:px-12 bg-cream text-charcoal overflow-hidden"
    >
      <div className="absolute top-16 right-6 w-72 h-72 opacity-[0.035] pointer-events-none text-gold-dark">
        <svg viewBox="0 0 200 200" fill="currentColor">
          <path d="M100,5 C75,55 15,75 5,100 C15,125 75,145 100,195 C125,145 185,125 195,100 C185,75 125,55 100,5 Z" />
          <path d="M100,35 C85,68 55,78 45,100 C55,122 85,132 100,165 C115,132 145,122 155,100 C145,78 115,68 100,35 Z" opacity="0.5" />
        </svg>
      </div>
      <div
        className="absolute bottom-16 left-6 w-56 h-56 opacity-[0.035] pointer-events-none text-gold-dark"
        style={{ transform: 'scaleX(-1) rotate(20deg)' }}
      >
        <svg viewBox="0 0 200 200" fill="currentColor">
          <path d="M100,5 C75,55 15,75 5,100 C15,125 75,145 100,195 C125,145 185,125 195,100 C185,75 125,55 100,5 Z" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-24">
          <div className="flex justify-center mb-5">
            <svg viewBox="0 0 140 50" className="w-36 h-12 opacity-45" fill="none">
              <path d="M 15,32 C 35,28 55,25 70,22 C 85,19 105,22 125,28" stroke="#7B9BB5" strokeWidth="1.1" />
              <ellipse cx="42" cy="26" rx="9" ry="15" fill="#5577BB" opacity="0.32" transform="rotate(-28 42 26)" />
              <ellipse cx="70" cy="21" rx="8" ry="14" fill="#7B9BB5" opacity="0.3" transform="rotate(0 70 21)" />
              <ellipse cx="98" cy="26" rx="9" ry="15" fill="#5577BB" opacity="0.32" transform="rotate(28 98 26)" />
              <circle cx="70" cy="17" r="4.5" fill="#5577BB" opacity="0.52" />
              <circle cx="70" cy="17" r="2.2" fill="#E6EFF8" opacity="0.75" />
              <ellipse cx="20" cy="33" rx="4" ry="7" fill="#7B9BB5" opacity="0.22" transform="rotate(-15 20 33)" />
              <ellipse cx="120" cy="29" rx="4" ry="7" fill="#7B9BB5" opacity="0.22" transform="rotate(15 120 29)" />
            </svg>
          </div>

          <span className="text-gold uppercase tracking-[0.38em] text-[10px] font-sans font-semibold block mb-3">
            Notre Histoire
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-charcoal">
            Les Chapitres de Notre Vie
          </h2>

          <div className="flex items-center justify-center gap-3 mt-5 mb-4">
            <div className="w-16 h-px bg-gold/30" />
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 opacity-50" fill="none">
              {[0, 72, 144, 216, 288].map(a => (
                <ellipse key={a} cx="8" cy="3.5" rx="2.5" ry="3.5" fill="#5577BB" opacity="0.7" transform={`rotate(${a} 8 8)`} />
              ))}
              <circle cx="8" cy="8" r="2" fill="#E6EFF8" />
            </svg>
            <div className="w-16 h-px bg-gold/30" />
          </div>

          <p className="font-serif italic text-sm text-stone-500 max-w-sm mx-auto leading-relaxed">
            Un voyage parsemé de cafés partagés, de jardins de lavande et de lettres manuscrites qui nous ont menés jusqu'à ce jour.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-8 bottom-8 w-px hidden md:block overflow-hidden">
            <svg className="w-4 h-full absolute -left-1.5" preserveAspectRatio="none" viewBox="0 0 16 1000" fill="none">
              <path
                d="M 8,0 C 5,80 11,160 8,240 C 5,320 11,400 8,480 C 5,560 11,640 8,720 C 5,800 11,880 8,1000"
                stroke="#7B9BB5"
                strokeWidth="1.2"
                strokeDasharray="5 7"
                opacity="0.32"
              />
            </svg>
          </div>

          {chapters.map((chap, index) => {
            const isEven = index % 2 === 0
            const roman = ROMAN[index] ?? String(index + 1)
            const [periodYear, periodPlace] = chap.period.split(' - ')
            const safeYear = periodYear ?? chap.period
            const safePlace = periodPlace ?? ''

            return (
              <div key={chap.id || index} className="relative mb-16 md:mb-24 last:mb-0">
                <div className="absolute left-1/2 -translate-x-1/2 top-6 z-20 hidden md:block">
                  <div className="w-16 h-16 rounded-full bg-cream border-2 border-gold/30 shadow-[0_0_0_4px_rgba(197,160,89,0.08)] flex items-center justify-center p-2">
                    <ChapterBloom index={index} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-24 items-center">
                  <div className={`${isEven ? 'md:order-1' : 'md:order-2'} pl-12 md:pl-0`}>
                    <div
                      className={`relative bg-gradient-to-br from-parchment/80 to-cream border border-gold/25 rounded-2xl p-7 md:p-8 shadow-sm hover:shadow-lg hover:border-gold/45 transition-all duration-500 overflow-hidden ${
                        isEven ? 'md:mr-10' : 'md:ml-10'
                      }`}
                    >
                      <div
                        className={`absolute top-1 ${isEven ? 'right-3' : 'left-3'} font-serif text-[90px] font-bold leading-none pointer-events-none select-none`}
                        style={{ color: 'rgba(85,119,187,0.06)' }}
                      >
                        {roman}
                      </div>

                      <div
                        className={`absolute bottom-2 ${isEven ? 'left-2' : 'right-2'} w-14 h-14 pointer-events-none`}
                      >
                        <BotanicalLeafCorner flip={!isEven} />
                      </div>

                      <div className="relative z-10">
                        <span className="inline-flex items-center gap-2 text-gold font-sans text-[10px] tracking-[0.32em] uppercase font-semibold mb-4">
                          <span className="w-5 h-px bg-gold/50" />
                          {chap.subtitle}
                          <span className="w-5 h-px bg-gold/50" />
                        </span>

                        <h3 className="font-serif text-2xl md:text-[28px] font-light text-charcoal mt-1 mb-3 leading-snug tracking-wide">
                          {chap.title}
                        </h3>

                        <div className="flex items-center gap-1.5 text-[10px] font-sans text-stone-400 uppercase tracking-[0.18em] font-medium mb-5">
                          <FiMapPin className="w-3 h-3 text-gold/50 shrink-0" />
                          <span>{chap.period}</span>
                        </div>

                        <div className="w-8 h-px bg-gold/30 mb-4" />

                        <p className="font-serif text-[14.5px] leading-[1.85] text-stone-600 font-light">
                          {chap.content}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`hidden md:flex flex-col ${
                      isEven ? 'md:order-2 items-start pl-10' : 'md:order-1 items-end pr-10 text-right'
                    }`}
                  >
                    <div
                      className={`w-24 h-24 mb-4 opacity-22 text-gold-dark ${isEven ? '' : 'ml-auto'}`}
                      style={isEven ? undefined : { transform: 'scaleX(-1)' }}
                    >
                      <svg viewBox="0 0 90 90" fill="currentColor">
                        <path d="M8,82 Q18,58 24,22 Q28,52 44,62 Q52,44 76,8 Q68,46 50,68 Q32,76 8,82 Z" opacity="0.7" />
                        <path d="M12,76 Q20,56 25,32 Q28,52 38,60" opacity="0.4" fill="none" stroke="currentColor" strokeWidth="0.8" />
                        <circle cx="23" cy="18" r="4" opacity="0.6" />
                        <circle cx="74" cy="8" r="3" opacity="0.5" />
                      </svg>
                    </div>

                    <div
                      className="font-serif text-5xl md:text-6xl italic font-extralight tracking-wide select-none leading-none"
                      style={{ color: 'rgba(85,119,187,0.28)' }}
                    >
                      {safeYear}
                    </div>

                    {safePlace && (
                      <div className="text-[9px] font-sans uppercase tracking-[0.32em] mt-2.5 text-stone-300">
                        {safePlace}
                      </div>
                    )}

                    <div className={`flex items-center gap-1.5 mt-5 ${isEven ? '' : 'flex-row-reverse'}`}>
                      {[0, 1, 2].map(i => (
                        <div
                          key={i}
                          className="rounded-full bg-gold/20"
                          style={{ width: `${(i + 1) * 4}px`, height: `${(i + 1) * 4}px` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:hidden absolute top-0 left-0 z-10 flex items-center gap-2">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shadow-md border border-gold/30"
                    style={{ background: 'linear-gradient(135deg, #5577BB, #2D4A8A)' }}
                  >
                    <span className="font-serif text-xs text-cream font-semibold">{roman}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex flex-col items-center mt-20 gap-5">
          <svg viewBox="0 0 100 95" className="w-24 h-24 opacity-55" fill="none">
            {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
              <ellipse
                key={a}
                cx="50"
                cy="22"
                rx="9"
                ry="20"
                fill="#5577BB"
                opacity="0.38"
                transform={`rotate(${a} 50 40)`}
              />
            ))}
            {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map(a => (
              <ellipse
                key={`inner-${a}`}
                cx="50"
                cy="29"
                rx="5.5"
                ry="11"
                fill="#E6EFF8"
                opacity="0.35"
                transform={`rotate(${a} 50 40)`}
              />
            ))}
            <circle cx="50" cy="40" r="10" fill="#E6EFF8" opacity="0.75" />
            <circle cx="50" cy="40" r="5.5" fill="#2D4A8A" opacity="0.55" />
            <circle cx="50" cy="40" r="2.2" fill="#E6EFF8" opacity="0.9" />
            <path d="M 50,50 C 48,62 50,76 50,88" stroke="#7B9BB5" strokeWidth="1.3" />
            <ellipse cx="43" cy="65" rx="6" ry="11" fill="#7B9BB5" opacity="0.32" transform="rotate(-32 43 65)" />
            <ellipse cx="57" cy="70" rx="6" ry="11" fill="#5577BB" opacity="0.32" transform="rotate(32 57 70)" />
          </svg>

          <div className="handwriting text-3xl md:text-4xl text-gold text-center leading-snug">
            Pour encore bien d&apos;autres chapitres ensemble...
          </div>
        </div>
      </div>
    </section>
  )
}

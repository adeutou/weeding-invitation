'use client'

import { useEffect, useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiCamera } from 'react-icons/fi'
import { RiSparklingFill } from 'react-icons/ri'
import { useCarousel } from '../hooks/useCarousel'
import type { CardDiff, TGallerySectionProps, TGalleryPhoto } from '../@types'

interface CardTransform {
  translateX: string
  scale: number
  rotateY: number
  opacity: number
  zIndex: number
  pointerEvents: 'auto' | 'none'
}

const CARD_TRANSFORMS: Record<CardDiff, CardTransform> = {
  0: { translateX: '0%', scale: 1.05, rotateY: 0, opacity: 1, zIndex: 30, pointerEvents: 'auto' },
  [-1]: { translateX: '-50%', scale: 0.85, rotateY: 28, opacity: 0.75, zIndex: 20, pointerEvents: 'auto' },
  1: { translateX: '50%', scale: 0.85, rotateY: -28, opacity: 0.75, zIndex: 20, pointerEvents: 'auto' },
  [-2]: { translateX: '-95%', scale: 0.68, rotateY: 42, opacity: 0.35, zIndex: 10, pointerEvents: 'none' },
  2: { translateX: '95%', scale: 0.68, rotateY: -42, opacity: 0.35, zIndex: 10, pointerEvents: 'none' },
}

function EmptyGallery() {
  return (
    <section
      id="gallery-section"
      className="relative py-24 px-6 md:px-12 bg-[#121110] text-stone-300 border-b border-stone-800 select-none"
    >
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <FiCamera className="w-12 h-12 text-gold/60 mx-auto mb-4 stroke-[1.25]" />
        <h2 className="font-serif text-3xl font-light tracking-wide text-white">
          La Galerie Des Souvenirs
        </h2>
        <div className="w-12 h-px bg-gold/40 mx-auto mt-3 mb-6" />
        <p className="font-serif italic text-sm text-stone-400 max-w-md mx-auto">
          Your custom memory room is clear of frames. Visit the Atelier dashboard to upload your first wedding snapshots.
        </p>
      </div>
    </section>
  )
}

function CaptionPanel({ photo, visible }: { photo: TGalleryPhoto; visible: boolean }) {
  const [title, ...rest] = photo.caption.split('. ')
  const subtitle = rest.join('. ')

  return (
    <div
      className="space-y-3 transition-all duration-300"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(12px)' }}
    >
      <h3 className="text-white font-sans text-2xl sm:text-3xl font-bold tracking-widest uppercase leading-tight">
        {title ?? 'PROVENCE STORY'}
      </h3>

      <div className="flex items-center gap-3 justify-center text-gold text-[9px] font-sans tracking-[0.25em] uppercase font-semibold">
        <RiSparklingFill className="w-3.5 h-3.5" />
        <span>Château de la Rose Memory</span>
        <RiSparklingFill className="w-3.5 h-3.5" />
      </div>

      <div className="w-12 h-px bg-gold/30 mx-auto my-1" />

      {subtitle && (
        <p className="font-serif italic text-xs sm:text-sm text-stone-400 max-w-md mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}

export function GallerySection({ photos = [] }: TGallerySectionProps) {
  const { activeIndex, next, prev, goTo, visibleCards } = useCarousel(photos)
  const [captionVisible, setCaptionVisible] = useState(true)
  const [displayedPhoto, setDisplayedPhoto] = useState<TGalleryPhoto | undefined>(photos[0])

  useEffect(() => {
    setCaptionVisible(false)
    const timer = setTimeout(() => {
      setDisplayedPhoto(photos[activeIndex])
      setCaptionVisible(true)
    }, 220)
    return () => clearTimeout(timer)
  }, [activeIndex, photos])

  if (photos.length === 0) return <EmptyGallery />

  const currentPhoto = photos[activeIndex]
  if (!currentPhoto) return <EmptyGallery />

  return (
    <section
      id="gallery-section"
      className="relative py-28 px-6 md:px-12 bg-[#0E0D0C] text-stone-200 border-b border-stone-900 overflow-hidden select-none"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15 blur-[120px] scale-125 pointer-events-none transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${currentPhoto.url})` }}
        aria-hidden="true"
      />

      <div className="absolute top-12 left-12 right-12 bottom-12 border border-white/5 pointer-events-none rounded-lg" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-sans font-bold block mb-2">
            Moments in Provence
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-white">
            Galerie de la Rose
          </h2>
          <div className="w-16 h-px bg-gold/30 mx-auto mt-4 mb-3" />
          <p className="font-serif italic text-xs sm:text-sm text-stone-400 max-w-md mx-auto leading-relaxed">
            A dynamic memory landscape of sweet interactions, local summer light, and cherished chapters.
          </p>
        </div>

        <div
          className="relative w-full h-[360px] sm:h-[480px] md:h-[540px] flex items-center justify-center"
          style={{ perspective: '1400px', transformStyle: 'preserve-3d' }}
        >
          <div className="absolute left-2 md:left-6 z-50">
            <button
              onClick={prev}
              aria-label="Previous Frame"
              className="w-12 h-12 rounded-full border border-white/10 hover:border-gold/40 bg-black/40 hover:bg-black/80 backdrop-blur-md text-stone-300 hover:text-white flex items-center justify-center transition-all cursor-pointer group shadow-2xl"
            >
              <FiChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
            </button>
          </div>

          <div className="absolute right-2 md:right-6 z-50">
            <button
              onClick={next}
              aria-label="Next Frame"
              className="w-12 h-12 rounded-full border border-white/10 hover:border-gold/40 bg-black/40 hover:bg-black/80 backdrop-blur-md text-stone-300 hover:text-white flex items-center justify-center transition-all cursor-pointer group shadow-2xl"
            >
              <FiChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          <div
            className="relative w-full h-full max-w-lg flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {visibleCards.map(({ photo, index, diff }) => {
              const t = CARD_TRANSFORMS[diff]
              const isActive = diff === 0

              return (
                <div
                  key={photo.id}
                  onClick={() => !isActive && goTo(index)}
                  style={{
                    position: 'absolute',
                    transform: `translateX(${t.translateX}) scale(${t.scale}) rotateY(${t.rotateY}deg)`,
                    opacity: t.opacity,
                    zIndex: t.zIndex,
                    pointerEvents: t.pointerEvents,
                    transition: 'all 0.65s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    transformStyle: 'preserve-3d',
                  }}
                  className="w-[180px] h-[270px] sm:w-[250px] sm:h-[375px] md:w-[290px] md:h-[435px] rounded-2xl overflow-hidden cursor-pointer shadow-2xl"
                >
                  <div className="relative w-full h-full group">
                    {isActive && (
                      <div className="absolute inset-0 border border-gold/40 rounded-2xl pointer-events-none z-30 m-3" />
                    )}

                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/80 pointer-events-none z-20" />

                    <img
                      src={photo.url}
                      alt={photo.caption}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 group-hover:scale-105"
                    />

                    {isActive && (
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center z-40 pointer-events-none">
                        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg">
                          <div className="w-0 h-0 border-y-10 border-y-transparent border-l-16 border-l-white ml-1.5 opacity-90" />
                        </div>
                      </div>
                    )}

                    {isActive && (
                      <div className="absolute top-6 right-6 z-30 bg-black/35 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-md text-[8px] font-sans uppercase tracking-[0.2em] font-medium text-gold">
                        #Château-Provence
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-8 max-w-xl mx-auto text-center relative z-20 px-4 min-h-[120px] flex flex-col items-center justify-center">
          {displayedPhoto && (
            <CaptionPanel photo={displayedPhoto} visible={captionVisible} />
          )}
        </div>

        <div className="mt-6 flex items-center justify-center gap-1.5">
          {photos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === activeIndex ? 'w-8 bg-gold' : 'w-1.5 bg-stone-700 hover:bg-stone-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

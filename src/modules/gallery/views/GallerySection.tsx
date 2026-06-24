'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { FiCamera } from 'react-icons/fi'
import { GalleryLightbox } from './GalleryLightbox'
import type { TGallerySectionProps, TGalleryPhoto } from '../@types'

const DESKTOP_SPANS: string[] = [
  'lg:col-span-1 lg:row-span-1',
  'lg:col-span-2 lg:row-span-2',
  'lg:col-span-1 lg:row-span-1',
  'lg:col-span-2 lg:row-span-1',
  'lg:col-span-1 lg:row-span-1',
  'lg:col-span-1 lg:row-span-1',
  'lg:col-span-1 lg:row-span-1',
  'lg:col-span-1 lg:row-span-1',
  'lg:col-span-1 lg:row-span-1',
  'lg:col-span-1 lg:row-span-1',
  'lg:col-span-3 lg:row-span-2',
  'lg:col-span-1 lg:row-span-1',
  'lg:col-span-1 lg:row-span-1',
  'lg:col-span-1 lg:row-span-1',
  'lg:col-span-2 lg:row-span-1',
  'lg:col-span-1 lg:row-span-1',
  'lg:col-span-1 lg:row-span-1',
  'lg:col-span-1 lg:row-span-1',
]

function EmptyGallery() {
  return (
    <section className="relative py-24 px-6 bg-[#060F1C] text-stone-300 border-b border-stone-800 select-none">
      <div className="max-w-4xl mx-auto text-center">
        <FiCamera className="w-12 h-12 text-amber-600/60 mx-auto mb-4 stroke-[1.25]" />
        <h2 className="font-serif text-3xl font-light tracking-wide text-white">
          La Galerie Des Souvenirs
        </h2>
        <div className="w-12 h-px bg-amber-600/40 mx-auto mt-3 mb-6" />
        <p className="font-serif italic text-sm text-stone-400 max-w-md mx-auto">
          Votre galerie est vide. Visitez l'Atelier pour ajouter vos premières photos.
        </p>
      </div>
    </section>
  )
}

export function GallerySection({ photos = [] }: TGallerySectionProps) {
  const [selected, setSelected] = useState<TGalleryPhoto | null>(null)

  const handleOpen = useCallback((photo: TGalleryPhoto) => setSelected(photo), [])
  const handleClose = useCallback(() => setSelected(null), [])

  if (photos.length === 0) return <EmptyGallery />

  return (
    <section
      id="gallery-section"
      className="relative py-24 px-6 md:px-12 bg-[#060F1C] border-b border-stone-900"
    >
      <div className="text-center mb-12">
        <span className="text-amber-600 uppercase tracking-[0.3em] text-[10px] font-sans font-bold block mb-2">
          Moments Partagés
        </span>
        <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-white">
          Galerie de la Rose
        </h2>
        <div className="w-16 h-px bg-amber-600/30 mx-auto mt-4 mb-3" />
        <p className="font-serif italic text-xs sm:text-sm text-stone-400 max-w-md mx-auto leading-relaxed">
          Un panorama de nos souvenirs, capturant la douceur de nos instants partagés ensemble.
        </p>
      </div>

      <div
        className="grid grid-cols-2 lg:grid-cols-6 gap-2 max-w-6xl mx-auto"
        style={{ gridAutoRows: '160px', gridAutoFlow: 'dense' }}
      >
        {photos.map((photo, index) => {
          const desktopSpan = DESKTOP_SPANS[index % DESKTOP_SPANS.length] ?? 'lg:col-span-1 lg:row-span-1'

          return (
            <motion.div
              key={photo.id}
              layoutId={`gallery-photo-${photo.id}`}
              className={`col-span-1 row-span-1 ${desktopSpan} relative overflow-hidden cursor-pointer group`}
              onClick={() => handleOpen(photo)}
              whileHover={{ scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              <Image
                src={photo.url}
                alt={photo.caption}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(max-width: 1024px) 50vw, 20vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 z-10" />
              {photo.caption && (
                <div className="absolute inset-x-0 bottom-0 z-20 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-linear-to-t from-black/80 via-black/40 to-transparent">
                  <p className="font-serif text-white text-xs italic leading-tight line-clamp-2">
                    {photo.caption}
                  </p>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      <AnimatePresence>
        {selected && (
          <GalleryLightbox
            photo={selected}
            photos={photos}
            onClose={handleClose}
            onNavigate={setSelected}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

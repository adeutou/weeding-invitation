'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import type { TGalleryPhoto } from '../@types'

interface GalleryLightboxProps {
  photo: TGalleryPhoto
  photos: TGalleryPhoto[]
  onClose: () => void
  onNavigate: (photo: TGalleryPhoto) => void
}

export function GalleryLightbox({ photo, photos, onClose, onNavigate }: GalleryLightboxProps) {
  const currentIndex = photos.findIndex(p => p.id === photo.id)
  const prev = photos[currentIndex - 1]
  const next = photos[currentIndex + 1]

  return (
    <motion.div
      key="lightbox-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 backdrop-blur-xl bg-black/75"
      onClick={onClose}
    >
      <motion.div
        layoutId={`gallery-photo-${photo.id}`}
        className="relative w-full max-w-5xl"
        style={{ height: 'min(80vh, 700px)' }}
        onClick={e => e.stopPropagation()}
        transition={{ type: 'spring', stiffness: 300, damping: 35 }}
      >
        <Image
          src={photo.url}
          alt={photo.caption}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 80vw"
          priority
        />
      </motion.div>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ delay: 0.15 }}
        onClick={onClose}
        aria-label="Fermer"
        className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full border border-white/20 bg-black/50 text-white hover:bg-white/10 transition-colors cursor-pointer"
      >
        <FiX className="w-5 h-5" />
      </motion.button>

      {prev && (
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ delay: 0.15 }}
          onClick={e => { e.stopPropagation(); onNavigate(prev) }}
          aria-label="Photo précédente"
          className="absolute left-4 md:left-6 w-11 h-11 flex items-center justify-center rounded-full border border-white/20 bg-black/50 text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <FiChevronLeft className="w-5 h-5" />
        </motion.button>
      )}

      {next && (
        <motion.button
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ delay: 0.15 }}
          onClick={e => { e.stopPropagation(); onNavigate(next) }}
          aria-label="Photo suivante"
          className="absolute right-4 md:right-6 w-11 h-11 flex items-center justify-center rounded-full border border-white/20 bg-black/50 text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <FiChevronRight className="w-5 h-5" />
        </motion.button>
      )}

      {photo.caption && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ delay: 0.25 }}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 font-serif italic text-sm text-white/70 text-center max-w-sm px-4 pointer-events-none"
        >
          {photo.caption}
        </motion.p>
      )}
    </motion.div>
  )
}

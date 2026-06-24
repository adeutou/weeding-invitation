'use client'

import { FiVolume2, FiVolumeX } from 'react-icons/fi'
import { cn } from '@/lib/cn'
import { useAmbientAudio } from '../hooks/useAmbientAudio'

export function AudioToggle() {
  const { isPlaying, toggle } = useAmbientAudio()

  return (
    <button
      id="ambient-synth-toggle"
      onClick={toggle}
      title={isPlaying ? 'Couper la musique' : 'Jouer la musique'}
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs tracking-wider transition-all duration-300 cursor-pointer',
        isPlaying
          ? 'bg-gold/15 border-gold text-gold-dark font-medium'
          : 'bg-parchment/60 border-taupe/50 text-stone-500 hover:text-charcoal',
      )}
    >
      {isPlaying ? (
        <FiVolume2 className="w-3.5 h-3.5 shrink-0" />
      ) : (
        <FiVolumeX className="w-3.5 h-3.5 shrink-0" />
      )}
      <span className="font-sans uppercase text-[9px] tracking-widest hidden sm:inline">
        {isPlaying ? 'Son On' : 'Son Off'}
      </span>
    </button>
  )
}

'use client'

import { useCallback, useEffect, useState } from 'react'
import type { AudioHookReturn } from '../@types'

const MUSIC_URL =
  'https://res.cloudinary.com/dklupmul7/video/upload/v1782258498/Nostalgie_d_amour_hqnwc9.mp3'

let singleton: HTMLAudioElement | null = null

function getAudio(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null
  if (!singleton) {
    singleton = new Audio(MUSIC_URL)
    singleton.loop = true
    singleton.volume = 0.45
    singleton.preload = 'auto'
  }
  return singleton
}

export function triggerAutoStart(): void {
  const audio = getAudio()
  if (!audio) return
  audio.muted = false
  audio.play().catch(() => {})
}

export function useAmbientAudio(): AudioHookReturn {
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = getAudio()
    if (!audio) return

    const syncState = () => setIsPlaying(!audio.paused && !audio.muted)

    audio.addEventListener('play', syncState)
    audio.addEventListener('pause', syncState)
    audio.addEventListener('volumechange', syncState)
    syncState()

    return () => {
      audio.removeEventListener('play', syncState)
      audio.removeEventListener('pause', syncState)
      audio.removeEventListener('volumechange', syncState)
    }
  }, [])

  const toggle = useCallback(() => {
    const audio = getAudio()
    if (!audio) return

    if (audio.paused) {
      audio.muted = false
      audio.play().catch(() => {})
    } else {
      audio.muted = !audio.muted
      setIsPlaying(!audio.muted)
    }
  }, [])

  return { isPlaying, toggle }
}

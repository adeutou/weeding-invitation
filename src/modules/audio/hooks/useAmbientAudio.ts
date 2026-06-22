'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { AudioHookReturn } from '../@types'

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext
  }
}

const PENTATONIC_NOTES = [261.63, 392.0, 349.23, 311.13, 392.0, 523.25] as const

export function useAmbientAudio(): AudioHookReturn {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const noteIndexRef = useRef(0)

  const stopAudio = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close()
      audioCtxRef.current = null
    }
    noteIndexRef.current = 0
  }, [])

  const playPulse = useCallback((ctx: AudioContext) => {
    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    const frequency = PENTATONIC_NOTES[noteIndexRef.current % PENTATONIC_NOTES.length]
    if (frequency === undefined) return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(frequency, ctx.currentTime)

    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 1.2)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.8)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 4.0)

    noteIndexRef.current++
  }, [])

  const toggle = useCallback(() => {
    setIsPlaying((prev) => {
      if (prev) {
        stopAudio()
        return false
      }

      try {
        const AudioContextClass = window.AudioContext ?? window.webkitAudioContext
        if (!AudioContextClass) return false

        const ctx = new AudioContextClass()
        audioCtxRef.current = ctx

        playPulse(ctx)
        intervalRef.current = setInterval(() => playPulse(ctx), 4200)

        return true
      } catch {
        return false
      }
    })
  }, [stopAudio, playPulse])

  useEffect(() => {
    return () => stopAudio()
  }, [stopAudio])

  return { isPlaying, toggle }
}

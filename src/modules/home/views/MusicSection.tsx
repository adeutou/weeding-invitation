'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  FiPlay,
  FiPause,
  FiSkipBack,
  FiSkipForward,
  FiShuffle,
  FiRepeat,
  FiVolume,
  FiVolume1,
  FiVolume2,
  FiVolumeX,
} from 'react-icons/fi'
import { RiDiscLine } from 'react-icons/ri'
import { pauseAmbientForVideo, resumeAmbientAfterVideo } from '@/modules/audio/hooks/useAmbientAudio'

const MUSIC_BG =
  'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

type RepeatMode = 'off' | 'all' | 'one'

interface AlbumTrack {
  number: number
  title: string
  src: string
}

const TRACK_FALLBACK: AlbumTrack = { number: 0, title: '', src: '' }

const ALBUM: readonly AlbumTrack[] = [
  { number: 1, title: 'Cent Battements — Intro', src: 'https://res.cloudinary.com/dklupmul7/video/upload/v1782315156/01_-_Cent_Battements_-_Intro_rmlte7.mp4' },
  { number: 2, title: 'My Queen Bana', src: 'https://res.cloudinary.com/dklupmul7/video/upload/v1782315163/02_-_My_Queen_Bana_fucile.mp4' },
  { number: 3, title: 'Angel of Mine', src: 'https://res.cloudinary.com/dklupmul7/video/upload/v1782315163/03_-_Angel_of_Mine_nrbnh4.mp4' },
  { number: 4, title: 'Ma Muse', src: 'https://res.cloudinary.com/dklupmul7/video/upload/v1782315166/04_-_Ma_Muse_w4nm3b.mp4' },
  { number: 5, title: "Nostalgie d'amour", src: 'https://res.cloudinary.com/dklupmul7/video/upload/v1782315147/05_-_Nostalgie_d_amour_ngwn1r.mp4' },
  { number: 6, title: 'Goslar', src: 'https://res.cloudinary.com/dklupmul7/video/upload/v1782322513/goslar_tpk15v.mp4' },
  { number: 7, title: 'Renaître', src: 'https://res.cloudinary.com/dklupmul7/video/upload/v1782315151/07_-_Rena%C3%AEtre_exj9wj.mp4' },
  { number: 8, title: "S'éloigner pour mieux se retrouver", src: 'https://res.cloudinary.com/dklupmul7/video/upload/v1782315149/08_-_S_%C3%A9loigner_pour_mieux_se_retrouver_uljh98.mp4' },
  { number: 9, title: 'Une rose pour toi', src: 'https://res.cloudinary.com/dklupmul7/video/upload/v1782315142/09_-_Une_rose_pour_toi_nctwa0.mp4' },
  { number: 10, title: "On ne s'écoute pas", src: 'https://res.cloudinary.com/dklupmul7/video/upload/v1782315149/10_-_On_ne_s_%C3%A9coute_pas_kvh1ag.mp4' },
  { number: 11, title: "Symphonie d'un cœur fidèle", src: 'https://res.cloudinary.com/dklupmul7/video/upload/v1782315159/11_-_Symphonie_d_un_c%C5%93ur_fid%C3%A8le_zicdna.mp4' },
  { number: 12, title: "Avant l'Union — Outro", src: 'https://res.cloudinary.com/dklupmul7/video/upload/v1782315155/12_-_Avant_l_Union_-_Outro_ep2vk7.mp4' },
  { number: 13, title: 'Ma Reine Bana (Edit · Bonus Track)', src: 'https://res.cloudinary.com/dklupmul7/video/upload/v1782315165/13_-_Ma_Reine_Bana_Edit_Bonus_Track_vfwrnr.mp4' },
]

function formatTime(secs: number): string {
  if (!Number.isFinite(secs) || secs < 0) return '0:00'
  const m = Math.floor(secs / 60)
  const s = Math.floor(secs % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

function randomOtherIndex(current: number, total: number): number {
  if (total <= 1) return 0
  const pool = Array.from({ length: total }, (_, i) => i).filter(i => i !== current)
  return pool[Math.floor(Math.random() * pool.length)] ?? 0
}

export function MusicSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isShuffle, setIsShuffle] = useState(false)
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('off')
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const isPlayingRef = useRef(false)

  useEffect(() => {
    isPlayingRef.current = isPlaying
  }, [isPlaying])

  useEffect(() => {
    function onScroll() {
      if (!sectionRef.current || !bgRef.current) return
      const top = sectionRef.current.getBoundingClientRect().top
      bgRef.current.style.transform = `translateY(${-top * 0.38}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const currentTrack: AlbumTrack = ALBUM[currentIndex] ?? TRACK_FALLBACK
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  function playAtIndex(index: number) {
    setCurrentIndex(index)
    setIsPlaying(true)
    setCurrentTime(0)
    setDuration(0)
    pauseAmbientForVideo()
  }

  function togglePlay() {
    const video = videoRef.current
    if (!video) return
    if (isPlaying) {
      video.pause()
      resumeAmbientAfterVideo()
    } else {
      video.play().catch(() => {})
      pauseAmbientForVideo()
    }
  }

  function playPrev() {
    playAtIndex(
      isShuffle
        ? randomOtherIndex(currentIndex, ALBUM.length)
        : (currentIndex - 1 + ALBUM.length) % ALBUM.length,
    )
  }

  function playNext() {
    playAtIndex(
      isShuffle
        ? randomOtherIndex(currentIndex, ALBUM.length)
        : (currentIndex + 1) % ALBUM.length,
    )
  }

  function cycleRepeat() {
    setRepeatMode(prev => {
      if (prev === 'off') return 'all'
      if (prev === 'all') return 'one'
      return 'off'
    })
  }

  function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = parseInt(e.target.value, 10) / 100
    setVolume(val)
    setIsMuted(val === 0)
    if (videoRef.current) {
      videoRef.current.volume = val
      videoRef.current.muted = val === 0
    }
  }

  function toggleMute() {
    const newMuted = !isMuted
    setIsMuted(newMuted)
    if (videoRef.current) {
      videoRef.current.muted = newMuted
      if (!newMuted && volume === 0) {
        setVolume(0.5)
        videoRef.current.volume = 0.5
      }
    }
  }

  function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const video = videoRef.current
    if (video && Number.isFinite(duration) && duration > 0) {
      video.currentTime = ratio * duration
      setCurrentTime(ratio * duration)
    }
  }

  function handleEnded() {
    if (repeatMode === 'one') {
      const video = videoRef.current
      if (video) {
        video.currentTime = 0
        video.play().catch(() => {})
      }
      return
    }
    if (repeatMode === 'all') {
      playAtIndex(
        isShuffle
          ? randomOtherIndex(currentIndex, ALBUM.length)
          : (currentIndex + 1) % ALBUM.length,
      )
      return
    }
    if (currentIndex < ALBUM.length - 1) {
      playAtIndex(
        isShuffle ? randomOtherIndex(currentIndex, ALBUM.length) : currentIndex + 1,
      )
    } else {
      setIsPlaying(false)
      resumeAmbientAfterVideo()
    }
  }

  return (
    <section
      id="ballplay-section"
      ref={sectionRef}
      className="relative py-24 px-6 md:px-12 border-t border-white/10 overflow-hidden"
    >
      <div
        ref={bgRef}
        className="absolute will-change-transform pointer-events-none"
        style={{ top: '-18%', left: 0, right: 0, height: '136%' }}
      >
        <Image
          src={MUSIC_BG}
          alt="Fond musical"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 bg-[#060F1C]/78 pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-b from-[#060F1C]/60 via-transparent to-[#060F1C]/60 pointer-events-none" />

      <div className="absolute -bottom-20 -left-20 w-80 h-80 opacity-[0.04] pointer-events-none">
        <RiDiscLine className="w-full h-full text-white animate-slow-spin" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-sans font-medium block mb-2">
            Tiré du reccueil de poèmes
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-cream">
            Cent Battements pour Lola
          </h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mt-4 mb-2" />
          <p className="font-serif italic text-sm text-white/55 max-w-md mx-auto">
            Vivez en chanson une expérience inédite, où chaque note murmure les étapes de notre histoire, délicatement tissée dans des poèmes écrits pour Lola.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          <div className="lg:col-span-8 bg-white/8 backdrop-blur-xl rounded-2xl border border-white/15 overflow-hidden shadow-[0_25px_60px_rgba(6,15,28,0.55),inset_0_1px_0_rgba(255,255,255,0.1)] flex flex-col relative">
            <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

            <div className="relative w-full bg-[#02060E]" style={{ aspectRatio: '16/9' }}>
              <video
                key={currentIndex}
                ref={videoRef}
                className="w-full h-full object-contain"
                onCanPlay={() => {
                  const video = videoRef.current
                  if (!video) return
                  video.volume = volume
                  video.muted = isMuted
                  if (isPlayingRef.current) {
                    video.play().catch(() => {})
                  }
                }}
                onTimeUpdate={() => {
                  if (videoRef.current) setCurrentTime(videoRef.current.currentTime)
                }}
                onLoadedMetadata={() => {
                  if (videoRef.current) setDuration(videoRef.current.duration)
                }}
                onEnded={handleEnded}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                playsInline
              >
                <source src={currentTrack.src} type="video/mp4" />
              </video>

              {!isPlaying && (
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-[#060F1C]/35 group cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center group-hover:bg-white/25 transition-all duration-300">
                    <FiPlay className="w-6 h-6 text-cream ml-1" />
                  </div>
                </button>
              )}
            </div>

            <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <p className="text-white/30 text-[10px] font-sans uppercase tracking-[0.22em] mb-1">
                    {String(currentTrack.number).padStart(2, '0')} / {String(ALBUM.length).padStart(2, '0')} · Album
                  </p>
                  <h3 className="font-serif text-lg md:text-xl text-cream font-light leading-tight truncate">
                    {currentTrack.title}
                  </h3>
                </div>
                {isPlaying && (
                  <div className="flex items-end gap-0.5 h-5 shrink-0 ml-3 mt-2">
                    {[0, 1, 2].map(i => (
                      <div
                        key={i}
                        className="w-0.5 bg-gold rounded-full animate-pulse"
                        style={{ height: `${55 + i * 22}%`, animationDelay: `${i * 0.18}s` }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="mb-5">
                <div
                  className="relative h-1.5 bg-white/10 rounded-full cursor-pointer group mb-1.5"
                  onClick={handleSeek}
                >
                  <div
                    className="h-full rounded-full relative"
                    style={{
                      width: `${progress}%`,
                      background: 'linear-gradient(to right, #C5A059, #A87D35)',
                    }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-cream rounded-full opacity-0 group-hover:opacity-100 shadow-md transition-opacity pointer-events-none" />
                  </div>
                </div>
                <div className="flex justify-between text-[10px] font-mono text-white/30">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setIsShuffle(p => !p)}
                  title={isShuffle ? 'Lecture aléatoire activée' : 'Lecture aléatoire'}
                  className={`p-2 rounded-lg transition-all cursor-pointer ${
                    isShuffle
                      ? 'text-gold bg-gold/10 border border-gold/25'
                      : 'text-white/30 hover:text-cream'
                  }`}
                >
                  <FiShuffle className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3 md:gap-4">
                  <button
                    onClick={playPrev}
                    className="p-2 text-white/50 hover:text-cream transition-colors cursor-pointer"
                  >
                    <FiSkipBack className="w-5 h-5" />
                  </button>

                  <button
                    onClick={togglePlay}
                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(197,160,89,0.4)] hover:shadow-[0_6px_20px_rgba(197,160,89,0.5)] transition-all cursor-pointer active:scale-95"
                    style={{ background: 'linear-gradient(135deg, #C5A059, #A87D35)' }}
                  >
                    {isPlaying ? (
                      <FiPause className="w-5 h-5 text-neutral-900" />
                    ) : (
                      <FiPlay className="w-5 h-5 text-neutral-900 ml-0.5" />
                    )}
                  </button>

                  <button
                    onClick={playNext}
                    className="p-2 text-white/50 hover:text-cream transition-colors cursor-pointer"
                  >
                    <FiSkipForward className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={cycleRepeat}
                  title={
                    repeatMode === 'off'
                      ? 'Répéter'
                      : repeatMode === 'all'
                        ? 'Répéter tout'
                        : 'Répéter ce titre'
                  }
                  className={`relative p-2 rounded-lg transition-all cursor-pointer ${
                    repeatMode !== 'off'
                      ? 'text-gold bg-gold/10 border border-gold/25'
                      : 'text-white/30 hover:text-cream'
                  }`}
                >
                  <FiRepeat className="w-4 h-4" />
                  {repeatMode === 'one' && (
                    <span className="absolute -top-1 -right-1 text-[7px] font-bold bg-gold text-neutral-900 rounded-full w-3.5 h-3.5 flex items-center justify-center leading-none">
                      1
                    </span>
                  )}
                </button>
              </div>

              {/* Volume control */}
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/8">
                <button
                  onClick={toggleMute}
                  title={isMuted || volume === 0 ? 'Activer le son' : 'Couper le son'}
                  className="text-white/40 hover:text-cream transition-colors cursor-pointer shrink-0"
                >
                  {isMuted || volume === 0 ? (
                    <FiVolumeX className="w-4 h-4" />
                  ) : volume <= 0.4 ? (
                    <FiVolume className="w-4 h-4" />
                  ) : volume <= 0.7 ? (
                    <FiVolume1 className="w-4 h-4" />
                  ) : (
                    <FiVolume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={Math.round(isMuted ? 0 : volume * 100)}
                  onChange={handleVolumeChange}
                  className="flex-1 h-1 cursor-pointer rounded-full appearance-none bg-white/10"
                  style={{ accentColor: '#C5A059' }}
                />
                <span className="text-[10px] font-mono text-white/30 w-8 text-right shrink-0">
                  {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white/8 backdrop-blur-xl rounded-2xl border border-white/15 overflow-hidden shadow-[0_25px_60px_rgba(6,15,28,0.55),inset_0_1px_0_rgba(255,255,255,0.1)] flex flex-col relative">
            <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

            <div className="px-5 py-4 border-b border-white/8 flex items-center justify-between shrink-0">
              <h4 className="font-serif text-sm font-light text-cream tracking-wide">
                Cent Battements pour Lola
              </h4>
              <span className="text-[10px] text-white/30 font-mono tracking-widest">
                {ALBUM.length} titres
              </span>
            </div>

            <div className="flex-1 overflow-y-auto" style={{ maxHeight: '460px' }}>
              {ALBUM.map((track, idx) => {
                const isActive = idx === currentIndex
                return (
                  <button
                    key={track.number}
                    onClick={() => playAtIndex(idx)}
                    className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-all cursor-pointer border-b border-white/5 last:border-b-0 group ${
                      isActive ? 'bg-white/15' : 'hover:bg-white/8'
                    }`}
                  >
                    <span className="shrink-0 w-6 flex items-center justify-center">
                      {isActive && isPlaying ? (
                        <FiVolume2 className="w-3.5 h-3.5 text-gold animate-pulse" />
                      ) : (
                        <span
                          className={`text-[10px] font-mono ${
                            isActive ? 'text-gold' : 'text-white/25 group-hover:text-white/50'
                          }`}
                        >
                          {String(track.number).padStart(2, '0')}
                        </span>
                      )}
                    </span>

                    <span
                      className={`font-serif text-xs leading-snug flex-1 min-w-0 truncate ${
                        isActive ? 'text-cream' : 'text-white/50 group-hover:text-cream'
                      }`}
                    >
                      {track.title}
                    </span>

                    {isActive && (
                      <div className="flex items-end gap-px h-3.5 shrink-0">
                        {[0, 1, 2].map(i => (
                          <div
                            key={i}
                            className={`w-0.5 bg-gold rounded-full ${isPlaying ? 'animate-pulse' : 'opacity-35'}`}
                            style={{ height: `${45 + i * 27}%`, animationDelay: `${i * 0.14}s` }}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { FiPlusCircle, FiVolume2 } from 'react-icons/fi'
import { RiPlayCircleLine, RiHeartFill, RiHeartLine, RiDiscLine } from 'react-icons/ri'
import { addMusicTrackAction, voteTrackAction } from '@/server/actions/music'
import type { TMusicTrack } from '../@types'

interface MusicSectionProps {
  initialTracks: TMusicTrack[]
}

export function MusicSection({ initialTracks }: MusicSectionProps) {
  const [tracks, setTracks] = useState<TMusicTrack[]>([...initialTracks].sort((a, b) => b.votes - a.votes))
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [voterName, setVoterName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [votedSet, setVotedSet] = useState<Set<string>>(new Set())

  useEffect(() => {
    setTracks([...initialTracks].sort((a, b) => b.votes - a.votes))
  }, [initialTracks])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('wedding_voted_tracks_v2')
      if (saved) {
        setVotedSet(new Set(JSON.parse(saved) as string[]))
      }
    } catch {
    }
  }, [])

  function persistVoted(newSet: Set<string>) {
    setVotedSet(newSet)
    try {
      localStorage.setItem('wedding_voted_tracks_v2', JSON.stringify(Array.from(newSet)))
    } catch {
      // ignore storage errors
    }
  }

  async function handleAddTrack(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFeedback('')
    if (!title.trim() || !artist.trim()) {
      setFeedback("Veuillez renseigner le titre de la chanson et l'artiste.")
      return
    }
    setIsSubmitting(true)
    const result = await addMusicTrackAction(title, artist, voterName)
    if (result.success) {
      const newTrack: TMusicTrack = {
        id: result.data.id,
        title: result.data.title,
        artist: result.data.artist,
        votes: result.data.votes,
        requestedBy: result.data.requestedBy,
        isCurated: result.data.isCurated,
      }
      setTracks(prev => [...prev, newTrack].sort((a, b) => b.votes - a.votes))
      setTitle('')
      setArtist('')
      setVoterName('')
      setFeedback('Chanson ajoutée avec succès à la liste de danse !')
    } else {
      setFeedback(result.error)
    }
    setIsSubmitting(false)
  }

  async function handleVote(trackId: string) {
    const hasVoted = votedSet.has(trackId)
    const direction = hasVoted ? 'down' : 'up'

    const newSet = new Set(votedSet)
    if (hasVoted) {
      newSet.delete(trackId)
    } else {
      newSet.add(trackId)
    }
    persistVoted(newSet)

    setTracks(prev =>
      prev
        .map(t =>
          t.id === trackId
            ? { ...t, votes: hasVoted ? Math.max(0, t.votes - 1) : t.votes + 1 }
            : t,
        )
        .sort((a, b) => b.votes - a.votes),
    )

    await voteTrackAction(trackId, direction)
  }

  return (
    <section
      id="ballplay-section"
      className="relative py-24 px-6 md:px-12 bg-parchment text-charcoal border-t border-taupe/45 overflow-hidden"
    >
      <div className="absolute -bottom-20 -left-20 w-80 h-80 opacity-5 pointer-events-none text-charcoal">
        <RiDiscLine className="w-full h-full animate-slow-spin" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-sans font-medium block mb-2">
            Harmonie de la Piste de Danse
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-charcoal">
            La Playlist de la Soirée
          </h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mt-4 mb-2" />
          <p className="font-serif italic text-sm text-stone-500 max-w-md mx-auto">
            Proposez vos morceaux préférés ou votez pour les classiques afin que notre orchestre de jazz et notre DJ puissent rythmer la soirée.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-5 bg-cream p-6 rounded-xl border border-gold/15 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-2 text-gold font-serif">
              <RiPlayCircleLine className="w-5 h-5 text-gold-dark" />
              <h3 className="font-serif text-lg font-light tracking-wide text-charcoal">Suggérer une Mélodie</h3>
            </div>

            <form onSubmit={handleAddTrack} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="music-title" className="text-[9px] text-stone-400 font-sans uppercase tracking-widest font-semibold">
                  Titre de la Chanson
                </label>
                <input
                  id="music-title"
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Ex : La Vie En Rose"
                  className="bg-parchment text-charcoal text-xs border border-taupe rounded-lg px-3 py-2.5 focus:outline-none focus:border-gold"
                  maxLength={50}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="music-artist" className="text-[9px] text-stone-400 font-sans uppercase tracking-widest font-semibold">
                  Groupe / Artiste
                </label>
                <input
                  id="music-artist"
                  type="text"
                  value={artist}
                  onChange={e => setArtist(e.target.value)}
                  placeholder="Ex : Édith Piaf"
                  className="bg-parchment text-charcoal text-xs border border-taupe rounded-lg px-3 py-2.5 focus:outline-none focus:border-gold"
                  maxLength={50}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="music-voter" className="text-[9px] text-stone-400 font-sans uppercase tracking-widest font-semibold">
                  Votre Prénom / Nom
                </label>
                <input
                  id="music-voter"
                  type="text"
                  value={voterName}
                  onChange={e => setVoterName(e.target.value)}
                  placeholder="Ex : Emma (Demoiselle d'honneur)"
                  className="bg-parchment text-charcoal text-xs border border-taupe rounded-lg px-3 py-2.5 focus:outline-none focus:border-gold"
                  maxLength={30}
                  disabled={isSubmitting}
                />
              </div>

              {feedback && (
                <p className="text-[10px] text-teal-800 bg-teal-50 border border-teal-100 p-2.5 rounded-lg text-center font-serif leading-relaxed italic">
                  {feedback}
                </p>
              )}

              <button
                id="submit-music"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 mt-2 bg-neutral-900 border border-neutral-800 text-cream text-[10px] tracking-widest font-sans font-semibold uppercase rounded-lg shadow hover:bg-stone-800 transition-colors cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiPlusCircle className="w-3.5 h-3.5 text-gold-dark" />
                <span>{isSubmitting ? 'TRANSMISSION...' : 'PROPOSER CE MORCEAU'}</span>
              </button>
            </form>
          </div>

          <div className="md:col-span-12 lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-gold/15 pb-2">
              <h3 className="font-serif text-lg font-light text-stone-800 tracking-wide flex items-center gap-2">
                <FiVolume2 className="w-4 h-4 text-rose animate-pulse" />
                <span>Liste des Demandes et Votes</span>
              </h3>
              <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">
                EN DIRECT
              </span>
            </div>

            <div className="flex flex-col gap-3 max-h-[420px] overflow-y-auto pr-1">
              {tracks.map(track => {
                const hasVoted = votedSet.has(track.id)
                return (
                  <div
                    key={track.id}
                    className="bg-cream/60 p-4 rounded-xl border border-taupe/50 flex justify-between items-center gap-4 hover:bg-cream hover:border-gold/20 shadow-sm transition-colors select-none"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-[15px] font-semibold text-charcoal truncate">{track.title}</h4>
                        {!track.isCurated && (
                          <span className="text-[8px] bg-gold/15 text-gold border border-gold/20 px-1.5 py-0.5 rounded font-sans tracking-widest uppercase shrink-0">
                            INVITÉ
                          </span>
                        )}
                      </div>
                      <p className="font-serif text-[12px] text-stone-500 truncate mt-0.5">par {track.artist}</p>
                      <p className="font-serif text-[10px] italic text-stone-400 truncate mt-1">
                        Suggéré par {track.requestedBy}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-serif text-xs font-semibold text-stone-600">{track.votes} votes</span>
                      <button
                        onClick={() => void handleVote(track.id)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                          hasVoted
                            ? 'bg-rose/10 border border-rose/30 text-rose scale-105'
                            : 'bg-[#f5eedf]/40 border border-taupe/40 text-gold hover:bg-[#f5eedf]/80'
                        }`}
                        title={hasVoted ? 'Retirer le vote' : 'Voter pour ce morceau'}
                      >
                        {hasVoted ? (
                          <RiHeartFill className="w-4 h-4 text-rose" />
                        ) : (
                          <RiHeartLine className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="text-[10px] text-stone-400 font-serif italic text-center mt-3">
              * La liste des morceaux acceptés est réservée aux classiques et variétés. Le hard rock et le heavy metal seront redirigés vers la session tardive dans la cave !
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

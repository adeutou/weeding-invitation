'use client'

import { useState } from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { addMusicTrackAction, deleteMusicTrackAction } from '@/server/actions/music'
import type { MusicTrackSelect } from '@/server/db/schema'

interface AdminPlaylistTabProps {
  tracks: MusicTrackSelect[]
  onAddTrack: (track: MusicTrackSelect) => void
  onDeleteTrack: (id: string) => void
}

export function AdminPlaylistTab({
  tracks,
  onAddTrack,
  onDeleteTrack,
}: AdminPlaylistTabProps) {
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [requestedBy, setRequestedBy] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !artist.trim()) return
    setError('')
    setIsLoading(true)
    const res = await addMusicTrackAction(
      title,
      artist,
      requestedBy.trim() || "Admin de l'Atelier"
    )
    setIsLoading(false)
    if (res.success) {
      onAddTrack(res.data)
      setTitle('')
      setArtist('')
      setRequestedBy('')
    } else {
      setError(res.error)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce morceau ?')) {
      setIsLoading(true)
      const res = await deleteMusicTrackAction(id)
      setIsLoading(false)
      if (res.success) {
        onDeleteTrack(id)
      }
    }
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-2xl border border-taupe flex flex-col gap-4"
      >
        <h4 className="font-serif text-sm font-semibold text-charcoal">
          Ajouter un morceau à la playlist
        </h4>

        {error && (
          <p className="text-xs text-rose font-medium">
            {error}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-stone-500 font-sans tracking-widest uppercase font-bold">
              Titre de la chanson
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Ex : La Vie En Rose"
              required
              disabled={isLoading}
              className="bg-cream text-charcoal text-sm border border-taupe rounded-lg px-4 py-2 placeholder:text-stone-450 focus:outline-none w-full"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-stone-500 font-sans tracking-widest uppercase font-bold">
              Nom de l'artiste
            </label>
            <input
              type="text"
              value={artist}
              onChange={e => setArtist(e.target.value)}
              placeholder="Ex : Édith Piaf"
              required
              disabled={isLoading}
              className="bg-cream text-charcoal text-sm border border-taupe rounded-lg px-4 py-2 placeholder:text-stone-450 focus:outline-none w-full"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] text-stone-500 font-sans tracking-widest uppercase font-bold">
            Suggéré par
          </label>
          <input
            type="text"
            value={requestedBy}
            onChange={e => setRequestedBy(e.target.value)}
            placeholder="Ex : Cousin Alexandre (ou laisser vide pour Admin)"
            disabled={isLoading}
            className="bg-cream text-charcoal text-sm border border-taupe rounded-lg px-4 py-2 placeholder:text-stone-450 focus:outline-none w-full"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !title.trim() || !artist.trim()}
          className="self-start px-5 py-2.5 bg-charcoal hover:bg-black text-white font-sans text-xs tracking-widest font-semibold uppercase rounded-lg transition-colors cursor-pointer disabled:opacity-50"
        >
          Ajouter le morceau
        </button>
      </form>

      <div className="space-y-4">
        <p className="text-[11px] font-sans text-stone-500 font-semibold tracking-wider uppercase">
          Votes de la Playlist ({tracks.length} morceau{tracks.length !== 1 ? 'x' : ''})
        </p>
        {tracks.length === 0 ? (
          <div className="bg-white p-6 rounded-2xl border border-dashed border-taupe/80 text-center text-xs text-[#c8968e] font-serif">
            Aucune chanson votée ou proposée pour le moment.
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-taupe divide-y divide-taupe/40 overflow-hidden shadow-xs">
            {tracks.map(song => (
              <div
                key={song.id}
                className="p-4 flex items-center justify-between hover:bg-parchment/30"
              >
                <div>
                  <p className="font-serif text-sm font-semibold text-charcoal">
                    {song.title}
                  </p>
                  <p className="font-sans text-[10px] text-stone-400 uppercase tracking-wider">
                    {song.artist} par {song.requestedBy}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-[#fcfaf4] border border-gold/35 px-4 py-1.5 rounded-full text-xs font-serif text-gold-dark font-bold">
                    {song.votes} vote(s)
                  </div>
                  <button
                    onClick={() => handleDelete(song.id)}
                    disabled={isLoading}
                    className="p-1 px-2 text-stone-400 hover:text-rose hover:bg-rose/5 rounded cursor-pointer shrink-0 disabled:opacity-50"
                    title="Supprimer le morceau"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

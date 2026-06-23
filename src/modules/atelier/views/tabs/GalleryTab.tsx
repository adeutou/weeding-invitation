'use client'

import { useState, useTransition } from 'react'
import { FiTrash2, FiPlus, FiAlertTriangle } from 'react-icons/fi'
import { addGalleryPhotoAction, deleteGalleryPhotoAction } from '@/server/actions/atelier'
import type { TAtelierGalleryPhoto } from '@/modules/atelier/@types'

interface GalleryTabProps {
  initialPhotos: TAtelierGalleryPhoto[]
}

export function GalleryTab({ initialPhotos }: GalleryTabProps) {
  const [photos, setPhotos] = useState(initialPhotos)
  const [url, setUrl] = useState('')
  const [caption, setCaption] = useState('')
  const [addError, setAddError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [isAdding, startAddTransition] = useTransition()
  const [, startDeleteTransition] = useTransition()

  function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setAddError(null)
    startAddTransition(async () => {
      const result = await addGalleryPhotoAction(url, caption)
      if (result.success) {
        setPhotos(prev => [...prev, result.data])
        setUrl('')
        setCaption('')
      } else {
        setAddError(result.error)
      }
    })
  }

  function handleDelete(id: string) {
    setDeletingId(id)
    startDeleteTransition(async () => {
      const result = await deleteGalleryPhotoAction(id)
      if (result.success) {
        setPhotos(prev => prev.filter(p => p.id !== id))
      }
      setDeletingId(null)
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-[#0E1628] border border-white/5 rounded-xl p-5">
        <h3 className="text-[10px] text-stone-400 font-sans tracking-[0.2em] uppercase font-semibold mb-4">
          Add Gallery Photo
        </h3>
        <form onSubmit={handleAdd} className="flex flex-col gap-4">
          {addError && (
            <div className="flex items-center gap-2 text-rose bg-rose/10 border border-rose/20 p-3 rounded-lg text-xs font-serif">
              <FiAlertTriangle className="w-4 h-4 shrink-0" />
              <span>{addError}</span>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="gallery-url"
              className="text-[10px] text-stone-500 font-sans tracking-[0.15em] uppercase"
            >
              Image URL (Vercel Blob)
            </label>
            <input
              id="gallery-url"
              type="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://..."
              disabled={isAdding}
              className="bg-charcoal text-cream text-sm border border-white/10 rounded-lg px-4 py-2.5 placeholder:text-stone-600 focus:border-gold/60 focus:outline-none transition-colors w-full"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="gallery-caption"
              className="text-[10px] text-stone-500 font-sans tracking-[0.15em] uppercase"
            >
              Caption
            </label>
            <input
              id="gallery-caption"
              type="text"
              value={caption}
              onChange={e => setCaption(e.target.value)}
              placeholder="e.g., First dance at Château de la Rose"
              disabled={isAdding}
              className="bg-charcoal text-cream text-sm border border-white/10 rounded-lg px-4 py-2.5 placeholder:text-stone-600 focus:border-gold/60 focus:outline-none transition-colors w-full"
            />
          </div>

          <button
            type="submit"
            disabled={isAdding || !url.trim() || !caption.trim()}
            className="self-start flex items-center gap-2 bg-gold text-neutral-900 font-sans text-xs tracking-[0.2em] font-semibold uppercase px-5 py-2.5 rounded-lg hover:bg-gold-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            {isAdding ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
                ADDING...
              </>
            ) : (
              <>
                <FiPlus className="w-3.5 h-3.5" />
                ADD PHOTO
              </>
            )}
          </button>
        </form>
      </div>

      <div className="text-[10px] text-stone-500 font-sans uppercase tracking-[0.2em]">
        Gallery · {photos.length} photo{photos.length !== 1 ? 's' : ''}
      </div>

      {photos.length === 0 ? (
        <div className="text-center py-16 text-stone-500 font-serif italic text-sm">
          No photos in the gallery yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {photos.map(photo => (
            <div
              key={photo.id}
              className="relative group aspect-video bg-[#0A1525] rounded-xl overflow-hidden border border-white/5"
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <p className="text-cream text-[10px] font-serif leading-tight line-clamp-2">
                  {photo.caption}
                </p>
              </div>
              <button
                onClick={() => handleDelete(photo.id)}
                disabled={deletingId === photo.id}
                aria-label={`Delete photo: ${photo.caption}`}
                className="absolute top-2 right-2 text-white bg-black/60 hover:bg-rose/80 transition-colors p-1.5 rounded-lg opacity-0 group-hover:opacity-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {deletingId === photo.id ? (
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FiTrash2 className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

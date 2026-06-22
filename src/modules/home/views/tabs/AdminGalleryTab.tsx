'use client'

import { useState } from 'react'
import { FiPlus, FiTrash2 } from 'react-icons/fi'
import { addGalleryPhotoAction, deleteGalleryPhotoAction } from '@/server/actions/atelier'
import type { GalleryPhotoSelect } from '@/server/db/schema'
import { Textarea } from '@/modules/ui'

interface AdminGalleryTabProps {
  photos: GalleryPhotoSelect[]
  onAddPhoto: (photo: GalleryPhotoSelect) => void
  onDeletePhoto: (id: string) => void
}

export function AdminGalleryTab({
  photos,
  onAddPhoto,
  onDeletePhoto,
}: AdminGalleryTabProps) {
  const [newPhotoUrl, setNewPhotoUrl] = useState('')
  const [newPhotoCaption, setNewPhotoCaption] = useState('')
  const [isAddingPhoto, setIsAddingPhoto] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(false)
  const [uploadError, setUploadError] = useState('')

  const handleCreatePhoto = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPhotoUrl.trim() || !newPhotoCaption.trim()) return
    setIsLoading(true)
    const res = await addGalleryPhotoAction(newPhotoUrl, newPhotoCaption)
    setIsLoading(false)
    if (res.success) {
      onAddPhoto({
        id: res.data.id,
        url: res.data.url,
        caption: res.data.caption,
        sortOrder: res.data.sortOrder,
        createdAt: res.data.createdAt,
      })
      setNewPhotoUrl('')
      setNewPhotoCaption('')
      setIsAddingPhoto(false)
    }
  }

  const handleDeletePhoto = async (id: string) => {
    if (
      window.confirm('Êtes-vous sûr de vouloir supprimer cette photo de la galerie ?')
    ) {
      setIsLoading(true)
      const res = await deleteGalleryPhotoAction(id)
      setIsLoading(false)
      if (res.success) {
        onDeletePhoto(id)
      }
    }
  }

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const onDragLeave = () => {
    setIsDragging(false)
  }

  const onDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      await performUpload(file)
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      await performUpload(file)
    }
  }

  const performUpload = async (file: File) => {
    setUploadError('')
    setUploadProgress(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (res.ok && data.url) {
        setNewPhotoUrl(data.url)
      } else {
        setUploadError(data.error || "Échec du chargement de l'image.")
      }
    } catch {
      setUploadError('Erreur réseau lors du chargement.')
    } finally {
      setUploadProgress(false)
    }
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-taupe/30 pb-4">
        <p className="text-[11px] font-sans text-stone-500">
          Créez votre galerie de souvenirs. Téléchargez vos images et ajoutez des légendes descriptives :
        </p>
        <button
          onClick={() => {
            setIsAddingPhoto(!isAddingPhoto)
            setNewPhotoUrl('')
            setNewPhotoCaption('')
            setUploadError('')
          }}
          disabled={isLoading || uploadProgress}
          className="px-3.5 py-2 bg-charcoal hover:bg-black text-[10px] tracking-wider uppercase font-bold text-white rounded-lg flex items-center gap-1.5 transition-all cursor-pointer shrink-0 disabled:opacity-50"
        >
          <FiPlus className="w-3.5 h-3.5 text-gold" />
          <span>Ajouter une Photo</span>
        </button>
      </div>

      {isAddingPhoto && (
        <form
          onSubmit={handleCreatePhoto}
          className="bg-white p-5 rounded-2xl border border-taupe flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-stone-500 font-sans tracking-[0.15em] uppercase font-bold mb-1">
              Télécharger une Photo
            </label>
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => document.getElementById('file-input')?.click()}
              className={`w-full p-8 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${isDragging
                ? 'border-gold bg-gold/5 scale-[1.01]'
                : 'border-taupe hover:border-gold hover:bg-parchment/40'
                }`}
            >
              <input
                id="file-input"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                onChange={handleFileChange}
                className="hidden"
                disabled={isLoading || uploadProgress}
              />
              {uploadProgress ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                  <span className="text-[10px] text-stone-400 font-sans tracking-widest uppercase">
                    Chargement en cours...
                  </span>
                </div>
              ) : newPhotoUrl ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-taupe bg-stone-100 relative group">
                    <img
                      src={newPhotoUrl}
                      alt="Uploaded preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[9px] text-emerald-600 font-sans tracking-widest uppercase font-bold">
                    ✅ Chargement Réussi
                  </span>
                  <span className="text-[8px] text-stone-400 font-mono max-w-xs truncate">
                    {newPhotoUrl}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <FiPlus className="w-6 h-6 text-gold mb-1" />
                  <p className="font-serif text-xs text-charcoal">
                    Glissez &amp; Déposez l'image ici
                  </p>
                  <p className="text-[9px] text-stone-400 font-sans uppercase tracking-widest">
                    Ou cliquez pour parcourir vos fichiers (JPEG, PNG, WebP, AVIF jusqu'à 8 Mo)
                  </p>
                </div>
              )}
            </div>
            {uploadError && (
              <p className="text-xs text-rose font-medium mt-1">
                {uploadError}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Textarea
              label="Légende descriptive / Souvenir"
              value={newPhotoCaption}
              onChange={e => setNewPhotoCaption(e.target.value)}
              placeholder="Un moment calme capturé sous une jolie lumière..."
              required
              rows={3}
              disabled={isLoading || uploadProgress}
              className="bg-cream text-charcoal text-sm border border-taupe rounded-lg px-4 py-2 placeholder:text-stone-450 focus:outline-none w-full"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || uploadProgress || !newPhotoUrl}
            className="self-start px-5 py-2.5 bg-charcoal hover:bg-black text-white font-sans text-xs tracking-widest font-semibold uppercase rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            Enregistrer la Photo
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 max-h-[44vh] overflow-y-auto pr-2">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="bg-white p-4 rounded-xl border border-taupe flex flex-col justify-between gap-3 shadow-2xs hover:shadow-xs transition-shadow"
          >
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-sans text-stone-400 font-bold uppercase tracking-wider">
                Cadre Photo #{index + 1}
              </span>
              <button
                onClick={() => handleDeletePhoto(photo.id)}
                disabled={isLoading || uploadProgress}
                className="p-1 px-1.5 text-stone-455 hover:text-rose hover:bg-rose/5 rounded font-sans text-[10px] flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50"
                title="Supprimer la photo"
              >
                <FiTrash2 className="w-3 h-3 text-rose/85" />
                <span>Supprimer</span>
              </button>
            </div>
            <div className="flex gap-3">
              <div className="w-20 h-20 rounded-lg border border-taupe bg-stone-100 overflow-hidden shrink-0 shadow-inner relative group">
                <img
                  src={photo.url}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  onError={e => {
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=150&q=80'
                  }}
                />
              </div>
              <div className="flex-1">
                <Textarea
                  label="Légende descriptive / Souvenir"
                  value={photo.caption}
                  onChange={e => setNewPhotoCaption(e.target.value)}
                  placeholder="Un moment calme capturé sous une jolie lumière..."
                  required
                  rows={3}
                  disabled={isLoading || uploadProgress}
                  className="bg-cream text-charcoal text-sm border border-taupe rounded-lg px-4 py-2 placeholder:text-stone-450 focus:outline-none w-full"
                />
              </div>
            </div>
          </div>
        ))}

        {photos.length === 0 && (
          <div className="col-span-1 md:col-span-2 bg-white/75 p-12 rounded-2xl border border-dashed border-taupe/80 text-center text-xs text-stone-400 font-serif">
            Aucune photo enregistrée pour le moment. Ajoutez des souvenirs en utilisant le bouton ci-dessus.
          </div>
        )}
      </div>
    </div>
  )
}

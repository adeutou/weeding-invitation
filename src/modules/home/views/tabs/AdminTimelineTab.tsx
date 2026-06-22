'use client'

import { useState } from 'react'
import { FiPlus, FiTrash2, FiEdit2, FiSave, FiX } from 'react-icons/fi'
import {
  addTimelineEventAction,
  updateTimelineEventAction,
  deleteTimelineEventAction,
} from '@/server/actions/timeline'
import type { TimelineEventSelect, TimelineEventInsert } from '@/server/db/schema'

interface AdminTimelineTabProps {
  events: TimelineEventSelect[]
  onAddEvent: (event: TimelineEventSelect) => void
  onUpdateEvent: (id: string, event: TimelineEventSelect) => void
  onDeleteEvent: (id: string) => void
}

type TEventForm = Omit<TimelineEventInsert, 'id'>

const DEFAULT_FORM: TEventForm = {
  phase: 'bigDay',
  eventTime: '',
  title: '',
  location: '',
  description: '',
  iconName: 'clock',
  sortOrder: 0,
}

const PHASES = [
  { value: 'preWedding', label: 'I. L\'Accueil (Veille)' },
  { value: 'bigDay', label: 'II. Le Jour J' },
  { value: 'afterglow', label: 'III. Le Lendemain (Brunch)' },
] as const

const ICONS = [
  { value: 'clock', label: 'Horloge' },
  { value: 'glass', label: 'Verres' },
  { value: 'music', label: 'Musique' },
  { value: 'landmark', label: 'Lieu' },
  { value: 'heart', label: 'Cœur' },
  { value: 'coffee', label: 'Café' },
] as const

export function AdminTimelineTab({
  events,
  onAddEvent,
  onUpdateEvent,
  onDeleteEvent,
}: AdminTimelineTabProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [newEvent, setNewEvent] = useState<TEventForm>(DEFAULT_FORM)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<TEventForm>(DEFAULT_FORM)
  const [isLoading, setIsLoading] = useState(false)

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEvent.eventTime.trim() || !newEvent.title.trim()) return
    setIsLoading(true)
    const res = await addTimelineEventAction(newEvent)
    setIsLoading(false)
    if (res.success && res.data) {
      onAddEvent(res.data)
      setNewEvent(DEFAULT_FORM)
      setIsAdding(false)
    }
  }

  const handleSaveEdit = async (id: string) => {
    if (!editForm.eventTime.trim() || !editForm.title.trim()) return
    setIsLoading(true)
    const res = await updateTimelineEventAction(id, editForm)
    setIsLoading(false)
    if (res.success && res.data) {
      onUpdateEvent(id, res.data)
      setEditingId(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      setIsLoading(true)
      const res = await deleteTimelineEventAction(id)
      setIsLoading(false)
      if (res.success) {
        onDeleteEvent(id)
      }
    }
  }

  const startEdit = (event: TimelineEventSelect) => {
    setEditingId(event.id)
    setEditForm({
      phase: event.phase,
      eventTime: event.eventTime,
      title: event.title,
      location: event.location,
      description: event.description,
      iconName: event.iconName,
      sortOrder: event.sortOrder,
    })
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-taupe/30 pb-4">
        <p className="text-[11px] font-sans text-stone-500">
          Gerez le planning et le programme de la célébration. Ajoutez, modifiez et organisez l'ordre des étapes du mariage.
        </p>
        <button
          onClick={() => {
            setIsAdding(!isAdding)
            setNewEvent(DEFAULT_FORM)
          }}
          disabled={isLoading}
          className="px-3.5 py-2 bg-charcoal hover:bg-black text-[10px] tracking-wider uppercase font-bold text-white rounded-lg flex items-center gap-1.5 transition-all cursor-pointer shrink-0 disabled:opacity-50"
        >
          <FiPlus className="w-3.5 h-3.5 text-gold" />
          <span>Ajouter un Événement</span>
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-white p-5 rounded-2xl border border-taupe flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-0.5">
                Étape du Mariage
              </label>
              <select
                value={newEvent.phase}
                onChange={e => setNewEvent(prev => ({ ...prev, phase: e.target.value as any }))}
                className="w-full bg-cream border border-taupe/80 rounded-lg px-3 py-1.5 font-sans text-xs focus:ring-1 focus:ring-gold outline-none"
              >
                {PHASES.map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-0.5">
                Horaire / Heures
              </label>
              <input
                type="text"
                value={newEvent.eventTime}
                onChange={e => setNewEvent(prev => ({ ...prev, eventTime: e.target.value }))}
                placeholder="Ex. 14:30 ou 18:00 - 21:00"
                className="w-full bg-cream border border-taupe/80 rounded-lg px-3 py-1.5 font-sans text-xs focus:ring-1 focus:ring-gold outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-0.5">
                Ordre d'affichage
              </label>
              <input
                type="number"
                value={newEvent.sortOrder}
                onChange={e => setNewEvent(prev => ({ ...prev, sortOrder: parseInt(e.target.value) || 0 }))}
                className="w-full bg-cream border border-taupe/80 rounded-lg px-3 py-1.5 font-sans text-xs focus:ring-1 focus:ring-gold outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-0.5">
                Titre de l'Événement
              </label>
              <input
                type="text"
                value={newEvent.title}
                onChange={e => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Ex. Accueil &amp; Remise des Livrets"
                className="w-full bg-cream border border-taupe/80 rounded-lg px-3 py-1.5 font-serif text-xs focus:ring-1 focus:ring-gold outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-0.5">
                Lieu de l'Événement
              </label>
              <input
                type="text"
                value={newEvent.location}
                onChange={e => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Ex. Pelouse du Jardin"
                className="w-full bg-cream border border-taupe/80 rounded-lg px-3 py-1.5 font-sans text-xs focus:ring-1 focus:ring-gold outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-0.5">
                Icône Illustrative
              </label>
              <select
                value={newEvent.iconName}
                onChange={e => setNewEvent(prev => ({ ...prev, iconName: e.target.value }))}
                className="w-full bg-cream border border-taupe/80 rounded-lg px-3 py-1.5 font-sans text-xs focus:ring-1 focus:ring-gold outline-none"
              >
                {ICONS.map(i => (
                  <option key={i.value} value={i.value}>{i.label}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full md:w-auto px-5 py-2 bg-charcoal hover:bg-black text-white font-sans text-xs tracking-widest font-semibold uppercase rounded-lg transition-colors cursor-pointer disabled:opacity-50"
              >
                Enregistrer l'Événement
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-0.5">
              Détails &amp; Description
            </label>
            <textarea
              value={newEvent.description}
              onChange={e => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              placeholder="Fournissez une brève description de cette étape pour vos invités..."
              className="w-full bg-cream border border-taupe/80 rounded-lg p-3 font-serif text-xs leading-relaxed focus:ring-1 focus:ring-gold outline-none resize-none"
              required
            />
          </div>
        </form>
      )}

      <div className="space-y-3 max-h-[46vh] overflow-y-auto pr-2">
        {events.map(event => {
          const isEditing = editingId === event.id
          return (
            <div
              key={event.id}
              className="bg-white p-4 rounded-xl border border-taupe flex flex-col gap-3 shadow-2xs hover:shadow-xs transition-shadow"
            >
              {isEditing ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[8px] text-stone-400 font-sans uppercase font-bold tracking-wider mb-0.5">
                        Étape du Mariage
                      </label>
                      <select
                        value={editForm.phase}
                        onChange={e => setEditForm(prev => ({ ...prev, phase: e.target.value as any }))}
                        className="w-full bg-cream border border-taupe/50 rounded px-2 py-1 font-sans text-xs focus:ring-1 focus:ring-gold outline-none"
                      >
                        {PHASES.map(p => (
                          <option key={p.value} value={p.value}>{p.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[8px] text-stone-400 font-sans uppercase font-bold tracking-wider mb-0.5">
                        Horaire / Heures
                      </label>
                      <input
                        type="text"
                        value={editForm.eventTime}
                        onChange={e => setEditForm(prev => ({ ...prev, eventTime: e.target.value }))}
                        className="w-full bg-cream border border-taupe/50 rounded px-2 py-1 font-sans text-xs focus:ring-1 focus:ring-gold outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] text-stone-400 font-sans uppercase font-bold tracking-wider mb-0.5">
                        Ordre d'affichage
                      </label>
                      <input
                        type="number"
                        value={editForm.sortOrder}
                        onChange={e => setEditForm(prev => ({ ...prev, sortOrder: parseInt(e.target.value) || 0 }))}
                        className="w-full bg-cream border border-taupe/50 rounded px-2 py-1 font-sans text-xs focus:ring-1 focus:ring-gold outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[8px] text-stone-400 font-sans uppercase font-bold tracking-wider mb-0.5">
                        Titre de l'Événement
                      </label>
                      <input
                        type="text"
                        value={editForm.title}
                        onChange={e => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full bg-cream border border-taupe/50 rounded px-2 py-1 font-serif text-xs focus:ring-1 focus:ring-gold outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] text-stone-400 font-sans uppercase font-bold tracking-wider mb-0.5">
                        Lieu de l'Événement
                      </label>
                      <input
                        type="text"
                        value={editForm.location}
                        onChange={e => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full bg-cream border border-taupe/50 rounded px-2 py-1 font-sans text-xs focus:ring-1 focus:ring-gold outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[8px] text-stone-400 font-sans uppercase font-bold tracking-wider mb-0.5">
                        Icône Illustrative
                      </label>
                      <select
                        value={editForm.iconName}
                        onChange={e => setEditForm(prev => ({ ...prev, iconName: e.target.value }))}
                        className="w-full bg-cream border border-taupe/50 rounded px-2 py-1 font-sans text-xs focus:ring-1 focus:ring-gold outline-none"
                      >
                        {ICONS.map(i => (
                          <option key={i.value} value={i.value}>{i.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[8px] text-stone-400 font-sans uppercase font-bold tracking-wider mb-0.5">
                        Détails &amp; Description
                      </label>
                      <textarea
                        value={editForm.description}
                        onChange={e => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                        rows={2}
                        className="w-full bg-cream border border-taupe/50 rounded p-2 font-serif text-xs leading-relaxed focus:ring-1 focus:ring-gold outline-none resize-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end mt-2">
                    <button
                      onClick={() => setEditingId(null)}
                      disabled={isLoading}
                      className="px-3 py-1 border border-taupe hover:bg-parchment text-[10px] tracking-wider uppercase font-bold text-stone-500 rounded-lg flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <FiX className="w-3.5 h-3.5" />
                      <span>Annuler</span>
                    </button>
                    <button
                      onClick={() => handleSaveEdit(event.id)}
                      disabled={isLoading}
                      className="px-3 py-1 bg-charcoal hover:bg-black text-[10px] tracking-wider uppercase font-bold text-white rounded-lg flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <FiSave className="w-3.5 h-3.5 text-gold" />
                      <span>Enregistrer</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col justify-between gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-sans text-gold font-bold uppercase tracking-wider">
                        {PHASES.find(p => p.value === event.phase)?.label}
                      </span>
                      <span className="text-[8px] bg-taupe/20 text-stone-600 px-1.5 py-0.5 rounded font-mono font-bold">
                        ORDRE {event.sortOrder}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(event)}
                        disabled={isLoading}
                        className="p-1 px-1.5 text-stone-455 hover:text-charcoal hover:bg-parchment rounded font-sans text-[10px] flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <FiEdit2 className="w-3 h-3 text-gold-dark" />
                        <span>Modifier</span>
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        disabled={isLoading}
                        className="p-1 px-1.5 text-stone-455 hover:text-rose hover:bg-rose/5 rounded font-sans text-[10px] flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <FiTrash2 className="w-3 h-3 text-rose/85" />
                        <span>Supprimer</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-sans font-bold text-xs text-stone-700">{event.eventTime}</span>
                      <span className="text-stone-300">•</span>
                      <h4 className="font-serif text-sm font-semibold text-charcoal">{event.title}</h4>
                    </div>
                    <span className="text-[9px] text-stone-400 font-sans uppercase tracking-wider">{event.location}</span>
                    <p className="font-serif text-xs text-stone-500 mt-1 leading-relaxed">{event.description}</p>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {events.length === 0 && (
          <div className="bg-white/75 p-12 rounded-2xl border border-dashed border-taupe/80 text-center text-xs text-stone-400 font-serif">
            Aucun événement n'est programmé pour le moment. Ajoutez des étapes en utilisant le bouton ci-dessus.
          </div>
        )}
      </div>
    </div>
  )
}

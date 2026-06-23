'use client'

import { useState, useTransition } from 'react'
import { FiTrash2, FiCheck, FiX, FiHelpCircle, FiMusic, FiTruck } from 'react-icons/fi'
import { deleteRsvpAction } from '@/server/actions/atelier'
import type { TAtelierRsvp } from '@/modules/atelier/@types'

interface RsvpTabProps {
  initialRsvps: TAtelierRsvp[]
}

const ATTENDANCE_LABELS: Record<TAtelierRsvp['attendance'], string> = {
  attending: 'Attending',
  declined: 'Declined',
  uncertain: 'Uncertain',
}

const ATTENDANCE_STYLES: Record<TAtelierRsvp['attendance'], string> = {
  attending: 'bg-sage/10 text-sage border border-sage/20',
  declined: 'bg-rose/10 text-rose border border-rose/20',
  uncertain: 'bg-gold/10 text-gold-dark border border-gold/20',
}

const ATTENDANCE_ICONS: Record<TAtelierRsvp['attendance'], React.ReactNode> = {
  attending: <FiCheck className="w-3 h-3" />,
  declined: <FiX className="w-3 h-3" />,
  uncertain: <FiHelpCircle className="w-3 h-3" />,
}

export function RsvpTab({ initialRsvps }: RsvpTabProps) {
  const [rsvps, setRsvps] = useState(initialRsvps)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [, startTransition] = useTransition()

  const attendingCount = rsvps.filter(r => r.attendance === 'attending').length
  const totalGuests = rsvps
    .filter(r => r.attendance === 'attending')
    .reduce((acc, r) => acc + r.guestsCount, 0)
  const shuttleCount = rsvps.filter(r => r.needsShuttle).length

  function handleDelete(id: string) {
    setDeletingId(id)
    startTransition(async () => {
      const result = await deleteRsvpAction(id)
      if (result.success) {
        setRsvps(prev => prev.filter(r => r.id !== id))
      }
      setDeletingId(null)
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total RSVPs', value: rsvps.length },
          { label: 'Attending', value: attendingCount },
          { label: 'Total Guests', value: totalGuests },
        ].map(stat => (
          <div
            key={stat.label}
            className="bg-charcoal rounded-xl p-4 border border-white/5 text-center"
          >
            <div className="text-2xl font-serif text-cream mb-1">{stat.value}</div>
            <div className="text-[10px] text-stone-400 font-sans uppercase tracking-[0.15em]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {shuttleCount > 0 && (
        <div className="flex items-center gap-2 bg-sage/5 border border-sage/20 rounded-xl p-3 text-xs text-sage font-serif">
          <FiTruck className="w-4 h-4 shrink-0" />
          <span>
            <strong>{shuttleCount}</strong> guest{shuttleCount !== 1 ? 's' : ''} requesting shuttle
            transport
          </span>
        </div>
      )}

      {rsvps.length === 0 ? (
        <div className="text-center py-16 text-stone-500 font-serif italic text-sm">
          No RSVPs received yet.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {rsvps.map(rsvp => (
            <div
              key={rsvp.id}
              className="bg-[#0E1628] border border-white/5 rounded-xl p-4 flex items-start justify-between gap-4 group"
            >
              <div className="flex flex-col gap-2 min-w-0 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-serif text-cream text-sm truncate">{rsvp.name}</span>
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-sans font-semibold uppercase tracking-widest ${ATTENDANCE_STYLES[rsvp.attendance]}`}
                  >
                    {ATTENDANCE_ICONS[rsvp.attendance]}
                    {ATTENDANCE_LABELS[rsvp.attendance]}
                  </span>
                  <span className="text-[10px] text-stone-500 font-sans">
                    {rsvp.guestsCount} guest{rsvp.guestsCount !== 1 ? 's' : ''}
                  </span>
                </div>
                <span className="text-[11px] text-stone-500 font-sans">{rsvp.email}</span>
                <div className="flex items-center gap-3 flex-wrap">
                  {rsvp.dietary !== 'none' && (
                    <span className="text-[10px] text-stone-400 font-serif italic">
                      Dietary: {rsvp.dietary}
                      {rsvp.dietaryDetails ? ` — ${rsvp.dietaryDetails}` : ''}
                    </span>
                  )}
                  {rsvp.needsShuttle && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-sage">
                      <FiTruck className="w-3 h-3" />
                      Shuttle
                    </span>
                  )}
                  {rsvp.songRequest && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-gold-dark font-serif italic truncate max-w-[200px]">
                      <FiMusic className="w-3 h-3 shrink-0" />
                      {rsvp.songRequest}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleDelete(rsvp.id)}
                disabled={deletingId === rsvp.id}
                aria-label={`Delete RSVP for ${rsvp.name}`}
                className="text-stone-600 hover:text-rose transition-colors p-1.5 rounded-lg hover:bg-rose/10 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {deletingId === rsvp.id ? (
                  <div className="w-4 h-4 border-2 border-stone-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FiTrash2 className="w-4 h-4" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

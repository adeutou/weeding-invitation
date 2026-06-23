'use client'

import { useState, useTransition } from 'react'
import { FiTrash2, FiCheck } from 'react-icons/fi'
import {
  approveGuestbookEntryAction,
  deleteGuestbookEntryAdminAction,
} from '@/server/actions/atelier'
import type { TAtelierGuestbookEntry } from '@/modules/atelier/@types'

interface GuestbookTabProps {
  initialEntries: TAtelierGuestbookEntry[]
}

export function GuestbookTab({ initialEntries }: GuestbookTabProps) {
  const [entries, setEntries] = useState(initialEntries)
  const [pendingId, setPendingId] = useState<string | null>(null)
  const [, startTransition] = useTransition()

  const approvedCount = entries.filter(e => e.isApproved).length
  const pendingCount = entries.filter(e => !e.isApproved).length

  function handleApprove(id: string) {
    setPendingId(id)
    startTransition(async () => {
      const result = await approveGuestbookEntryAction(id)
      if (result.success) {
        setEntries(prev => prev.map(e => (e.id === id ? { ...e, isApproved: true } : e)))
      }
      setPendingId(null)
    })
  }

  function handleDelete(id: string) {
    setPendingId(id)
    startTransition(async () => {
      const result = await deleteGuestbookEntryAdminAction(id)
      if (result.success) {
        setEntries(prev => prev.filter(e => e.id !== id))
      }
      setPendingId(null)
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Entries', value: entries.length },
          { label: 'Approved', value: approvedCount },
          { label: 'Awaiting Review', value: pendingCount },
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

      {entries.length === 0 ? (
        <div className="text-center py-16 text-stone-500 font-serif italic text-sm">
          No guestbook entries yet.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {entries.map(entry => (
            <div
              key={entry.id}
              className={`bg-[#0E1628] border rounded-xl p-4 flex items-start justify-between gap-4 ${entry.isApproved ? 'border-white/5' : 'border-gold/20'}`}
            >
              <div className="flex flex-col gap-2 min-w-0 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-serif text-cream text-sm">{entry.name}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-sans font-semibold uppercase tracking-widest ${entry.isApproved ? 'bg-sage/10 text-sage border border-sage/20' : 'bg-gold/10 text-gold-dark border border-gold/20'}`}
                  >
                    {entry.isApproved ? 'Published' : 'Pending'}
                  </span>
                  <span className="text-[10px] text-stone-500 font-sans capitalize">
                    {entry.stampType.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-xs text-stone-400 font-serif italic leading-relaxed line-clamp-2">
                  &ldquo;{entry.message}&rdquo;
                </p>
                <span className="text-[10px] text-stone-600 font-sans">
                  {new Date(entry.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {!entry.isApproved && (
                  <button
                    onClick={() => handleApprove(entry.id)}
                    disabled={pendingId === entry.id}
                    aria-label={`Approve entry from ${entry.name}`}
                    className="text-stone-600 hover:text-sage transition-colors p-1.5 rounded-lg hover:bg-sage/10 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {pendingId === entry.id ? (
                      <div className="w-4 h-4 border-2 border-stone-600 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FiCheck className="w-4 h-4" />
                    )}
                  </button>
                )}
                <button
                  onClick={() => handleDelete(entry.id)}
                  disabled={pendingId === entry.id}
                  aria-label={`Delete entry from ${entry.name}`}
                  className="text-stone-600 hover:text-rose transition-colors p-1.5 rounded-lg hover:bg-rose/10 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  {pendingId === entry.id ? (
                    <div className="w-4 h-4 border-2 border-stone-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <FiTrash2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

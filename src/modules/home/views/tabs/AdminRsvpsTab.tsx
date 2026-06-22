'use client'

import { FiTrash2, FiCheck } from 'react-icons/fi'
import type { RsvpSelect, GuestbookEntrySelect } from '@/server/db/schema'

interface AdminRsvpsTabProps {
  rsvps: RsvpSelect[]
  entries: GuestbookEntrySelect[]
  totalGuests: number
  onDeleteRsvp: (id: string) => void
  onApproveEntry: (id: string) => void
  onDeleteEntry: (id: string) => void
}

export function AdminRsvpsTab({
  rsvps,
  entries,
  totalGuests,
  onDeleteRsvp,
  onApproveEntry,
  onDeleteEntry,
}: AdminRsvpsTabProps) {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-3 border-b border-taupe/40 pb-2">
          <h4 className="font-serif text-lg font-medium text-charcoal">
            Registered RSVPs ({rsvps.length})
          </h4>
          {rsvps.length > 0 && (
            <span className="font-sans text-[10px] uppercase tracking-wider text-sage font-bold bg-[#EAFEEA] border border-green-200 px-2 py-1 rounded">
              Total Expected Guests: {totalGuests}
            </span>
          )}
        </div>
        {rsvps.length === 0 ? (
          <div className="bg-white p-6 rounded-2xl border border-dashed border-taupe/80 text-center text-xs text-stone-400 font-serif">
            No guests have filled out the digital RSVP form yet.
          </div>
        ) : (
          <div className="overflow-x-auto max-h-[30vh] border border-taupe/50 rounded-xl">
            <table className="w-full text-left border-collapse font-sans text-[11px]">
              <thead>
                <tr className="bg-parchment border-b border-taupe text-stone-400 uppercase tracking-widest text-[9px] font-bold">
                  <th className="p-3">Guest Name</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Party</th>
                  <th className="p-3">Dietary</th>
                  <th className="p-3 text-center">Shuttle</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-taupe/30">
                {rsvps.map(guest => (
                  <tr
                    key={guest.id}
                    className="hover:bg-parchment/30 text-stone-700 bg-white"
                  >
                    <td className="p-3 font-semibold text-charcoal">
                      {guest.name}
                      <div className="text-[9px] text-stone-400 font-normal italic">
                        {guest.email}
                      </div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold text-[9px] uppercase tracking-wider ${
                          guest.attendance === 'attending'
                            ? 'bg-emerald-100 text-emerald-800'
                            : guest.attendance === 'uncertain'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose/15 text-rose'
                        }`}
                      >
                        {guest.attendance}
                      </span>
                    </td>
                    <td className="p-3 font-semibold">
                      {guest.guestsCount} guests
                    </td>
                    <td
                      className="p-3 max-w-[150px] truncate"
                      title={guest.dietaryDetails || guest.dietary}
                    >
                      {guest.dietary === 'none'
                        ? 'None'
                        : `${guest.dietary} (${
                            guest.dietaryDetails || 'No notes'
                          })`}
                    </td>
                    <td className="p-3 text-center font-bold">
                      {guest.needsShuttle ? 'YES' : 'NO'}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => onDeleteRsvp(guest.id)}
                        className="p-1 text-stone-450 hover:text-rose transition-colors cursor-pointer"
                        title="Delete RSVP record"
                      >
                        <FiTrash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3 border-b border-taupe/40 pb-2">
          <h4 className="font-serif text-lg font-medium text-charcoal">
            Guestbook Blessings ({entries.length})
          </h4>
        </div>
        {entries.length === 0 ? (
          <div className="bg-white p-6 rounded-2xl border border-dashed border-taupe/80 text-center text-xs text-stone-400 font-serif">
            No messages have been posted to the guestbook board yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[35vh] overflow-y-auto pr-2">
            {entries.map(b => (
              <div
                key={b.id}
                className="bg-white p-4 rounded-xl border border-taupe flex justify-between items-start gap-4"
              >
                <div className="space-y-1">
                  <span className="inline-block text-[8px] uppercase tracking-widest font-bold px-1.5 py-0.2 rounded border bg-stone-100 text-stone-500">
                    {b.stampType} stamp
                  </span>
                  <h5 className="font-serif font-bold text-xs text-charcoal">
                    {b.name}
                  </h5>
                  <p className="font-serif italic text-xs leading-relaxed text-stone-500">
                    &ldquo;{b.message}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {!b.isApproved && (
                    <button
                      onClick={() => onApproveEntry(b.id)}
                      className="p-1 text-stone-400 hover:text-emerald-600 transition-colors hover:bg-emerald-50 rounded cursor-pointer"
                      title="Approve Blessing"
                    >
                      <FiCheck className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => onDeleteEntry(b.id)}
                    className="p-1 text-stone-400 hover:text-rose transition-colors hover:bg-rose/5 rounded cursor-pointer"
                    title="Delete Blessing message"
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

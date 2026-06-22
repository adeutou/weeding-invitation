import { StampGraphic } from './StampGraphic'
import type { TGuestbookEntry } from '../@types'

interface GuestbookEntryCardProps {
  entry: TGuestbookEntry
}

function formatEntryDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function GuestbookEntryCard({ entry }: GuestbookEntryCardProps) {
  return (
    <div className="bg-parchment p-6 rounded-xl border border-gold/10 min-h-[140px] flex flex-col gap-4 relative overflow-hidden">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col">
          <h4 className="font-serif text-sm font-semibold text-charcoal leading-tight">
            {entry.name}
          </h4>
          <span className="text-[9px] text-stone-400 font-sans tracking-widest uppercase mt-0.5">
            {formatEntryDate(entry.createdAt)}
          </span>
        </div>
        <StampGraphic type={entry.stampType} />
      </div>

      <p className="font-serif italic text-sm text-stone-600 leading-relaxed flex-1">
        &ldquo;{entry.message}&rdquo;
      </p>

      <p className="handwriting text-gold text-sm text-right leading-none">— {entry.name}</p>
    </div>
  )
}

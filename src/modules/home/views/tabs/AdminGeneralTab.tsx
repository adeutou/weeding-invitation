'use client'

import type { TWeddingConfig } from '@/modules/home/@types'

interface AdminGeneralTabProps {
  localConfig: TWeddingConfig
  onChange: (updates: Partial<TWeddingConfig>) => void
}

export function AdminGeneralTab({ localConfig, onChange }: AdminGeneralTabProps) {
  const getInputValue = (isoString: string) => {
    if (!isoString) return ''
    return isoString.slice(0, 16)
  }

  const handleDateChange = (value: string) => {
    if (!value) return
    const match = localConfig.weddingDateStr.match(/([+-]\d{2}:\d{2}|Z)$/)
    const offset = match ? match[0] : '+02:00'
    onChange({ weddingDateStr: `${value}:00${offset}` })
  }

  return (
    <div className="space-y-5 max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-1">
            Bride Name
          </label>
          <input
            type="text"
            value={localConfig.brideName}
            onChange={e => onChange({ brideName: e.target.value })}
            className="w-full bg-white border border-taupe rounded-xl px-4 py-2 font-serif text-sm focus:ring-1 focus:ring-gold outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-1">
            Groom Name
          </label>
          <input
            type="text"
            value={localConfig.groomName}
            onChange={e => onChange({ groomName: e.target.value })}
            className="w-full bg-white border border-taupe rounded-xl px-4 py-2 font-serif text-sm focus:ring-1 focus:ring-gold outline-none"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-1">
            Countdown Wedding Date
          </label>
          <input
            type="datetime-local"
            value={getInputValue(localConfig.weddingDateStr)}
            onChange={e => handleDateChange(e.target.value)}
            className="w-full bg-white border border-taupe rounded-xl px-4 py-2 font-mono text-xs focus:ring-1 focus:ring-gold outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-1">
            Date Readable
          </label>
          <input
            type="text"
            value={localConfig.weddingDateReadable}
            onChange={e => onChange({ weddingDateReadable: e.target.value })}
            className="w-full bg-white border border-taupe rounded-xl px-4 py-2 font-serif text-sm focus:ring-1 focus:ring-gold outline-none"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-1">
            Venue Name
          </label>
          <input
            type="text"
            value={localConfig.venueName}
            onChange={e => onChange({ venueName: e.target.value })}
            className="w-full bg-white border border-taupe rounded-xl px-4 py-2 font-serif text-sm focus:ring-1 focus:ring-gold outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-1">
            Venue Location
          </label>
          <input
            type="text"
            value={localConfig.venueLocation}
            onChange={e => onChange({ venueLocation: e.target.value })}
            className="w-full bg-white border border-taupe rounded-xl px-4 py-2 font-serif text-sm focus:ring-1 focus:ring-gold outline-none"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-1">
          Editorial Quote
        </label>
        <input
          type="text"
          value={localConfig.editorialQuote}
          onChange={e => onChange({ editorialQuote: e.target.value })}
          className="w-full bg-white border border-taupe rounded-xl px-4 py-2 font-serif italic text-sm focus:ring-1 focus:ring-gold outline-none"
          required
        />
      </div>
    </div>
  )
}

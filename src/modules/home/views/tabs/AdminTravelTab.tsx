'use client'

import type { TWeddingConfig } from '@/modules/home/@types'

interface AdminTravelTabProps {
  localConfig: TWeddingConfig
  onChange: (updates: Partial<TWeddingConfig>) => void
}

export function AdminTravelTab({ localConfig, onChange }: AdminTravelTabProps) {
  return (
    <div className="space-y-5 max-w-3xl">
      <div>
        <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-1">
          Vols &amp; Liaisons Aériennes
        </label>
        <textarea
          value={localConfig.travelFlights}
          onChange={e => onChange({ travelFlights: e.target.value })}
          rows={2}
          className="w-full bg-white border border-taupe rounded-xl p-3 font-serif text-xs leading-relaxed focus:ring-1 focus:ring-gold outline-none"
          required
        />
      </div>
      <div>
        <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-1">
          Transferts en Train / TGV
        </label>
        <textarea
          value={localConfig.travelTrains}
          onChange={e => onChange({ travelTrains: e.target.value })}
          rows={2}
          className="w-full bg-white border border-taupe rounded-xl p-3 font-serif text-xs leading-relaxed focus:ring-1 focus:ring-gold outline-none"
          required
        />
      </div>
      <div>
        <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-1">
          Hébergements &amp; Hôtels Partenaires
        </label>
        <textarea
          value={localConfig.travelStays}
          onChange={e => onChange({ travelStays: e.target.value })}
          rows={3}
          className="w-full bg-white border border-taupe rounded-xl p-3 font-serif text-xs leading-relaxed focus:ring-1 focus:ring-gold outline-none"
          required
        />
      </div>
      <div>
        <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-1">
          Trésors de Provence
        </label>
        <textarea
          value={localConfig.travelTreasures}
          onChange={e => onChange({ travelTreasures: e.target.value })}
          rows={3}
          className="w-full bg-white border border-taupe rounded-xl p-3 font-serif text-xs leading-relaxed focus:ring-1 focus:ring-gold outline-none"
          required
        />
      </div>
    </div>
  )
}

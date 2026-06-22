import type { TStampType } from '../@types'

interface StampGraphicProps {
  type: TStampType
}

export function StampGraphic({ type }: StampGraphicProps) {
  if (type === 'wax_seal') {
    return (
      <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 bg-linear-to-br from-[#c0392b] to-[#8e1a10] shadow-md border border-[#8e1a10]/20">
        <span className="text-[9px] text-white font-sans font-bold tracking-widest uppercase leading-none select-none">
          SEALED
        </span>
      </div>
    )
  }

  if (type === 'gold_ring') {
    return (
      <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 bg-white border-2 border-dashed border-gold shadow-sm">
        <span className="text-gold text-lg select-none leading-none" aria-hidden="true">
          ∞
        </span>
      </div>
    )
  }

  if (type === 'vintage_dove') {
    return (
      <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 bg-linear-to-br from-[#d4edda] to-[#b8dbc2] border border-green-200 shadow-sm">
        <span className="text-base select-none leading-none" aria-hidden="true">
          🕊️
        </span>
      </div>
    )
  }

  return (
    <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 bg-linear-to-br from-cream to-parchment border border-gold/20 shadow-sm">
      <span className="text-base select-none leading-none" aria-hidden="true">
        🌿
      </span>
    </div>
  )
}

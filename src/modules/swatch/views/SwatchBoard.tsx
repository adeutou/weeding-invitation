'use client'

import { useEffect, useState } from 'react'
import { FiCheck, FiScissors } from 'react-icons/fi'
import { cn } from '@/lib/cn'
import type { TSwatch, TSwatchBoardProps } from '../@types'

const DEFAULT_SWATCHES: TSwatch[] = [
  {
    name: 'Olive Sauvage',
    colorHex: '#5E6F5C',
    description:
      'The deep sage of old orchards. Soft, organic, and peaceful. Suited for linen blazers, pastel trousers, or light slip dresses.',
  },
  {
    name: 'Sienne Brûlée',
    colorHex: '#A97669',
    description:
      'Terracotta and wild blossoms. Inspired by pottery over stone arches. Great for warm custom loafers, pleated skirts, or pocket squares.',
  },
  {
    name: 'Or Antique',
    colorHex: '#C5A059',
    description:
      'Muted golden glints of autumn sun. Suitable for elegant jewelry, metallic thread embroidery, or warm champagne neckties.',
  },
  {
    name: 'Crème Royale',
    colorHex: '#EAE6DF',
    description:
      'Raw silk and washed stones. Light creams of vintage paper. Perfect for linen suits, light cream column gowns, or panama hats.',
  },
  {
    name: 'Sable Fin',
    colorHex: '#D5CEBF',
    description:
      'Warm sandy paths of the château. Elegant and comfortable. Beautiful for braided leather sandals, tan accessories, and soft tailoring.',
  },
]

export function SwatchBoard({ title, description, swatches }: TSwatchBoardProps) {
  const palette = swatches && swatches.length > 0 ? swatches : DEFAULT_SWATCHES
  const [selected, setSelected] = useState<TSwatch>(palette[0] ?? DEFAULT_SWATCHES[0]!)

  useEffect(() => {
    setSelected(palette[0] ?? DEFAULT_SWATCHES[0]!)
  }, [swatches])

  return (
    <section
      id="dresscode-section"
      className="relative py-24 px-6 md:px-12 bg-cream text-charcoal paper-texture"
    >
      <div className="absolute top-12 left-12 right-12 bottom-12 border border-gold/10 pointer-events-none rounded-lg" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-sans font-semibold block mb-2">
            Aesthetic Palette
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-charcoal">
            {title ?? 'The Dress Code & Tones'}
          </h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mt-4 mb-2" />
          <p className="font-serif italic text-sm text-stone-500 max-w-lg mx-auto">
            {description ??
              'To weave a collective tapestry of elegance, we welcome you to style your garments after our organic Provençal colour family.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start bg-parchment/65 p-6 md:p-8 rounded-2xl border border-taupe/40 shadow-2xs">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h3 className="font-serif text-xl font-light text-charcoal tracking-wide border-b border-gold/20 pb-2">
              Wedding Colour Palette
            </h3>
            <p className="font-serif text-xs text-stone-500 leading-relaxed italic">
              Tap any fabric swatch to view its seasonal botanical definition and styling advice.
            </p>

            <div className="flex flex-col gap-3">
              {palette.map((swatch) => {
                const isSelected = selected.name === swatch.name
                return (
                  <button
                    key={swatch.name}
                    onClick={() => setSelected(swatch)}
                    className={cn(
                      'flex items-center gap-4 p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer',
                      isSelected
                        ? 'bg-white border-gold shadow-2xs scale-[1.02]'
                        : 'bg-white/40 border-taupe/40 hover:border-gold/30 hover:bg-white/80',
                    )}
                  >
                    <div
                      className="w-12 h-12 rounded-full shadow-inner border border-stone-800/10 shrink-0 flex items-center justify-center relative overflow-hidden"
                      style={{ backgroundColor: swatch.colorHex }}
                    >
                      <div className="absolute inset-0 opacity-15 bg-[linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-size-[3px_3px]" />
                      <div className="absolute inset-px rounded-full border border-black/10" />
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-cream shadow-xs flex items-center justify-center">
                          <FiCheck className="w-3 h-3 text-gold-dark" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm font-bold text-charcoal truncate">
                        {swatch.name}
                      </h4>
                      <p className="font-mono text-[9px] text-stone-400 uppercase tracking-widest">
                        {swatch.colorHex}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-8 w-full">
            <div className="relative overflow-hidden bg-cream p-6 md:p-8 rounded-xl border border-gold/15 min-h-[220px] flex flex-col justify-between shadow-xs">
              <div
                className="absolute right-0 bottom-0 w-36 h-36 opacity-10 rounded-full blur-3xl pointer-events-none transition-all duration-700"
                style={{ backgroundColor: selected.colorHex }}
              />

              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-6 h-6 rounded-full border border-black/5 transition-all duration-500"
                    style={{ backgroundColor: selected.colorHex }}
                  />
                  <span className="text-gold font-sans text-xs tracking-widest uppercase font-semibold">
                    Swatch Detail
                  </span>
                </div>

                <h4 className="font-serif text-2xl font-light text-charcoal leading-tight mb-2 transition-all duration-300">
                  {selected.name}
                </h4>
                <p className="font-serif text-stone-600 text-sm leading-relaxed mb-4">
                  {selected.description}
                </p>

                <div className="h-px bg-gold/10 my-4" />

                <div className="flex items-start gap-3">
                  <FiScissors className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-stone-400 font-sans tracking-widest uppercase font-semibold block mb-0.5">
                      Atelier Tip
                    </span>
                    <p className="font-serif text-charcoal text-xs leading-relaxed italic">
                      Choose dynamic organic structures like breathable flax, washed linen, or lightweight country blazers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-stone-400 font-sans tracking-widest uppercase text-end mt-6">
                Palette: Château Provence Sunset
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/80 p-5 rounded-xl border border-taupe/40">
                <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-charcoal mb-2">
                  Ladies&rsquo; Inspiration
                </h4>
                <ul className="text-xs text-stone-500 space-y-1.5 list-disc pl-3 font-sans leading-relaxed">
                  <li>Floor-length / midi organic silk gowns</li>
                  <li>Linen, crinkled gauze or fine chiffon</li>
                  <li>Earth tones or dynamic floral embroidery</li>
                  <li>Block heels or wedges for garden terrain</li>
                </ul>
              </div>
              <div className="bg-white/80 p-5 rounded-xl border border-taupe/40">
                <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-charcoal mb-2">
                  Gentlemen&rsquo;s Attire
                </h4>
                <ul className="text-xs text-stone-500 space-y-1.5 list-disc pl-3 font-sans leading-relaxed">
                  <li>Light linen blazers or breathable blends</li>
                  <li>Tailored clay, sand or olive chinos</li>
                  <li>Washed linen open-collar shirts — no tie required</li>
                  <li>Suede monkstraps or classic leather slip-ons</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

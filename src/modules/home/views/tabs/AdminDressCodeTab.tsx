'use client'

import type { TWeddingConfig } from '@/modules/home/@types'
import type { DressCodeSwatchRecord } from '@/server/db/schema'
import { div } from 'motion/react-client'

interface AdminDressCodeTabProps {
  localConfig: TWeddingConfig
  onChange: (updates: Partial<TWeddingConfig>) => void
  onUpdateSwatch: (
    index: number,
    key: keyof DressCodeSwatchRecord,
    value: string
  ) => void
}

export function AdminDressCodeTab({
  localConfig,
  onChange,
  onUpdateSwatch,
}: AdminDressCodeTabProps) {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-0.5">
            Theme Title
          </label>
          <input
            type="text"
            value={localConfig.dressCodeTitle}
            onChange={e => onChange({ dressCodeTitle: e.target.value })}
            className="w-full bg-white border border-taupe rounded-xl px-4 py-2 font-serif text-sm focus:ring-1 focus:ring-gold outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-0.5">
            Theme Instructions Transcript
          </label>
          <input
            type="text"
            value={localConfig.dressCodeDescription}
            onChange={e => onChange({ dressCodeDescription: e.target.value })}
            className="w-full bg-white border border-taupe rounded-xl px-4 py-2 font-serif text-xs focus:ring-1 focus:ring-gold outline-none"
            required
          />
        </div>
      </div>
      <div>
        <span className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-3">
          Organic Swatches
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {localConfig.dressCodeSwatches.map((sw, index) => {
            const formattedHex = sw.colorHex.startsWith('#')
              ? sw.colorHex
              : `#${sw.colorHex}`
            return (
              <div
                key={index}
                className="bg-white p-4 rounded-xl border border-taupe flex flex-col gap-2 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-sans text-stone-400 font-bold uppercase">
                    Swatch #{index + 1}
                  </span>
                  <div
                    className="w-5 h-5 rounded-full border border-taupe/60"
                    style={{ backgroundColor: formattedHex }}
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-stone-400 font-sans uppercase mb-1">
                    Color HEX &amp; Picker
                  </label>
                  <div className="flex items-center gap-2">
                    <div
                      className="relative w-8 h-8 rounded-full border border-taupe/80 overflow-hidden shrink-0 shadow-inner"
                      style={{ backgroundColor: formattedHex }}
                    >
                      <input
                        type="color"
                        value={formattedHex}
                        onChange={e =>
                          onUpdateSwatch(index, 'colorHex', e.target.value)
                        }
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                    <input
                      type="text"
                      value={sw.colorHex}
                      onChange={e =>
                        onUpdateSwatch(index, 'colorHex', e.target.value)
                      }
                      className="w-full bg-cream border border-taupe/50 rounded px-2 py-1 font-mono text-[10px] text-stone-700 outline-none"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] text-stone-400 font-sans uppercase mb-0.5">
                    Swatch Label
                  </label>
                  <input
                    type="text"
                    value={sw.name}
                    onChange={e =>
                      onUpdateSwatch(index, 'name', e.target.value)
                    }
                    className="w-full bg-cream border border-taupe/50 rounded px-2 py-1 font-serif text-xs text-charcoal outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-stone-400 font-sans uppercase mb-1">
                    Vibe Description
                  </label>
                  <textarea
                    value={sw.description}
                    onChange={e =>
                      onUpdateSwatch(index, 'description', e.target.value)
                    }
                    rows={3}
                    className="w-full bg-cream border border-taupe/50 rounded p-2 font-sans text-[10px] text-stone-600 outline-none resize-none leading-relaxed"
                    required
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

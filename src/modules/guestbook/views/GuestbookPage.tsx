'use client'

import { useGuestbookForm } from '../hooks/useGuestbookForm'
import { GuestbookEntryCard } from './GuestbookEntryCard'
import { StampGraphic } from './StampGraphic'
import type { TGuestbookEntry, TStampType } from '../@types'

const STAMP_OPTIONS: Array<{ type: TStampType; label: string }> = [
  { type: 'botanical', label: 'Botanique' },
  { type: 'gold_ring', label: 'Alliance' },
  { type: 'wax_seal', label: 'Sceau Cire' },
  { type: 'vintage_dove', label: 'Colombe' },
]

interface GuestbookPageProps {
  initialEntries: TGuestbookEntry[]
}

export function GuestbookPage({ initialEntries }: GuestbookPageProps) {
  const {
    entries,
    name,
    message,
    stampType,
    setName,
    setMessage,
    setStampType,
    submit,
    isPending,
    error,
    successMessage,
  } = useGuestbookForm(initialEntries)

  return (
    <section
      id="guestbook-section"
      className="relative py-24 px-6 md:px-12 bg-cream text-charcoal border-t border-taupe/40 paper-texture"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-sans font-medium block mb-2">
            Mur de Souvenirs
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-charcoal">
            Le Livre d'Or
          </h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mt-4 mb-2" />
          <p className="font-serif italic text-sm text-stone-500 max-w-md mx-auto">
            Laissez un message chaleureux, un vœu de bonheur ou un souvenir précieux pour Clara &amp; Charles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <form
                onSubmit={submit}
                className="flex flex-col gap-4 bg-parchment p-6 md:p-8 rounded-2xl border border-taupe/40 shadow-xs"
              >
                <h3 className="font-serif text-lg font-light text-charcoal border-b border-gold/20 pb-3">
                  Écrire dans le Livre d'Or
                </h3>

                {error && (
                  <div className="text-rose text-xs font-serif bg-rose/5 border border-rose/20 p-3 rounded-lg leading-relaxed">
                    {error}
                  </div>
                )}
                {successMessage && (
                  <div className="text-sage text-xs font-serif bg-sage/5 border border-sage/20 p-3 rounded-lg leading-relaxed">
                    {successMessage}
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="gb-name"
                    className="text-[9px] text-stone-400 font-sans tracking-[0.15em] uppercase font-semibold"
                  >
                    Votre Nom
                  </label>
                  <input
                    id="gb-name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g., Sophie & Pierre Moreau"
                    disabled={isPending}
                    className="bg-cream text-charcoal text-sm border border-taupe/60 rounded-lg px-4 py-3 placeholder:text-stone-400 focus:border-gold focus:outline-none transition-colors w-full"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="gb-message"
                    className="text-[9px] text-stone-400 font-sans tracking-[0.15em] uppercase font-semibold"
                  >
                    Votre Message / Vœu
                  </label>
                  <textarea
                    id="gb-message"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Partagez un vœu, un souvenir marquant ou un message chaleureux pour les mariés..."
                    disabled={isPending}
                    rows={4}
                    maxLength={500}
                    className="bg-cream text-charcoal text-sm border border-taupe/60 rounded-lg px-4 py-3 placeholder:text-stone-400 focus:border-gold focus:outline-none transition-colors w-full resize-none leading-relaxed"
                  />
                  <span className="text-[9px] text-stone-400 font-sans self-end">
                    {message.length} / 500
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[9px] text-stone-400 font-sans tracking-[0.15em] uppercase font-semibold">
                    Choisissez votre Sceau
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {STAMP_OPTIONS.map(({ type, label }) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setStampType(type)}
                        disabled={isPending}
                        aria-label={`Select ${label} stamp`}
                        aria-pressed={stampType === type}
                        className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all cursor-pointer ${
                          stampType === type
                            ? 'ring-2 ring-gold border-gold/30 bg-gold/5'
                            : 'border-taupe/40 hover:border-gold/30 bg-cream/60 hover:bg-cream'
                        }`}
                      >
                        <StampGraphic type={type} />
                        <span className="text-[8px] text-stone-500 font-sans uppercase tracking-wide leading-none">
                          {label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-3.5 mt-2 bg-charcoal text-cream font-sans text-xs tracking-[0.2em] font-semibold uppercase rounded-xl hover:bg-charcoal/90 transition-all duration-300 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isPending ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-cream border-t-transparent rounded-full animate-spin" />
                      <span>ENREGISTREMENT SUR LE MUR...</span>
                    </>
                  ) : (
                    'SCELLER & ENVOYER'
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="font-serif text-lg font-light text-charcoal">Messages Reçus</h3>
              {entries.length > 0 && (
                <span className="text-[10px] text-stone-400 font-sans uppercase tracking-widest">
                  {entries.length} {entries.length === 1 ? 'message' : 'messages'}
                </span>
              )}
            </div>

            {entries.length === 0 ? (
              <div className="bg-parchment/60 rounded-2xl border border-gold/10 p-12 text-center">
                <p className="font-serif italic text-sm text-stone-400 leading-relaxed">
                  Le mur de souvenirs attend son premier message. Soyez le premier à commencer ce chapitre.
                </p>
              </div>
            ) : (
              <div className="max-h-[640px] overflow-y-auto flex flex-col gap-4 pr-1">
                {entries.map(entry => (
                  <GuestbookEntryCard key={entry.id} entry={entry} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

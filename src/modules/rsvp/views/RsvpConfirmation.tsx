import { FiCheckCircle } from 'react-icons/fi'
import type { TRsvpEntry } from '../@types'

interface RsvpConfirmationProps {
  entry: TRsvpEntry
  onAmend: () => void
}

export function RsvpConfirmation({ entry, onAmend }: RsvpConfirmationProps) {
  const attendanceLabel =
    entry.attendance === 'attending'
      ? 'Présence confirmée'
      : entry.attendance === 'declined'
        ? 'Regret, absent'
        : 'Incertain'

  const attendanceBadgeClass =
    entry.attendance === 'attending'
      ? 'bg-sage/10 text-sage'
      : entry.attendance === 'declined'
        ? 'bg-rose/10 text-rose'
        : 'bg-amber-100 text-amber-700'

  const confirmedDate = entry.createdAt.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const thankYouMessage =
    entry.attendance === 'attending'
      ? "Merci beaucoup ! Nous avons hâte de vous retrouver."
      : 'Merci de nous avoir prévenus.'

  return (
    <div className="flex flex-col items-center py-6 text-center">
      <div className="relative w-full max-w-[420px] bg-parchment p-8 rounded-xl border-2 border-dashed border-gold/40 shadow-md overflow-hidden text-charcoal">
        <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-cream border-r border-[#eddcc4] -translate-y-1/2" />
        <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-cream border-l border-[#eddcc4] -translate-y-1/2" />

        <div
          className="absolute right-4 top-4 opacity-5 pointer-events-none select-none"
          aria-hidden="true"
        >
          <svg viewBox="0 0 100 100" className="w-16 h-16 text-gold">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4,4"
            />
            <path d="M20,50 L80,50 M50,20 L50,80" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        <div className="flex flex-col items-center mb-6">
          <FiCheckCircle className="w-12 h-12 text-sage mb-2" />
          <span className="text-[10px] text-gold uppercase tracking-[0.3em] font-semibold">
            Billet d'entrée
          </span>
          <h3 className="font-serif text-xl font-bold tracking-wider text-charcoal mt-1">
            Inscription Confirmée
          </h3>
          <div className="w-12 h-px bg-gold/30 mt-2" />
        </div>

        <div className="flex flex-col gap-3 font-serif border-y border-dashed border-gold/20 py-4 my-4 text-left">
          <div className="flex justify-between items-baseline">
            <span className="text-[10px] text-stone-400 uppercase tracking-widest font-sans">
              INVITÉ(S) :
            </span>
            <span className="text-sm font-semibold max-w-[200px] truncate text-right">
              {entry.name}
            </span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-[10px] text-stone-400 uppercase tracking-widest font-sans">
              STATUT :
            </span>
            <span
              className={`text-[11px] uppercase tracking-wider px-2 py-0.5 rounded font-sans font-bold ${attendanceBadgeClass}`}
            >
              {attendanceLabel}
            </span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-[10px] text-stone-400 uppercase tracking-widest font-sans">
              NOMBRE :
            </span>
            <span className="text-sm text-stone-700 font-semibold">
              {entry.guestsCount} invité(s)
            </span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-[10px] text-stone-400 uppercase tracking-widest font-sans">
              NAVETTE :
            </span>
            <span className="text-xs font-semibold">
              {entry.needsShuttle ? 'Oui (Place réservée)' : 'Non (Voiture privée)'}
            </span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-[10px] text-stone-400 uppercase tracking-widest font-sans">
              RÉGIME :
            </span>
            <span className="text-xs capitalize max-w-[200px] truncate">
              {entry.dietary === 'none'
                ? 'Standard (Menu du Chef)'
                : entry.dietary === 'vegetarian'
                  ? 'Végétarien'
                  : entry.dietary === 'vegan'
                    ? 'Végétalien'
                    : entry.dietary === 'gluten-free'
                      ? 'Sans gluten'
                      : 'Autre'}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-6">
          <div className="h-8 w-48 text-stone-500/30 flex items-center justify-center font-mono text-[8px] overflow-hidden leading-none select-none tracking-tight">
            || |||| ||| | ||||| | ||||| | | |||| ||| | ||| |||| |
          </div>
          <span className="text-[9px] text-stone-400 font-sans uppercase tracking-[0.2em] mt-1">
            Confirmé le {confirmedDate}
          </span>
        </div>
      </div>

      <div className="mt-8 max-w-sm">
        <h4 className="font-serif text-lg font-light text-stone-800">{thankYouMessage}</h4>
        <p className="font-serif text-xs text-stone-500 leading-relaxed mt-2.5">
          Votre réponse a été enregistrée. Les détails ont été enregistrés avec succès dans notre base de données. Vous pouvez modifier votre choix à tout moment en cliquant ci-dessous.
        </p>
        <button
          onClick={onAmend}
          className="mt-6 px-5 py-2 font-sans text-[10px] tracking-widest uppercase text-gold hover:text-gold-dark border border-gold/30 hover:border-gold/60 rounded-lg bg-cream/50 transition-colors cursor-pointer"
        >
          MODIFIER MA RÉPONSE
        </button>
      </div>
    </div>
  )
}

import { FiNavigation, FiCompass } from 'react-icons/fi'
import { RiPlaneLine, RiTrainLine, RiHotelLine, RiSunFill } from 'react-icons/ri'
import type { TWeddingConfig } from '../@types'

interface TravelSectionProps {
  config: Pick<TWeddingConfig, 'travelFlights' | 'travelTrains' | 'travelStays' | 'travelTreasures' | 'groomName' | 'brideName'>
}

export function TravelSection({ config }: TravelSectionProps) {
  const groomInitial = config.groomName.replace('Monsieur ', '').charAt(0)
  const brideInitial = config.brideName.replace('Madame ', '').charAt(0)

  return (
    <section
      id="travel-guide-section"
      className="relative py-24 px-6 md:px-12 bg-parchment text-charcoal border-y border-taupe/40 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-sans font-medium block mb-2">
            Informations de Voyage
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-charcoal">
            Guide de Voyage en Provence
          </h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mt-4 mb-2" />
          <p className="font-serif italic text-sm text-stone-500 max-w-sm mx-auto">
            Logistique essentielle, correspondances aéroportuaires, trajets en train et hébergements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-cream p-6 rounded-xl border border-gold/10 hover:border-gold/25 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-parchment border border-taupe flex items-center justify-center mb-4">
                <RiPlaneLine className="w-5 h-5 text-gold-dark" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">Transports</h3>
              <p className="font-serif text-stone-600 text-xs leading-relaxed mb-4">{config.travelFlights}</p>
              <p className="font-serif text-stone-600 text-xs leading-relaxed">{config.travelTrains}</p>
            </div>
            <div className="border-t border-taupe/40 pt-4 mt-6 flex items-center gap-1.5 text-[10px] text-gold uppercase tracking-widest font-semibold font-sans">
              <RiTrainLine className="w-3.5 h-3.5 text-sage" />
              <span>navettes disponibles à la gare</span>
            </div>
          </div>

          <div className="bg-cream p-6 rounded-xl border border-gold/10 hover:border-gold/25 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-parchment border border-taupe flex items-center justify-center mb-4">
                <RiHotelLine className="w-5 h-5 text-sage" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">Hébergements</h3>
              <p className="font-serif text-stone-600 text-xs leading-relaxed mb-4">{config.travelStays}</p>
            </div>
            <div className="border-t border-taupe/40 pt-4 mt-6 flex items-center gap-1.5 text-[10px] text-gold uppercase tracking-widest font-semibold font-sans">
              <FiCompass className="w-3.5 h-3.5 text-gold-dark" />
              <span>référence : Mariage de {groomInitial} &amp; {brideInitial}</span>
            </div>
          </div>

          <div className="bg-cream p-6 rounded-xl border border-gold/10 hover:border-gold/25 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-parchment border border-taupe flex items-center justify-center mb-4">
                <RiSunFill className="w-5 h-5 text-rose" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">Trésors de Provence</h3>
              <p className="font-serif text-stone-600 text-xs leading-relaxed mb-4">{config.travelTreasures}</p>
            </div>
            <div className="border-t border-taupe/40 pt-4 mt-6 flex items-center gap-1.5 text-[10px] text-gold uppercase tracking-widest font-semibold font-sans">
              <FiNavigation className="w-3.5 h-3.5 text-rose" />
              <span>apportez vos appareils photo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

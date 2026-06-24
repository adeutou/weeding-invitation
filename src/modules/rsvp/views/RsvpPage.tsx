'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { FiAlertTriangle, FiUsers, FiMusic, FiTruck } from 'react-icons/fi'
import { useRsvpForm } from '../hooks/useRsvpForm'
import { RsvpConfirmation } from './RsvpConfirmation'
import type { TAttendanceStatus, TDietaryPreference } from '../@types'

const RSVP_BG =
  'https://images.unsplash.com/photo-1707193391249-ae978914b063?q=80&w=1340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

const FIELD_LABEL = 'text-[10px] text-white/55 font-sans tracking-[0.2em] uppercase font-semibold'

const INPUT_BASE =
  'bg-white/10 backdrop-blur-sm text-cream text-sm border border-white/20 rounded-lg px-4 py-3 placeholder:text-white/25 focus:border-gold/60 focus:bg-white/15 focus:outline-none transition-all duration-200 w-full'

const SELECT_BASE =
  'bg-[#0A1525]/80 backdrop-blur-sm text-cream text-sm border border-white/20 rounded-lg px-4 py-3 cursor-pointer focus:border-gold/60 focus:outline-none transition-all duration-200 w-full appearance-none'

export function RsvpPage() {
  const {
    formData,
    setName,
    setEmail,
    setAttendance,
    setGuestsCount,
    setDietary,
    setDietaryDetails,
    setNeedsShuttle,
    setSongRequest,
    step,
    submittedEntry,
    error,
    isPending,
    submit,
    reset,
  } = useRsvpForm()

  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onScroll() {
      if (!sectionRef.current || !bgRef.current) return
      const top = sectionRef.current.getBoundingClientRect().top
      bgRef.current.style.transform = `translateY(${-top * 0.38}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="rsvp-section"
      ref={sectionRef}
      className="relative py-24 px-6 md:px-12 border-t border-white/10 overflow-hidden"
    >
      {/* Parallax background */}
      <div
        ref={bgRef}
        className="absolute will-change-transform pointer-events-none"
        style={{ top: '-18%', left: 0, right: 0, height: '136%' }}
      >
        <Image
          src={RSVP_BG}
          alt="Confirmation de présence"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Cinematic overlays — slightly lighter to let photo bleed through the glass */}
      <div className="absolute inset-0 bg-[#060F1C]/60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#060F1C]/50 via-transparent to-[#060F1C]/50 pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-sans font-medium block mb-2">
            Confirmation de Présence
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-cream drop-shadow-[0_2px_15px_rgba(0,0,0,0.5)]">
            Formulaire de Réponse (RSVP)
          </h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mt-4 mb-2" />
          <p className="font-serif italic text-sm text-white/50 max-w-md mx-auto">
            Veuillez répondre avant le 1er août 2026 afin de nous aider à préparer au mieux cette belle journée.
          </p>
        </div>

        {/* Glassmorphism card */}
        <div className="bg-white/8 backdrop-blur-xl p-8 md:p-12 rounded-2xl border border-white/15 shadow-[0_25px_60px_rgba(6,15,28,0.55),inset_0_1px_0_rgba(255,255,255,0.12)] relative overflow-hidden">
          {/* Top shimmer line */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          {/* Subtle inner glow */}
          <div className="absolute top-0 left-0 w-48 h-48 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

          {step === 'confirmed' && submittedEntry ? (
            <RsvpConfirmation entry={submittedEntry} onAmend={reset} />
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-6">
              {error && (
                <div className="flex items-center gap-2 text-rose/90 bg-rose/10 border border-rose/25 p-3 rounded-lg text-xs leading-relaxed font-serif backdrop-blur-sm">
                  <FiAlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="rsvp-name" className={FIELD_LABEL}>
                    Votre Nom Complet
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    value={formData.name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Ex : Amélie & Jean Dupont"
                    disabled={isPending}
                    className={INPUT_BASE}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="rsvp-email" className={FIELD_LABEL}>
                    Votre Adresse E-mail
                  </label>
                  <input
                    id="rsvp-email"
                    type="email"
                    value={formData.email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Ex : contact@domaine.com"
                    disabled={isPending}
                    className={INPUT_BASE}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="rsvp-attendance" className={FIELD_LABEL}>
                    Votre Présence
                  </label>
                  <select
                    id="rsvp-attendance"
                    value={formData.attendance}
                    onChange={e => setAttendance(e.target.value as TAttendanceStatus)}
                    disabled={isPending}
                    className={SELECT_BASE}
                  >
                    <option value="attending" className="bg-[#0A1525] text-cream">Oui • Je/Nous serons présents avec joie</option>
                    <option value="declined" className="bg-[#0A1525] text-cream">Non • Sincères regrets, je ne pourrai pas être présent</option>
                    <option value="uncertain" className="bg-[#0A1525] text-cream">Incertain • Besoin de précisions</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="rsvp-guests" className={`${FIELD_LABEL} flex items-center gap-1`}>
                    <FiUsers className="w-3.5 h-3.5 text-gold" />
                    <span>Nombre Total d&apos;Invités</span>
                  </label>
                  <select
                    id="rsvp-guests"
                    value={formData.guestsCount}
                    onChange={e => setGuestsCount(parseInt(e.target.value, 10))}
                    disabled={isPending}
                    className={SELECT_BASE}
                  >
                    <option value="1" className="bg-[#0A1525] text-cream">1 Personne</option>
                    <option value="2" className="bg-[#0A1525] text-cream">2 Personnes (Couple)</option>
                    <option value="3" className="bg-[#0A1525] text-cream">3 Personnes (Avec enfant / +1)</option>
                  </select>
                </div>
              </div>

              <div className="h-px bg-white/10 my-1" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="rsvp-dietary" className={FIELD_LABEL}>
                    Régime Alimentaire / Intolérances
                  </label>
                  <select
                    id="rsvp-dietary"
                    value={formData.dietary}
                    onChange={e => setDietary(e.target.value as TDietaryPreference)}
                    disabled={isPending}
                    className={SELECT_BASE}
                  >
                    <option value="none" className="bg-[#0A1525] text-cream">Aucune restriction particulière</option>
                    <option value="vegetarian" className="bg-[#0A1525] text-cream">Végétarien</option>
                    <option value="vegan" className="bg-[#0A1525] text-cream">Végétalien</option>
                    <option value="gluten-free" className="bg-[#0A1525] text-cream">Sans gluten</option>
                    <option value="other" className="bg-[#0A1525] text-cream">Autre (Préciser ci-dessous)</option>
                  </select>
                </div>

                {formData.dietary !== 'none' && (
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="rsvp-dietary-details" className={FIELD_LABEL}>
                      Veuillez préciser vos allergies ou détails
                    </label>
                    <input
                      id="rsvp-dietary-details"
                      type="text"
                      value={formData.dietaryDetails}
                      onChange={e => setDietaryDetails(e.target.value)}
                      placeholder="Ex : Sans noix, allergie aux fruits de mer..."
                      disabled={isPending}
                      className={INPUT_BASE}
                    />
                  </div>
                )}
              </div>

              {/* Shuttle & song — nested glass panel */}
              <div className="flex flex-col gap-4 bg-white/8 backdrop-blur-sm p-4 rounded-xl border border-white/12 mt-2">
                <label htmlFor="rsvp-shuttle" className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    id="rsvp-shuttle"
                    type="checkbox"
                    checked={formData.needsShuttle}
                    onChange={e => setNeedsShuttle(e.target.checked)}
                    disabled={isPending}
                    className="w-4 h-4 cursor-pointer accent-gold"
                  />
                  <div className="flex flex-col">
                    <span className="text-cream/85 text-xs font-serif font-medium flex items-center gap-1.5 leading-none">
                      <FiTruck className="w-3.5 h-3.5 text-gold/80" />
                      Besoin de la navette pour le Château
                    </span>
                    <span className="text-[10px] text-white/40 font-serif italic mt-0.5">
                      Oui, je/nous aurons besoin d&apos;un transport depuis l&apos;hôtel vers le Château.
                    </span>
                  </div>
                </label>

                <div className="h-px bg-white/10" />

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="rsvp-song" className={`${FIELD_LABEL} flex items-center gap-1`}>
                    <FiMusic className="w-3.5 h-3.5 text-gold" />
                    <span>Suggérer une chanson pour la soirée (Optionnel)</span>
                  </label>
                  <input
                    id="rsvp-song"
                    type="text"
                    value={formData.songRequest}
                    onChange={e => setSongRequest(e.target.value)}
                    placeholder="Ex : 'La Vie En Rose' pour la liste de danse..."
                    disabled={isPending}
                    className={`${INPUT_BASE} text-xs`}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-4 mt-4 bg-linear-to-r from-gold to-gold-dark text-neutral-900 font-sans text-xs tracking-[0.25em] font-semibold uppercase rounded-xl shadow-[0_8px_24px_rgba(197,160,89,0.35)] hover:shadow-[0_12px_32px_rgba(197,160,89,0.45)] transition-all duration-300 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
                    <span>ENREGISTREMENT...</span>
                  </>
                ) : (
                  'ENVOYER MA RÉPONSE'
                )}
              </button>

              <p className="text-[10px] text-white/35 font-serif italic text-center">
                Votre réponse sera transmise directement aux mariés. Vous pourrez modifier vos détails à tout moment.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

'use client'

import { FiAlertTriangle, FiUsers, FiMusic, FiTruck } from 'react-icons/fi'
import { useRsvpForm } from '../hooks/useRsvpForm'
import { RsvpConfirmation } from './RsvpConfirmation'
import type { TAttendanceStatus, TDietaryPreference } from '../@types'

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

  return (
    <section
      id="rsvp-section"
      className="relative py-24 px-6 md:px-12 bg-parchment text-charcoal border-t border-taupe/40 overflow-hidden"
    >
      <div
        className="absolute top-0 right-0 w-80 h-80 opacity-[0.03] text-gold pointer-events-none"
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="40" />
        </svg>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-sans font-medium block mb-2">
            Request Reply
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-charcoal">
            The RSVP Questionnaire
          </h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mt-4 mb-2" />
          <p className="font-serif italic text-sm text-stone-500 max-w-md mx-auto">
            Please respond on or before August 1st, 2026, so our French master caterers may prepare
            everything perfectly.
          </p>
        </div>

        <div className="bg-cream p-8 md:p-12 rounded-2xl border border-taupe/60 shadow-[0_15px_45px_rgba(0,0,0,0.04)] relative">
          {step === 'confirmed' && submittedEntry ? (
            <RsvpConfirmation entry={submittedEntry} onAmend={reset} />
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-6">
              {error && (
                <div className="flex items-center gap-2 text-rose bg-rose/5 border border-rose/20 p-3 rounded-lg text-xs leading-relaxed font-serif">
                  <FiAlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="rsvp-name"
                    className="text-[10px] text-stone-400 font-sans tracking-[0.2em] uppercase font-semibold"
                  >
                    Your Full Invitation Name
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    value={formData.name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g., Clara & Jack Jenkins"
                    disabled={isPending}
                    className="bg-parchment text-charcoal text-sm border border-taupe/60 rounded-lg px-4 py-3 placeholder:text-stone-400 focus:border-gold focus:outline-none transition-colors w-full"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="rsvp-email"
                    className="text-[10px] text-stone-400 font-sans tracking-[0.2em] uppercase font-semibold"
                  >
                    Email Directory Address
                  </label>
                  <input
                    id="rsvp-email"
                    type="email"
                    value={formData.email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="e.g., mail@domain.com"
                    disabled={isPending}
                    className="bg-parchment text-charcoal text-sm border border-taupe/60 rounded-lg px-4 py-3 placeholder:text-stone-400 focus:border-gold focus:outline-none transition-colors w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="rsvp-attendance"
                    className="text-[10px] text-stone-400 font-sans tracking-[0.2em] uppercase font-semibold"
                  >
                    The Honor of Attendance
                  </label>
                  <select
                    id="rsvp-attendance"
                    value={formData.attendance}
                    onChange={e => setAttendance(e.target.value as TAttendanceStatus)}
                    disabled={isPending}
                    className="bg-parchment text-charcoal text-sm border border-taupe/60 rounded-lg px-4 py-3 cursor-pointer focus:border-gold focus:outline-none transition-colors w-full appearance-none"
                  >
                    <option value="attending">Yes • I / We Accept with Delight</option>
                    <option value="declined">No • Sincerely Regretfully Decline</option>
                    <option value="uncertain">Uncertain • Seeking Clarification First</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="rsvp-guests"
                    className="text-[10px] text-stone-400 font-sans tracking-[0.2em] uppercase font-semibold flex items-center gap-1"
                  >
                    <FiUsers className="w-3.5 h-3.5 text-gold" />
                    <span>Total Guests Count Party</span>
                  </label>
                  <select
                    id="rsvp-guests"
                    value={formData.guestsCount}
                    onChange={e => setGuestsCount(parseInt(e.target.value, 10))}
                    disabled={isPending}
                    className="bg-parchment text-charcoal text-sm border border-taupe/60 rounded-lg px-4 py-3 cursor-pointer focus:border-gold focus:outline-none transition-colors w-full appearance-none"
                  >
                    <option value="1">1 Person Outright</option>
                    <option value="2">2 Persons Selected (Couple)</option>
                    <option value="3">3 Persons Approved (With Child/Plus One)</option>
                  </select>
                </div>
              </div>

              <div className="h-px bg-gold/10 my-1" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="rsvp-dietary"
                    className="text-[10px] text-stone-400 font-sans tracking-[0.2em] uppercase font-semibold"
                  >
                    Cuisine/Dietary Intolerance
                  </label>
                  <select
                    id="rsvp-dietary"
                    value={formData.dietary}
                    onChange={e => setDietary(e.target.value as TDietaryPreference)}
                    disabled={isPending}
                    className="bg-parchment text-charcoal text-sm border border-taupe/60 rounded-lg px-4 py-3 cursor-pointer focus:border-gold focus:outline-none transition-colors w-full appearance-none"
                  >
                    <option value="none">No Specific Culinary Restrictions</option>
                    <option value="vegetarian">Vegetarian Food Pattern</option>
                    <option value="vegan">Vegan Strict Plant Frame</option>
                    <option value="gluten-free">Coeliac / Gluten Intolerance</option>
                    <option value="other">Other Unique Specific Allergies</option>
                  </select>
                </div>

                {formData.dietary !== 'none' && (
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="rsvp-dietary-details"
                      className="text-[10px] text-stone-400 font-sans tracking-[0.2em] uppercase font-semibold"
                    >
                      Please specify allergies/details
                    </label>
                    <input
                      id="rsvp-dietary-details"
                      type="text"
                      value={formData.dietaryDetails}
                      onChange={e => setDietaryDetails(e.target.value)}
                      placeholder="Ex. Nut free, seafood allergy..."
                      disabled={isPending}
                      className="bg-parchment text-charcoal text-sm border border-taupe/60 rounded-lg px-4 py-3 placeholder:text-stone-400 focus:border-gold focus:outline-none transition-colors w-full"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4 bg-parchment/60 p-4 rounded-xl border border-taupe/40 mt-2">
                <label
                  htmlFor="rsvp-shuttle"
                  className="flex items-center gap-3 cursor-pointer select-none"
                >
                  <input
                    id="rsvp-shuttle"
                    type="checkbox"
                    checked={formData.needsShuttle}
                    onChange={e => setNeedsShuttle(e.target.checked)}
                    disabled={isPending}
                    className="w-4 h-4 cursor-pointer accent-gold"
                  />
                  <div className="flex flex-col">
                    <span className="text-stone-700 text-xs font-serif font-medium flex items-center gap-1.5 leading-none">
                      <FiTruck className="w-3.5 h-3.5 text-sage" />
                      Requested Shuttle Bus Coach Seat
                    </span>
                    <span className="text-[10px] text-stone-400 font-serif italic mt-0.5">
                      Yes, I/We will require transport from local hotels to the Château.
                    </span>
                  </div>
                </label>

                <div className="h-px bg-taupe/40" />

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="rsvp-song"
                    className="text-[10px] text-stone-400 font-sans tracking-[0.2em] uppercase font-semibold flex items-center gap-1"
                  >
                    <FiMusic className="w-3.5 h-3.5 text-gold" />
                    <span>Waltz Ball Song Request (Optional)</span>
                  </label>
                  <input
                    id="rsvp-song"
                    type="text"
                    value={formData.songRequest}
                    onChange={e => setSongRequest(e.target.value)}
                    placeholder="Ex: 'La Vie En Rose' inside the ballroom playlist..."
                    disabled={isPending}
                    className="bg-cream text-charcoal text-xs border border-taupe/60 rounded-lg px-4 py-2.5 placeholder:text-stone-400 focus:border-gold focus:outline-none transition-colors w-full"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-4 mt-4 bg-linear-to-r from-gold to-gold-dark text-neutral-900 font-sans text-xs tracking-[0.25em] font-semibold uppercase rounded-xl shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
                    <span>ENGRAVING REGISTRY...</span>
                  </>
                ) : (
                  'SUBMIT CELEBRATION RESERVATION'
                )}
              </button>

              <p className="text-[10px] text-stone-400 font-serif italic text-center">
                Your response will be submitted directly to our registry. You may amend your details
                at any stage.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

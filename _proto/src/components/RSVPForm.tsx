import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, MapPin, Bus, Soup, Music, Users, ShieldAlert } from "lucide-react";
import { RSVPData } from "../types";

export default function RSVPForm() {
  const [formData, setFormData] = useState<Omit<RSVPData, "id">>({
    name: "",
    email: "",
    attendance: "attending",
    guestsCount: 1,
    dietary: "none",
    dietaryDetails: "",
    needsShuttle: false,
    songRequests: "",
    timestamp: ""
  });

  const [savedRSVP, setSavedRSVP] = useState<RSVPData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState("");

  // Load existing RSVP if completed on this browser
  useEffect(() => {
    try {
      const existing = localStorage.getItem("wedding_rsvp");
      if (existing) {
        setSavedRSVP(JSON.parse(existing));
      }
    } catch (e) {
      console.error("Error reading localStorage", e);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "guestsCount") {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 1 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");
    setIsSubmitting(true);

    if (!formData.name.trim()) {
      setValidationError("Please enter your full reference invitation name.");
      setIsSubmitting(false);
      return;
    }

    if (!formData.email.trim()) {
      setValidationError("An email is required to update you if schedule changes occur.");
      setIsSubmitting(false);
      return;
    }

    const payload: RSVPData = {
      ...formData,
      timestamp: new Date().toLocaleDateString()
    };

    // Store in LocalStorage
    setTimeout(() => {
      try {
        localStorage.setItem("wedding_rsvp", JSON.stringify(payload));
        setSavedRSVP(payload);
        
        // Also fire off a window event so other sections (like music requested) can sync if they listen
        window.dispatchEvent(new CustomEvent("rsvp-updated", { detail: payload }));
      } catch (e) {
        setValidationError("Could not record RSVP. Please double check browser cookies.");
      } finally {
        setIsSubmitting(false);
      }
    }, 1200);
  };

  const handleCancelReservation = () => {
    if (window.confirm("Would you like to amend or clear your wedding reservation details?")) {
      localStorage.removeItem("wedding_rsvp");
      setSavedRSVP(null);
    }
  };

  return (
    <section id="rsvp-section" className="relative py-24 px-6 md:px-12 bg-parchment text-charcoal border-t border-taupe/40 overflow-hidden">
      
      {/* Dynamic graphic subtle rings */}
      <div className="absolute top-0 right-0 w-80 h-80 opacity-[0.03] text-gold pointer-events-none">
        <svg viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="40" />
        </svg>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Header Title */}
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-sans font-medium block mb-2">Request Reply</span>
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-charcoal">The RSVP Questionnaire</h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mt-4 mb-2" />
          <p className="font-serif italic text-sm text-stone-500 max-w-md mx-auto">
            Please respond on or before August 1st, 2026, so our French master caterers may prepare everything perfectly.
          </p>
        </div>

        {/* Outer RSVP Container */}
        <div className="bg-cream p-8 md:p-12 rounded-2xl border border-taupe/60 shadow-[0_15px_45px_rgba(0,0,0,0.04)] relative">
          
          <AnimatePresence mode="wait">
            {!savedRSVP ? (
              
              /* Form State Card */
              <motion.div
                key="rsvp-form-container"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
              >
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  
                  {validationError && (
                    <div className="flex items-center gap-2 text-rose-800 bg-rose-50 border border-rose-100 p-3 rounded-lg text-xs leading-relaxed font-serif">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>{validationError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="rsvp-name-input" className="text-[10px] text-stone-400 font-sans tracking-[0.2em] uppercase font-semibold">Your Full Invitation Name</label>
                      <input
                        id="rsvp-name-input"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g., Clara & Jack Jenkins"
                        className="bg-parchment text-charcoal text-sm border border-taupe/60 rounded-lg px-4 py-3 placeholder:text-stone-400 focus:border-gold transition-colors"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="rsvp-email-input" className="text-[10px] text-stone-400 font-sans tracking-[0.2em] uppercase font-semibold">Email Directory Address</label>
                      <input
                        id="rsvp-email-input"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g., mail@domain.com"
                        className="bg-parchment text-charcoal text-sm border border-taupe/60 rounded-lg px-4 py-3 placeholder:text-stone-400 focus:border-gold transition-colors"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Attendance Response */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="rsvp-attendance-select" className="text-[10px] text-stone-400 font-sans tracking-[0.2em] uppercase font-semibold">The Honor of Attendance</label>
                      <select
                        id="rsvp-attendance-select"
                        name="attendance"
                        value={formData.attendance}
                        onChange={handleChange}
                        className="bg-parchment text-charcoal text-sm border border-taupe/60 rounded-lg px-4 py-3 cursor-pointer focus:border-gold transition-colors"
                        disabled={isSubmitting}
                      >
                        <option value="attending">Yes • I / We Accept with Delight</option>
                        <option value="declined">No • Sincerely Regretfully Decline</option>
                        <option value="uncertain">Uncertain • Seeking Clarification First</option>
                      </select>
                    </div>

                    {/* Guests Count */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="rsvp-guests-select" className="text-[10px] text-stone-400 font-sans tracking-[0.2em] uppercase font-semibold flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-gold" />
                        <span>Total Guests Count Party</span>
                      </label>
                      <select
                        id="rsvp-guests-select"
                        name="guestsCount"
                        value={formData.guestsCount}
                        onChange={handleChange}
                        className="bg-parchment text-charcoal text-sm border border-taupe/60 rounded-lg px-4 py-3 cursor-pointer focus:border-gold transition-colors"
                        disabled={isSubmitting}
                      >
                        <option value="1">1 Person Outright</option>
                        <option value="2">2 Persons Selected (Couple)</option>
                        <option value="3">3 Persons Approved (With Child/Plus One)</option>
                      </select>
                    </div>
                  </div>

                  <div className="h-px bg-gold/10 my-1" />

                  {/* Dietary Requirements */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="rsvp-dietary-select" className="text-[10px] text-stone-400 font-sans tracking-[0.2em] uppercase font-semibold flex items-center gap-1">
                        <Soup className="w-3.5 h-3.5 text-gold" />
                        <span>Cuisine/Dietary Intolerance</span>
                      </label>
                      <select
                        id="rsvp-dietary-select"
                        name="dietary"
                        value={formData.dietary}
                        onChange={handleChange}
                        className="bg-parchment text-charcoal text-sm border border-taupe/60 rounded-lg px-4 py-3 cursor-pointer focus:border-gold transition-colors"
                        disabled={isSubmitting}
                      >
                        <option value="none">No Specific Culinary Restrictions</option>
                        <option value="vegetarian">Vegetarian Food Pattern</option>
                        <option value="vegan">Vegan Strict Plant Frame</option>
                        <option value="gluten-free">Coeliac / Gluten Intolerance</option>
                        <option value="other">Other Unique Specific Allergies</option>
                      </select>
                    </div>

                    {/* Dietary Details */}
                    {formData.dietary !== "none" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="flex flex-col gap-1.5"
                      >
                        <label htmlFor="rsvp-dietaryDetails-input" className="text-[10px] text-stone-400 font-sans tracking-[0.2em] uppercase font-semibold">Please specify allergies/details</label>
                        <input
                          id="rsvp-dietaryDetails-input"
                          name="dietaryDetails"
                          type="text"
                          value={formData.dietaryDetails}
                          onChange={handleChange}
                          placeholder="Ex. Nut free, seafood allergy..."
                          className="bg-parchment text-charcoal text-sm border border-taupe/60 rounded-lg px-4 py-3 placeholder:text-stone-400 focus:border-gold transition-colors"
                          disabled={isSubmitting}
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* Shuttle assistance toggle and Music input */}
                  <div className="flex flex-col gap-4 bg-parchment/60 p-4 rounded-xl border border-taupe/40 mt-2">
                    
                    {/* Shuttle request */}
                    <label htmlFor="rsvp-shuttle-checkbox" className="flex items-center gap-3 cursor-pointer select-none">
                      <input
                        id="rsvp-shuttle-checkbox"
                        name="needsShuttle"
                        type="checkbox"
                        checked={formData.needsShuttle}
                        onChange={handleChange}
                        className="w-4.5 h-4.5 accent-gold cursor-pointer"
                        disabled={isSubmitting}
                      />
                      <div className="flex flex-col">
                        <span className="text-stone-700 text-xs font-serif font-medium flex items-center gap-1.5 leading-none">
                          <Bus className="w-3.5 h-3.5 text-sage" /> Requested Shuttle Bus Coach Seat
                        </span>
                        <span className="text-[10px] text-stone-400 font-serif italic mt-0.5">Yes, I/We will require transport from local hotels to the Château.</span>
                      </div>
                    </label>

                    <div className="h-px bg-taupe/40" />

                    {/* Song Requests */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="rsvp-song-input" className="text-[10px] text-stone-400 font-sans tracking-[0.2em] uppercase font-semibold flex items-center gap-1">
                        <Music className="w-3.5 h-3.5 text-gold" />
                        <span>Waltz Ball Song request (Optional)</span>
                      </label>
                      <input
                        id="rsvp-song-input"
                        name="songRequests"
                        type="text"
                        value={formData.songRequests}
                        onChange={handleChange}
                        placeholder="Ex: 'La Vie En Rose' inside the ballroom playlist..."
                        className="bg-cream text-charcoal text-xs border border-taupe/60 rounded-lg px-4 py-2.5 placeholder:text-stone-400 focus:border-gold transition-colors"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Submit buttons */}
                  <button
                    id="submit-rsvp-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 mt-4 bg-gradient-to-r from-gold to-gold-dark text-neutral-900 font-sans text-xs tracking-[0.25em] font-semibold uppercase rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform active:scale-99 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
                        <span>ENGRAVING REGISTRY...</span>
                      </>
                    ) : (
                      "SUBMIT CELEBRATION RESERVATION"
                    )}
                  </button>

                  <p className="text-[10px] text-stone-400 font-serif italic text-center">
                    Submission binds attendance record locally. You can amend details at any stage.
                  </p>

                </form>
              </motion.div>
            ) : (
              
              /* Keepsake Voucher Success Ticket */
              <motion.div
                key="rsvp-keepsake-ticket"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center py-6 text-center"
              >
                {/* Official Voucher Admission Layout */}
                <div className="relative w-full max-w-[420px] bg-parchment p-8 rounded-xl border-2 border-dashed border-gold/40 shadow-md overflow-hidden text-charcoal">
                  
                  {/* Flap notched ticket punch corners */}
                  <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-cream border-r border-[#eddcc4] -translate-y-1/2" />
                  <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-cream border-l border-[#eddcc4] -translate-y-1/2" />

                  {/* Header decoration */}
                  <div className="flex flex-col items-center mb-6">
                    <CheckCircle2 className="w-12 h-12 text-sage animate-bounce mb-2" />
                    <span className="text-[10px] text-gold uppercase tracking-[0.3em] font-semibold">Admission Pass</span>
                    <h3 className="font-serif text-xl font-bold tracking-wider text-charcoal mt-1">Confirmed Registry</h3>
                    <div className="w-12 h-px bg-gold/30 mt-2" />
                  </div>

                  {/* Ticket Details */}
                  <div className="flex flex-col gap-3 font-serif border-y border-dashed border-gold/20 py-4 my-4 text-left">
                    
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] text-stone-400 uppercase tracking-widest font-sans">INVITEE(S):</span>
                      <span className="text-sm font-semibold max-w-[200px] truncate text-right font-serif">{savedRSVP.name}</span>
                    </div>

                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] text-stone-400 uppercase tracking-widest font-sans">STATUS:</span>
                      <span className={`text-[11px] uppercase tracking-wider px-2 py-0.5 rounded font-sans font-bold ${
                        savedRSVP.attendance === "attending"
                          ? "bg-sage/10 text-sage"
                          : savedRSVP.attendance === "declined"
                          ? "bg-rose/10 text-rose"
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {savedRSVP.attendance === "attending" ? "Attending with Joy" : savedRSVP.attendance === "declined" ? "Declined with Regret" : "Uncertain"}
                      </span>
                    </div>

                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] text-stone-400 uppercase tracking-widest font-sans">PARTY COUNTS:</span>
                      <span className="text-sm text-stone-700 font-semibold">{savedRSVP.guestsCount} Guests approved</span>
                    </div>

                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] text-stone-400 uppercase tracking-widest font-sans">SHUTTLE COACH:</span>
                      <span className="text-xs font-semibold">{savedRSVP.needsShuttle ? "Yes (Reserved Seat)" : "No (Private Auto)"}</span>
                    </div>

                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] text-stone-400 uppercase tracking-widest font-sans">CUISINE PREF:</span>
                      <span className="text-xs capitalize max-w-[200px] truncate">{savedRSVP.dietary === "none" ? "Standard French Chef curated" : savedRSVP.dietary}</span>
                    </div>
                  </div>

                  {/* Voucher barcode element simulation for high realism */}
                  <div className="flex flex-col items-center justify-center mt-6">
                    <div className="h-8 w-48 text-stone-500/30 flex items-center justify-between font-mono text-[8px] overflow-hidden leading-none select-none">
                      || |||| ||| | ||||| | ||||| | | |||| ||| | ||| |||| |
                    </div>
                    <span className="text-[9px] text-stone-400 font-sans uppercase tracking-[0.2em] mt-1">Confirmed • {savedRSVP.timestamp}</span>
                  </div>

                  {/* Stamp graphic background */}
                  <div className="absolute right-4 top-4 opacity-5 pointer-events-none select-none">
                    <svg viewBox="0 0 100 100" className="w-16 h-16 text-gold">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4,4" />
                      <path d="M20,50 L80,50 M50,20 L50,80" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </div>

                </div>

                {/* Sub-text thank you */}
                <div className="mt-8 max-w-sm">
                  <h4 className="font-serif text-lg font-light text-stone-800">
                    {savedRSVP.attendance === "attending" ? "Merci Beaucoup! We can't wait." : "Thank you for letting us know."}
                  </h4>
                  <p className="font-serif text-xs text-stone-500 leading-relaxed mt-2.5">
                    Your response has been secured. Our invitations coordinator has logged your details. You may amend your response at any time by clicking below.
                  </p>
                  
                  <button
                    id="amend-rsvp-btn"
                    onClick={handleCancelReservation}
                    className="mt-6 px-5 py-2 font-sans text-[10px] tracking-widest uppercase text-gold hover:text-gold-dark border border-gold/30 hover:border-gold/60 rounded-lg bg-cream/50 transition-colors cursor-pointer"
                  >
                    AMEND RSVP REGISTRY
                  </button>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}

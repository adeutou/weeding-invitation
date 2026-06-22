import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, FileCheck, Gift, Award, PenTool, Check } from "lucide-react";
import { GuestbookEntry } from "../types";

// Seed data that feels beautiful, warm, and highly non-generic
const seededEntries: GuestbookEntry[] = [
  {
    id: "seed-1",
    name: "Eleanor & Henry (Grandparents)",
    message: "To our absolute dearest children. Reading this beautiful timeline brings tears of endless joy to our old eyes. 2019 seems like yesterday we saw you reading along the Seine. May your hearts always weather the storms as beautifully as you did under that linen umbrella. We will be waiting for that first waltz in September with gold-buckled shoes polished!",
    stampType: "wax_seal",
    createdAt: "6/21/2026"
  },
  {
    id: "seed-2",
    name: "Cousin Amélie",
    message: "Arthur! Beatrice! The dress code color board is absolutely brilliant. I've already set aside a flowing dusty rose satin wrap dress that matches the Provence swatches perfectly. So extremely excited to dance beneath the stars at Château de la Rose!",
    stampType: "botanical",
    createdAt: "6/20/2026"
  },
  {
    id: "seed-3",
    name: "Jack & Sarah Miller (Chicago)",
    message: "Counting down the days! We've already booked our shuttle from Saint-Sulpice station and can't wait to try Luc Besson's 3-course catering banquet. This is by far the most beautiful, organic, and heartfelt invitation we have ever laid eyes upon. Sending you absolute oceans of love from across the globe.",
    stampType: "gold_ring",
    createdAt: "6/18/2026"
  }
];

export default function GuestbookSection() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [stamp, setStamp] = useState<GuestbookEntry["stampType"]>("botanical");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("wedding_guestbook");
      if (saved) {
        setEntries(JSON.parse(saved));
      } else {
        localStorage.setItem("wedding_guestbook", JSON.stringify(seededEntries));
        setEntries(seededEntries);
      }
    } catch (e) {
      setEntries(seededEntries);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback("");

    if (!name.trim() || !message.trim()) {
      setFeedback("Please sign your name and leave a wish.");
      return;
    }

    setIsSubmitting(true);

    const newEntry: GuestbookEntry = {
      id: "guest-" + Date.now(),
      name: name.trim(),
      message: message.trim(),
      stampType: stamp,
      createdAt: new Date().toLocaleDateString()
    };

    setTimeout(() => {
      const updated = [newEntry, ...entries];
      setEntries(updated);
      try {
        localStorage.setItem("wedding_guestbook", JSON.stringify(updated));
      } catch (err) {
        console.error("Local storage error", err);
      }

      setName("");
      setMessage("");
      setStamp("botanical");
      setIsSubmitting(false);
      setFeedback("Your blessing has been lovingly affixed to the memory wall!");
    }, 1000);
  };

  const renderStampGraphic = (type: GuestbookEntry["stampType"]) => {
    switch (type) {
      case "wax_seal":
        return (
          <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-rose to-red-900 border border-red-950/20 shadow-md flex items-center justify-center rotate-12 shrink-0">
            <span className="text-[7px] text-[#ffeecc] uppercase tracking-[0.2em] font-sans font-bold leading-none">SEALED</span>
            <div className="absolute inset-1.5 rounded-full border border-dashed border-[#ffeedd]/20" />
          </div>
        );
      case "gold_ring":
        return (
          <div className="relative w-12 h-12 rounded-full bg-[#fbfaf3] border-2 border-dashed border-gold/50 shadow flex items-center justify-center shrink-0">
            <div className="w-8 h-8 rounded-full border border-gold flex items-center justify-center rotate-45">
              <span className="text-[10px] text-gold font-sans font-semibold">∞</span>
            </div>
          </div>
        );
      case "vintage_dove":
        return (
          <div className="relative w-12 h-12 rounded-full bg-[#edf1ed] border-2 border-dashed border-sage/60 shadow flex items-center justify-center shrink-0">
            <span className="text-[14px] text-sage">🕊️</span>
          </div>
        );
      default: // botanical
        return (
          <div className="relative w-12 h-12 rounded-full bg-[#fbf9f4] border-2 border-dashed border-gold/40 shadow flex items-center justify-center shrink-0">
            <span className="text-[14px] text-gold-dark">🌿</span>
          </div>
        );
    }
  };

  return (
    <section id="guestbook-section" className="relative py-24 px-6 md:px-12 bg-cream text-charcoal paper-texture">
      
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Title Block */}
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-sans font-medium block mb-2">Memory Chronicle</span>
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-charcoal">The Blessing Guest Register</h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mt-4 mb-2" />
          <p className="font-serif italic text-sm text-stone-500 max-w-sm mx-auto">
            Leave your warm wishes, anecdotes, or advice for the bride and groom, signed with a vintage stamp.
          </p>
        </div>

        {/* Dual Panel Form & Messages Board Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* blessing Submission form Panel (Column 1-5) */}
          <div className="lg:col-span-5 bg-parchment p-6 md:p-8 rounded-xl border border-taupe/40 shadow-xs flex flex-col gap-5 sticky top-8">
            <h3 className="font-serif text-lg font-light text-charcoal tracking-wide flex items-center gap-2">
              <PenTool className="w-4 h-4 text-gold" />
              <span>Leave your blessing</span>
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="gb-name-input" className="text-[9px] text-stone-400 font-sans tracking-[0.15em] uppercase font-semibold">Your Name / Connection</label>
                <input
                  id="gb-name-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Uncle Robert & Aunt Lisa"
                  className="bg-cream text-charcoal text-xs border border-taupe rounded-lg px-3 py-2.5 "
                  required
                  maxLength={40}
                  disabled={isSubmitting}
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="gb-msg-input" className="text-[9px] text-stone-400 font-sans tracking-[0.15em] uppercase font-semibold">Blessing Message</label>
                <textarea
                  id="gb-msg-input"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write from the heart here..."
                  className="bg-cream text-charcoal text-xs border border-taupe rounded-lg px-3 py-2.5 h-28 resize-none"
                  required
                  maxLength={500}
                  disabled={isSubmitting}
                />
              </div>

              {/* Stamp selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] text-stone-400 font-sans tracking-[0.15em] uppercase font-semibold">Affix Antique Seal Stamp</label>
                <div className="flex justify-between items-center bg-cream/70 p-2.5 rounded-lg border border-taupe/40">
                  
                  {/* Botanical Button */}
                  <button
                    id="stamp-btn-botanical"
                    type="button"
                    onClick={() => setStamp("botanical")}
                    className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                      stamp === "botanical" ? "bg-gold/15 border border-gold" : "opacity-50 hover:opacity-80"
                    }`}
                    title="Botanical Greenery"
                  >
                    <span>🌿</span>
                  </button>

                  {/* Wax Seal Button */}
                  <button
                    id="stamp-btn-wax"
                    type="button"
                    onClick={() => setStamp("wax_seal")}
                    className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                      stamp === "wax_seal" ? "bg-rose/15 border border-rose" : "opacity-50 hover:opacity-80"
                    }`}
                    title="Crimson Wax Monogram"
                  >
                    <span>🖍️</span>
                  </button>

                  {/* Gold Ring Button */}
                  <button
                    id="stamp-btn-gold"
                    type="button"
                    onClick={() => setStamp("gold_ring")}
                    className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                      stamp === "gold_ring" ? "bg-amber-100 border border-gold" : "opacity-50 hover:opacity-80"
                    }`}
                    title="Interspersed Golden Rings"
                  >
                    <span>💍</span>
                  </button>

                  {/* Vintage Dove Button */}
                  <button
                    id="stamp-btn-dove"
                    type="button"
                    onClick={() => setStamp("vintage_dove")}
                    className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                      stamp === "vintage_dove" ? "bg-sage/15 border border-sage" : "opacity-50 hover:opacity-80"
                    }`}
                    title="Peace Dove Stamp"
                  >
                    <span>🕊️</span>
                  </button>

                </div>
              </div>

              {/* Feedback Success Notification */}
              {feedback && (
                <div className="text-[11px] font-serif text-teal-800 bg-teal-50 border border-teal-100 p-2.5 rounded-lg text-center animate-pulse flex items-center justify-center gap-1">
                  <Check className="w-3 h-3 shrink-0" />
                  <span>{feedback}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                id="submit-blessing-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-neutral-900 text-cream font-sans text-[10px] tracking-widest font-semibold uppercase rounded-lg shadow-sm hover:bg-stone-800 transition-colors cursor-pointer active:scale-[0.99] flex items-center justify-center gap-1.5"
              >
                <Send className="w-3 h-3 text-gold" />
                <span>{isSubmitting ? "STAMPING ENTRY..." : "AFFIX SEAL SIGNATURE"}</span>
              </button>

            </form>
          </div>

          {/* Guest message board display Panel (Column 6-12) */}
          <div className="lg:col-span-7 flex flex-col gap-6 max-h-[640px] overflow-y-auto pr-2">
            <h3 className="font-serif text-lg font-light text-charcoal tracking-wide border-b border-gold/10 pb-2">
              The Living Memory Wall ({entries.length} blessings)
            </h3>

            <div className="flex flex-col gap-6">
              <AnimatePresence initial={false}>
                {entries.map((entry) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative bg-parchment p-6 rounded-xl border border-gold/10 shadow-sm flex flex-col justify-between min-h-[140px] hover:shadow-md hover:border-gold/20 transition-all duration-300 select-none"
                    style={{ backgroundImage: "radial-gradient(rgba(0,0,0,0.005) 1px, transparent 0)" }}
                  >
                    
                    {/* Header: Name and Stamp */}
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <div>
                        <h4 className="font-serif text-[17px] font-semibold text-charcoal">
                          {entry.name}
                        </h4>
                        <span className="text-[10px] text-stone-400 font-sans tracking-widest uppercase">
                          {entry.createdAt}
                        </span>
                      </div>
                      
                      {/* Interactive stamp render */}
                      <div className="w-12 h-12 flex items-center justify-center">
                        {renderStampGraphic(entry.stampType)}
                      </div>
                    </div>

                    {/* Blessing message text body */}
                    <p className="font-serif font-light text-[14px] leading-relaxed italic text-stone-600 mb-2">
                      &ldquo;{entry.message}&rdquo;
                    </p>

                    {/* Subtle digital calligraphy sign off */}
                    <div className="border-t border-dashed border-gold/10 pt-2.5 mt-2 flex justify-end">
                      <span className="handwriting text-gold text-lg font-light leading-none">
                        {entry.name.split("&")[0].split("(")[0]}
                      </span>
                    </div>

                    {/* Double parchment corner line detailing */}
                    <div className="absolute top-1.5 left-1.5 bottom-1.5 right-1.5 pointer-events-none rounded border border-gold/5" />

                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

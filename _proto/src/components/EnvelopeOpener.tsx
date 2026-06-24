import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MailOpen, Compass, ChevronDown, CheckCircle } from "lucide-react";

interface EnvelopeOpenerProps {
  onOpen: (guestName: string) => void;
}

export default function EnvelopeOpener({ onOpen }: EnvelopeOpenerProps) {
  const [guestName, setGuestName] = useState("");
  const [isOpening, setIsOpening] = useState(false);
  const [isSealed, setIsSealed] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      // If empty, set a beautiful generic default
      setGuestName("Dearest Guest");
    }
    triggerEnvelopeSequence();
  };

  const triggerEnvelopeSequence = () => {
    setIsOpening(true);
    // Sequence timelines:
    // 1. Break wax seal (0s to 0.6s)
    // 2. Lift top envelope flap (0.6s to 1.4s)
    // 3. Slide letter card upwards (1.4s to 2.4s)
    // 4. Transition onto full scrollable app (2.4s+)
    setTimeout(() => {
      setIsSealed(false);
    }, 600);

    setTimeout(() => {
      const finalName = guestName.trim() || "Dearest Guest";
      onOpen(finalName);
    }, 2500);
  };

  return (
    <div id="envelope-screen" className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-radial from-[#2a2c2a] to-[#121312] px-4 overflow-hidden">
      
      {/* Background organic light wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(207,168,86,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative w-full max-w-lg flex flex-col items-center">
        {/* Floating botanicals vector accents (Code-drawn to prevent broken assets) */}
        <div className="absolute -top-32 -left-20 w-48 h-48 opacity-10 pointer-events-none animate-sway">
          <svg viewBox="0 0 100 100" fill="currentColor" className="text-cream">
            <path d="M10,90 Q30,60 40,20 Q42,50 60,60 Q70,40 90,10 Q80,45 60,70 Q45,75 10,90 Z" />
          </svg>
        </div>
        <div className="absolute -bottom-32 -right-20 w-48 h-48 opacity-10 pointer-events-none animate-sway" style={{ animationDelay: "3s" }}>
          <svg viewBox="0 0 100 100" fill="currentColor" className="text-cream" style={{ transform: "scaleX(-1)" }}>
            <path d="M10,90 Q30,60 40,20 Q42,50 60,60 Q70,40 90,10 Q80,45 60,70 Q45,75 10,90 Z" />
          </svg>
        </div>

        {/* Vintage Top Branding Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isOpening ? 0 : 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="text-gold text-xs tracking-[0.4em] uppercase font-sans font-medium mb-2">The Wedding Celebration of</div>
          <h1 className="text-cream font-serif text-3xl md:text-4xl tracking-wide font-light">
            Lola <span className="handwriting text-gold text-4xl italic lowercase">&amp;</span> Albert
          </h1>
          <div className="text-gray-400 font-serif text-sm italic mt-2">16 Juillet 2026 • 92500 Rueil-Malmaison, France</div>
        </motion.div>

        {/* Custom Interactive Envelope Frame */}
        <div className="relative w-full h-[320px] md:h-[360px] bg-transparent flex items-center justify-center">
          
          {/* Main Envelope Body */}
          <div className="relative w-full h-full max-w-[460px] bg-[#222422] rounded-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-neutral-800/60 overflow-hidden flex flex-col justify-end">
            
            {/* Envelope Interior Lined Pattern (Revealed when open) */}
            <div className="absolute inset-0 bg-[#161816] flex flex-col items-center justify-start p-6 overflow-hidden">
              {/* Botanical vector lining gold illustration */}
              <div className="w-full h-40 opacity-15 text-gold flex items-center justify-center pt-8">
                <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1" className="w-full max-w-[280px]">
                  <path d="M100,20 C80,50 30,80 30,120 C30,160 60,180 100,180 C140,180 170,160 170,120 C170,80 120,50 100,20 Z" />
                  <path d="M100,50 L100,180" strokeDasharray="3,3" />
                  <path d="M60,100 Q100,120 140,100" />
                  <path d="M50,130 Q100,150 150,130" />
                  <path d="M100,80 C110,90 120,80 130,90" />
                  <path d="M100,80 C90,90 80,80 70,90" />
                </svg>
              </div>
            </div>

            {/* Sliding Letter Card (Moves out of the envelope) */}
            <motion.div
              initial={{ y: 80, opacity: 0.1, scale: 0.94 }}
              animate={
                isOpening && !isSealed
                  ? { y: -240, opacity: 1, scale: 1 }
                  : { y: 20, opacity: 0.8, scale: 0.94 }
              }
              transition={{
                y: { duration: 1.4, ease: "easeOut", delay: 0.5 },
                scale: { duration: 1.2, ease: "easeOut", delay: 0.5 },
                opacity: { duration: 0.8 }
              }}
              className="absolute left-4 right-4 top-4 bottom-4 bg-[#fdfbf7] p-8 rounded shadow-inner border border-taupe/40 flex flex-col items-center justify-center text-center text-charcoal paper-texture z-10"
            >
              <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center mb-3">
                <span className="text-gold font-serif text-sm tracking-wide font-semibold">A &amp; B</span>
              </div>
              <p className="text-gold text-xs tracking-[0.25em] uppercase font-sans mb-2">Invitation Personnelle</p>
              <p className="font-serif text-xs italic text-sage mb-2">Préparée avec un amour infini pour</p>
              <h3 className="font-serif text-xl font-medium tracking-wide text-charcoal max-w-[280px] truncate border-b border-gold/20 pb-2 mb-2">
                {guestName.trim() || "Our Honored Guest"}
              </h3>
              <p className="font-serif text-xs text-stone-500 leading-relaxed max-w-[240px]">
                Nous aurions l'honneur de vous compter parmi nous alors que nous nous engagerons pour la vie sous le ciel de Rueil-Malmaison.
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-gold font-medium uppercase tracking-widest animate-pulse">
                <span>Entrée dans la célébration</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              </div>
            </motion.div>

            {/* Front flap angled cuts using hardcoded geometric shapes */}
            {/* Left diagonal side flap */}
            <div className="absolute bottom-0 left-0 w-1/2 h-[60%] bg-[#282a28] shadow-[4px_-4px_10px_rgba(0,0,0,0.15)] rounded-bl-xl origin-bottom-left skew-y-[24deg] border-t border-r border-[#303330] z-20" />
            
            {/* Right diagonal side flap */}
            <div className="absolute bottom-0 right-0 w-1/2 h-[60%] bg-[#282a28] shadow-[-4px_-4px_10px_rgba(0,0,0,0.15)] rounded-br-xl origin-bottom-right skew-y-[-24deg] border-t border-l border-[#303330] z-20" />

            {/* Low bottom triangle overlay */}
            <div className="absolute bottom-0 inset-x-0 h-[40%] bg-[#1f211f] border-t border-[#2d2f2d] shadow-[-5px_-5px_15px_rgba(0,0,0,0.2)] z-20 flex items-center justify-center">
              <div className="text-neutral-500 font-serif text-[10px] tracking-[0.3em] uppercase pt-4">RSVP INCLUDED</div>
            </div>

            {/* Folding Top Triangle Flap */}
            <motion.div
              style={{ originY: 0 }}
              initial={{ rotateX: 0 }}
              animate={isOpening ? { rotateX: 180, zIndex: 0, opacity: 0.1 } : { rotateX: 0, zIndex: 30 }}
              transition={{ duration: 1.0, ease: "easeInOut", delay: 0.4 }}
              className="absolute top-0 inset-x-0 h-[50%] bg-[#2d2f2d] border-b border-neutral-700 rounded-t-xl origin-top shadow-[0_4px_12px_rgba(0,0,0,0.4)] flex flex-col items-center pt-8 pointer-events-none"
            >
              {/* Botanical flourish symbol */}
              <div className="text-gold/40 w-8 h-8">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M12,2 Q12,12 2,12 Q12,12 12,22 Q12,12 22,12 Q12,12 12,2" />
                </svg>
              </div>
            </motion.div>

            {/* Wax Seal - breaks and translates left and right */}
            <AnimatePresence>
              {isSealed && (
                <motion.div
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.3, opacity: 0, y: 30 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none"
                >
                  {/* Wax Seal Base */}
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#d4af37] via-[#b88e3a] to-[#805e13] flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.5),inset_0_4px_6px_rgba(255,255,255,0.2),inset_0_-4px_6px_rgba(0,0,0,0.4)] border-2 border-[#f3d47d]/30 transform rotate-12 cursor-pointer p-1">
                    
                    {/* Wavy irregular outer rim ring to simulate hand-dripped wax */}
                    <div className="absolute inset-px rounded-full border border-[#805e13]/20" />
                    
                    {/* Inner engraved circle */}
                    <div className="w-16 h-16 rounded-full border border-dashed border-[#ffeecc]/40 flex flex-col items-center justify-center text-center">
                      <span className="text-[#fdfbf7] font-serif text-lg font-bold tracking-tighter drop-shadow-md">L &amp; A</span>
                      <span className="text-[#ffeecc]/80 text-[7px] font-sans tracking-widest uppercase mt-0.5">SCELLÉ</span>
                    </div>

                    {/* Wax luster glint effect */}
                    <div className="absolute -top-1 left-4 w-4 h-8 bg-white/10 rounded-full blur-xs transform -rotate-45" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* Guest Interactive Form to trigger reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isOpening ? 0 : 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-sm mt-10 px-4 text-center"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <input
                id="guest-name-opener"
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Ex. Emma & Michael..."
                className="w-full bg-[#181918] text-cream border border-neutral-800 rounded-lg px-4 py-3 text-center tracking-medium capitalize text-sm focus:border-gold/50 transition-colors"
                disabled={isOpening}
                maxLength={40}
                required
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 text-[10px] tracking-[0.2em] font-sans uppercase pointer-events-none">To:</span>
            </div>

            <button
              id="unseal-invitation-btn"
              type="submit"
              disabled={isOpening}
              className={`relative overflow-hidden w-full py-3 px-6 rounded-lg text-xs tracking-[0.25em] font-medium uppercase shadow-md transition-all duration-300 ${
                isOpening
                  ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-gold to-gold-dark text-neutral-900 font-semibold cursor-pointer active:scale-98 hover:shadow-lg hover:shadow-gold/10"
              }`}
            >
              {isOpening ? "BREAKING SEAL..." : "BREAK WAX SEAL & CHRONICLE"}
            </button>
          </form>

          <p className="text-[11px] text-gray-500 font-serif italic mt-3">
            Saisissez votre nom pour ouvrir votre invitation numérique personnalisée &amp; consulter les détails de l'événement.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  MapPin,
  Clock,
  Compass,
  Volume2,
  VolumeX,
  ChevronDown,
  Navigation,
  Sparkles,
  Plane,
  Train,
  Bed,
  Sunset,
  Camera,
  Heart,
  Settings
} from "lucide-react";

// Sub-components import
import EnvelopeOpener from "./components/EnvelopeOpener";
import StorySection from "./components/StorySection";
import TimelineEvolution from "./components/TimelineEvolution";
import DressCodeBoard from "./components/DressCodeBoard";
import GallerySection from "./components/GallerySection";
import RSVPForm from "./components/RSVPForm";
import GuestbookSection from "./components/GuestbookSection";
import MusicRequests from "./components/MusicRequests";
import AdminDashboard from "./components/AdminDashboard";

// Dynamic state handlers
import { loadWeddingConfig, saveWeddingConfig, DEFAULT_WEDDING_CONFIG } from "./lib/weddingStore";

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [countdown, setCountdown] = useState<CountdownState>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Web Audio synth contexts
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalIdRef = useRef<any>(null);

  // Couples Studio configuration state
  const [config, setConfig] = useState(loadWeddingConfig());
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Derive Dynamic Monogram of Couple (e.g. "Madame Clara & Monsieur Charles" -> "C & C")
  const getInitials = () => {
    const b = config.brideName.replace("Madame ", "").charAt(0);
    const g = config.groomName.replace("Monsieur ", "").charAt(0);
    return `${g} & ${b}`;
  };

  const handleSaveConfig = (newConfig: typeof config) => {
    saveWeddingConfig(newConfig);
    setConfig(newConfig);
  };

  const handleResetToDefault = () => {
    if (window.confirm("Are you sure you want to revert all custom modifications back to standard Clara & Charles presets? This resets your edits live.")) {
      saveWeddingConfig(DEFAULT_WEDDING_CONFIG);
      setConfig(DEFAULT_WEDDING_CONFIG);
    }
  };

  // Countdown useEffect hook tracking dynamic date string
  useEffect(() => {
    const calculateCountdown = () => {
      const targetTime = new Date(config.weddingDateStr).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    calculateCountdown();
    const intervalId = setInterval(calculateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, [config.weddingDateStr]);

  // Soft Ambient Piano Chords Generator (Web Audio API)
  const toggleAmbientAudio = () => {
    const nextState = !isAudioPlaying;
    setIsAudioPlaying(nextState);

    if (!nextState) {
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      return;
    }

    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtxClass();
      audioCtxRef.current = ctx;

      // Soft Pentatonic Minor Chords: C4, G4, F4, Eb4, G4, C5
      const notes = [261.63, 392.00, 349.23, 311.13, 392.00, 523.25];
      let index = 0;

      // Play initially, track in background 4s intervals
      const playPulse = () => {
        if (!audioCtxRef.current) return;
        if (audioCtxRef.current.state === "suspended") {
          audioCtxRef.current.resume();
        }

        const osc = audioCtxRef.current.createOscillator();
        const gainNote = audioCtxRef.current.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(notes[index % notes.length], audioCtxRef.currentTime);

        // Soft linear attack / exponential decay
        gainNote.gain.setValueAtTime(0, audioCtxRef.currentTime);
        gainNote.gain.linearRampToValueAtTime(0.04, audioCtxRef.currentTime + 1.2);
        gainNote.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.currentTime + 3.8);

        osc.connect(gainNote);
        gainNote.connect(audioCtxRef.current.destination);

        osc.start(audioCtxRef.currentTime);
        osc.stop(audioCtxRef.currentTime + 4.0);

        index++;
      };

      playPulse();
      intervalIdRef.current = setInterval(playPulse, 4200);

    } catch (e) {
      console.error("Lyrical Synthesizer failed", e);
    }
  };

  // Clean ambient audio on unmount
  useEffect(() => {
    return () => {
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  const handleEnvelopeOpen = (name: string) => {
    setGuestName(name);
    setIsOpened(true);
    // Smooth scroll down slightly after load
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-cream text-charcoal font-serif selection:bg-gold/30 selection:text-charcoal paper-texture">
      
      {/* 1. Envelope Opening Portal View */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div
            key="envelope-key"
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 pointer-events-auto"
          >
            <EnvelopeOpener onOpen={handleEnvelopeOpen} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Full Revealed Main Wedding Website Content */}
      {isOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="relative flex flex-col min-h-screen overflow-hidden"
        >
          {/* Subtle Ambient Golden Sparkles on Margins */}
          <div className="absolute top-12 left-6 w-3 h-3 text-gold/30 pointer-events-none animate-pulse">
            <Sparkles className="w-full h-full" />
          </div>
          <div className="absolute top-48 right-12 w-4 h-4 text-rose/20 pointer-events-none animate-pulse" style={{ animationDelay: "2s" }}>
            <Sparkles className="w-full h-full" />
          </div>

          {/* Aesthetic Sticky Top Navigation Bar */}
          <header className="sticky top-0 z-40 bg-cream/80 backdrop-blur-md border-b border-taupe/40 px-6 py-4 flex items-center justify-between">
            {/* Left Initials Badge */}
            <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <span className="font-serif text-sm font-semibold tracking-widest text-charcoal">{getInitials()}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              <span className="font-cursive text-md text-gold italic">monogram</span>
            </div>

            {/* Desktop Navigation Paths */}
            <nav className="hidden lg:flex items-center gap-8 text-[11px] font-sans tracking-[0.2em] uppercase font-medium">
              <button onClick={() => scrollToSection("our-story-section")} className="hover:text-gold cursor-pointer transition-colors">Our Story</button>
              <button onClick={() => scrollToSection("schedule-timeline-section")} className="hover:text-gold cursor-pointer transition-colors">The Schedule</button>
              <button onClick={() => scrollToSection("dresscode-section")} className="hover:text-gold cursor-pointer transition-colors">Attire Theme</button>
              <button onClick={() => scrollToSection("travel-guide-section")} className="hover:text-gold cursor-pointer transition-colors">Provence Guide</button>
              <button onClick={() => scrollToSection("rsvp-section")} className="hover:text-gold cursor-pointer transition-colors font-semibold text-rose">RSVP</button>
              <button onClick={() => scrollToSection("guestbook-section")} className="hover:text-gold cursor-pointer transition-colors">Blessings</button>
              <button onClick={() => scrollToSection("ballplay-section")} className="hover:text-gold cursor-pointer transition-colors">Playlist</button>
            </nav>

            {/* Interactive Actions bar: Studio Admin & Piano Harmony Synthesizer */}
            <div className="flex items-center gap-2.5">
              <button
                id="admin-atelier-trigger"
                onClick={() => setIsAdminOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#F2ECE4] border border-taupe/60 hover:border-gold/60 text-charcoal font-medium text-xs rounded-lg transition-all cursor-pointer"
                title="Open Couples Atelier Studio Dashboard"
              >
                <Settings className="w-3.5 h-3.5 text-gold-dark" />
                <span className="font-sans uppercase text-[9px] tracking-widest">Atelier Admin</span>
              </button>

              <button
                id="ambient-synth-toggle"
                onClick={toggleAmbientAudio}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs tracking-wider transition-all duration-300 cursor-pointer ${
                  isAudioPlaying
                    ? "bg-gold/15 border-gold text-gold-dark font-medium animate-pulse"
                    : "bg-parchment/60 border-taupe/50 text-stone-500 hover:text-charcoal"
                }`}
                title={isAudioPlaying ? "Mute Background Harmony" : "Engage Ambient Audio Synth"}
              >
                {isAudioPlaying ? <Volume2 className="w-3.5 h-3.5 shrink-0" /> : <VolumeX className="w-3.5 h-3.5 shrink-0" />}
                <span className="font-sans uppercase text-[9px] tracking-widest hidden sm:inline">
                  {isAudioPlaying ? "AMBIENT SYNC ON" : "AMBIENT PIANO OFF"}
                </span>
              </button>
            </div>
          </header>

          {/* Master Hero Greeting banner */}
          <section className="relative min-h-[105vh] bg-cream selection:bg-gold/20 flex items-center justify-center py-16 md:py-24 px-4 sm:px-6 lg:px-12 select-none border-b border-taupe/40 overflow-hidden">
            
            {/* Fine Art Crosshairs in top-left & bottom-right */}
            <div className="absolute top-8 left-8 w-12 h-12 pointer-events-none opacity-40">
              <div className="absolute top-6 left-0 right-0 h-px bg-gold/40"></div>
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gold/40"></div>
              <span className="absolute top-1 left-1 text-[8px] tracking-widest text-gold/60 font-sans uppercase">{getInitials()}</span>
            </div>
            <div className="absolute bottom-8 right-8 w-12 h-12 pointer-events-none opacity-40">
              <div className="absolute top-6 left-0 right-0 h-px bg-gold/40"></div>
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gold/40"></div>
            </div>

            {/* Asymmetrical grid */}
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
              
              {/* Left Column: Vertical Label & Greeting & Names & Countdown */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                
                {/* Invited To Guest label */}
                <div className="inline-flex items-center gap-3 bg-parchment py-1.5 px-4 rounded-full border border-taupe/65 mb-8 animate-fade-in shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
                  <p className="font-serif italic text-xs text-stone-600">
                    With supreme joy, to our guest <span className="font-sans font-bold uppercase text-[10px] tracking-widest text-[#1a1a1a]">{guestName}</span>
                  </p>
                </div>

                {/* Master typography layout */}
                <div className="space-y-2 max-w-2xl">
                  <span className="text-gold uppercase tracking-[0.45em] text-[10px] font-sans font-semibold block">
                    The Sacred Union &amp; Gathering
                  </span>
                  
                  {/* Huge multi-level heading */}
                  <h1 className="font-serif text-5xl sm:text-7xl md:text-[80px] font-extralight tracking-tight text-charcoal leading-[1.05] relative">
                    {config.groomName}
                    <span className="handwriting text-gold text-6xl sm:text-8xl md:text-[104px] inline-block mx-4 rotate-[-6deg] translate-y-2">
                      &amp;
                    </span>
                    <br />
                    <span className="font-normal italic tracking-wide text-stone-800">{config.brideName}</span>
                  </h1>
                </div>

                {/* Elegant separator & French quote */}
                <div className="flex items-center gap-4 w-full max-w-md my-8">
                  <div className="h-px flex-1 bg-gold/30"></div>
                  <span className="font-serif italic text-xs text-stone-400 font-normal">
                    &ldquo;{config.editorialQuote}&rdquo;
                  </span>
                  <div className="h-px flex-2 bg-gold/30"></div>
                </div>

                {/* Logistics Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mb-10 text-stone-600">
                  <div className="flex items-center gap-3 bg-white/70 p-4 rounded-xl border border-taupe/40">
                    <div className="w-9 h-9 rounded-full bg-parchment border border-taupe flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-stone-400 font-sans">The Wedding Day</p>
                      <p className="font-serif text-sm font-semibold text-charcoal">{config.weddingDateReadable}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/70 p-4 rounded-xl border border-taupe/40">
                    <div className="w-9 h-9 rounded-full bg-parchment border border-taupe flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-sage" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-stone-400 font-sans">The Location</p>
                      <p className="font-serif text-sm font-semibold text-charcoal">{config.venueLocation}</p>
                    </div>
                  </div>
                </div>

                {/* Premium Countdown Clock reimagined with continuous ticking rings */}
                <div className="w-full max-w-lg">
                  <p className="text-[10px] uppercase tracking-[0.3em] font-sans text-stone-400 mb-3 font-medium">Chronograph until vows</p>
                  <div className="grid grid-cols-4 gap-3 bg-white/45 p-4 rounded-2xl border border-taupe shadow-2xs backdrop-blur-xs">
                    {/* Days */}
                    <div className="flex flex-col items-center py-2">
                      <span id="countdown-days" className="font-serif text-3xl md:text-4xl font-light text-charcoal tracking-tight">
                        {countdown.days}
                      </span>
                      <span className="text-[8px] text-stone-400 font-sans tracking-[0.2em] uppercase mt-1">Days</span>
                    </div>
                    {/* Hours */}
                    <div className="flex flex-col items-center py-2 border-l border-gold/15">
                      <span id="countdown-hours" className="font-serif text-3xl md:text-4xl font-light text-charcoal tracking-tight">
                        {countdown.hours}
                      </span>
                      <span className="text-[8px] text-stone-400 font-sans tracking-[0.2em] uppercase mt-1">Hours</span>
                    </div>
                    {/* Minutes */}
                    <div className="flex flex-col items-center py-2 border-l border-gold/15">
                      <span id="countdown-minutes" className="font-serif text-3xl md:text-4xl font-light text-charcoal tracking-tight">
                        {countdown.minutes}
                      </span>
                      <span className="text-[8px] text-stone-400 font-sans tracking-[0.2em] uppercase mt-1">Mins</span>
                    </div>
                    {/* Seconds */}
                    <div className="flex flex-col items-center py-2 border-l border-gold/15">
                      <span id="countdown-seconds" className="font-serif text-3xl md:text-4xl font-light text-[#c8968e] tracking-tight">
                        {countdown.seconds}
                      </span>
                      <span className="text-[8px] text-stone-400 font-sans tracking-[0.2em] uppercase mt-1 animate-pulse">Secs</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Dynamic Keepsake Polaroid Invitation Card (Pinterest Favorite!) */}
              <div className="lg:col-span-5 flex flex-col justify-center items-center lg:items-end w-full">
                
                {/* Floating floral details background decoration */}
                <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-sm">
                  
                  <div className="absolute -top-10 -right-10 w-24 h-24 text-gold/20 pointer-events-none -rotate-12">
                    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                      <path d="M10,80 Q30,60 50,70 T90,20" />
                      <path d="M40,55 C42,48 48,45 50,55" />
                      <path d="M60,40 C65,30 75,32 70,42" />
                    </svg>
                  </div>
                  
                  {/* Keepsake card wrapper with luxurious shadow and double golden border */}
                  <div className="bg-white p-6 sm:p-8 rounded-3xl border border-taupe shadow-[0_20px_50px_rgba(26,26,26,0.06)] hover:shadow-[0_25px_60px_rgba(26,26,26,0.09)] transition-all duration-500 hover:rotate-[0.5deg]">
                    
                    {/* Sub-header inside card */}
                    <div className="flex items-center justify-between border-b border-taupe/50 pb-4 mb-5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                        <span className="font-sans uppercase text-[10px] tracking-[0.25em] text-stone-500 font-bold">Provence Voyage</span>
                      </div>
                      <span className="font-cursive text-gold text-lg">Autumn 2026</span>
                    </div>

                    {/* Vector Watercolor-style Provence Chateau & Sun Illustration */}
                    <div className="relative w-full overflow-hidden rounded-xl border border-taupe/40 bg-parchment p-1.5 shadow-sm">
                      <svg viewBox="0 0 400 240" className="w-full h-auto rounded-lg" fill="none">
                        <defs>
                          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#EFECE8" />
                            <stop offset="50%" stopColor="#EAE6E2" />
                            <stop offset="100%" stopColor="#F8F5F2" />
                          </linearGradient>
                        </defs>
                        <rect width="400" height="240" fill="url(#skyGrad)" />
                        
                        {/* Rolling Provençal Hills */}
                        <path d="M-50,200 C100,160 200,210 400,170 L400,240 L-50,240 Z" fill="#EAECE2" opacity="0.6" />
                        <path d="M0,220 C150,190 280,230 450,190 L450,240 L0,240 Z" fill="#81917F" opacity="0.15" />
                        
                        {/* Glowing Golden Sun */}
                        <circle cx="280" cy="110" r="32" fill="#C5A059" opacity="0.25" />
                        <circle cx="280" cy="110" r="16" fill="#C5A059" opacity="0.15" />

                        {/* Abstract Cypress Trees */}
                        <path d="M80,180 L88,110 L96,180 Z" fill="#81917F" opacity="0.7" />
                        <path d="M72,190 L78,130 L84,190 Z" fill="#81917F" opacity="0.5" />
                        <path d="M310,170 L316,110 L322,170 Z" fill="#81917F" opacity="0.6" />
                        <path d="M320,180 L325,120 L330,180 Z" fill="#81917F" opacity="0.4" />

                        {/* Château de la Rose silhouette with turrets */}
                        <g transform="translate(140, 100)" stroke="#C5A059" strokeWidth="1" opacity="0.8">
                          {/* Left turret */}
                          <rect x="0" y="30" width="16" height="50" fill="#F8F5F2" strokeWidth="1" />
                          <polygon points="0,30 8,10 16,30" fill="#EFECE8" />
                          
                          {/* Right turret */}
                          <rect x="64" y="30" width="16" height="50" fill="#F8F5F2" strokeWidth="1" />
                          <polygon points="64,30 72,10 80,30" fill="#EFECE8" />
                          
                          {/* Main Hall */}
                          <rect x="12" y="40" width="56" height="40" fill="#F8F5F2" strokeWidth="1" />
                          {/* Classical arch door */}
                          <path d="M32,80 A8,8 0 0 1 48,80 Z" fill="#EFECE8" />
                          {/* Small elegant windows */}
                          <rect x="22" y="48" width="6" height="10" rx="1" fill="#EFECE8" />
                          <rect x="52" y="48" width="6" height="10" rx="1" fill="#EFECE8" />
                        </g>

                        {/* Lavender field rows perspective */}
                        <g stroke="#C8968E" strokeWidth="1.5" opacity="0.5">
                          <line x1="30" y1="240" x2="100" y2="185" />
                          <line x1="110" y1="240" x2="140" y2="185" />
                          <line x1="200" y1="240" x2="200" y2="185" />
                          <line x1="290" y1="240" x2="260" y2="185" />
                          <line x1="370" y1="240" x2="300" y2="185" />
                        </g>
                      </svg>
                    </div>

                    {/* Miniature Keepsake September 2026 Calendar! (Pinterest Sensation) */}
                    <div className="mt-6 border-t border-taupe/50 pt-5 text-center">
                      <h4 className="font-serif text-sm text-charcoal uppercase tracking-widest font-semibold mb-3">September 2026</h4>
                      
                      {/* Weekday Labels */}
                      <div className="grid grid-cols-7 gap-2 text-[9px] font-sans font-bold tracking-wider text-stone-400 mb-2">
                        <span>SU</span><span>MO</span><span>TU</span><span>WE</span><span>TH</span><span>FR</span><span>SA</span>
                      </div>
                      
                      {/* Calendar Grid Numbers */}
                      <div className="grid grid-cols-7 gap-y-1.5 gap-x-2 text-xs font-serif text-stone-600">
                        {/* Pre-dates of September 1, 2026 starting on Tuesday */}
                        <span className="text-stone-300"></span>
                        <span className="text-stone-300"></span>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>

                        <span>6</span>
                        <span>7</span>
                        <span>8</span>
                        <span>9</span>
                        <span>10</span>
                        <span>11</span>
                        <span>12</span>

                        <span>13</span>
                        <span>14</span>
                        <span>15</span>
                        <span>16</span>
                        <span>17</span>
                        <span>18</span>

                        {/* September 19th lovingly circled with custom gold heart */}
                        <span className="relative flex items-center justify-center font-bold text-gold-dark z-10 w-6 h-6 mx-auto">
                          19
                          {/* Circle Heart overlay */}
                          <svg viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="1.75" className="absolute w-8 h-8 pointer-events-none text-gold scale-125 animate-pulse">
                            <path d="M12,21.35 L10.55,20.03 C5.4,15.36 2,12.28 2,8.5 C2,5.42 4.42,3 7.5,3 C9.24,3 10.91,3.81 12,5.09 C13.09,3.81 14.76,3 16.5,3 C19.58,3 22,5.42 22,8.5 C22,12.28 18.6,15.36 13.45,20.04 L12,21.35 Z" />
                          </svg>
                        </span>

                        <span>20</span>
                        <span>21</span>
                        <span>22</span>
                        <span>23</span>
                        <span>24</span>
                        <span>25</span>
                        <span>26</span>

                        <span>27</span>
                        <span>28</span>
                        <span>29</span>
                        <span>30</span>
                        <span className="text-stone-300"></span>
                        <span className="text-stone-300"></span>
                        <span className="text-stone-300"></span>
                      </div>

                      {/* Gentle heart descriptor */}
                      <p className="font-cursive text-gold text-lg mt-4 flex items-center justify-center gap-1.5">
                        <Heart className="w-3.5 h-3.5 fill-rose text-rose stroke-none" />
                        The Wedding Day
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* Seamless downwards indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-stone-400 animate-bounce cursor-pointer z-10" onClick={() => scrollToSection("our-story-section")}>
              <span className="text-[8px] font-sans tracking-[0.3em] uppercase block mb-1">Scroll to begin chronicle</span>
              <ChevronDown className="w-4.5 h-4.5 text-gold-dark" />
            </div>

          </section>

          {/* Section: The Chapters (Story) */}
          <StorySection chapters={config.storyChapters} />

          {/* Section: The Schedule (Stages) */}
          <TimelineEvolution />

          {/* Section: The Dress Code Swatch Panel */}
          <DressCodeBoard title={config.dressCodeTitle} description={config.dressCodeDescription} swatches={config.dressCodeSwatches} />

          {/* Section: Dynamic curatable photo gallery */}
          <GallerySection photos={config.galleryPhotos} />

          {/* Section: Provence French Travel Guide Directory (Luxury Touch) */}
          <section id="travel-guide-section" className="relative py-24 px-6 md:px-12 bg-parchment text-charcoal border-y border-taupe/40 overflow-hidden">
            
            <div className="max-w-5xl mx-auto relative z-10">
              
              {/* Title Header */}
              <div className="text-center mb-16">
                <span className="text-gold uppercase tracking-[0.3em] text-xs font-sans font-medium block mb-2">Guest Travel Hub</span>
                <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-charcoal">The Provence Voyage Directory</h2>
                <div className="w-16 h-px bg-gold/40 mx-auto mt-4 mb-2" />
                <p className="font-serif italic text-sm text-stone-500 max-w-sm mx-auto">
                  Essential logistics, airport connections, train guidelines, and boutique hospitality advice.
                </p>
              </div>

              {/* Grid 3-Columns Travel Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Flights & Trains Card */}
                <div className="bg-cream p-6 rounded-xl border border-gold/10 hover:border-gold/25 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-parchment border border-taupe flex items-center justify-center mb-4">
                      <Plane className="w-5 h-5 text-gold-dark" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">Transit Connections</h3>
                    <p className="font-serif text-stone-600 text-xs leading-relaxed mb-4">
                      {config.travelFlights}
                    </p>
                    <p className="font-serif text-stone-600 text-xs leading-relaxed">
                      {config.travelTrains}
                    </p>
                  </div>
                  <div className="border-t border-taupe/40 pt-4 mt-6 flex items-center gap-1.5 text-[10px] text-gold uppercase tracking-widest font-semibold font-sans">
                    <Train className="w-3.5 h-3.5 text-sage" />
                    <span>shuttles meet at station</span>
                  </div>
                </div>

                {/* Accommodations Card */}
                <div className="bg-cream p-6 rounded-xl border border-gold/10 hover:border-gold/25 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-parchment border border-taupe flex items-center justify-center mb-4">
                      <Bed className="w-5 h-5 text-sage" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">Boutique Stays</h3>
                    <p className="font-serif text-stone-600 text-xs leading-relaxed mb-4">
                      {config.travelStays}
                    </p>
                  </div>
                  <div className="border-t border-taupe/40 pt-4 mt-6 flex items-center gap-1.5 text-[10px] text-gold uppercase tracking-widest font-semibold font-sans">
                    <Compass className="w-3.5 h-3.5 text-gold-dark" />
                    <span>reference: {getInitials()} Wedding</span>
                  </div>
                </div>

                {/* Local Gastronomy Sights Card */}
                <div className="bg-cream p-6 rounded-xl border border-gold/10 hover:border-gold/25 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-full bg-parchment border border-taupe flex items-center justify-center mb-4">
                      <Sunset className="w-5 h-5 text-rose" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-charcoal mb-2">Provençal Treasures</h3>
                    <p className="font-serif text-stone-600 text-xs leading-relaxed mb-4">
                      {config.travelTreasures}
                    </p>
                  </div>
                  <div className="border-t border-taupe/40 pt-4 mt-6 flex items-center gap-1.5 text-[10px] text-gold uppercase tracking-widest font-semibold font-sans">
                    <Camera className="w-3.5 h-3.5 text-rose" />
                    <span>bring polaroids or cameras</span>
                  </div>
                </div>

              </div>

            </div>
          </section>

          {/* Section: The RSVP questionnaire card */}
          <RSVPForm />

          {/* Section: Living Memory Blessings Board */}
          <GuestbookSection />

          {/* Section: Ballroom Dancefloor track requests */}
          <MusicRequests />

          {/* Masters Clean, Human Footer Layout */}
          <footer className="bg-cream pt-16 pb-12 px-6 border-t border-taupe/40 text-center text-charcoal select-none animate-fade-in">
            {/* Crown/Botanics crest icon */}
            <div className="text-gold/40 w-12 h-12 mx-auto mb-4">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="50" cy="50" r="30" />
                <path d="M50,20 Q60,35 70,50 Q60,65 50,80 Q40,65 30,50 Q40,35 50,20 Z" />
              </svg>
            </div>

            <h3 className="font-serif text-xl font-light text-charcoal tracking-wider">
              {config.groomName.replace("Monsieur ", "")} <span className="handwriting text-gold text-2xl lowercase">&amp;</span> {config.brideName.replace("Madame ", "")}
            </h3>
            <div className="text-[10px] text-stone-400 font-sans tracking-[0.2em] uppercase mt-2">
              {config.venueName}, {config.venueLocation} • {config.weddingDateReadable}
            </div>

            <div className="w-16 h-px bg-gold/25 mx-auto my-6" />

            <p className="text-[11px] text-stone-400 font-serif italic">
              Crafted in collaboration with our family, friends, and elders. All registries and RSVPs secure on browser state.
            </p>
            <p className="text-[10px] text-stone-400/60 font-sans tracking-wide mt-2">
              &copy; {new Date().getFullYear()} {config.groomName.replace("Monsieur ", "")} &amp; {config.brideName.replace("Madame ", "")}. All Rights Reserved.
            </p>
          </footer>

          {/* Fully Integrated Couples Atelier Dashboard modal panel */}
          <AdminDashboard
            isOpen={isAdminOpen}
            onClose={() => setIsAdminOpen(false)}
            config={config}
            onSaveConfig={handleSaveConfig}
            onResetToDefault={handleResetToDefault}
          />

        </motion.div>
      )}

    </div>
  );
}

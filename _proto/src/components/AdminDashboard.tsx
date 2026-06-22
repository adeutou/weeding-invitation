import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Settings, 
  BookOpen, 
  Compass, 
  Shirt, 
  Users, 
  Music, 
  Eye, 
  Save, 
  LogOut, 
  Key, 
  Plus, 
  Trash2, 
  Undo,
  CheckCircle,
  HelpCircle,
  FileText,
  Camera
} from "lucide-react";
import { WeddingConfig, RSVPData, GuestbookEntry, StoryChapter, DressCodeSwatch, GalleryPhoto } from "../types";

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  config: WeddingConfig;
  onSaveConfig: (newConfig: WeddingConfig) => void;
  onResetToDefault: () => void;
}

export default function AdminDashboard({ 
  isOpen, 
  onClose, 
  config, 
  onSaveConfig,
  onResetToDefault 
}: AdminDashboardProps) {
  
  // Login Gate
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Tabs for customization
  const [activeTab, setActiveTab] = useState<"general" | "story" | "travel" | "dresscode" | "rsvps_blessings" | "playlist" | "gallery">("general");

  // Local editable config copy
  const [localConfig, setLocalConfig] = useState<WeddingConfig>({ ...config });
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Read guest lists from localStorage
  const [rsvps, setRsvps] = useState<RSVPData[]>([]);
  const [blessings, setBlessings] = useState<GuestbookEntry[]>([]);
  const [songRequests, setSongRequests] = useState<{ id: string; title: string; artist: string; votes: number }[]>([]);

  // Reload data whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setLocalConfig({ ...config });
      
      // Load RSVPs
      try {
        const savedRsvps = localStorage.getItem("wedding_rsvps_v1");
        if (savedRsvps) setRsvps(JSON.parse(savedRsvps));
      } catch (e) {
        console.error(e);
      }

      // Load Blessings
      try {
        const savedBlessings = localStorage.getItem("wedding_guestbook_v1");
        if (savedBlessings) setBlessings(JSON.parse(savedBlessings));
      } catch (e) {
        console.error(e);
      }

      // Load Song Requests
      try {
        const savedSongs = localStorage.getItem("wedding_music_requests_v1");
        if (savedSongs) {
          setSongRequests(JSON.parse(savedSongs));
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [isOpen, config]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (username.trim().toLowerCase() === "admin" && password === "clara&charles") ||
      password === "provence2026"
    ) {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Invalid credentials. Please refer to hints on the screen.");
    }
  };

  const handleSave = () => {
    onSaveConfig(localConfig);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const deleteRsvp = (indexToDelete: number) => {
    const updated = rsvps.filter((_, idx) => idx !== indexToDelete);
    setRsvps(updated);
    localStorage.setItem("wedding_rsvps_v1", JSON.stringify(updated));
  };

  const deleteBlessing = (idToDelete: string) => {
    const updated = blessings.filter(item => item.id !== idToDelete);
    setBlessings(updated);
    localStorage.setItem("wedding_guestbook_v1", JSON.stringify(updated));
  };

  const resetAllDataStats = () => {
    if (window.confirm("Are you sure you want to reset all RSVPs and Guestbook Blessings to default placeholder state? This deletes guest inputs.")) {
      localStorage.removeItem("wedding_rsvps_v1");
      localStorage.removeItem("wedding_guestbook_v1");
      setRsvps([]);
      setBlessings([]);
      window.location.reload();
    }
  };

  // Swatch helpers
  const updateSwatch = (index: number, key: keyof DressCodeSwatch, value: string) => {
    const updatedSwatches = [...localConfig.dressCodeSwatches];
    updatedSwatches[index] = {
      ...updatedSwatches[index],
      [key]: value
    };
    setLocalConfig({ ...localConfig, dressCodeSwatches: updatedSwatches });
  };

  // Story helpers
  const updateStory = (index: number, key: keyof StoryChapter, value: string) => {
    const updatedChapters = [...localConfig.storyChapters];
    updatedChapters[index] = {
      ...updatedChapters[index],
      [key]: value
    };
    setLocalConfig({ ...localConfig, storyChapters: updatedChapters });
  };

  // Photo gallery helpers
  const handleAddPhoto = () => {
    const newPhoto: GalleryPhoto = {
      id: `photo-${Date.now()}`,
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      caption: "A new sweet wedding-themed memory frame."
    };
    const photos = localConfig.galleryPhotos || [];
    setLocalConfig({ ...localConfig, galleryPhotos: [...photos, newPhoto] });
  };

  const handleDeletePhoto = (id: string) => {
    const photos = localConfig.galleryPhotos || [];
    setLocalConfig({ ...localConfig, galleryPhotos: photos.filter(p => p.id !== id) });
  };

  const handleUpdatePhoto = (id: string, key: "url" | "caption", value: string) => {
    const photos = localConfig.galleryPhotos || [];
    setLocalConfig({
      ...localConfig,
      galleryPhotos: photos.map(p => p.id === id ? { ...p, [key]: value } : p)
    });
  };

  if (!isOpen) return null;

  return (
    <div id="admin-panel-overlay" className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/40 backdrop-blur-md flex items-center justify-center p-4">
      
      {/* Outer Card */}
      <div className="bg-cream border border-taupe rounded-3xl w-full max-w-5xl shadow-[0_30px_70px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col md:flex-row min-h-[80vh] max-h-[92vh]">
        
        {/* SIDE BAR / NAV BAR */}
        <div className="w-full md:w-64 bg-charcoal text-parchment p-6 flex flex-col justify-between border-r border-taupe/10">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-2.5 h-2.5 rounded-full bg-gold" />
              <span className="font-serif text-sm tracking-[0.2em] uppercase font-bold text-white">Couples Studio</span>
            </div>

            <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-4">Management Workspace</p>
            
            {isAuthenticated ? (
              <div className="space-y-1.5 font-sans text-xs">
                <button 
                  onClick={() => setActiveTab("general")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg flex items-center gap-2.5 transition-all cursor-pointer ${activeTab === "general" ? "bg-white/10 text-white font-semibold" : "text-stone-400 hover:text-white"}`}
                >
                  <Settings className="w-4 h-4 text-gold" />
                  <span>General Settings</span>
                </button>
                <button 
                  onClick={() => setActiveTab("story")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg flex items-center gap-2.5 transition-all cursor-pointer ${activeTab === "story" ? "bg-white/10 text-white font-semibold" : "text-stone-400 hover:text-white"}`}
                >
                  <BookOpen className="w-4 h-4 text-gold" />
                  <span>Our Story Chapters</span>
                </button>
                <button 
                  onClick={() => setActiveTab("travel")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg flex items-center gap-2.5 transition-all cursor-pointer ${activeTab === "travel" ? "bg-white/10 text-white font-semibold" : "text-stone-400 hover:text-white"}`}
                >
                  <Compass className="w-4 h-4 text-gold" />
                  <span>Travel Logistics</span>
                </button>
                <button 
                  onClick={() => setActiveTab("dresscode")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg flex items-center gap-2.5 transition-all cursor-pointer ${activeTab === "dresscode" ? "bg-white/10 text-white font-semibold" : "text-stone-400 hover:text-white"}`}
                >
                  <Shirt className="w-4 h-4 text-gold" />
                  <span>Dress Code Palette</span>
                </button>
                <button 
                  onClick={() => setActiveTab("rsvps_blessings")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg flex items-center gap-2.5 transition-all cursor-pointer ${activeTab === "rsvps_blessings" ? "bg-white/10 text-white font-semibold" : "text-stone-400 hover:text-white"}`}
                >
                  <Users className="w-4 h-4 text-rose" />
                  <span>RSVPs &amp; Guestbook</span>
                  {(rsvps.length > 0 || blessings.length > 0) && (
                    <span className="ml-auto bg-rose text-white text-[9px] px-1.5 py-0.2 rounded-full font-bold">
                      {rsvps.length + blessings.length}
                    </span>
                  )}
                </button>
                <button 
                  onClick={() => setActiveTab("playlist")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg flex items-center gap-2.5 transition-all cursor-pointer ${activeTab === "playlist" ? "bg-white/10 text-white font-semibold" : "text-stone-400 hover:text-white"}`}
                >
                  <Music className="w-4 h-4 text-sage" />
                  <span>Dance Playlist</span>
                </button>
                <button 
                  onClick={() => setActiveTab("gallery")}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg flex items-center gap-2.5 transition-all cursor-pointer ${activeTab === "gallery" ? "bg-white/10 text-white font-semibold" : "text-stone-400 hover:text-white"}`}
                >
                  <Camera className="w-4 h-4 text-gold" />
                  <span>Gallery Collection</span>
                </button>
              </div>
            ) : (
              <div className="bg-white/5 border border-white/15 p-4 rounded-xl text-[11px] text-stone-400 space-y-2 leading-relaxed font-sans">
                <p className="font-semibold text-white">🔒 Workspace Locked</p>
                <p>Please log in using the credential portal to live edit text fields, change countdown parameters, and monitor your guest lists.</p>
              </div>
            )}
          </div>

          <div className="space-y-3 font-sans text-xs mt-8">
            {isAuthenticated && (
              <button 
                onClick={() => setIsAuthenticated(false)}
                className="w-full py-2 border border-white/20 text-stone-400 hover:text-white hover:border-white/40 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Lock Dashboard</span>
              </button>
            )}

            <button 
              onClick={onClose}
              className="w-full py-2 bg-gold hover:bg-gold-dark text-charcoal font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Back to Invitation</span>
            </button>
          </div>
        </div>

        {/* WORKSPACE CONTENT AREA */}
        <div className="flex-1 p-6 md:p-10 overflow-y-auto flex flex-col justify-between">
          
          {/* LOGIN GATE GUEST SCREEN */}
          {!isAuthenticated ? (
            <div className="flex-1 flex flex-col justify-center items-center max-w-md mx-auto w-full py-12">
              <div className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center text-gold mb-4 border border-gold/20">
                <Key className="w-5 h-5 animate-pulse" />
              </div>
              <h2 className="font-serif text-3xl font-light text-charcoal text-center mb-1">Wedding Atelier Gate</h2>
              <p className="font-serif italic text-xs text-stone-500 text-center mb-8">
                Authorized credentials for Madame or Monsieur to edit website content in real-time.
              </p>

              <form onSubmit={handleLogin} className="w-full space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-1.5">Username</label>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter 'admin'"
                    className="w-full bg-white border border-taupe rounded-xl px-4 py-2.5 font-sans text-xs focus:ring-1 focus:ring-gold focus:border-gold outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-1.5">Passcode</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter 'provence2026' or 'clara&charles'"
                    className="w-full bg-white border border-taupe rounded-xl px-4 py-2.5 font-sans text-xs focus:ring-1 focus:ring-gold focus:border-gold outline-none"
                    required
                  />
                </div>

                {loginError && (
                  <p className="text-xs text-rose font-medium text-center animate-shake">{loginError}</p>
                )}

                <button 
                  type="submit" 
                  className="w-full py-3 bg-charcoal text-white hover:bg-black rounded-xl font-sans uppercase font-bold text-[10px] tracking-widest transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Key className="w-3.5 h-3.5 text-gold" />
                  <span>Verify Passcode &amp; Open</span>
                </button>
              </form>

              {/* Secure Hints box for client confidence */}
              <div className="mt-8 bg-parchment p-4 rounded-xl border border-taupe/60 w-full text-[11px] font-sans text-stone-500 space-y-1.5">
                <p className="font-semibold text-charcoal">Demo Authorized Keys:</p>
                <p>• Fast Passcode: <code className="bg-white px-1.5 py-0.5 rounded border border-taupe text-charcoal font-bold">provence2026</code></p>
                <p>• Or Username: <code className="bg-white px-1.5 py-0.5 rounded border border-taupe text-charcoal font-bold">admin</code> / Password: <code className="bg-white px-1.5 py-0.5 rounded border border-taupe text-charcoal font-bold">clara&amp;charles</code></p>
              </div>

            </div>
          ) : (
            
            // AUTHENTICATED PANEL
            <div className="flex-1 flex flex-col h-full">
              
              {/* Top Row Status bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-taupe pb-4 mb-6 gap-3">
                <div>
                  <span className="text-[10px] tracking-[0.25em] text-gold uppercase font-bold font-sans">Active Atelier Config</span>
                  <h3 className="font-serif text-2xl font-light text-charcoal">
                    {activeTab === "general" && "General & Metadata Setup"}
                    {activeTab === "story" && "Story Chapter Chronologies"}
                    {activeTab === "travel" && "Travel & Accommodations Director"}
                    {activeTab === "dresscode" && "Dress Code & Swatch Designer"}
                    {activeTab === "rsvps_blessings" && "Guests RSVP Logs & Moderator"}
                    {activeTab === "playlist" && "Ballroom Dancefloor Votes"}
                    {activeTab === "gallery" && "Wedding Photo Gallery Manager"}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button 
                    onClick={onResetToDefault}
                    className="px-3.5 py-1.5 border border-taupe text-[10px] tracking-wider uppercase font-bold text-stone-500 hover:text-charcoal rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Revert everything back to Madame Clara and Monsieur Charles default values"
                  >
                    <Undo className="w-3 h-3 text-gold" />
                    <span>Revert to Defaults</span>
                  </button>

                  <button 
                    onClick={handleSave}
                    className="px-4 py-1.5 bg-charcoal text-white hover:bg-black text-[10px] tracking-wider uppercase font-bold rounded-lg flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <Save className="w-3 h-3 text-gold" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>

              {/* Save feedback indicator */}
              <AnimatePresence>
                {saveSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-sage/10 text-sage-light border border-sage/30 p-3 rounded-xl mb-6 text-xs flex items-center gap-2 font-serif italic text-stone-700"
                  >
                    <CheckCircle className="w-4 h-4 text-sage text-emerald-600" />
                    <span>Atelier invitation settings successfully modified! Refresh or close dashboard to view live results in the beautiful Editorial layout.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* TABS INTERFACE */}
              <div className="flex-1">
                
                {/* 1. GENERAL METADATA TAB */}
                {activeTab === "general" && (
                  <div className="space-y-5 max-w-3xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-1">Madame's Name (Bride)</label>
                        <input 
                          type="text" 
                          value={localConfig.brideName}
                          onChange={(e) => setLocalConfig({ ...localConfig, brideName: e.target.value })}
                          className="w-full bg-white border border-taupe rounded-xl px-4 py-2 font-serif text-sm focus:ring-1 focus:ring-gold outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-1">Monsieur's Name (Groom)</label>
                        <input 
                          type="text" 
                          value={localConfig.groomName}
                          onChange={(e) => setLocalConfig({ ...localConfig, groomName: e.target.value })}
                          className="w-full bg-white border border-taupe rounded-xl px-4 py-2 font-serif text-sm focus:ring-1 focus:ring-gold outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-1">Countdown Wedding Date (GMT format)</label>
                        <input 
                          type="text" 
                          value={localConfig.weddingDateStr}
                          onChange={(e) => setLocalConfig({ ...localConfig, weddingDateStr: e.target.value })}
                          placeholder="e.g. 2026-09-19T15:00:00+02:00"
                          className="w-full bg-white border border-taupe rounded-xl px-4 py-2 font-mono text-xs focus:ring-1 focus:ring-gold outline-none"
                        />
                        <span className="text-[10px] text-stone-400 font-sans mt-0.5 block">Used for the real-time ticking chronograph layout.</span>
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-1">婚礼 Date Readable</label>
                        <input 
                          type="text" 
                          value={localConfig.weddingDateReadable}
                          onChange={(e) => setLocalConfig({ ...localConfig, weddingDateReadable: e.target.value })}
                          placeholder="e.g. September 19th, 2026"
                          className="w-full bg-white border border-taupe rounded-xl px-4 py-2 font-serif text-sm focus:ring-1 focus:ring-gold outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-1">Venue Castle Name</label>
                        <input 
                          type="text" 
                          value={localConfig.venueName}
                          onChange={(e) => setLocalConfig({ ...localConfig, venueName: e.target.value })}
                          className="w-full bg-white border border-taupe rounded-xl px-4 py-2 font-serif text-sm focus:ring-1 focus:ring-gold outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-1">Venue Town/Country</label>
                        <input 
                          type="text" 
                          value={localConfig.venueLocation}
                          onChange={(e) => setLocalConfig({ ...localConfig, venueLocation: e.target.value })}
                          className="w-full bg-white border border-taupe rounded-xl px-4 py-2 font-serif text-sm focus:ring-1 focus:ring-gold outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-1">French Editorial Quote</label>
                      <input 
                        type="text" 
                        value={localConfig.editorialQuote}
                        onChange={(e) => setLocalConfig({ ...localConfig, editorialQuote: e.target.value })}
                        className="w-full bg-white border border-taupe rounded-xl px-4 py-2 font-serif italic text-sm focus:ring-1 focus:ring-gold outline-none"
                      />
                    </div>

                    <p className="bg-parchment p-3.5 border border-taupe/50 text-[11px] font-sans text-stone-500 italic rounded-xl flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-gold shrink-0" />
                      <span>Note: These values immediately populate your hero banner typography. Choose names gracefully.</span>
                    </p>
                  </div>
                )}

                {/* 2. STORY CHAPTER CHRONOLOGIES TAB */}
                {activeTab === "story" && (
                  <div className="space-y-6 max-w-3xl">
                    <p className="text-[11px] font-sans text-stone-500 mb-2">We weave our story in three chronological chapters. Modify headers, timeframes, titles and transcripts:</p>
                    {localConfig.storyChapters.map((chap, idx) => (
                      <div key={chap.id} className="bg-white p-5 rounded-2xl border border-taupe flex flex-col gap-3">
                        <span className="text-[10px] font-sans tracking-widest text-gold uppercase font-bold">Chapter {idx + 1}</span>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] uppercase tracking-widest text-stone-400 font-sans font-bold mb-0.5">Chapter Title</label>
                            <input 
                              type="text" 
                              value={chap.title}
                              onChange={(e) => updateStory(idx, "title", e.target.value)}
                              className="w-full bg-cream border border-taupe/80 rounded-lg px-3 py-1.5 font-serif text-xs focus:ring-1 focus:ring-gold outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase tracking-widest text-stone-400 font-sans font-bold mb-0.5">Period Label / Season</label>
                            <input 
                              type="text" 
                              value={chap.period}
                              onChange={(e) => updateStory(idx, "period", e.target.value)}
                              className="w-full bg-cream border border-taupe/80 rounded-lg px-3 py-1.5 font-sans text-xs focus:ring-1 focus:ring-gold outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-stone-400 font-sans font-bold mb-0.5">Lyrical Subtitle</label>
                          <input 
                            type="text" 
                            value={chap.subtitle}
                            onChange={(e) => updateStory(idx, "subtitle", e.target.value)}
                            className="w-full bg-cream border border-taupe/80 rounded-lg px-3 py-1.5 font-serif text-xs focus:ring-1 focus:ring-gold outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-stone-400 font-sans font-bold mb-0.5">The Chronicle Text</label>
                          <textarea 
                            value={chap.content}
                            onChange={(e) => updateStory(idx, "content", e.target.value)}
                            rows={3}
                            className="w-full bg-cream border border-taupe/80 rounded-lg p-3 font-serif text-xs leading-relaxed focus:ring-1 focus:ring-gold outline-none resize-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 3. TRAVEL LOGISTICS TAB */}
                {activeTab === "travel" && (
                  <div className="space-y-5 max-w-3xl">
                    <p className="text-[11px] font-sans text-stone-500 mb-2">Give guests accurate airport transfers, hotel numbers, and beautiful localized sight advice for Provence:</p>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-1">Transit &amp; Flight Connections</label>
                        <textarea 
                          value={localConfig.travelFlights}
                          onChange={(e) => setLocalConfig({ ...localConfig, travelFlights: e.target.value })}
                          rows={2}
                          className="w-full bg-white border border-taupe rounded-xl p-3 font-serif text-xs leading-relaxed focus:ring-1 focus:ring-gold outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-1">TGV Train Transfers</label>
                        <textarea 
                          value={localConfig.travelTrains}
                          onChange={(e) => setLocalConfig({ ...localConfig, travelTrains: e.target.value })}
                          rows={2}
                          className="w-full bg-white border border-taupe rounded-xl p-3 font-serif text-xs leading-relaxed focus:ring-1 focus:ring-gold outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-1">Reserved Boutique Stays &amp; Codes</label>
                        <textarea 
                          value={localConfig.travelStays}
                          onChange={(e) => setLocalConfig({ ...localConfig, travelStays: e.target.value })}
                          rows={3}
                          className="w-full bg-white border border-taupe rounded-xl p-3 font-serif text-xs leading-relaxed focus:ring-1 focus:ring-gold outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-1">Provençal Treasures (Sights &amp; Markets)</label>
                        <textarea 
                          value={localConfig.travelTreasures}
                          onChange={(e) => setLocalConfig({ ...localConfig, travelTreasures: e.target.value })}
                          rows={3}
                          className="w-full bg-white border border-taupe rounded-xl p-3 font-serif text-xs leading-relaxed focus:ring-1 focus:ring-gold outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. DRESS CODE & SWATCH DESIGNER */}
                {activeTab === "dresscode" && (
                  <div className="space-y-6 max-w-3xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-0.5">Dress Code Theme Title</label>
                        <input 
                          type="text" 
                          value={localConfig.dressCodeTitle}
                          onChange={(e) => setLocalConfig({ ...localConfig, dressCodeTitle: e.target.value })}
                          className="w-full bg-white border border-taupe rounded-xl px-4 py-2 font-serif text-sm focus:ring-1 focus:ring-gold outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-0.5">Theme Instructions Transcript</label>
                        <input 
                          type="text" 
                          value={localConfig.dressCodeDescription}
                          onChange={(e) => setLocalConfig({ ...localConfig, dressCodeDescription: e.target.value })}
                          className="w-full bg-white border border-taupe rounded-xl px-4 py-2 font-serif text-xs focus:ring-1 focus:ring-gold outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <span className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-3">Organic Swatches (Atelier Palette)</span>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {localConfig.dressCodeSwatches.map((sw, index) => (
                          <div key={index} className="bg-white p-4 rounded-xl border border-taupe flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-sans text-stone-400 font-bold uppercase">Swatch #{index + 1}</span>
                              <div className="w-5 h-5 rounded-full border border-taupe/60" style={{ backgroundColor: sw.colorHex }} />
                            </div>

                            <div>
                              <label className="block text-[9px] text-stone-400 font-sans uppercase">Hex Color code</label>
                              <input 
                                type="text"
                                value={sw.colorHex}
                                onChange={(e) => updateSwatch(index, "colorHex", e.target.value)}
                                className="w-full bg-cream border border-taupe/50 rounded px-2 py-0.5 font-mono text-[10px] text-stone-700 outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[9px] text-stone-400 font-sans uppercase">Swatch Label</label>
                              <input 
                                type="text"
                                value={sw.name}
                                onChange={(e) => updateSwatch(index, "name", e.target.value)}
                                className="w-full bg-cream border border-taupe/50 rounded px-2 py-0.5 font-serif text-xs text-charcoal outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[9px] text-stone-400 font-sans uppercase">Vibe Description</label>
                              <input 
                                type="text"
                                value={sw.description}
                                onChange={(e) => updateSwatch(index, "description", e.target.value)}
                                className="w-full bg-cream border border-taupe/50 rounded px-2 py-0.5 font-sans text-[10px] text-stone-500 outline-none"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. GUESTS RSVPS LOGS & MODERATOR */}
                {activeTab === "rsvps_blessings" && (
                  <div className="space-y-8">
                    
                    {/* RSVPs Logs Table */}
                    <div>
                      <div className="flex items-center justify-between mb-3 border-b border-taupe/40 pb-2">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-rose" />
                          <h4 className="font-serif text-lg font-medium text-charcoal">Registered RSVPs ({rsvps.length})</h4>
                        </div>
                        {rsvps.length > 0 && (
                          <span className="font-sans text-[10px] uppercase tracking-wider text-sage font-bold bg-[#EAFEEA] border border-green-200 px-2 py-1 rounded">
                            Total Expected Guests: {rsvps.reduce((acc, current) => acc + (current.attendance === "attending" ? current.guestsCount : 0), 0)}
                          </span>
                        )}
                      </div>

                      {rsvps.length === 0 ? (
                        <div className="bg-white p-6 rounded-2xl border border-dashed border-taupe/80 text-center text-xs text-stone-400 font-serif">
                          No guests have filled out the digital RSVP form yet in this browser. Perfect for testing!
                        </div>
                      ) : (
                        <div className="overflow-x-auto max-h-[30vh] border border-taupe/50 rounded-xl">
                          <table className="w-full text-left border-collapse font-sans text-[11px]">
                            <thead>
                              <tr className="bg-parchment border-b border-taupe text-stone-400 uppercase tracking-widest text-[9px] font-bold">
                                <th className="p-3">Guest Name</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Party Count</th>
                                <th className="p-3">Dietary Needs</th>
                                <th className="p-3 text-center">TGV Shuttle?</th>
                                <th className="p-3">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-taupe/30">
                              {rsvps.map((guest, idx) => (
                                <tr key={idx} className="hover:bg-parchment/30 text-stone-700 bg-white">
                                  <td className="p-3 font-semibold text-charcoal">
                                    {guest.name}
                                    <div className="text-[9px] text-stone-400 font-normal italic">{guest.email}</div>
                                  </td>
                                  <td className="p-3">
                                    <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] uppercase tracking-wider ${
                                      guest.attendance === "attending" ? "bg-emerald-100 text-emerald-800" :
                                      guest.attendance === "uncertain" ? "bg-amber-100 text-amber-800" : "bg-rose/15 text-rose"
                                    }`}>
                                      {guest.attendance}
                                    </span>
                                  </td>
                                  <td className="p-3 font-semibold">{guest.guestsCount} guests</td>
                                  <td className="p-3 max-w-[150px] truncate" title={guest.dietaryDetails || guest.dietary}>
                                    {guest.dietary === "none" ? "None" : `${guest.dietary} (${guest.dietaryDetails || "No notes"})`}
                                  </td>
                                  <td className="p-3 text-center font-bold">
                                    {guest.needsShuttle ? "✅ YES" : "❌ NO"}
                                  </td>
                                  <td className="p-3">
                                    <button 
                                      onClick={() => deleteRsvp(idx)}
                                      className="p-1 text-stone-400 hover:text-rose transition-colors cursor-pointer"
                                      title="Delete RSVP record"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>

                    {/* Blessings Guestbook Moderate Board */}
                    <div>
                      <div className="flex items-center gap-2 mb-3 border-b border-taupe/40 pb-2">
                        <BookOpen className="w-4 h-4 text-gold" />
                        <h4 className="font-serif text-lg font-medium text-charcoal">Guestbook Blessings ({blessings.length})</h4>
                      </div>

                      {blessings.length === 0 ? (
                        <div className="bg-white p-6 rounded-2xl border border-dashed border-taupe/80 text-center text-xs text-stone-400 font-serif">
                          No messages have been posted to the guestbook board yet.
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[35vh] overflow-y-auto pr-2">
                          {blessings.map((b) => (
                            <div key={b.id} className="bg-white p-4 rounded-xl border border-taupe flex justify-between items-start">
                              <div className="space-y-1">
                                <span className={`inline-block text-[8px] uppercase tracking-widest font-bold px-1.5 py-0.2 rounded border ${
                                  b.stampType === "botanical" ? "bg-sage-light text-stone-600 border-sage/40" :
                                  b.stampType === "gold_ring" ? "bg-gold/10 text-gold-dark border-gold/40" :
                                  b.stampType === "wax_seal" ? "bg-rose/10 text-rose border-rose/30" : "bg-stone-100 text-stone-500"
                                }`}>
                                  {b.stampType} stamp
                                </span>
                                <h5 className="font-serif font-bold text-xs text-charcoal">{b.name}</h5>
                                <p className="font-serif italic text-xs leading-relaxed text-stone-500">"{b.message}"</p>
                              </div>

                              <button 
                                onClick={() => deleteBlessing(b.id)}
                                className="p-1 px-2 text-stone-400 hover:text-rose transition-colors hover:bg-rose/5 rounded cursor-pointer shrink-0"
                                title="Delete Blessing message"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Danger Area clear registries */}
                    <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs text-amber-950 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div>
                        <p className="font-bold">⚠️ Localized Testing Hub</p>
                        <p className="text-amber-800">Clear or restart guest answers anytime to prepare for a pristine demo.</p>
                      </div>
                      <button 
                        onClick={resetAllDataStats}
                        className="p-2 bg-amber-600 text-white font-semibold hover:bg-amber-700 rounded-lg text-[10px] tracking-widest uppercase cursor-pointer transition-colors"
                      >
                        Reset RSVPs &amp; Blessings
                      </button>
                    </div>

                  </div>
                )}

                {/* 6. DANCE PLAYLIST TAB */}
                {activeTab === "playlist" && (
                  <div className="space-y-4 max-w-3xl">
                    <p className="text-[11px] font-sans text-stone-500">Guests RSVP and vote on dynamic ballroom request tracks. Check track listings and tally votes below:</p>
                    
                    {songRequests.length === 0 ? (
                      <div className="bg-white p-6 rounded-2xl border border-dashed border-taupe/80 text-center text-xs text-[#c8968e] font-serif">
                        No songs voted on or added in this session. Go to "Playlist" section on the main webpage to vote!
                      </div>
                    ) : (
                      <div className="bg-white rounded-xl border border-taupe divide-y divide-taupe/40 overflow-hidden shadow-xs">
                        {songRequests.map((song) => (
                          <div key={song.id} className="p-4 flex items-center justify-between hover:bg-parchment/30">
                            <div>
                              <p className="font-serif text-sm font-semibold text-charcoal">{song.title}</p>
                              <p className="font-sans text-[10px] text-stone-400 uppercase tracking-wider">{song.artist}</p>
                            </div>
                            <div className="bg-[#fcfaf4] border border-gold/35 px-4 py-1.5 rounded-full text-xs font-serif text-gold-dark font-bold">
                              {song.votes} love votes
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 7. WEDDING PHOTO GALLERY TAB */}
                {activeTab === "gallery" && (
                  <div className="space-y-6 max-w-3xl animate-fade-in">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-taupe/30 pb-4">
                      <div>
                        <p className="text-[11px] font-sans text-stone-500">
                          Curate your beautiful memory wall. Submit high-res image links or photo CDN paths with romantic footnotes:
                        </p>
                      </div>
                      <button
                        onClick={handleAddPhoto}
                        className="px-3.5 py-2 bg-charcoal hover:bg-black text-[10px] tracking-wider uppercase font-bold text-white rounded-lg flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                      >
                        <Plus className="w-3.5 h-3.5 text-gold" />
                        <span>Add Snapshot Frame</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[44vh] overflow-y-auto pr-2">
                      {(localConfig.galleryPhotos || []).map((photo, index) => (
                        <div key={photo.id} className="bg-white p-4 rounded-xl border border-taupe flex flex-col justify-between gap-3 shadow-2xs hover:shadow-xs transition-shadow">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-sans text-stone-400 font-bold uppercase tracking-wider">Photo Frame #{index + 1}</span>
                            <button
                              onClick={() => handleDeletePhoto(photo.id)}
                              className="p-1 px-1.5 text-stone-450 hover:text-rose hover:bg-rose/5 rounded font-sans text-[10px] flex items-center gap-1 transition-colors cursor-pointer"
                              title="Remove photo from collection"
                            >
                              <Trash2 className="w-3 h-3 text-rose/85" />
                              <span>Remove</span>
                            </button>
                          </div>

                          <div className="flex gap-3">
                            <div className="w-20 h-20 rounded-lg border border-taupe bg-stone-100 overflow-hidden shrink-0 shadow-inner relative group">
                              <img
                                src={photo.url}
                                alt=""
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                onError={(e) => {
                                  e.currentTarget.src = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=150&q=80";
                                }}
                              />
                            </div>

                            <div className="flex-1 space-y-2 min-w-0">
                              <div>
                                <label className="block text-[8px] text-stone-400 font-sans uppercase font-bold tracking-wider mb-0.5">Image Location URL</label>
                                <input
                                  type="text"
                                  value={photo.url}
                                  onChange={(e) => handleUpdatePhoto(photo.id, "url", e.target.value)}
                                  placeholder="https://images.unsplash.com/photo-..."
                                  className="w-full bg-cream border border-taupe/50 rounded px-2 py-1 font-mono text-[9px] text-stone-700 outline-none focus:ring-1 focus:ring-gold"
                                />
                              </div>

                              <div>
                                <label className="block text-[8px] text-stone-400 font-sans uppercase font-bold tracking-wider mb-0.5">Story / Romantic Caption</label>
                                <input
                                  type="text"
                                  value={photo.caption}
                                  onChange={(e) => handleUpdatePhoto(photo.id, "caption", e.target.value)}
                                  placeholder="A quiet moment captured in sweet light..."
                                  className="w-full bg-cream border border-taupe/50 rounded px-2 py-1 font-serif text-xs text-charcoal outline-none focus:ring-1 focus:ring-gold truncate"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {(!localConfig.galleryPhotos || localConfig.galleryPhotos.length === 0) && (
                        <div className="col-span-1 md:col-span-2 bg-white/75 p-12 rounded-2xl border border-dashed border-taupe/80 text-center text-xs text-stone-400 font-serif">
                          No memory frames currently registered. Seed some moments using the snapshot helper at the top.
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

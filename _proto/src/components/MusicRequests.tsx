import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PlayCircle, Heart, PlusCircle, Volume2, Sparkles, Disc } from "lucide-react";

interface RequestTrack {
  id: string;
  title: string;
  artist: string;
  votes: number;
  requestedBy: string;
  isCustom?: boolean;
}

const seedTracks: RequestTrack[] = [
  {
    id: "track-1",
    title: "September",
    artist: "Earth, Wind & Fire",
    votes: 18,
    requestedBy: "Cousin Amélie"
  },
  {
    id: "track-2",
    title: "La Vie En Rose",
    artist: "Édith Piaf",
    votes: 14,
    requestedBy: "Grandmother Eleanor"
  },
  {
    id: "track-3",
    title: "Fly Me To The Moon",
    artist: "Frank Sinatra",
    votes: 11,
    requestedBy: "Arthur (Groom)"
  },
  {
    id: "track-4",
    title: "L-O-V-E",
    artist: "Nat King Cole",
    votes: 9,
    requestedBy: "Beatrice (Bride)"
  }
];

export default function MusicRequests() {
  const [tracks, setTracks] = useState<RequestTrack[]>([]);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [voterName, setVoterName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [votedSet, setVotedSet] = useState<Set<string>>(new Set());
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("wedding_music_tracks");
      if (saved) {
        setTracks(JSON.parse(saved));
      } else {
        localStorage.setItem("wedding_music_tracks", JSON.stringify(seedTracks));
        setTracks(seedTracks);
      }
    } catch (e) {
      setTracks(seedTracks);
    }

    // Attempt to load upvoted tracker
    try {
      const voted = localStorage.getItem("wedding_voted_tracks");
      if (voted) {
        setVotedSet(new Set(JSON.parse(voted)));
      }
    } catch (e) {}
  }, []);

  // Listen to RSVP submissions, if they enter a song requested, add to the requested playlist!
  useEffect(() => {
    const handleRSVPSong = (e: any) => {
      const data = e.detail;
      if (data && data.songRequests && data.songRequests.trim()) {
        const query = data.songRequests.trim();
        // Parse Title - Artist or similar
        let songTitle = query;
        let songArtist = "Request Pool";
        if (query.includes("-")) {
          const parts = query.split("-");
          songTitle = parts[0].trim();
          songArtist = parts[1].trim();
        }

        // Add dynamically
        const newTrack: RequestTrack = {
          id: "track-rsvp-" + Date.now(),
          title: songTitle,
          artist: songArtist,
          votes: 1,
          requestedBy: data.name
        };

        setTracks((prev) => {
          if (prev.some((t) => t.title.toLowerCase() === songTitle.toLowerCase())) {
            return prev; // already exists
          }
          const updated = [...prev, newTrack];
          localStorage.setItem("wedding_music_tracks", JSON.stringify(updated));
          return updated;
        });
      }
    };

    window.addEventListener("rsvp-updated", handleRSVPSong);
    return () => window.removeEventListener("rsvp-updated", handleRSVPSong);
  }, []);

  const handleAddTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback("");

    if (!title.trim() || !artist.trim()) {
      setFeedback("Please supply both Song Title & Artist.");
      return;
    }

    setIsSubmitting(true);

    const newTrack: RequestTrack = {
      id: "track-custom-" + Date.now(),
      title: title.trim(),
      artist: artist.trim(),
      votes: 1,
      requestedBy: voterName.trim() || "Guest Request",
      isCustom: true
    };

    setTimeout(() => {
      setTracks((prev) => {
        const updated = [...prev, newTrack].sort((a, b) => b.votes - a.votes);
        localStorage.setItem("wedding_music_tracks", JSON.stringify(updated));
        return updated;
      });

      setTitle("");
      setArtist("");
      setVoterName("");
      setIsSubmitting(false);
      setFeedback("Song entered successfully inside the ball listing!");
    }, 800);
  };

  const handleVoteTrack = (trackId: string) => {
    if (votedSet.has(trackId)) {
      // Unvote
      const newVoted = new Set(votedSet);
      newVoted.delete(trackId);
      setVotedSet(newVoted);
      localStorage.setItem("wedding_voted_tracks", JSON.stringify(Array.from(newVoted)));

      setTracks((prev) => {
        const updated = prev.map((t) => (t.id === trackId ? { ...t, votes: t.votes - 1 } : t)).sort((a, b) => b.votes - a.votes);
        localStorage.setItem("wedding_music_tracks", JSON.stringify(updated));
        return updated;
      });
    } else {
      // Upvote
      const newVoted = new Set(votedSet);
      newVoted.add(trackId);
      setVotedSet(newVoted);
      localStorage.setItem("wedding_voted_tracks", JSON.stringify(Array.from(newVoted)));

      setTracks((prev) => {
        const updated = prev.map((t) => (t.id === trackId ? { ...t, votes: t.votes + 1 } : t)).sort((a, b) => b.votes - a.votes);
        localStorage.setItem("wedding_music_tracks", JSON.stringify(updated));
        return updated;
      });
    }
  };

  return (
    <section id="ballplay-section" className="relative py-24 px-6 md:px-12 bg-parchment text-charcoal border-t border-taupe/45 overflow-hidden">
      
      {/* Vinyl record silhouette backdrop */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 opacity-5 pointer-events-none text-charcoal">
        <Disc className="w-full h-full animate-slow-spin" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Title Heading */}
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.3em] text-xs font-sans font-medium block mb-2">Dancefloor Harmony</span>
          <h2 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-charcoal">The Ballroom Ball Playlist</h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mt-4 mb-2" />
          <p className="font-serif italic text-sm text-stone-500 max-w-md mx-auto">
            Suggest your absolute favorite party track or upvote classic standards so our live jazz orchestra and DJ can map the night's rhythm.
          </p>
        </div>

        {/* Music dual column layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Form Side (Columns 1-5) */}
          <div className="md:col-span-5 bg-cream p-6 rounded-xl border border-gold/15 shadow-xs flex flex-col gap-4">
            <div className="flex items-center gap-2 text-gold font-serif">
              <PlayCircle className="w-5 h-5 text-gold-dark" />
              <h3 className="font-serif text-lg font-light tracking-wide text-charcoal">Suggest a Melody</h3>
            </div>

            <form onSubmit={handleAddTrack} className="flex flex-col gap-3">
              {/* Song Title */}
              <div className="flex flex-col gap-1">
                <label htmlFor="music-title" className="text-[9px] text-stone-400 font-sans uppercase tracking-widest font-semibold">Track Song Title</label>
                <input
                  id="music-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Lotte In Love"
                  className="bg-parchment text-charcoal text-xs border border-taupe rounded-lg px-3 py-2.5"
                  maxLength={50}
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Artist Name */}
              <div className="flex flex-col gap-1">
                <label htmlFor="music-artist" className="text-[9px] text-stone-400 font-sans uppercase tracking-widest font-semibold">Band / Artist Name</label>
                <input
                  id="music-artist"
                  type="text"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  placeholder="Ex: Nat King Cole"
                  className="bg-parchment text-charcoal text-xs border border-taupe rounded-lg px-3 py-2.5"
                  maxLength={50}
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Your Name */}
              <div className="flex flex-col gap-1">
                <label htmlFor="music-voter" className="text-[9px] text-stone-400 font-sans uppercase tracking-widest font-semibold">Your Initials / Name</label>
                <input
                  id="music-voter"
                  type="text"
                  value={voterName}
                  onChange={(e) => setVoterName(e.target.value)}
                  placeholder="Ex: Emma (Bridesmaid)"
                  className="bg-parchment text-charcoal text-xs border border-taupe rounded-lg px-3 py-2.5"
                  maxLength={30}
                  disabled={isSubmitting}
                />
              </div>

              {/* Status Feedback */}
              {feedback && (
                <p className="text-[10px] text-teal-800 bg-teal-50 border border-teal-100 p-2.5 rounded-lg text-center font-serif leading-relaxed italic">
                  {feedback}
                </p>
              )}

              {/* Add Track Button */}
              <button
                id="submit-music"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 mt-2 bg-neutral-900 border border-neutral-800 text-cream text-[10px] tracking-widest font-sans font-semibold uppercase rounded-lg shadow hover:bg-stone-800 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5 text-gold-dark" />
                <span>{isSubmitting ? "TRANSMITTING..." : "ADD Melodic REQUEST"}</span>
              </button>
            </form>
          </div>

          {/* Leaderboard Tracks List Side (Columns 6-12) */}
          <div className="md:col-span-12 lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-gold/15 pb-2">
              <h3 className="font-serif text-lg font-light text-stone-800 tracking-wide flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-rose animate-pulse" />
                <span>Voted Request Queue</span>
              </h3>
              <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">
                REALTIME ACCENTS
              </span>
            </div>

            {/* List with Motion Layout */}
            <div className="flex flex-col gap-3 max-h-[420px] overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
                {tracks.map((track) => {
                  const hasVoted = votedSet.has(track.id);
                  return (
                    <motion.div
                      layout
                      key={track.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="bg-cream/60 p-4 rounded-xl border border-taupe/50 flex justify-between items-center gap-4 hover:bg-cream hover:border-gold/20 shadow-xs transition-colors select-none"
                    >
                      
                      {/* Track Meta Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif text-[15px] font-semibold text-charcoal truncate">
                            {track.title}
                          </h4>
                          {track.isCustom && (
                            <span className="text-[8px] bg-gold/15 text-gold border border-gold/20 px-1.5 py-0.5 rounded font-sans tracking-widest uppercase">
                              GUEST
                            </span>
                          )}
                        </div>
                        <p className="font-serif text-[12px] text-stone-500 truncate mt-0.5">
                          by {track.artist}
                        </p>
                        <p className="font-serif text-[10px] italic text-stone-400 truncate mt-1">
                          Sought by {track.requestedBy}
                        </p>
                      </div>

                      {/* Vote Count and interact button */}
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-serif text-xs font-semibold text-stone-600">
                          {track.votes} votes
                        </span>
                        
                        <button
                          id={`vote-btn-${track.id}`}
                          onClick={() => handleVoteTrack(track.id)}
                          className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                            hasVoted
                              ? "bg-rose/10 border border-rose/30 text-rose scale-105"
                              : "bg-[#f5eedf]/40 border border-taupe/40 text-gold hover:bg-[#f5eedf]/80"
                          }`}
                          title={hasVoted ? "Remove love vote" : "Love upvote track"}
                        >
                          <Heart className={`w-4 h-4 ${hasVoted ? "fill-rose" : ""}`} />
                        </button>
                      </div>

                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <div className="text-[10px] text-stone-400 font-serif italic text-center mt-3">
              * Ballroom live setlist accepts standard requests only. Hard rock and heavy metal will be directed to the late night cave session!
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

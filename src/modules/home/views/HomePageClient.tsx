'use client'

import { useState, useEffect } from 'react'
import { FiSettings } from 'react-icons/fi'
import { EnvelopeOpener } from './EnvelopeOpener'
import { AdminModal } from './AdminModal'
import { HeroSection } from './HeroSection'
import { StorySection } from './StorySection'
import { TimelineSection } from './TimelineSection'
import { TravelSection } from './TravelSection'
import { MusicSection } from './MusicSection'
import { SwatchBoard } from '@/modules/swatch/views/SwatchBoard'
import { GallerySection } from '@/modules/gallery/views/GallerySection'
import { RsvpPage } from '@/modules/rsvp/views/RsvpPage'
import { GuestbookPage } from '@/modules/guestbook/views/GuestbookPage'
import { AudioToggle } from '@/modules/audio/views/AudioToggle'
import { FloralDivider } from '@/components/FloralDivider'
import type { HomePageClientProps } from '../@types'
import type { TGuestbookEntry } from '@/modules/guestbook/@types'

export function HomePageClient({
  config,
  galleryPhotos,
  initialGuestbookEntries,
  initialMusicTracks,
  initialTimelineEvents,
}: HomePageClientProps) {
  const [isOpened, setIsOpened] = useState(false)
  const [guestName, setGuestName] = useState('')
  const [isAdminOpen, setIsAdminOpen] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  const groomShort = config.groomName.replace('Monsieur ', '')
  const brideShort = config.brideName.replace('Madame ', '')
  const groomInitial = groomShort.charAt(0)
  const brideInitial = brideShort.charAt(0)

  useEffect(() => {
    const opened = localStorage.getItem('wedding_envelope_opened_v1') === 'true'
    if (opened) {
      setIsOpened(true)
      const storedName = localStorage.getItem('wedding_guest_name') || ''
      setGuestName(storedName)
    }
    setHasMounted(true)
  }, [])

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  function handleOpen(name: string) {
    setGuestName(name)
    setIsOpened(true)
    localStorage.setItem('wedding_envelope_opened_v1', 'true')
    localStorage.setItem('wedding_guest_name', name)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const mappedGuestbookEntries: TGuestbookEntry[] = initialGuestbookEntries.map(e => ({
    id: e.id,
    name: e.name,
    message: e.message,
    stampType: e.stampType,
    isApproved: e.isApproved,
    createdAt: e.createdAt,
  }))

  if (!hasMounted) {
    return (
      <div className="min-h-screen bg-cream text-charcoal font-serif selection:bg-gold/30 selection:text-charcoal paper-texture flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border border-gold/40 border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream text-charcoal font-serif selection:bg-gold/30 selection:text-charcoal paper-texture">
      {!isOpened && (
        <div className={`fixed inset-0 z-50 pointer-events-auto`}>
          <EnvelopeOpener
            groomName={config.groomName}
            brideName={config.brideName}
            weddingDateReadable={config.weddingDateReadable}
            venueName={config.venueName}
            venueLocation={config.venueLocation}
            onOpen={handleOpen}
          />
        </div>
      )}

      {isOpened && (
        <div className="animate-screen-reveal relative flex flex-col min-h-screen overflow-hidden">
          <header className="sticky top-0 z-40 bg-cream/80 backdrop-blur-md border-b border-taupe/40 px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-1.5 cursor-pointer"
            >
              <span className="font-serif text-sm font-semibold tracking-widest text-charcoal">
                {groomInitial} &amp; {brideInitial}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="handwriting text-base text-gold italic">monogram</span>
            </button>

            <nav className="hidden lg:flex items-center gap-8 text-[11px] font-sans tracking-[0.2em] uppercase font-medium">
              <button onClick={() => scrollTo('our-story-section')} className="hover:text-gold cursor-pointer transition-colors">Notre Histoire</button>
              <button onClick={() => scrollTo('schedule-timeline-section')} className="hover:text-gold cursor-pointer transition-colors">Le Programme</button>
              <button onClick={() => scrollTo('dresscode-section')} className="hover:text-gold cursor-pointer transition-colors">Code Couleur</button>
              <button onClick={() => scrollTo('travel-guide-section')} className="hover:text-gold cursor-pointer transition-colors">Guide Provence</button>
              <button onClick={() => scrollTo('rsvp-section')} className="hover:text-gold cursor-pointer transition-colors font-semibold text-rose">Répondre (RSVP)</button>
              <button onClick={() => scrollTo('guestbook-section')} className="hover:text-gold cursor-pointer transition-colors">Livre d'Or</button>
              <button onClick={() => scrollTo('ballplay-section')} className="hover:text-gold cursor-pointer transition-colors">Playlist</button>
            </nav>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsAdminOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-parchment border border-taupe/60 hover:border-gold/60 text-charcoal text-xs rounded-lg transition-all cursor-pointer"
              >
                <FiSettings className="w-3.5 h-3.5 text-gold-dark" />
                <span className="font-sans uppercase text-[9px] tracking-widest">Atelier Admin</span>
              </button>
              <AudioToggle />
            </div>
          </header>

          <HeroSection
            config={config}
            guestName={guestName}
            onScrollToStory={() => scrollTo('our-story-section')}
          />

          <FloralDivider className="bg-cream" />

          <StorySection chapters={config.storyChapters} />

          <TimelineSection events={initialTimelineEvents} />

          <FloralDivider className="bg-parchment" />

          <SwatchBoard
            title={config.dressCodeTitle}
            description={config.dressCodeDescription}
            swatches={config.dressCodeSwatches}
          />

          <GallerySection photos={galleryPhotos} />

          <TravelSection config={config} />

          <FloralDivider className="bg-cream" />

          <RsvpPage />

          <GuestbookPage initialEntries={mappedGuestbookEntries} />

          <MusicSection initialTracks={initialMusicTracks} />

          <footer className="bg-cream pt-16 pb-12 px-6 border-t border-taupe/40 text-center text-charcoal select-none">
            <div className="text-gold/40 w-12 h-12 mx-auto mb-4">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="50" cy="50" r="30" />
                <path d="M50,20 Q60,35 70,50 Q60,65 50,80 Q40,65 30,50 Q40,35 50,20 Z" />
              </svg>
            </div>

            <h3 className="font-serif text-xl font-light text-charcoal tracking-wider">
              {brideShort }{' '}
              <span className="handwriting text-gold text-2xl lowercase">&amp;</span>{' '}
              {groomShort}
            </h3>
            <div className="text-[10px] text-stone-400 font-sans tracking-[0.2em] uppercase mt-2">
              {config.venueName}, {config.venueLocation} &bull; {config.weddingDateReadable}
            </div>

            <FloralDivider className="my-2" opacity={0.6} />

            <p className="text-[11px] text-stone-400 font-serif italic">
              Créé avec amour pour {brideShort} &amp; {groomShort}. Tous les RSVP sont sécurisés et privés.
            </p>
            <p className="text-[10px] text-stone-400/60 font-sans tracking-wide mt-2">
              &copy; {new Date().getFullYear()} {brideShort} &amp; {groomShort}. Tous droits réservés.
            </p>
          </footer>
          <AdminModal
            isOpen={isAdminOpen}
            onClose={() => setIsAdminOpen(false)}
            config={config}
          />
        </div>
      )}
    </div>
  )
}

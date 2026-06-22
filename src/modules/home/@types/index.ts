import type { StoryChapterRecord, DressCodeSwatchRecord } from '@/server/db/schema'

export interface TWeddingConfig {
  brideName: string
  groomName: string
  weddingDateStr: string
  weddingDateReadable: string
  venueName: string
  venueLocation: string
  editorialQuote: string
  travelFlights: string
  travelTrains: string
  travelStays: string
  travelTreasures: string
  dressCodeTitle: string
  dressCodeDescription: string
  storyChapters: StoryChapterRecord[]
  dressCodeSwatches: DressCodeSwatchRecord[]
}

export interface TMusicTrack {
  id: string
  title: string
  artist: string
  votes: number
  requestedBy: string
  isCurated: boolean
}

export interface TCountdown {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export interface HomePageClientProps {
  config: TWeddingConfig
  galleryPhotos: Array<{ id: string; url: string; caption: string }>
  initialGuestbookEntries: Array<{
    id: string
    name: string
    message: string
    stampType: 'botanical' | 'gold_ring' | 'wax_seal' | 'vintage_dove'
    isApproved: boolean
    createdAt: Date
  }>
  initialMusicTracks: TMusicTrack[]
}

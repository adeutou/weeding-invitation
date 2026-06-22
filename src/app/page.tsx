import { getWeddingConfig } from '@/server/db/queries/config'
import { getAllGalleryPhotos } from '@/server/db/queries/gallery'
import { getApprovedGuestbookEntries } from '@/server/db/queries/guestbook'
import { getAllMusicTracks } from '@/server/db/queries/music'
import { getAllTimelineEvents } from '@/server/db/queries/timeline'
import { HomePageClient } from '@/modules/home'
import type { TWeddingConfig, TMusicTrack } from '@/modules/home'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [weddingConfig, galleryPhotos, guestbookEntries, musicTracks, timelineEvents] = await Promise.all([
    getWeddingConfig(),
    getAllGalleryPhotos(),
    getApprovedGuestbookEntries(),
    getAllMusicTracks(),
    getAllTimelineEvents(),
  ])

  const config: TWeddingConfig = {
    brideName: weddingConfig.brideName,
    groomName: weddingConfig.groomName,
    weddingDateStr: weddingConfig.weddingDateStr,
    weddingDateReadable: weddingConfig.weddingDateReadable,
    venueName: weddingConfig.venueName,
    venueLocation: weddingConfig.venueLocation,
    editorialQuote: weddingConfig.editorialQuote,
    travelFlights: weddingConfig.travelFlights,
    travelTrains: weddingConfig.travelTrains,
    travelStays: weddingConfig.travelStays,
    travelTreasures: weddingConfig.travelTreasures,
    dressCodeTitle: weddingConfig.dressCodeTitle,
    dressCodeDescription: weddingConfig.dressCodeDescription,
    storyChapters: weddingConfig.storyChapters,
    dressCodeSwatches: weddingConfig.dressCodeSwatches,
  }

  const tracks: TMusicTrack[] = musicTracks.map(t => ({
    id: t.id,
    title: t.title,
    artist: t.artist,
    votes: t.votes,
    requestedBy: t.requestedBy,
    isCurated: t.isCurated,
  }))

  return (
    <HomePageClient
      config={config}
      galleryPhotos={galleryPhotos.map(p => ({ id: p.id, url: p.url, caption: p.caption }))}
      initialGuestbookEntries={guestbookEntries}
      initialMusicTracks={tracks}
      initialTimelineEvents={timelineEvents}
    />
  )
}

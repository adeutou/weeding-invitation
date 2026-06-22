import { cookies } from 'next/headers'
import { ContainerView } from '@/components/ContainerView'
import { AtelierLoginGate, AtelierDashboard } from '@/modules/atelier'
import { getAllRsvps } from '@/server/db/queries/rsvp'
import { getAllGuestbookEntries } from '@/server/db/queries/guestbook'
import { getAllGalleryPhotos } from '@/server/db/queries/gallery'
import type { TAtelierRsvp, TAtelierGuestbookEntry, TAtelierGalleryPhoto } from '@/modules/atelier'

export const metadata = {
  title: 'Atelier — Albert & Madame',
  description: 'Private administrative portal for the wedding platform.',
}

async function AuthenticatedDashboard() {
  const [rsvpRows, entryRows, photoRows] = await Promise.all([
    getAllRsvps(),
    getAllGuestbookEntries(),
    getAllGalleryPhotos(),
  ])

  const initialRsvps: TAtelierRsvp[] = rsvpRows.map(row => ({
    id: row.id,
    name: row.name,
    email: row.email,
    attendance: row.attendance,
    guestsCount: row.guestsCount,
    dietary: row.dietary,
    dietaryDetails: row.dietaryDetails ?? null,
    needsShuttle: row.needsShuttle,
    songRequest: row.songRequest ?? null,
    createdAt: row.createdAt,
  }))

  const initialEntries: TAtelierGuestbookEntry[] = entryRows.map(row => ({
    id: row.id,
    name: row.name,
    message: row.message,
    stampType: row.stampType,
    isApproved: row.isApproved,
    createdAt: row.createdAt,
  }))

  const initialPhotos: TAtelierGalleryPhoto[] = photoRows.map(row => ({
    id: row.id,
    url: row.url,
    caption: row.caption,
    sortOrder: row.sortOrder,
    createdAt: row.createdAt,
  }))

  return (
    <AtelierDashboard
      initialRsvps={initialRsvps}
      initialEntries={initialEntries}
      initialPhotos={initialPhotos}
    />
  )
}

export default async function AtelierRoute() {
  const cookieStore = await cookies()
  const session = cookieStore.get('atelier_auth')?.value
  const passphrase = process.env.ATELIER_PASSPHRASE
  const isAuthenticated = !!passphrase && session === passphrase

  if (!isAuthenticated) {
    return <AtelierLoginGate />
  }

  return (
    <ContainerView variant="atelier">
      <AuthenticatedDashboard />
    </ContainerView>
  )
}

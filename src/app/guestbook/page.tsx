import { Layout } from '@/components/Layout'
import { ContainerView } from '@/components/ContainerView'
import { GuestbookPage } from '@/modules/guestbook'
import { getApprovedGuestbookEntries } from '@/server/db/queries/guestbook'
import type { TGuestbookEntry } from '@/modules/guestbook'

export const metadata = {
  title: 'Guestbook — Albert & Madame Wedding',
  description: 'Leave a message for the couple in the wedding guestbook.',
}

export const dynamic = 'force-dynamic'

async function GuestbookContent() {
  const rows = await getApprovedGuestbookEntries()
  const entries: TGuestbookEntry[] = rows.map(row => ({
    id: row.id,
    name: row.name,
    message: row.message,
    stampType: row.stampType,
    isApproved: row.isApproved,
    createdAt: row.createdAt,
  }))

  return <GuestbookPage initialEntries={entries} />
}

export default function GuestbookRoute() {
  return (
    <Layout>
      <ContainerView>
        <GuestbookContent />
      </ContainerView>
    </Layout>
  )
}

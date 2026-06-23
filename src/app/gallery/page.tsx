import { Layout } from '@/components/Layout'
import { ContainerView } from '@/components/ContainerView'
import { GallerySection } from '@/modules/gallery'
import { getAllGalleryPhotos } from '@/server/db/queries/gallery'
import type { TGalleryPhoto } from '@/modules/gallery'

export const metadata = {
  title: 'Gallery — Lola & Albert Wedding',
  description: 'A cinematic gallery of photographs from the wedding of Albert and Clara.',
}

export const dynamic = 'force-dynamic'

async function GalleryContent() {
  const rows = await getAllGalleryPhotos()
  const photos: TGalleryPhoto[] = rows.map(row => ({
    id: row.id,
    url: row.url,
    caption: row.caption,
  }))

  return <GallerySection photos={photos} />
}

export default function GalleryRoute() {
  return (
    <Layout>
      <ContainerView>
        <GalleryContent />
      </ContainerView>
    </Layout>
  )
}

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

interface LayoutProps {
  children: React.ReactNode
  groomName?: string
  brideName?: string
  venueName?: string
  venueLocation?: string
  weddingDateReadable?: string
}

export function Layout({
  children,
  groomName = 'Charles',
  brideName = 'Clara',
  venueName = 'Château de la Rose',
  venueLocation = 'Provence, France',
  weddingDateReadable = 'September 19th, 2026',
}: LayoutProps) {
  const groomInitial = groomName.charAt(0)
  const brideInitial = brideName.charAt(0)

  return (
    <>
      <Header groomInitial={groomInitial} brideInitial={brideInitial} />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer
        groomName={groomName}
        brideName={brideName}
        venueName={venueName}
        venueLocation={venueLocation}
        weddingDateReadable={weddingDateReadable}
      />
    </>
  )
}

import { Layout } from '@/components/Layout'
import { ContainerView } from '@/components/ContainerView'
import { RsvpPage } from '@/modules/rsvp'

export const metadata = {
  title: 'RSVP — Albert & Madame Wedding',
  description: 'Confirm your attendance at the wedding of Albert and Clara in Provence, France.',
}

export default function RsvpRoute() {
  return (
    <Layout>
      <ContainerView>
        <RsvpPage />
      </ContainerView>
    </Layout>
  )
}

import 'server-only'
import { eq } from 'drizzle-orm'
import { db } from '../index'
import { weddingConfigTable } from '../schema'
import type { WeddingConfigSelect } from '../schema'
import type { StoryChapterRecord, DressCodeSwatchRecord } from '../schema'

const DEFAULT_CHAPTERS: StoryChapterRecord[] = [
  {
    id: 'chapter-1',
    title: 'Chapter I: The Boulevard Encounter',
    period: 'October - Autumn In Paris',
    subtitle: 'A serendipitous shelter from rain',
    content:
      "It began under a forest-green canopy on Rue Saint-André des Arts. A sudden autumn downpour forced Clara to seek shelter beneath the awning of an old bookshop where Charles was examining vintage maps. A shared umbrella and three hours of conversation over spiced tea in Saint-Germain-des-Prés set the trajectory for our hearts.",
  },
  {
    id: 'chapter-2',
    title: 'Chapter II: The Lavender Epistles',
    period: 'A Summer of Distance',
    subtitle: 'Handwritten ink across oceans',
    content:
      'When Charles accepted a residency in Rome and Clara was documenting the botanics of southern France, letters became our lifeblood. Two hundred and fourteen hand-sealed envelopes traveled between Provence and Prague, preserving every dream, observation, and late-night reflection in dark ink on cotton paper.',
  },
  {
    id: 'chapter-3',
    title: 'Chapter III: The Promises in the Ruins',
    period: 'September - Sacred Provence',
    subtitle: 'An oath of dynamic devotion',
    content:
      'Amidst the silent wind and silver olive groves of the Alpilles, Charles asked Clara to build a life of shared art and timeless architecture. It was simple, quiet, and sacred. We decided to return to these hills of Provence to share our vows with the souls who hold our stories dearest.',
  },
]

const DEFAULT_SWATCHES: DressCodeSwatchRecord[] = [
  { name: 'Olive Sauvage', colorHex: '#5E6F5C', description: 'The deep sage of old orchards. Soft, organic, and peaceful. Suited for linen blazers, pastel trousers, or light slip dresses.' },
  { name: 'Sienne Brûlée', colorHex: '#A97669', description: 'Terracotta and wild blossoms. Inspired by pottery over stone arches. Great for warm custom loafers, pleated skirts, or pocket squares.' },
  { name: 'Or Antique', colorHex: '#C5A059', description: 'Muted golden glints of autumn sun. Suitable for elegant jewelry, metallic thread embroidery, or warm champagne neckties.' },
  { name: 'Crème Royale', colorHex: '#EAE6DF', description: 'Raw silk and washed stones. Light creams of vintage paper. Perfect for linen suits, light cream column gowns, or panama hats.' },
  { name: 'Sable Fin', colorHex: '#D5CEBF', description: 'Warm sandy paths of the château. Elegant and comfortable. Beautiful for braided leather sandals, tan accessories, and soft tailoring.' },
]

export const DEFAULT_CONFIG_VALUES = {
  id: 'default',
  brideName: 'Madame Clara',
  groomName: 'Monsieur Charles',
  weddingDateStr: '2026-09-19T15:00:00+02:00',
  weddingDateReadable: 'September 19th, 2026',
  venueName: 'Château de la Rose',
  venueLocation: 'Provence, France',
  welcomeInviteMessage: 'To our dear guest • You are invited',
  editorialQuote: 'Pour toujours, et au-delà du temps',
  travelFlights:
    'The closest international airport is Marseille Provence (MRS), located a scenic 1-hour drive through the orchards, or Nice Côte d\'Azur (NCE), situated 2.5 hours away.',
  travelTrains:
    'For high-speed trains, book Eurostar directly to Avignon TGV or take a regional connection to Saint-Sulpice station.',
  travelStays:
    "We have reserved full block-room registries under a preferential rate at Le Clos de Saint-Pierre and Grand Saint-Jean Hotel (located 10 mins from the Château ruins). Please mention Clara & Charles's Wedding when reserving.",
  travelTreasures:
    "If you arrive early, explore the stunning cliffside red-ochre town of Gordes, visit the medieval monastic lavender gardens at Sénanque Abbey, or pick fresh strawberries at L'Isle-sur-la-Sorgue market.",
  dressCodeTitle: 'Provenance Formal with Fine Textures',
  dressCodeDescription:
    'We invite you to join our aesthetic tapestry by choosing garments in organic earthen shades. Soft linens, draped silk, light tailoring, and flat leather footwear are encouraged for compatibility with our garden lawns.',
  storyChapters: DEFAULT_CHAPTERS,
  dressCodeSwatches: DEFAULT_SWATCHES,
} as const

export async function getWeddingConfig(): Promise<WeddingConfigSelect> {
  const rows = await db.select().from(weddingConfigTable).where(eq(weddingConfigTable.id, 'default')).limit(1)
  if (rows[0]) return rows[0]

  const inserted = await db
    .insert(weddingConfigTable)
    .values({
      ...DEFAULT_CONFIG_VALUES,
      storyChapters: DEFAULT_CHAPTERS,
      dressCodeSwatches: DEFAULT_SWATCHES,
    })
    .returning()
  const row = inserted[0]
  if (!row) throw new Error('Failed to create default wedding config')
  return row
}

export async function updateWeddingConfig(
  data: Partial<Omit<WeddingConfigSelect, 'id' | 'updatedAt'>>,
): Promise<WeddingConfigSelect> {
  const rows = await db
    .update(weddingConfigTable)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(weddingConfigTable.id, 'default'))
    .returning()
  const row = rows[0]
  if (!row) throw new Error('Config update returned no row')
  return row
}

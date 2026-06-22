import { loadEnvConfig } from '@next/env'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import {
  weddingConfigTable,
  galleryPhotosTable,
  musicTracksTable,
  timelineEventsTable,
} from './schema'

loadEnvConfig(process.cwd())

const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  process.exit(1)
}

const sql = neon(databaseUrl)
const db = drizzle(sql)

async function main() {
  await db.delete(weddingConfigTable)
  await db.delete(galleryPhotosTable)
  await db.delete(musicTracksTable)
  await db.delete(timelineEventsTable)

  await db.insert(weddingConfigTable).values({
    id: 'default',
    brideName: 'Madame Deutou',
    groomName: 'Monsieur Deutou',
    weddingDateStr: '2026-07-05T15:00:00+02:00',
    weddingDateReadable: 'July 5th, 2026',
    venueName: 'Château de la Rose',
    venueLocation: 'Provence, France',
    welcomeInviteMessage: 'To our dear guest • You are invited',
    editorialQuote: 'Pour toujours, et au-delà du temps',
    travelFlights: "The closest international airport is Marseille Provence (MRS), located a scenic 1-hour drive through the orchards, or Nice Côte d'Azur (NCE), situated 2.5 hours away.",
    travelTrains: "For high-speed trains, book Eurostar directly to Avignon TGV or take a regional connection to Saint-Sulpice station.",
    travelStays: "We have reserved full block-room registries under a preferential rate at Le Clos de Saint-Pierre and Grand Saint-Jean Hotel (located 10 mins from the Château ruins). Please mention Clara & Charles's Wedding when reserving.",
    travelTreasures: "If you arrive early, explore the stunning cliffside red-ochre town of Gordes, visit the medieval monastic lavender gardens at Sénanque Abbey, or pick fresh strawberries at L'Isle-sur-la-Sorgue market.",
    dressCodeTitle: 'Provenance Formal with Fine Textures',
    dressCodeDescription: 'We invite you to join our aesthetic tapestry by choosing garments in organic earthen shades. Soft linens, draped silk, light tailoring, and flat leather footwear are encouraged for compatibility with our garden lawns.',
    storyChapters: [
      {
        id: 'chapter-1',
        title: 'Chapter I: The Boulevard Encounter',
        period: 'October - Autumn In Paris',
        subtitle: 'A serendipitous shelter from rain',
        content: "It began under a forest-green canopy on Rue Saint-André des Arts. A sudden autumn downpour forced Clara to seek shelter beneath the awning of an old bookshop where Charles was examining vintage maps. A shared umbrella and three hours of conversation over spiced tea in Saint-Germain-des-Prés set the trajectory for our hearts.",
      },
      {
        id: 'chapter-2',
        title: 'Chapter II: The Lavender Epistles',
        period: 'A Summer of Distance',
        subtitle: 'Handwritten ink across oceans',
        content: 'When Charles accepted a residency in Rome and Clara was documenting the botanics of southern France, letters became our lifeblood. Two hundred and fourteen hand-sealed envelopes traveled between Provence and Prague, preserving every dream, observation, and late-night reflection in dark ink on cotton paper.',
      },
      {
        id: 'chapter-3',
        title: 'Chapter III: The Promises in the Ruins',
        period: 'September - Sacred Provence',
        subtitle: 'An oath of dynamic devotion',
        content: 'Amidst the silent wind and silver olive groves of the Alpilles, Charles asked Clara to build a life of shared art and timeless architecture. It was simple, quiet, and sacred. We decided to return to these hills of Provence to share our vows with the souls who hold our stories dearest.',
      },
    ],
    dressCodeSwatches: [
      { name: 'Olive Sauvage', colorHex: '#5E6F5C', description: 'The deep sage of old orchards. Soft, organic, and peaceful. Suited for linen blazers, pastel trousers, or light slip dresses.' },
      { name: 'Sienne Brûlée', colorHex: '#A97669', description: 'Terracotta and wild blossoms. Inspired by pottery over stone arches. Great for warm custom loafers, pleated skirts, or pocket squares.' },
      { name: 'Or Antique', colorHex: '#C5A059', description: 'Muted golden glints of autumn sun. Suitable for elegant jewelry, metallic thread embroidery, or warm champagne neckties.' },
      { name: 'Crème Royale', colorHex: '#EAE6DF', description: 'Raw silk and washed stones. Light creams of vintage paper. Perfect for linen suits, light cream column gowns, or panama hats.' },
      { name: 'Sable Fin', colorHex: '#D5CEBF', description: 'Warm sandy paths of the château. Elegant and comfortable. Beautiful for braided leather sandals, tan accessories, and soft tailoring.' },
    ],
  })

  await db.insert(galleryPhotosTable).values([
    {
      url: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=80',
      caption: 'Washed linens and botanical banquet settings beneath old oak canopies.',
      sortOrder: 0,
    },
    {
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      caption: 'Sunset strolls alongside stone arches and summer olive groves.',
      sortOrder: 1,
    },
    {
      url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80',
      caption: 'A celebration of delicate floristry and handwritten letters in olive hues.',
      sortOrder: 2,
    },
    {
      url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      caption: 'Sweet scent of Provence lavender fields dancing in the afternoon breeze.',
      sortOrder: 3,
    },
  ])

  await db.insert(musicTracksTable).values([
    { title: 'September', artist: 'Earth, Wind & Fire', votes: 18, requestedBy: 'Cousin Amélie', isCurated: true },
    { title: 'La Vie En Rose', artist: 'Édith Piaf', votes: 14, requestedBy: 'Grandmother Eleanor', isCurated: true },
    { title: 'Fly Me To The Moon', artist: 'Frank Sinatra', votes: 11, requestedBy: 'Arthur (Groom)', isCurated: true },
    { title: 'L-O-V-E', artist: 'Nat King Cole', votes: 9, requestedBy: 'Beatrice (Bride)', isCurated: true },
  ])

  await db.insert(timelineEventsTable).values([
    {
      phase: 'preWedding',
      eventTime: '18:00 - 21:00',
      title: 'Bienvenue • Welcome Sunset Apéro',
      location: 'Château Courtyard Lawn',
      description: 'Join us for local organic French wines, cold artisan cheeses, and warm reunion laughter as the sun sinks beneath the lavender hills.',
      iconName: 'glass',
      sortOrder: 0,
    },
    {
      phase: 'preWedding',
      eventTime: '21:30',
      title: 'Candlelit Garden Chords',
      location: 'The Old Oak Fountain',
      description: 'An acoustic classical guitar set under fairy lights to ease everyone into the calm country breeze before the grand day.',
      iconName: 'music',
      sortOrder: 1,
    },
    {
      phase: 'bigDay',
      eventTime: '14:30',
      title: 'The Assembly & Welcoming',
      location: 'Sainte-Marie Glass Orangery Entrance',
      description: 'Please arrive and pick up your hand-bound botanical program booklets. Infused floral waters will be served.',
      iconName: 'landmark',
      sortOrder: 2,
    },
    {
      phase: 'bigDay',
      eventTime: '15:00',
      title: 'The Holy Exchange of Vows',
      location: 'The Botanical Cathedral Ruins',
      description: 'Pledging our lifetimes and exchanging antique gold rings under the shadow of the stone arches.',
      iconName: 'heart',
      sortOrder: 3,
    },
    {
      phase: 'bigDay',
      eventTime: '16:30',
      title: 'Le Cocktail de Royal Reception',
      location: 'The Rose Trellis Maze Gardens',
      description: "Sip custom botanical gins and champagne with local lavender-infused hors d'oeuvres while live jazz strings serenade the terrace.",
      iconName: 'glass',
      sortOrder: 4,
    },
    {
      phase: 'bigDay',
      eventTime: '19:00',
      title: 'Candlelit Banquet of Provence',
      location: 'The Grand Mirror Ballroom',
      description: 'A seated 3-course French culinary experience curated by Chef Luc Besson. Organic pairing wines included.',
      iconName: 'coffee',
      sortOrder: 5,
    },
    {
      phase: 'bigDay',
      eventTime: '22:00',
      title: 'The First Waltz & Live Ball',
      location: 'Grand Ballroom & Terrace',
      description: 'Dancing under the twilight canopy, featuring the Midnight Chords live orchestra and cutting of the tiered macaron frame cake.',
      iconName: 'music',
      sortOrder: 6,
    },
    {
      phase: 'afterglow',
      eventTime: '11:30 - 14:30',
      title: 'The Sunday Pastry & Espresso Recovery',
      location: 'The Greenhouse Conservatory',
      description: 'Wrap up the incredible weekend with fresh butter croissants, pain au chocolat, local honey, and warm rich espresso.',
      iconName: 'coffee',
      sortOrder: 7,
    },
    {
      phase: 'afterglow',
      eventTime: '15:00',
      title: 'Warm Departures & Keep Box Signatures',
      location: 'The Foyer Courtyard',
      description: 'Write your Polaroid blessings, place them on our rustic wood frame, and pick up your miniature olive-oil keepsake bottles before voyage.',
      iconName: 'landmark',
      sortOrder: 8,
    },
  ])

  process.exit(0)
}

main().catch(() => {
  process.exit(1)
})

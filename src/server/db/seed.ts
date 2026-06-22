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
    weddingDateStr: '2026-07-16T15:00:00+02:00',
    weddingDateReadable: '16 Juillet 2026',
    venueName: 'Château de la Rose',
    venueLocation: 'Provence, France',
    welcomeInviteMessage: 'À notre cher invité • Vous êtes invité',
    editorialQuote: 'Pour toujours, et au-delà du temps',
    travelFlights: "L'aéroport international le plus proche est Marseille Provence (MRS), situé à 1 heure de route à travers les vergers, ou Nice Côte d'Azur (NCE), situé à 2,5 heures.",
    travelTrains: "Pour les trains à grande vitesse, réservez directement votre trajet Eurostar ou TGV vers Avignon TGV ou prenez une correspondance régionale pour la gare de Saint-Sulpice.",
    travelStays: "Nous avons réservé des blocs de chambres avec un tarif préférentiel au Clos de Saint-Pierre et à l'Hôtel Grand Saint-Jean (situés à 10 minutes des ruines du Château). Veuillez mentionner 'Mariage de Clara & Charles' lors de votre réservation.",
    travelTreasures: "Si vous arrivez tôt, explorez le magnifique village perché de Gordes, visitez les jardins de lavande de l'abbaye de Sénanque ou cueillez des fraises fraîches au marché de L'Isle-sur-la-Sorgue.",
    dressCodeTitle: "Tenue de Cocktail Chic de Provence",
    dressCodeDescription: "Nous vous invitons à participer à l'harmonie visuelle en choisissant des vêtements dans des tons organiques et naturels. Le lin souple, la soie drapée, les coupes légères et les chaussures plates en cuir sont recommandés pour la pelouse du jardin.",
    storyChapters: [
      {
        id: 'chapter-1',
        title: 'Chapitre I : La Rencontre sur le Boulevard',
        period: "Octobre - L'Automne à Paris",
        subtitle: 'Un abri inattendu contre la pluie',
        content: "Tout a commencé sous un auvent vert forêt de la rue Saint-André-des-Arts. Une averse d'automne soudaine a forcé Clara à s'abriter sous le store d'une ancienne librairie où Charles examinait des cartes anciennes. Un parapluie partagé et trois heures de conversation autour d'un thé épicé à Saint-Germain-des-Prés ont tracé le chemin de nos cœurs.",
      },
      {
        id: 'chapter-2',
        title: 'Chapitre II : Les Lettres de Lavande',
        period: 'Un Été de Distance',
        subtitle: "De l'encre manuscrite par-delà les collines",
        content: "Quand Charles a accepté une résidence à Rome et que Clara documentait la botanique dans le sud de la France, les lettres sont devenues notre lien vital. Deux cent quatorze enveloppes scellées à la main ont voyagé entre la Provence et Rome, préservant chaque rêve, chaque observation et chaque réflexion nocturne.",
      },
      {
        id: 'chapter-3',
        title: 'Chapitre III : Les Promesses dans les Ruines',
        period: 'Septembre - La Provence Sacrée',
        subtitle: 'Un serment de dévouement éternel',
        content: "Au milieu du vent silencieux et des oliviers argentés des Alpilles, Charles a demandé à Clara de bâtir une vie d'art partagé et d'amour intemporel. C'était simple, calme et sacré. Nous avons décidé de retourner sur ces collines de Provence pour prononcer nos vœux.",
      },
    ],
    dressCodeSwatches: [
      { name: 'Olive Sauvage', colorHex: '#5E6F5C', description: "Le sauge profond des vieux vergers. Doux, organique et paisible. Idéal pour les vestes en lin, les pantalons pastel ou les robes légères." },
      { name: 'Sienne Brûlée', colorHex: '#A97669', description: "Terre cuite et fleurs sauvages. Inspiré des poteries sur les arches de pierre. Idéal pour les mocassins souples, les jupes plissées ou les pochettes." },
      { name: 'Or Antique', colorHex: '#C5A059', description: "Reflets dorés du soleil d'automne. Parfait pour les bijoux élégants, les broderies dorées ou les cravates champagne." },
      { name: 'Crème Royale', colorHex: '#EAE6DF', description: "Soie brute et pierres lavées. Crème clair du papier vintage. Parfait pour les costumes en lin, les robes colonnes ou les chapeaux panama." },
      { name: 'Sable Fin', colorHex: '#D5CEBF', description: "Chemins de sable du château. Élégant et confortable. Superbe pour les sandales en cuir tressé, les accessoires fauves et les coupes fluides." },
    ],
  })

  await db.insert(galleryPhotosTable).values([
    {
      url: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=80',
      caption: 'Lins lavés et banquets botaniques sous la canopée des vieux chênes.',
      sortOrder: 0,
    },
    {
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      caption: "Promenades au coucher du soleil le long des arches de pierre et des oliveraies d'été.",
      sortOrder: 1,
    },
    {
      url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80',
      caption: 'Une célébration de fleurs délicates et de lettres manuscrites aux tons olive.',
      sortOrder: 2,
    },
    {
      url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      caption: "Le doux parfum des champs de lavande de Provence dans la brise de l'après-midi.",
      sortOrder: 3,
    },
  ])

  await db.insert(musicTracksTable).values([
    { title: 'September', artist: 'Earth, Wind & Fire', votes: 0, requestedBy: 'Amélie', isCurated: true },
    { title: 'La Vie En Rose', artist: 'Édith Piaf', votes: 0, requestedBy: 'Grand-mère Eleanor', isCurated: true },
    { title: 'Fly Me To The Moon', artist: 'Frank Sinatra', votes: 0, requestedBy: 'Charles (Marié)', isCurated: true },
    { title: 'L-O-V-E', artist: 'Nat King Cole', votes: 0, requestedBy: 'Clara (Mariée)', isCurated: true },
  ])

  await db.insert(timelineEventsTable).values([
    {
      phase: 'preWedding',
      eventTime: '18:00 - 21:00',
      title: 'Apéro de Bienvenue au Coucher du Soleil',
      location: 'Pelouse de la Cour du Château',
      description: 'Rejoignez-nous pour déguster des vins de Provence biologiques locaux, des fromages artisanaux et partager des rires chaleureux alors que le soleil se couche sur les collines.',
      iconName: 'glass',
      sortOrder: 0,
    },
    {
      phase: 'preWedding',
      eventTime: '21:30',
      title: 'Accords de Jardin aux Bougies',
      location: 'La Fontaine du Vieux Chêne',
      description: "Un set de guitare classique acoustique sous les guirlandes lumineuses pour s'imprégner de la douce brise de campagne avant le grand jour.",
      iconName: 'music',
      sortOrder: 1,
    },
    {
      phase: 'bigDay',
      eventTime: '14:30',
      title: 'Accueil & Remise des Livrets',
      location: 'Entrée de l\'Orangerie en Verre Sainte-Marie',
      description: 'Veuillez arriver à l\'avance pour récupérer votre livret de cérémonie relié à la main. Des eaux florales fraîches seront servies.',
      iconName: 'landmark',
      sortOrder: 2,
    },
    {
      phase: 'bigDay',
      eventTime: '15:00',
      title: 'L\'Échange Sacré des Vœux',
      location: 'Les Ruines de la Cathédrale Botanique',
      description: 'Promesse d\'une vie entière et échange d\'alliances en or antique à l\'ombre des arches de pierre séculaires.',
      iconName: 'heart',
      sortOrder: 3,
    },
    {
      phase: 'bigDay',
      eventTime: '16:30',
      title: 'Le Cocktail de Réception',
      location: 'Les Jardins du Labyrinthe de Roses',
      description: 'Savourez des cocktails botaniques et du champagne accompagnés de pièces apéritives à la lavande, rythmés par un groupe de jazz en terrasse.',
      iconName: 'glass',
      sortOrder: 4,
    },
    {
      phase: 'bigDay',
      eventTime: '19:00',
      title: 'Banquet aux Bougies de Provence',
      location: 'Le Grand Salon des Miroirs',
      description: 'Un dîner gastronomique en trois services élaboré par notre chef. Des accords mets-vins de Provence biologiques seront proposés.',
      iconName: 'coffee',
      sortOrder: 5,
    },
    {
      phase: 'bigDay',
      eventTime: '22:00',
      title: 'La Première Valse & Le Bal',
      location: 'Salle de Bal & Terrasse',
      description: 'Dansez sous la voûte étoilée au son de notre grand orchestre, suivie de la traditionnelle pièce montée de macarons.',
      iconName: 'music',
      sortOrder: 6,
    },
    {
      phase: 'afterglow',
      eventTime: '11:30 - 14:30',
      title: 'Brunch Viennoiseries & Expresso du Dimanche',
      location: 'La Serre Conservatoire',
      description: 'Terminez ce week-end magique avec des croissants frais au beurre, des pains au chocolat, du miel local et du café expresso chaud.',
      iconName: 'coffee',
      sortOrder: 7,
    },
    {
      phase: 'afterglow',
      eventTime: '15:00',
      title: 'Au Revoir Chaleureux & Signature du Livre',
      location: 'La Cour d\'Honneur',
      description: 'Imprimez vos photos Polaroid souvenirs, suspendez-les à notre cadre en bois et récupérez votre fiole d\'huile d\'olive souvenir avant de partir.',
      iconName: 'landmark',
      sortOrder: 8,
    },
  ])

  process.exit(0)
}

main().catch(() => {
  process.exit(1)
})

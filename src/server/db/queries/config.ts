import 'server-only'
import { eq } from 'drizzle-orm'
import { db } from '../index'
import { weddingConfigTable } from '../schema'
import type { WeddingConfigSelect } from '../schema'
import type { StoryChapterRecord, DressCodeSwatchRecord } from '../schema'

const DEFAULT_CHAPTERS: StoryChapterRecord[] = [
  {
    id: 'chapter-1',
    title: 'Chapitre I : La Rencontre sur le Boulevard',
    period: "Octobre - L'Automne à Paris",
    subtitle: 'Un abri inattendu contre la pluie',
    content:
      "Tout a commencé sous un auvent vert forêt de la rue Saint-André-des-Arts. Une averse d'automne soudaine a forcé Clara à s'abriter sous le store d'une ancienne librairie où Charles examinait des cartes anciennes. Un parapluie partagé et trois heures de conversation autour d'un thé épicé à Saint-Germain-des-Prés ont tracé le chemin de nos cœurs.",
  },
  {
    id: 'chapter-2',
    title: 'Chapitre II : Les Lettres de Lavande',
    period: 'Un Été de Distance',
    subtitle: "De l'encre manuscrite par-delà les collines",
    content:
      "Quand Charles a accepté une résidence à Rome et que Clara documentait la botanique dans le sud de la France, les lettres sont devenues notre lien vital. Deux cent quatorze enveloppes scellées à la main ont voyagé entre la Provence et Rome, préservant chaque rêve, chaque observation et chaque réflexion nocturne.",
  },
  {
    id: 'chapter-3',
    title: 'Chapitre III : Les Promesses dans les Ruines',
    period: 'Septembre - La Provence Sacrée',
    subtitle: 'Un serment de dévouement éternel',
    content:
      "Au milieu du vent silencieux et des oliviers argentés des Alpilles, Charles a demandé à Clara de bâtir une vie d'art partagé et d'amour intemporel. C'était simple, calme et sacré. Nous avons décidé de retourner sur ces collines de Provence pour prononcer nos vœux.",
  },
]

const DEFAULT_SWATCHES: DressCodeSwatchRecord[] = [
  { name: 'Olive Sauvage', colorHex: '#5E6F5C', description: "Le sauge profond des vieux vergers. Doux, organique et paisible. Idéal pour les vestes en lin, les pantalons pastel ou les robes légères." },
  { name: 'Sienne Brûlée', colorHex: '#A97669', description: "Terre cuite et fleurs sauvages. Inspiré des poteries sur les arches de pierre. Idéal pour les mocassins souples, les jupes plissées ou les pochettes." },
  { name: 'Or Antique', colorHex: '#C5A059', description: "Reflets dorés du soleil d'automne. Parfait pour les bijoux élégants, les broderies dorées ou les cravates champagne." },
  { name: 'Crème Royale', colorHex: '#EAE6DF', description: "Soie brute et pierres lavées. Crème clair du papier vintage. Parfait pour les costumes en lin, les robes colonnes ou les chapeaux panama." },
  { name: 'Sable Fin', colorHex: '#D5CEBF', description: "Chemins de sable du château. Élégant et confortable. Superbe pour les sandales en cuir tressé, les accessoires fauves et les coupes fluides." },
]

export const DEFAULT_CONFIG_VALUES = {
  id: 'default',
  brideName: 'Madame Clara',
  groomName: 'Monsieur Charles',
  weddingDateStr: '2026-09-19T15:00:00+02:00',
  weddingDateReadable: '19 Septembre 2026',
  venueName: 'Château de la Rose',
  venueLocation: 'Provence, France',
  welcomeInviteMessage: 'À notre cher invité • Vous êtes invité',
  editorialQuote: 'Pour toujours, et au-delà du temps',
  travelFlights:
    "L'aéroport international le plus proche est Marseille Provence (MRS), situé à 1 heure de route à travers les vergers, ou Nice Côte d'Azur (NCE), situé à 2,5 heures.",
  travelTrains:
    "Pour les trains à grande vitesse, réservez directement votre trajet Eurostar ou TGV vers Avignon TGV ou prenez une correspondance régionale pour la gare de Saint-Sulpice.",
  travelStays:
    "Nous avons réservé des blocs de chambres avec un tarif préférentiel au Clos de Saint-Pierre et à l'Hôtel Grand Saint-Jean (situés à 10 minutes des ruines du Château). Veuillez mentionner 'Mariage de Clara & Charles' lors de votre réservation.",
  travelTreasures:
    "Si vous arrivez tôt, explorez le magnifique village perché de Gordes, visitez les jardins de lavande de l'abbaye de Sénanque ou cueillez des fraises fraîches au marché de L'Isle-sur-la-Sorgue.",
  dressCodeTitle: "Tenue de Cocktail Chic de Provence",
  dressCodeDescription:
    "Nous vous invitons à participer à l'harmonie visuelle en choisissant des vêtements dans des tons organiques et naturels. Le lin souple, la soie drapée, les coupes légères et les chaussures plates en cuir sont recommandés pour la pelouse du jardin.",
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

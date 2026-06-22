import { WeddingConfig, StoryChapter, DressCodeSwatch, GalleryPhoto } from "../types";

// Default Story Chapters
const DEFAULT_CHAPTERS: StoryChapter[] = [
  {
    id: "chapter-1",
    title: "Chapter I: The Boulevard Encounter",
    period: "October - Autumn In Paris",
    subtitle: "A serendipitous shelter from rain",
    content: "It began under a forest-green canopy on Rue Saint-André des Arts. A sudden autumn downpour forced Clara to seek shelter beneath the awning of an old bookshop where Charles was examining vintage maps. A shared umbrella and three hours of conversation over spiced tea in Saint-Germain-des-Prés set the trajectory for our hearts."
  },
  {
    id: "chapter-2",
    title: "Chapter II: The Lavender Epistles",
    period: "A Summer of Distance",
    subtitle: "Handwritten ink across oceans",
    content: "When Charles accepted a residency in Rome and Clara was documenting the botanics of southern France, letters became our lifeblood. Two hundred and fourteen hand-sealed envelopes traveled between Provence and Prague, preserving every dream, observation, and late-night reflection in dark ink on cotton paper."
  },
  {
    id: "chapter-3",
    title: "Chapter III: The Promises in the Ruins",
    period: "September - Sacred Provence",
    subtitle: "An oath of dynamic devotion",
    content: "Amidst the silent wind and silver olive groves of the Alpilles, Charles asked Clara to build a life of shared art and timeless architecture. It was simple, quiet, and sacred. We decided to return to these hills of Provence to share our vows with the souls who hold our stories dearest."
  }
];

// Default Swatches
const DEFAULT_SWATCHES: DressCodeSwatch[] = [
  { name: "Olive Sauvage", colorHex: "#5E6F5C", description: "The deep sage of old groves" },
  { name: "Sienne Brûlée", colorHex: "#A97669", description: "Terracotta and wild blossoms" },
  { name: "Or Antique", colorHex: "#C5A059", description: "Muted glints of autumn sun" },
  { name: "Créme Royale", colorHex: "#EAE6DF", description: "Raw silk and washed stones" },
  { name: "Sable Fin", colorHex: "#D5CEBF", description: "Warm paths of the château" }
];

// Default Gallery Photos
const DEFAULT_GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "photo-1",
    url: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=80",
    caption: "Washed linens and botanical banquet settings beneath old oak canopies."
  },
  {
    id: "photo-2",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    caption: "Sunset strolls alongside stone arches and summer olive groves."
  },
  {
    id: "photo-3",
    url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80",
    caption: "A celebration of delicate floristry and handwritten letters in olive hues."
  },
  {
    id: "photo-4",
    url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    caption: "Sweet scent of Provence lavender fields dancing in the afternoon breeze."
  }
];

// Elegant Preset Defaults
export const DEFAULT_WEDDING_CONFIG: WeddingConfig = {
  brideName: "Madame Clara",
  groomName: "Monsieur Charles",
  weddingDateStr: "2026-09-19T15:00:00+02:00",
  weddingDateReadable: "September 19th, 2026",
  venueName: "Château de la Rose",
  venueLocation: "Provence, France",
  welcomeInviteMessage: "To our dear guest • You are invited",
  editorialQuote: "Pour toujours, et au-delà du temps",
  
  storyChapters: DEFAULT_CHAPTERS,
  
  travelFlights: "The closest international airport is Marseille Provence (MRS), located a scenic 1-hour drive through the orchards, or Nice Côte d'Azur (NCE), situated 2.5 hours away.",
  travelTrains: "For high-speed trains, book Eurostar directly to Avignon TGV or take a regional connection to Saint-Sulpice station.",
  travelStays: "We have reserved full block-room registries under a preferential rate at Le Clos de Saint-Pierre and Grand Saint-Jean Hotel (located 10 mins from the Château ruins). Please mention Clara & Charles's Wedding when reserving.",
  travelTreasures: "If you arrive early, explore the stunning cliffside red-ochre town of Gordes, visit the medieval monastic lavender gardens at Sénanque Abbey, or pick fresh strawberries at L'Isle-sur-la-Sorgue market.",
  
  dressCodeTitle: "Provenance Formal with Fine Textures",
  dressCodeDescription: "We invite you to join our aesthetic tapestry by choosing garments in organic earthen shades. Soft linens, draped silk, light tailoring, and flat leather footwear are encouraged for compatibility with our garden lawns.",
  dressCodeSwatches: DEFAULT_SWATCHES,
  galleryPhotos: DEFAULT_GALLERY_PHOTOS
};

const STORAGE_KEY = "wedding_website_config_v1";

export function loadWeddingConfig(): WeddingConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure arrays and structures are safe
      return {
        ...DEFAULT_WEDDING_CONFIG,
        ...parsed,
        storyChapters: parsed.storyChapters || DEFAULT_CHAPTERS,
        dressCodeSwatches: parsed.dressCodeSwatches || DEFAULT_SWATCHES,
        galleryPhotos: parsed.galleryPhotos || DEFAULT_GALLERY_PHOTOS
      };
    }
  } catch (err) {
    console.error("Failed to load wedding config", err);
  }
  return DEFAULT_WEDDING_CONFIG;
}

export function saveWeddingConfig(config: WeddingConfig) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (err) {
    console.error("Failed to save wedding config", err);
  }
}

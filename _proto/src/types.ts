export interface RSVPData {
  id?: string;
  name: string;
  email: string;
  attendance: "attending" | "declined" | "uncertain";
  guestsCount: number;
  dietary: string; // "none", "vegetarian", "vegan", "gluten-free", "other"
  dietaryDetails?: string;
  needsShuttle: boolean;
  songRequests?: string;
  timestamp: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  stampType: "botanical" | "gold_ring" | "wax_seal" | "vintage_dove";
  createdAt: string;
}

export type WeddingPhase = "preWedding" | "bigDay" | "afterglow";

export interface TimelineEvent {
  id: string;
  phase: WeddingPhase;
  time: string;
  title: string;
  location: string;
  description: string;
  iconName: string;
}

export interface StoryChapter {
  id: string;
  title: string;
  period: string;
  subtitle: string;
  content: string;
}

export interface DressCodeSwatch {
  name: string;
  colorHex: string;
  description: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
}

export interface WeddingConfig {
  brideName: string; // "Madame Clara"
  groomName: string; // "Monsieur Charles"
  weddingDateStr: string; // countdown date e.g. "2026-09-19T15:00:00+02:00"
  weddingDateReadable: string; // "September 19th, 2026"
  venueName: string; // "Château de la Rose"
  venueLocation: string; // "Provence, France"
  welcomeInviteMessage: string; // To our dear {guestName} • You are invited
  editorialQuote: string; // "Pour toujours, et au-delà du temps"
  
  // Dynamic story chapters
  storyChapters: StoryChapter[];
  
  // Travel guide details
  travelFlights: string;
  travelTrains: string;
  travelStays: string;
  travelTreasures: string;
  
  // Dress code guidelines
  dressCodeTitle: string;
  dressCodeDescription: string;
  dressCodeSwatches: DressCodeSwatch[];

  // Dynamic gallery photos
  galleryPhotos: GalleryPhoto[];
}

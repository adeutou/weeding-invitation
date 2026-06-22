import {
  pgTable,
  pgEnum,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
} from 'drizzle-orm/pg-core'

export const attendanceEnum = pgEnum('attendance_status', [
  'attending',
  'declined',
  'uncertain',
])

export const dietaryEnum = pgEnum('dietary_preference', [
  'none',
  'vegetarian',
  'vegan',
  'gluten-free',
  'other',
])

export const stampTypeEnum = pgEnum('stamp_type', [
  'botanical',
  'gold_ring',
  'wax_seal',
  'vintage_dove',
])

export const weddingPhaseEnum = pgEnum('wedding_phase', [
  'preWedding',
  'bigDay',
  'afterglow',
])

export type StoryChapterRecord = {
  id: string
  title: string
  period: string
  subtitle: string
  content: string
}

export type DressCodeSwatchRecord = {
  name: string
  colorHex: string
  description: string
}

export const rsvpsTable = pgTable('rsvps', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  email: text('email').notNull(),
  attendance: attendanceEnum('attendance').notNull(),
  guestsCount: integer('guests_count').notNull().default(1),
  dietary: dietaryEnum('dietary').notNull().default('none'),
  dietaryDetails: text('dietary_details'),
  needsShuttle: boolean('needs_shuttle').notNull().default(false),
  songRequest: text('song_request'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const guestbookEntriesTable = pgTable('guestbook_entries', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  message: text('message').notNull(),
  stampType: stampTypeEnum('stamp_type').notNull().default('botanical'),
  isApproved: boolean('is_approved').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const musicTracksTable = pgTable('music_tracks', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull(),
  artist: text('artist').notNull(),
  votes: integer('votes').notNull().default(0),
  requestedBy: text('requested_by').notNull(),
  isCurated: boolean('is_curated').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const galleryPhotosTable = pgTable('gallery_photos', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  url: text('url').notNull(),
  caption: text('caption').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const timelineEventsTable = pgTable('timeline_events', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  phase: weddingPhaseEnum('phase').notNull(),
  eventTime: text('event_time').notNull(),
  title: text('title').notNull(),
  location: text('location').notNull(),
  description: text('description').notNull(),
  iconName: text('icon_name').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
})

export const weddingConfigTable = pgTable('wedding_config', {
  id: text('id').primaryKey().default('default'),
  brideName: text('bride_name').notNull().default('Madame Clara'),
  groomName: text('groom_name').notNull().default('Monsieur Charles'),
  weddingDateStr: text('wedding_date_str')
    .notNull()
    .default('2026-09-19T15:00:00+02:00'),
  weddingDateReadable: text('wedding_date_readable')
    .notNull()
    .default('September 19th, 2026'),
  venueName: text('venue_name').notNull().default('Château de la Rose'),
  venueLocation: text('venue_location').notNull().default('Provence, France'),
  welcomeInviteMessage: text('welcome_invite_message')
    .notNull()
    .default('To our dear guest • You are invited'),
  editorialQuote: text('editorial_quote')
    .notNull()
    .default('Pour toujours, et au-delà du temps'),
  travelFlights: text('travel_flights').notNull().default(''),
  travelTrains: text('travel_trains').notNull().default(''),
  travelStays: text('travel_stays').notNull().default(''),
  travelTreasures: text('travel_treasures').notNull().default(''),
  dressCodeTitle: text('dress_code_title')
    .notNull()
    .default('Provenance Formal with Fine Textures'),
  dressCodeDescription: text('dress_code_description').notNull().default(''),
  storyChapters: jsonb('story_chapters')
    .$type<StoryChapterRecord[]>()
    .notNull(),
  dressCodeSwatches: jsonb('dress_code_swatches')
    .$type<DressCodeSwatchRecord[]>()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export type RsvpInsert = typeof rsvpsTable.$inferInsert
export type RsvpSelect = typeof rsvpsTable.$inferSelect

export type GuestbookEntryInsert = typeof guestbookEntriesTable.$inferInsert
export type GuestbookEntrySelect = typeof guestbookEntriesTable.$inferSelect

export type MusicTrackInsert = typeof musicTracksTable.$inferInsert
export type MusicTrackSelect = typeof musicTracksTable.$inferSelect

export type GalleryPhotoInsert = typeof galleryPhotosTable.$inferInsert
export type GalleryPhotoSelect = typeof galleryPhotosTable.$inferSelect

export type TimelineEventInsert = typeof timelineEventsTable.$inferInsert
export type TimelineEventSelect = typeof timelineEventsTable.$inferSelect

export type WeddingConfigInsert = typeof weddingConfigTable.$inferInsert
export type WeddingConfigSelect = typeof weddingConfigTable.$inferSelect

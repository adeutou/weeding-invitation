import 'server-only'
import { eq, desc, sql } from 'drizzle-orm'
import { db } from '../index'
import { musicTracksTable } from '../schema'
import type { MusicTrackInsert, MusicTrackSelect } from '../schema'

const SEED_TRACKS: MusicTrackInsert[] = [
  { title: 'September', artist: 'Earth, Wind & Fire', votes: 18, requestedBy: 'Cousin Amélie', isCurated: true },
  { title: 'La Vie En Rose', artist: 'Édith Piaf', votes: 14, requestedBy: 'Grandmother Eleanor', isCurated: true },
  { title: 'Fly Me To The Moon', artist: 'Frank Sinatra', votes: 11, requestedBy: 'Arthur (Groom)', isCurated: true },
  { title: 'L-O-V-E', artist: 'Nat King Cole', votes: 9, requestedBy: 'Beatrice (Bride)', isCurated: true },
]

export async function getAllMusicTracks(): Promise<MusicTrackSelect[]> {
  const rows = await db.select().from(musicTracksTable).orderBy(desc(musicTracksTable.votes), desc(musicTracksTable.createdAt))
  if (rows.length > 0) return rows

  const inserted = await db.insert(musicTracksTable).values(SEED_TRACKS).returning()
  return inserted.sort((a, b) => b.votes - a.votes)
}

export async function insertMusicTrack(data: MusicTrackInsert): Promise<MusicTrackSelect> {
  const rows = await db.insert(musicTracksTable).values(data).returning()
  const row = rows[0]
  if (!row) throw new Error('Music track insert returned no row')
  return row
}

export async function incrementTrackVote(id: string): Promise<MusicTrackSelect> {
  const rows = await db
    .update(musicTracksTable)
    .set({ votes: sql`${musicTracksTable.votes} + 1` })
    .where(eq(musicTracksTable.id, id))
    .returning()
  const row = rows[0]
  if (!row) throw new Error('Vote increment returned no row')
  return row
}

export async function decrementTrackVote(id: string): Promise<MusicTrackSelect> {
  const rows = await db
    .update(musicTracksTable)
    .set({ votes: sql`greatest(${musicTracksTable.votes} - 1, 0)` })
    .where(eq(musicTracksTable.id, id))
    .returning()
  const row = rows[0]
  if (!row) throw new Error('Vote decrement returned no row')
  return row
}

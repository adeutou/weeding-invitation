import 'server-only'
import { eq, desc, sql } from 'drizzle-orm'
import { db } from '../index'
import { musicTracksTable } from '../schema'
import type { MusicTrackInsert, MusicTrackSelect } from '../schema'

export async function getAllMusicTracks(): Promise<MusicTrackSelect[]> {
  return db.select().from(musicTracksTable).orderBy(desc(musicTracksTable.votes), desc(musicTracksTable.createdAt))
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

export async function deleteMusicTrackById(id: string): Promise<void> {
  await db.delete(musicTracksTable).where(eq(musicTracksTable.id, id))
}

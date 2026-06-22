import 'server-only'
import { eq, asc } from 'drizzle-orm'
import { db } from '../index'
import { timelineEventsTable } from '../schema'
import type { TimelineEventInsert, TimelineEventSelect } from '../schema'

export async function getAllTimelineEvents(): Promise<TimelineEventSelect[]> {
  return db
    .select()
    .from(timelineEventsTable)
    .orderBy(asc(timelineEventsTable.sortOrder))
}

export async function insertTimelineEvent(data: TimelineEventInsert): Promise<TimelineEventSelect> {
  const rows = await db.insert(timelineEventsTable).values(data).returning()
  const row = rows[0]
  if (!row) throw new Error('Timeline event insert returned no row')
  return row
}

export async function updateTimelineEvent(
  id: string,
  data: Partial<Omit<TimelineEventInsert, 'id'>>,
): Promise<TimelineEventSelect> {
  const rows = await db
    .update(timelineEventsTable)
    .set(data)
    .where(eq(timelineEventsTable.id, id))
    .returning()
  const row = rows[0]
  if (!row) throw new Error('Timeline event update returned no row')
  return row
}

export async function deleteTimelineEventById(id: string): Promise<void> {
  await db.delete(timelineEventsTable).where(eq(timelineEventsTable.id, id))
}

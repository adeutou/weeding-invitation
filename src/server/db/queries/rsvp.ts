import 'server-only'
import { eq, desc } from 'drizzle-orm'
import { db } from '../index'
import { rsvpsTable } from '../schema'
import type { RsvpInsert, RsvpSelect } from '../schema'

export async function insertRsvp(data: RsvpInsert): Promise<RsvpSelect> {
  const rows = await db.insert(rsvpsTable).values(data).returning()
  const row = rows[0]
  if (!row) throw new Error('RSVP insert returned no row')
  return row
}

export async function getRsvpByEmail(email: string): Promise<RsvpSelect | undefined> {
  const rows = await db
    .select()
    .from(rsvpsTable)
    .where(eq(rsvpsTable.email, email))
    .limit(1)
  return rows[0]
}

export async function getAllRsvps(): Promise<RsvpSelect[]> {
  return db.select().from(rsvpsTable).orderBy(desc(rsvpsTable.createdAt))
}

export async function deleteRsvp(id: string): Promise<void> {
  await db.delete(rsvpsTable).where(eq(rsvpsTable.id, id))
}

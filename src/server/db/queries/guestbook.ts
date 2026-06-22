import 'server-only'
import { eq, desc } from 'drizzle-orm'
import { db } from '../index'
import { guestbookEntriesTable } from '../schema'
import type { GuestbookEntryInsert, GuestbookEntrySelect } from '../schema'

export async function insertGuestbookEntry(
  data: GuestbookEntryInsert,
): Promise<GuestbookEntrySelect> {
  const rows = await db.insert(guestbookEntriesTable).values(data).returning()
  const row = rows[0]
  if (!row) throw new Error('Guestbook insert returned no row')
  return row
}

export async function getApprovedGuestbookEntries(): Promise<GuestbookEntrySelect[]> {
  return db
    .select()
    .from(guestbookEntriesTable)
    .where(eq(guestbookEntriesTable.isApproved, true))
    .orderBy(desc(guestbookEntriesTable.createdAt))
}

export async function getAllGuestbookEntries(): Promise<GuestbookEntrySelect[]> {
  return db
    .select()
    .from(guestbookEntriesTable)
    .orderBy(desc(guestbookEntriesTable.createdAt))
}

export async function approveGuestbookEntry(id: string): Promise<void> {
  await db
    .update(guestbookEntriesTable)
    .set({ isApproved: true })
    .where(eq(guestbookEntriesTable.id, id))
}

export async function deleteGuestbookEntry(id: string): Promise<void> {
  await db.delete(guestbookEntriesTable).where(eq(guestbookEntriesTable.id, id))
}

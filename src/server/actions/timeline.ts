'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import {
  insertTimelineEvent,
  updateTimelineEvent,
  deleteTimelineEventById,
} from '@/server/db/queries/timeline'
import type { TActionState, TVoidActionState } from '@/lib/action-types'
import type { TimelineEventInsert, TimelineEventSelect } from '@/server/db/schema'

const SESSION_COOKIE = 'atelier_auth'

async function requireAuth(): Promise<boolean> {
  const passphrase = process.env.ATELIER_PASSPHRASE
  if (!passphrase) return false
  const cookieStore = await cookies()
  return cookieStore.get(SESSION_COOKIE)?.value === passphrase
}

export async function addTimelineEventAction(
  data: Omit<TimelineEventInsert, 'id'>,
): Promise<TActionState<TimelineEventSelect>> {
  if (!(await requireAuth())) return { success: false, error: 'Unauthorized.' }
  try {
    const row = await insertTimelineEvent(data)
    revalidatePath('/')
    return { success: true, data: row }
  } catch {
    return { success: false, error: 'Failed to add event.' }
  }
}

export async function updateTimelineEventAction(
  id: string,
  data: Partial<Omit<TimelineEventInsert, 'id'>>,
): Promise<TActionState<TimelineEventSelect>> {
  if (!(await requireAuth())) return { success: false, error: 'Unauthorized.' }
  try {
    const row = await updateTimelineEvent(id, data)
    revalidatePath('/')
    return { success: true, data: row }
  } catch {
    return { success: false, error: 'Failed to update event.' }
  }
}

export async function deleteTimelineEventAction(id: string): Promise<TVoidActionState> {
  if (!(await requireAuth())) return { success: false, error: 'Unauthorized.' }
  try {
    await deleteTimelineEventById(id)
    revalidatePath('/')
    return { success: true }
  } catch {
    return { success: false, error: 'Failed to delete event.' }
  }
}

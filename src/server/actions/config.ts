'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { getWeddingConfig, updateWeddingConfig } from '@/server/db/queries/config'
import { getAllRsvps } from '@/server/db/queries/rsvp'
import { getAllGuestbookEntries } from '@/server/db/queries/guestbook'
import { getAllMusicTracks } from '@/server/db/queries/music'
import type { TActionState, TVoidActionState } from '@/lib/action-types'
import type { WeddingConfigSelect, StoryChapterRecord, DressCodeSwatchRecord } from '@/server/db/schema'

const SESSION_COOKIE = 'atelier_auth'

async function requireAuth(): Promise<boolean> {
  const passphrase = process.env.ATELIER_PASSPHRASE
  if (!passphrase) return false
  const cookieStore = await cookies()
  return cookieStore.get(SESSION_COOKIE)?.value === passphrase
}

export interface AdminData {
  rsvps: Awaited<ReturnType<typeof getAllRsvps>>
  entries: Awaited<ReturnType<typeof getAllGuestbookEntries>>
  tracks: Awaited<ReturnType<typeof getAllMusicTracks>>
}

export async function getAdminDataAction(): Promise<TActionState<AdminData>> {
  if (!(await requireAuth())) return { success: false, error: 'Unauthorized.' }
  try {
    const [rsvps, entries, tracks] = await Promise.all([
      getAllRsvps(),
      getAllGuestbookEntries(),
      getAllMusicTracks(),
    ])
    return { success: true, data: { rsvps, entries, tracks } }
  } catch {
    return { success: false, error: 'Failed to load admin data.' }
  }
}

export async function updateGeneralConfigAction(
  data: Partial<Pick<
    WeddingConfigSelect,
    | 'brideName'
    | 'groomName'
    | 'weddingDateStr'
    | 'weddingDateReadable'
    | 'venueName'
    | 'venueLocation'
    | 'editorialQuote'
  >>,
): Promise<TVoidActionState> {
  if (!(await requireAuth())) return { success: false, error: 'Unauthorized.' }
  try {
    await updateWeddingConfig(data)
    revalidatePath('/')
    return { success: true }
  } catch {
    return { success: false, error: 'Failed to update settings.' }
  }
}

export async function updateStoryChaptersAction(
  chapters: StoryChapterRecord[],
): Promise<TVoidActionState> {
  if (!(await requireAuth())) return { success: false, error: 'Unauthorized.' }
  try {
    await updateWeddingConfig({ storyChapters: chapters })
    revalidatePath('/')
    return { success: true }
  } catch {
    return { success: false, error: 'Failed to update story chapters.' }
  }
}

export async function updateTravelConfigAction(
  data: Partial<Pick<
    WeddingConfigSelect,
    'travelFlights' | 'travelTrains' | 'travelStays' | 'travelTreasures'
  >>,
): Promise<TVoidActionState> {
  if (!(await requireAuth())) return { success: false, error: 'Unauthorized.' }
  try {
    await updateWeddingConfig(data)
    revalidatePath('/')
    return { success: true }
  } catch {
    return { success: false, error: 'Failed to update travel info.' }
  }
}

export async function updateDressCodeConfigAction(
  data: Partial<Pick<WeddingConfigSelect, 'dressCodeTitle' | 'dressCodeDescription'>>,
  swatches?: DressCodeSwatchRecord[],
): Promise<TVoidActionState> {
  if (!(await requireAuth())) return { success: false, error: 'Unauthorized.' }
  try {
    await updateWeddingConfig({
      ...data,
      ...(swatches !== undefined ? { dressCodeSwatches: swatches } : {}),
    })
    revalidatePath('/')
    return { success: true }
  } catch {
    return { success: false, error: 'Failed to update dress code.' }
  }
}

export async function getWeddingConfigAction(): Promise<TActionState<WeddingConfigSelect>> {
  try {
    const config = await getWeddingConfig()
    return { success: true, data: config }
  } catch {
    return { success: false, error: 'Failed to load config.' }
  }
}

'use server'

import { revalidatePath } from 'next/cache'
import { insertMusicTrack, incrementTrackVote, decrementTrackVote, deleteMusicTrackById } from '@/server/db/queries/music'
import { cookies } from 'next/headers'
import type { TActionState, TVoidActionState } from '@/lib/action-types'
import type { MusicTrackSelect } from '@/server/db/schema'

const SESSION_COOKIE = 'atelier_auth'

async function requireAuth(): Promise<boolean> {
  const passphrase = process.env.ATELIER_PASSPHRASE
  if (!passphrase) return false
  const cookieStore = await cookies()
  return cookieStore.get(SESSION_COOKIE)?.value === passphrase
}

export async function addMusicTrackAction(
  title: string,
  artist: string,
  requestedBy: string,
): Promise<TActionState<MusicTrackSelect>> {
  const cleanTitle = title.trim()
  const cleanArtist = artist.trim()
  if (!cleanTitle) return { success: false, error: 'Song title is required.' }
  if (!cleanArtist) return { success: false, error: 'Artist name is required.' }
  try {
    const row = await insertMusicTrack({
      title: cleanTitle,
      artist: cleanArtist,
      requestedBy: requestedBy.trim() || 'Guest Request',
      votes: 1,
    })
    revalidatePath('/')
    return { success: true, data: row }
  } catch {
    return { success: false, error: 'Failed to add track.' }
  }
}

export async function voteTrackAction(
  id: string,
  direction: 'up' | 'down',
): Promise<TVoidActionState> {
  try {
    if (direction === 'up') {
      await incrementTrackVote(id)
    } else {
      await decrementTrackVote(id)
    }
    revalidatePath('/')
    return { success: true }
  } catch {
    return { success: false, error: 'Failed to register vote.' }
  }
}

export async function deleteMusicTrackAction(id: string): Promise<TVoidActionState> {
  if (!(await requireAuth())) return { success: false, error: 'Unauthorized.' }
  try {
    await deleteMusicTrackById(id)
    revalidatePath('/')
    return { success: true }
  } catch {
    return { success: false, error: 'Failed to delete music track.' }
  }
}

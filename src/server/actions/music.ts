'use server'

import { revalidatePath } from 'next/cache'
import { insertMusicTrack, incrementTrackVote, decrementTrackVote } from '@/server/db/queries/music'
import type { TActionState, TVoidActionState } from '@/lib/action-types'
import type { MusicTrackSelect } from '@/server/db/schema'

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

'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { deleteRsvp } from '@/server/db/queries/rsvp'
import { approveGuestbookEntry, deleteGuestbookEntry } from '@/server/db/queries/guestbook'
import { insertGalleryPhoto, deleteGalleryPhotoById } from '@/server/db/queries/gallery'
import type { TVoidActionState, TActionState } from '@/lib/action-types'
import type { TAtelierGalleryPhoto } from '@/modules/atelier/@types'

const SESSION_COOKIE = 'atelier_auth'

async function requireAuth(): Promise<boolean> {
  const passphrase = process.env.ATELIER_PASSPHRASE
  if (!passphrase) return false
  const cookieStore = await cookies()
  return cookieStore.get(SESSION_COOKIE)?.value === passphrase
}

export async function loginToAtelier(passphrase: string): Promise<TVoidActionState> {
  const expected = process.env.ATELIER_PASSPHRASE
  if (!expected) {
    return { success: false, error: 'Admin access is not configured on this server.' }
  }
  if (passphrase !== expected) {
    return { success: false, error: 'Invalid passphrase. Access denied.' }
  }
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, passphrase, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  })
  revalidatePath('/atelier')
  return { success: true }
}

export async function logoutFromAtelier(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
  revalidatePath('/atelier')
}

export async function deleteRsvpAction(id: string): Promise<TVoidActionState> {
  if (!(await requireAuth())) return { success: false, error: 'Unauthorized.' }
  try {
    await deleteRsvp(id)
    revalidatePath('/atelier')
    return { success: true }
  } catch {
    return { success: false, error: 'Failed to delete RSVP record.' }
  }
}

export async function approveGuestbookEntryAction(id: string): Promise<TVoidActionState> {
  if (!(await requireAuth())) return { success: false, error: 'Unauthorized.' }
  try {
    await approveGuestbookEntry(id)
    revalidatePath('/atelier')
    revalidatePath('/guestbook')
    return { success: true }
  } catch {
    return { success: false, error: 'Failed to approve entry.' }
  }
}

export async function deleteGuestbookEntryAdminAction(id: string): Promise<TVoidActionState> {
  if (!(await requireAuth())) return { success: false, error: 'Unauthorized.' }
  try {
    await deleteGuestbookEntry(id)
    revalidatePath('/atelier')
    revalidatePath('/guestbook')
    return { success: true }
  } catch {
    return { success: false, error: 'Failed to delete entry.' }
  }
}

export async function addGalleryPhotoAction(
  url: string,
  caption: string,
): Promise<TActionState<TAtelierGalleryPhoto>> {
  if (!(await requireAuth())) return { success: false, error: 'Unauthorized.' }
  if (!url.trim()) return { success: false, error: 'Image URL is required.' }
  if (!caption.trim()) return { success: false, error: 'Caption is required.' }
  try {
    const row = await insertGalleryPhoto({ url: url.trim(), caption: caption.trim() })
    revalidatePath('/gallery')
    revalidatePath('/atelier')
    return {
      success: true,
      data: {
        id: row.id,
        url: row.url,
        caption: row.caption,
        sortOrder: row.sortOrder,
        createdAt: row.createdAt,
      },
    }
  } catch {
    return { success: false, error: 'Failed to add photo.' }
  }
}

export async function deleteGalleryPhotoAction(id: string): Promise<TVoidActionState> {
  if (!(await requireAuth())) return { success: false, error: 'Unauthorized.' }
  try {
    await deleteGalleryPhotoById(id)
    revalidatePath('/gallery')
    revalidatePath('/atelier')
    return { success: true }
  } catch {
    return { success: false, error: 'Failed to delete photo.' }
  }
}

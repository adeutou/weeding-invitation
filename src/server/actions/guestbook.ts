'use server'

import { revalidatePath } from 'next/cache'
import { insertGuestbookEntry } from '@/server/db/queries/guestbook'
import type { TActionState } from '@/lib/action-types'
import type { TGuestbookFormData, TGuestbookEntry } from '@/modules/guestbook/@types'

const VALID_STAMP_TYPES = new Set(['botanical', 'gold_ring', 'wax_seal', 'vintage_dove'])

export async function submitGuestbookEntryAction(
  data: TGuestbookFormData,
): Promise<TActionState<TGuestbookEntry>> {
  try {
    if (!data.name.trim()) {
      return { success: false, error: 'Please sign your name to submit.' }
    }
    if (!data.message.trim()) {
      return { success: false, error: 'Please leave a wish before submitting.' }
    }
    if (data.message.trim().length > 500) {
      return { success: false, error: 'Messages must be under 500 characters.' }
    }
    if (!VALID_STAMP_TYPES.has(data.stampType)) {
      return { success: false, error: 'Invalid stamp selection.' }
    }

    const row = await insertGuestbookEntry({
      name: data.name.trim(),
      message: data.message.trim(),
      stampType: data.stampType,
    })

    revalidatePath('/guestbook')

    return {
      success: true,
      data: {
        id: row.id,
        name: row.name,
        message: row.message,
        stampType: row.stampType,
        isApproved: row.isApproved,
        createdAt: row.createdAt,
      },
    }
  } catch {
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
}

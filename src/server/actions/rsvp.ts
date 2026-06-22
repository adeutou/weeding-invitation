'use server'

import { revalidatePath } from 'next/cache'
import { insertRsvp } from '@/server/db/queries/rsvp'
import type { TActionState } from '@/lib/action-types'
import type { TRsvpFormData, TRsvpEntry } from '@/modules/rsvp/@types'

function isValidEmail(email: string): boolean {
  return email.includes('@') && email.includes('.')
}

export async function submitRsvpAction(
  data: TRsvpFormData,
): Promise<TActionState<TRsvpEntry>> {
  try {
    if (!data.name.trim()) {
      return { success: false, error: 'Please enter your full invitation name.' }
    }
    if (!isValidEmail(data.email.trim())) {
      return { success: false, error: 'A valid email address is required.' }
    }
    if (data.guestsCount < 1 || data.guestsCount > 10) {
      return { success: false, error: 'Guest count must be between 1 and 10.' }
    }

    const row = await insertRsvp({
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      attendance: data.attendance,
      guestsCount: data.guestsCount,
      dietary: data.dietary,
      dietaryDetails: data.dietaryDetails.trim() || null,
      needsShuttle: data.needsShuttle,
      songRequest: data.songRequest.trim() || null,
    })

    revalidatePath('/rsvp')

    return {
      success: true,
      data: {
        id: row.id,
        name: row.name,
        email: row.email,
        attendance: row.attendance,
        guestsCount: row.guestsCount,
        dietary: row.dietary,
        dietaryDetails: row.dietaryDetails,
        needsShuttle: row.needsShuttle,
        songRequest: row.songRequest,
        createdAt: row.createdAt,
      },
    }
  } catch {
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
}

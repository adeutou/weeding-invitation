export type TAttendanceStatus = 'attending' | 'declined' | 'uncertain'

export type TDietaryPreference =
  | 'none'
  | 'vegetarian'
  | 'vegan'
  | 'gluten-free'
  | 'other'

export interface TRsvpFormData {
  name: string
  email: string
  attendance: TAttendanceStatus
  guestsCount: number
  dietary: TDietaryPreference
  dietaryDetails: string
  needsShuttle: boolean
  songRequest: string
}

export interface TRsvpEntry {
  id: string
  name: string
  email: string
  attendance: TAttendanceStatus
  guestsCount: number
  dietary: TDietaryPreference
  dietaryDetails: string | null
  needsShuttle: boolean
  songRequest: string | null
  createdAt: Date
}

export type TAtelierTab = 'rsvps' | 'guestbook' | 'gallery'

export interface TAtelierRsvp {
  id: string
  name: string
  email: string
  attendance: 'attending' | 'declined' | 'uncertain'
  guestsCount: number
  dietary: string
  dietaryDetails: string | null
  needsShuttle: boolean
  songRequest: string | null
  createdAt: Date
}

export interface TAtelierGuestbookEntry {
  id: string
  name: string
  message: string
  stampType: string
  isApproved: boolean
  createdAt: Date
}

export interface TAtelierGalleryPhoto {
  id: string
  url: string
  caption: string
  sortOrder: number
  createdAt: Date
}

export interface AtelierDashboardProps {
  initialRsvps: TAtelierRsvp[]
  initialEntries: TAtelierGuestbookEntry[]
  initialPhotos: TAtelierGalleryPhoto[]
}

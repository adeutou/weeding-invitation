export type TStampType = 'botanical' | 'gold_ring' | 'wax_seal' | 'vintage_dove'

export interface TGuestbookFormData {
  name: string
  message: string
  stampType: TStampType
}

export interface TGuestbookEntry {
  id: string
  name: string
  message: string
  stampType: TStampType
  isApproved: boolean
  createdAt: Date
}

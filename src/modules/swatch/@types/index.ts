export interface TSwatch {
  name: string
  colorHex: string
  description: string
}

export interface TSwatchBoardProps {
  title?: string
  description?: string
  swatches?: TSwatch[]
}

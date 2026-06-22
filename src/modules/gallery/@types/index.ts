export interface TGalleryPhoto {
  id: string
  url: string
  caption: string
}

export interface TGallerySectionProps {
  photos?: TGalleryPhoto[]
}

export type CardDiff = -2 | -1 | 0 | 1 | 2

export interface VisibleCard {
  photo: TGalleryPhoto
  index: number
  diff: CardDiff
}

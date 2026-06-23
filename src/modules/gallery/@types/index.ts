export interface TGalleryPhoto {
  id: string
  url: string
  caption: string
}

export interface TGallerySectionProps {
  photos?: TGalleryPhoto[]
}

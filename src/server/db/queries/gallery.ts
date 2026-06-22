import 'server-only'
import { eq, asc } from 'drizzle-orm'
import { db } from '../index'
import { galleryPhotosTable } from '../schema'
import type { GalleryPhotoInsert, GalleryPhotoSelect } from '../schema'

export async function getAllGalleryPhotos(): Promise<GalleryPhotoSelect[]> {
  return db
    .select()
    .from(galleryPhotosTable)
    .orderBy(asc(galleryPhotosTable.sortOrder), asc(galleryPhotosTable.createdAt))
}

export async function insertGalleryPhoto(data: GalleryPhotoInsert): Promise<GalleryPhotoSelect> {
  const rows = await db.insert(galleryPhotosTable).values(data).returning()
  const row = rows[0]
  if (!row) throw new Error('Gallery photo insert returned no row')
  return row
}

export async function deleteGalleryPhotoById(id: string): Promise<void> {
  await db.delete(galleryPhotosTable).where(eq(galleryPhotosTable.id, id))
}

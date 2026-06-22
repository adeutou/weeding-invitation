import 'server-only'
import { put, del } from '@vercel/blob'

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
])

const MAX_BYTES = 8 * 1024 * 1024

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9.\-_]/g, '_')
}

export async function uploadGalleryPhoto(file: File): Promise<string> {
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    throw new Error(
      'Unsupported format. Accepted types: JPEG, PNG, WebP, AVIF.'
    )
  }

  if (file.size > MAX_BYTES) {
    throw new Error('File exceeds the 8 MB limit.')
  }

  const slug = `gallery/${Date.now()}-${sanitizeFilename(file.name)}`
  const { url } = await put(slug, file, { access: 'private' })

  return url
}

export async function deleteGalleryPhoto(blobUrl: string): Promise<void> {
  await del(blobUrl)
}

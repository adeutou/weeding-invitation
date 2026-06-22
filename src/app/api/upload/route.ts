import { type NextRequest, NextResponse } from 'next/server'
import { uploadGalleryPhoto } from '@/server/blob/upload'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file')

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided.' }, { status: 400 })
  }

  try {
    const url = await uploadGalleryPhoto(file)
    return NextResponse.json({ url })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Upload failed.'
    return NextResponse.json({ error: message }, { status: 422 })
  }
}

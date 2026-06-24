import { type NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const imageUrl = searchParams.get('url')

  if (!imageUrl) {
    return new NextResponse('Missing url parameter', { status: 400 })
  }

  
  if (!imageUrl.startsWith('https://') || !imageUrl.includes('.private.blob.vercel-storage.com/')) {
    return new NextResponse('Forbidden: Only private Vercel Blobs are allowed', { status: 403 })
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) {
    return new NextResponse('Server configuration error: Token missing', { status: 500 })
  }

  try {
    const res = await fetch(imageUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.ok) {
      return new NextResponse(`Failed to fetch image from storage: ${res.statusText}`, { status: res.status })
    }

    const contentType = res.headers.get('content-type') || 'image/jpeg'
    const headers = new Headers()
    headers.set('Content-Type', contentType)
    
    headers.set('Cache-Control', 'public, max-age=31536000, immutable')

    return new NextResponse(res.body, {
      status: 200,
      headers
    })
  } catch (error) {
    console.error('Error proxying image:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

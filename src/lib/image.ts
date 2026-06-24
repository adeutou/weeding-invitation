export function getDisplayImageUrl(url: string): string {
  if (!url) return ''
  
  if (url.includes('.private.blob.vercel-storage.com/')) {
    return `/api/gallery/image?url=${encodeURIComponent(url)}`
  }
  
  return url
}

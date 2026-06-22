'use client'

import { useCallback, useState } from 'react'
import type { TGalleryPhoto, VisibleCard, CardDiff } from '../@types'

export function useCarousel(photos: TGalleryPhoto[]) {
  const [activeIndex, setActiveIndex] = useState(0)
  const len = photos.length

  const next = useCallback(() => {
    if (len === 0) return
    setActiveIndex((prev) => (prev + 1) % len)
  }, [len])

  const prev = useCallback(() => {
    if (len === 0) return
    setActiveIndex((prev) => (prev - 1 + len) % len)
  }, [len])

  const goTo = useCallback(
    (index: number) => {
      if (len === 0) return
      setActiveIndex(Math.max(0, Math.min(index, len - 1)))
    },
    [len],
  )

  const visibleCards: VisibleCard[] = []

  for (let i = 0; i < len; i++) {
    const photo = photos[i]
    if (!photo) continue

    let diff = i - activeIndex
    if (diff > Math.floor(len / 2)) diff -= len
    else if (diff < -Math.floor(len / 2)) diff += len

    if (Math.abs(diff) <= 2) {
      visibleCards.push({ photo, index: i, diff: diff as CardDiff })
    }
  }

  return { activeIndex, next, prev, goTo, visibleCards }
}

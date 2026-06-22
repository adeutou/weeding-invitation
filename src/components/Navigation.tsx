'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/cn'

interface NavItem {
  label: string
  href: string
  highlight?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Our Story', href: '/#our-story-section' },
  { label: 'The Schedule', href: '/#schedule-timeline-section' },
  { label: 'Attire Theme', href: '/#dresscode-section' },
  { label: 'Provence Guide', href: '/#travel-guide-section' },
  { label: 'RSVP', href: '/rsvp', highlight: true },
  { label: 'Blessings', href: '/guestbook' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Playlist', href: '/#ballplay-section' },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="hidden lg:flex items-center gap-8 text-[11px] font-sans tracking-[0.2em] uppercase font-medium">
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href.startsWith('/') &&
          !item.href.includes('#') &&
          pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'transition-colors hover:text-gold cursor-pointer',
              item.highlight && 'font-semibold text-rose hover:text-rose/80',
              isActive && !item.highlight && 'text-gold',
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

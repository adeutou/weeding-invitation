'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiUsers, FiBookOpen, FiCamera, FiLogOut, FiArrowLeft } from 'react-icons/fi'
import { logoutFromAtelier } from '@/server/actions/atelier'
import { RsvpTab } from './tabs/RsvpTab'
import { GuestbookTab } from './tabs/GuestbookTab'
import { GalleryTab } from './tabs/GalleryTab'
import type { AtelierDashboardProps, TAtelierTab } from '../@types'

interface NavItem {
  tab: TAtelierTab
  label: string
  icon: React.ReactNode
}

const NAV_ITEMS: NavItem[] = [
  { tab: 'rsvps', label: 'RSVPs', icon: <FiUsers className="w-4 h-4" /> },
  { tab: 'guestbook', label: 'Guestbook', icon: <FiBookOpen className="w-4 h-4" /> },
  { tab: 'gallery', label: 'Gallery', icon: <FiCamera className="w-4 h-4" /> },
]

export function AtelierDashboard({ initialRsvps, initialEntries, initialPhotos }: AtelierDashboardProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TAtelierTab>('rsvps')
  const [isPending, startTransition] = useTransition()

  function handleLogout() {
    startTransition(async () => {
      await logoutFromAtelier()
      router.refresh()
    })
  }

  return (
    <div className="min-h-screen bg-charcoal flex">
      <aside className="w-64 shrink-0 bg-[#111] border-r border-white/5 flex flex-col py-8 px-5">
        <div className="mb-8">
          <h1 className="font-serif text-lg text-cream font-light tracking-wide">Atelier</h1>
          <p className="text-[10px] text-stone-500 font-sans uppercase tracking-[0.2em] mt-0.5">
            Admin Portal
          </p>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {NAV_ITEMS.map(item => (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-sans text-left transition-colors cursor-pointer ${activeTab === item.tab ? 'bg-gold/10 text-gold border border-gold/20' : 'text-stone-400 hover:text-cream hover:bg-white/5 border border-transparent'}`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex flex-col gap-2 mt-auto pt-6 border-t border-white/5">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs text-stone-400 hover:text-cream hover:bg-white/5 transition-colors font-sans"
          >
            <FiArrowLeft className="w-3.5 h-3.5" />
            Back to Invitation
          </Link>
          <button
            onClick={handleLogout}
            disabled={isPending}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs text-stone-400 hover:text-rose hover:bg-rose/5 transition-colors font-sans cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed w-full text-left"
          >
            {isPending ? (
              <div className="w-3.5 h-3.5 border-2 border-stone-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <FiLogOut className="w-3.5 h-3.5" />
            )}
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        <header className="mb-8">
          <h2 className="font-serif text-2xl text-cream font-light">
            {NAV_ITEMS.find(n => n.tab === activeTab)?.label}
          </h2>
          <div className="w-10 h-px bg-gold/40 mt-2" />
        </header>

        {activeTab === 'rsvps' && <RsvpTab initialRsvps={initialRsvps} />}
        {activeTab === 'guestbook' && <GuestbookTab initialEntries={initialEntries} />}
        {activeTab === 'gallery' && <GalleryTab initialPhotos={initialPhotos} />}
      </main>
    </div>
  )
}

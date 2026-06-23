import Link from 'next/link'
import { FiSettings } from 'react-icons/fi'
import { Navigation } from '@/components/Navigation'
import { AudioToggle } from '@/modules/audio/views/AudioToggle'

interface HeaderProps {
  groomInitial?: string
  brideInitial?: string
}

export function Header({ groomInitial = 'C', brideInitial = 'C' }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-cream/80 backdrop-blur-md border-b border-taupe/40 px-6 py-4 flex items-center justify-between">
      <Link
        href="/"
        className="flex items-center gap-1.5 group"
        aria-label="Return to top"
      >
        <span className="font-serif text-sm font-semibold tracking-widest text-charcoal group-hover:text-gold transition-colors">
          {brideInitial} &amp; {groomInitial}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
        <span className="font-cursive text-base text-gold italic">monogram</span>
      </Link>

      <Navigation />

      <div className="flex items-center gap-2.5">
        <Link
          href="/atelier"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#EDF1F9] border border-taupe/60 hover:border-gold/60 text-charcoal font-medium text-xs rounded-lg transition-all"
          title="Open Couples Atelier Studio Dashboard"
        >
          <FiSettings className="w-3.5 h-3.5 text-gold-dark shrink-0" />
          <span className="font-sans uppercase text-[9px] tracking-widest">Atelier</span>
        </Link>

        <AudioToggle />
      </div>
    </header>
  )
}

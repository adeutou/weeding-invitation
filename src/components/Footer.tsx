interface FooterProps {
  groomName?: string
  brideName?: string
  venueName?: string
  venueLocation?: string
  weddingDateReadable?: string
}

export function Footer({
  groomName = 'Charles',
  brideName = 'Clara',
  venueName = 'Château de la Rose',
  venueLocation = 'Provence, France',
  weddingDateReadable = 'September 19th, 2026',
}: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-cream pt-16 pb-12 px-6 border-t border-taupe/40 text-center text-charcoal select-none animate-fade-in">
      <div className="text-gold/40 w-12 h-12 mx-auto mb-4">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="50" cy="50" r="30" />
          <path d="M50,20 Q60,35 70,50 Q60,65 50,80 Q40,65 30,50 Q40,35 50,20 Z" />
        </svg>
      </div>

      <h3 className="font-serif text-xl font-light text-charcoal tracking-wider">
        {groomName}{' '}
        <span className="handwriting text-gold text-2xl lowercase">&amp;</span>{' '}
        {brideName}
      </h3>

      <p className="text-[10px] text-stone-400 font-sans tracking-[0.2em] uppercase mt-2">
        {venueName}, {venueLocation} &bull; {weddingDateReadable}
      </p>

      <div className="w-16 h-px bg-gold/25 mx-auto my-6" />

      <p className="text-[11px] text-stone-400 font-serif italic max-w-sm mx-auto">
        Crafted in collaboration with our family, friends, and elders. All registries and RSVPs are secured.
      </p>

      <p className="text-[10px] text-stone-400/60 font-sans tracking-wide mt-2">
        &copy; {year} {groomName} &amp; {brideName}. All Rights Reserved.
      </p>
    </footer>
  )
}

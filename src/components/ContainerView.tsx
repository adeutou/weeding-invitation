import { Suspense } from 'react'
import { ErrorBoundaryWrapper } from '@/components/ErrorBoundaryWrapper'

function DefaultLoadingState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] gap-4 py-16">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border border-gold/30" />
        <div className="absolute inset-0 rounded-full border-t border-gold animate-spin" />
      </div>
      <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-sans animate-pulse">
        Loading…
      </p>
    </div>
  )
}

function AtelierLoadingState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] gap-5 py-16 bg-charcoal/5 rounded-2xl">
      <div className="flex items-center gap-2.5 mb-2">
        <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
        <span className="font-serif text-xs tracking-[0.2em] uppercase font-bold text-charcoal">
          Couples Studio
        </span>
      </div>

      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border border-gold/20" />
        <div className="absolute inset-0 rounded-full border-t-2 border-gold animate-spin" />
        <div className="absolute inset-2 rounded-full border border-gold/10" />
      </div>

      <div className="flex flex-col items-center gap-1">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-sans font-bold animate-pulse">
          Atelier Loading
        </p>
        <p className="text-[10px] text-stone-400 font-serif italic">
          Preparing your workspace…
        </p>
      </div>

      <div className="flex gap-1.5 mt-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-gold/40 animate-pulse"
            style={{ animationDelay: `${i * 200}ms` }}
          />
        ))}
      </div>
    </div>
  )
}

interface ContainerViewProps {
  children: React.ReactNode
  variant?: 'default' | 'atelier'
  errorFallback?: React.ReactNode
  onErrorReset?: () => void
}

export function ContainerView({
  children,
  variant = 'default',
  errorFallback,
  onErrorReset,
}: ContainerViewProps) {
  const loadingFallback =
    variant === 'atelier' ? <AtelierLoadingState /> : <DefaultLoadingState />

  return (
    <ErrorBoundaryWrapper
      fallback={errorFallback}
      {...(onErrorReset !== undefined ? { onReset: onErrorReset } : {})}
    >
      <Suspense fallback={loadingFallback}>{children}</Suspense>
    </ErrorBoundaryWrapper>
  )
}

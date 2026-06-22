import { cn } from '@/lib/cn'

interface CardProps {
  children: React.ReactNode
  variant?: 'white' | 'parchment' | 'cream' | 'charcoal'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  elevated?: boolean
  hoverable?: boolean
  className?: string
}

export function Card({
  children,
  variant = 'white',
  padding = 'md',
  elevated = false,
  hoverable = false,
  className,
}: CardProps) {
  const variants = {
    white: 'bg-white border border-taupe',
    parchment: 'bg-parchment border border-taupe/60',
    cream: 'bg-cream border border-taupe/50',
    charcoal: 'bg-charcoal border border-white/10 text-parchment',
  }

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8 sm:p-10',
  }

  const shadowClass = elevated
    ? 'shadow-[0_20px_50px_rgba(26,26,26,0.07)]'
    : 'shadow-2xs'

  return (
    <div
      className={cn(
        'rounded-2xl',
        variants[variant],
        paddings[padding],
        shadowClass,
        hoverable &&
          'transition-all duration-500 hover:shadow-[0_25px_60px_rgba(26,26,26,0.10)] hover:rotate-[0.3deg]',
        className,
      )}
    >
      {children}
    </div>
  )
}

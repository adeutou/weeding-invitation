'use client'

import { FiLoader } from 'react-icons/fi'
import { cn } from '@/lib/cn'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'gold' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  className?: string
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  loading = false,
  onClick,
  className,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-sans uppercase tracking-[0.2em] font-bold rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-charcoal text-white hover:bg-black shadow-sm',
    gold: 'bg-gradient-to-r from-gold to-gold-dark text-neutral-900 shadow-sm hover:shadow-md active:scale-[0.99]',
    ghost: 'border border-taupe text-stone-500 hover:text-charcoal hover:border-charcoal/40 bg-transparent',
    danger: 'bg-rose/90 text-white hover:bg-rose border border-rose/80',
  }

  const sizes = {
    sm: 'px-3.5 py-1.5 text-[9px]',
    md: 'px-4 py-2 text-[10px]',
    lg: 'px-6 py-3 text-xs',
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {loading && <FiLoader className="w-3.5 h-3.5 animate-spin shrink-0" />}
      {children}
    </button>
  )
}

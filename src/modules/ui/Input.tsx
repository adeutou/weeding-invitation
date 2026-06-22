'use client'

import { cn } from '@/lib/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
  surface?: 'white' | 'cream' | 'parchment'
}

export function Input({ label, error, hint, surface = 'white', className, id, ...props }: InputProps) {
  const inputId = id ?? `input-${label.toLowerCase().replace(/\s+/g, '-')}`

  const surfaces = {
    white: 'bg-white',
    cream: 'bg-cream',
    parchment: 'bg-parchment',
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={cn(
          'w-full border rounded-xl px-4 py-2.5 font-serif text-sm text-charcoal placeholder:text-stone-400 transition-colors',
          surfaces[surface],
          error ? 'border-rose' : 'border-taupe',
          className,
        )}
        {...props}
      />
      {error && (
        <p className="text-[10px] text-rose font-sans font-medium">{error}</p>
      )}
      {hint && !error && (
        <p className="text-[10px] text-stone-400 font-sans italic">{hint}</p>
      )}
    </div>
  )
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  hint?: string
  surface?: 'white' | 'cream' | 'parchment'
}

export function Textarea({
  label,
  error,
  hint,
  surface = 'white',
  className,
  id,
  rows = 3,
  ...props
}: TextareaProps) {
  const textareaId = id ?? `textarea-${label.toLowerCase().replace(/\s+/g, '-')}`

  const surfaces = {
    white: 'bg-white',
    cream: 'bg-cream',
    parchment: 'bg-parchment',
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={textareaId}
        className="text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold"
      >
        {label}
      </label>
      <textarea
        id={textareaId}
        rows={rows}
        className={cn(
          'w-full border rounded-xl px-4 py-3 font-serif text-sm text-charcoal placeholder:text-stone-400 transition-colors leading-relaxed resize-none',
          surfaces[surface],
          error ? 'border-rose' : 'border-taupe',
          className,
        )}
        {...props}
      />
      {error && (
        <p className="text-[10px] text-rose font-sans font-medium">{error}</p>
      )}
      {hint && !error && (
        <p className="text-[10px] text-stone-400 font-sans italic">{hint}</p>
      )}
    </div>
  )
}

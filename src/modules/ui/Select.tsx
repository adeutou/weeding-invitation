'use client'

import { cn } from '@/lib/cn'

export interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  label: string
  options: readonly SelectOption[]
  value: string
  onChange: (value: string) => void
  error?: string
  hint?: string
  disabled?: boolean
  surface?: 'white' | 'cream' | 'parchment'
  id?: string
  className?: string
}

export function Select({
  label,
  options,
  value,
  onChange,
  error,
  hint,
  disabled = false,
  surface = 'parchment',
  id,
  className,
}: SelectProps) {
  const selectId = id ?? `select-${label.toLowerCase().replace(/\s+/g, '-')}`

  const surfaces = {
    white: 'bg-white',
    cream: 'bg-cream',
    parchment: 'bg-parchment',
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={selectId}
        className="text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold"
      >
        {label}
      </label>
      <select
        id={selectId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={cn(
          'w-full border rounded-xl px-4 py-2.5 text-sm text-charcoal transition-colors cursor-pointer appearance-none font-serif',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          surfaces[surface],
          error ? 'border-rose' : 'border-taupe/60',
          className,
        )}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23A48039' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 14px center',
          paddingRight: '36px',
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-[10px] text-rose font-sans font-medium">{error}</p>
      )}
      {hint && !error && (
        <p className="text-[10px] text-stone-400 font-sans italic">{hint}</p>
      )}
    </div>
  )
}

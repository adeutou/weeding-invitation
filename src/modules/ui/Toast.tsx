'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { FiCheckCircle, FiAlertCircle, FiInfo, FiAlertTriangle, FiX } from 'react-icons/fi'
import { cn } from '@/lib/cn'

type ToastVariant = 'success' | 'error' | 'info' | 'warning'

interface ToastData {
  id: string
  message: string
  variant: ToastVariant
  duration: number
}

interface ToastContextValue {
  toast: (message: string, variant?: ToastVariant, duration?: number) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}

const ICONS: Record<ToastVariant, React.ElementType> = {
  success: FiCheckCircle,
  error: FiAlertCircle,
  info: FiInfo,
  warning: FiAlertTriangle,
}

const STYLES: Record<ToastVariant, string> = {
  success: 'bg-sage-light border-sage/30 text-stone-700',
  error: 'bg-rose/10 border-rose/30 text-rose',
  info: 'bg-gold/10 border-gold/30 text-gold-dark',
  warning: 'bg-amber-50 border-amber-200 text-amber-800',
}

const ICON_STYLES: Record<ToastVariant, string> = {
  success: 'text-sage',
  error: 'text-rose',
  info: 'text-gold',
  warning: 'text-amber-600',
}

interface ToastItemProps {
  data: ToastData
  onDismiss: (id: string) => void
}

function ToastItem({ data, onDismiss }: ToastItemProps) {
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const frameId = requestAnimationFrame(() => setVisible(true))

    timerRef.current = setTimeout(() => {
      setVisible(false)
      setTimeout(() => onDismiss(data.id), 300)
    }, data.duration)

    return () => {
      cancelAnimationFrame(frameId)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [data.id, data.duration, onDismiss])

  const Icon = ICONS[data.variant]

  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-3 w-full max-w-sm px-4 py-3 rounded-xl border shadow-[0_8px_24px_rgba(26,26,26,0.08)] font-serif text-sm transition-all duration-300',
        STYLES[data.variant],
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
      )}
    >
      <Icon className={cn('w-4 h-4 shrink-0 mt-0.5', ICON_STYLES[data.variant])} />
      <p className="flex-1 text-xs leading-relaxed">{data.message}</p>
      <button
        onClick={() => {
          setVisible(false)
          setTimeout(() => onDismiss(data.id), 300)
        }}
        className="shrink-0 text-stone-400 hover:text-charcoal transition-colors cursor-pointer"
        aria-label="Dismiss"
      >
        <FiX className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

interface ToastProviderProps {
  children: React.ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback(
    (message: string, variant: ToastVariant = 'info', duration = 4000) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`
      setToasts((prev) => [...prev, { id, message, variant, duration }])
    },
    [],
  )

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {mounted &&
        createPortal(
          <div
            aria-live="polite"
            aria-atomic="false"
            className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 items-end"
          >
            {toasts.map((t) => (
              <ToastItem key={t.id} data={t} onDismiss={dismiss} />
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  )
}

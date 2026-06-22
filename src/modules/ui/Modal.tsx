'use client'

import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { FiX } from 'react-icons/fi'
import { cn } from '@/lib/cn'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  showCloseButton?: boolean
  closeOnOverlayClick?: boolean
}

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
}: ModalProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (!isOpen) return
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleEscape])

  if (!isOpen) return null

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-5xl',
    full: 'max-w-[95vw] max-h-[95vh]',
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-charcoal/40 backdrop-blur-md"
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      <div
        className={cn(
          'relative w-full bg-cream border border-taupe rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.15)] overflow-hidden',
          sizes[size],
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between border-b border-taupe/40 px-6 py-4">
            {title && (
              <h2 className="font-serif text-lg font-light text-charcoal tracking-wide">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center text-stone-400 hover:text-charcoal hover:bg-taupe/30 transition-colors cursor-pointer',
                  !title && 'ml-auto',
                )}
                aria-label="Close modal"
              >
                <FiX className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
        <div className="overflow-y-auto max-h-[80vh]">{children}</div>
      </div>
    </div>,
    document.body,
  )
}

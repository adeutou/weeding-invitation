'use client'

import { useState, useTransition, useOptimistic } from 'react'
import { submitGuestbookEntryAction } from '@/server/actions/guestbook'
import type { TGuestbookEntry, TGuestbookFormData, TStampType } from '../@types'

export interface UseGuestbookFormReturn {
  entries: TGuestbookEntry[]
  name: string
  message: string
  stampType: TStampType
  setName: (value: string) => void
  setMessage: (value: string) => void
  setStampType: (value: TStampType) => void
  submit: (e: React.FormEvent) => void
  isPending: boolean
  error: string | null
  successMessage: string | null
}

export function useGuestbookForm(initialEntries: TGuestbookEntry[]): UseGuestbookFormReturn {
  const [realEntries, setRealEntries] = useState<TGuestbookEntry[]>(initialEntries)
  const [optimisticEntries, addOptimisticEntry] = useOptimistic(
    realEntries,
    (state: TGuestbookEntry[], newEntry: TGuestbookEntry): TGuestbookEntry[] => [
      newEntry,
      ...state,
    ],
  )
  const [isPending, startTransition] = useTransition()

  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [stampType, setStampType] = useState<TStampType>('botanical')
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)

    if (!name.trim()) {
      setError('Please sign your name before submitting.')
      return
    }
    if (!message.trim()) {
      setError('Please leave a wish before submitting.')
      return
    }

    const formData: TGuestbookFormData = {
      name: name.trim(),
      message: message.trim(),
      stampType,
    }

    const optimistic: TGuestbookEntry = {
      id: `optimistic-${Date.now()}`,
      name: formData.name,
      message: formData.message,
      stampType: formData.stampType,
      isApproved: true,
      createdAt: new Date(),
    }

    startTransition(async () => {
      addOptimisticEntry(optimistic)
      const result = await submitGuestbookEntryAction(formData)
      if (result.success) {
        setRealEntries(prev => [result.data, ...prev])
        setName('')
        setMessage('')
        setStampType('botanical')
        setSuccessMessage('Your blessing has been lovingly affixed to the memory wall.')
      } else {
        setError(result.error)
      }
    })
  }

  return {
    entries: optimisticEntries,
    name,
    message,
    stampType,
    setName,
    setMessage,
    setStampType,
    submit,
    isPending,
    error,
    successMessage,
  }
}

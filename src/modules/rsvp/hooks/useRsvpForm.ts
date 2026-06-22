'use client'

import { useState, useTransition } from 'react'
import { submitRsvpAction } from '@/server/actions/rsvp'
import type { TRsvpFormData, TRsvpEntry, TAttendanceStatus, TDietaryPreference } from '../@types'

const INITIAL_FORM: TRsvpFormData = {
  name: '',
  email: '',
  attendance: 'attending',
  guestsCount: 1,
  dietary: 'none',
  dietaryDetails: '',
  needsShuttle: false,
  songRequest: '',
}

type RsvpStep = 'form' | 'confirmed'

export interface UseRsvpFormReturn {
  formData: TRsvpFormData
  setName: (value: string) => void
  setEmail: (value: string) => void
  setAttendance: (value: TAttendanceStatus) => void
  setGuestsCount: (value: number) => void
  setDietary: (value: TDietaryPreference) => void
  setDietaryDetails: (value: string) => void
  setNeedsShuttle: (value: boolean) => void
  setSongRequest: (value: string) => void
  step: RsvpStep
  submittedEntry: TRsvpEntry | null
  error: string | null
  isPending: boolean
  submit: (e: React.FormEvent) => void
  reset: () => void
}

export function useRsvpForm(): UseRsvpFormReturn {
  const [formData, setFormData] = useState<TRsvpFormData>(INITIAL_FORM)
  const [step, setStep] = useState<RsvpStep>('form')
  const [submittedEntry, setSubmittedEntry] = useState<TRsvpEntry | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const setName = (value: string) => setFormData(p => ({ ...p, name: value }))
  const setEmail = (value: string) => setFormData(p => ({ ...p, email: value }))
  const setAttendance = (value: TAttendanceStatus) =>
    setFormData(p => ({ ...p, attendance: value }))
  const setGuestsCount = (value: number) => setFormData(p => ({ ...p, guestsCount: value }))
  const setDietary = (value: TDietaryPreference) => setFormData(p => ({ ...p, dietary: value }))
  const setDietaryDetails = (value: string) => setFormData(p => ({ ...p, dietaryDetails: value }))
  const setNeedsShuttle = (value: boolean) => setFormData(p => ({ ...p, needsShuttle: value }))
  const setSongRequest = (value: string) => setFormData(p => ({ ...p, songRequest: value }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    startTransition(async () => {
      const result = await submitRsvpAction(formData)
      if (result.success) {
        setSubmittedEntry(result.data)
        setStep('confirmed')
      } else {
        setError(result.error)
      }
    })
  }

  const reset = () => {
    setStep('form')
    setSubmittedEntry(null)
    setError(null)
    setFormData(INITIAL_FORM)
  }

  return {
    formData,
    setName,
    setEmail,
    setAttendance,
    setGuestsCount,
    setDietary,
    setDietaryDetails,
    setNeedsShuttle,
    setSongRequest,
    step,
    submittedEntry,
    error,
    isPending,
    submit,
    reset,
  }
}

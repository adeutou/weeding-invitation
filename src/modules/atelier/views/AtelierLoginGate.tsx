'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { FiLock, FiAlertTriangle } from 'react-icons/fi'
import { loginToAtelier } from '@/server/actions/atelier'

export function AtelierLoginGate() {
  const router = useRouter()
  const [passphrase, setPassphrase] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!passphrase.trim()) return
    setError(null)
    startTransition(async () => {
      const result = await loginToAtelier(passphrase.trim())
      if (result.success) {
        router.refresh()
      } else {
        setError(result.error)
        setPassphrase('')
      }
    })
  }

  return (
    <main className="min-h-screen bg-charcoal flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold/10 border border-gold/20 mb-6">
            <FiLock className="w-6 h-6 text-gold" />
          </div>
          <h1 className="font-serif text-3xl text-cream font-light tracking-wide mb-1">
            Atelier Admin
          </h1>
          <p className="text-xs text-stone-400 font-serif italic tracking-wide">
            Private management portal — authorised access only
          </p>
        </div>

        <div className="bg-[#222] border border-white/5 rounded-2xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && (
              <div className="flex items-center gap-2 text-rose bg-rose/10 border border-rose/20 p-3 rounded-lg text-xs leading-relaxed font-serif">
                <FiAlertTriangle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="atelier-passphrase"
                className="text-[10px] text-stone-400 font-sans tracking-[0.2em] uppercase font-semibold"
              >
                Passphrase
              </label>
              <input
                id="atelier-passphrase"
                type="password"
                value={passphrase}
                onChange={e => setPassphrase(e.target.value)}
                placeholder="Enter the private key"
                disabled={isPending}
                autoFocus
                className="bg-charcoal text-cream text-sm border border-white/10 rounded-lg px-4 py-3 placeholder:text-stone-600 focus:border-gold/60 focus:outline-none transition-colors w-full"
              />
            </div>

            <button
              type="submit"
              disabled={isPending || !passphrase.trim()}
              className="w-full py-3 bg-gold text-neutral-900 font-sans text-xs tracking-[0.25em] font-semibold uppercase rounded-xl hover:bg-gold-dark transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
                  <span>VERIFYING...</span>
                </>
              ) : (
                'ENTER ATELIER'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[10px] text-stone-600 font-serif italic mt-6">
          Albert &amp; Clara · Atelier System
        </p>
      </div>
    </main>
  )
}

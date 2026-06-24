'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { FiPrinter, FiGlobe, FiInfo } from 'react-icons/fi'
import type { TWeddingConfig } from '@/modules/home/@types'

interface AdminQrCodeTabProps {
  localConfig: TWeddingConfig
}

export function AdminQrCodeTab({ localConfig }: AdminQrCodeTabProps) {
  const [siteUrl, setSiteUrl] = useState('')
  const [customTitle, setCustomTitle] = useState('Invitation de Mariage')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const envUrl = process.env.NEXT_PUBLIC_URL
    if (envUrl) {
      setSiteUrl(envUrl)
    } else if (typeof window !== 'undefined') {
      setSiteUrl(window.location.origin)
    }
    return () => setIsMounted(false)
  }, [])

  const groomShort = localConfig.groomName.replace('Monsieur ', '')
  const brideShort = localConfig.brideName.replace('Madame ', '')
  const groomInitial = groomShort.charAt(0)
  const brideInitial = brideShort.charAt(0)

  const encodedUrl = encodeURIComponent(siteUrl || 'https://google.com')
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedUrl}`

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print()
    }
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="bg-white p-6 rounded-2xl border border-taupe shadow-xs flex flex-col md:flex-row gap-6 items-start">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2 text-stone-600">
            <FiInfo className="w-4 h-4 text-gold-dark shrink-0" />
            <h4 className="font-serif text-sm font-semibold text-charcoal">
              Configuration du Code QR de l'Invitation
            </h4>
          </div>
          <p className="text-[11px] text-stone-400 font-serif italic leading-relaxed">
            Configurez l'adresse URL de destination de l'invitation. Par défaut, le système génère le QR code menant à l'adresse URL de votre site actuel, mais vous pouvez forcer un domaine de production spécifique.
          </p>

          <div className="space-y-3">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-stone-500 font-sans tracking-widest uppercase font-bold flex items-center gap-1">
                <FiGlobe className="w-3 h-3 text-gold" />
                URL de Destination
              </label>
              <input
                type="url"
                value={siteUrl}
                onChange={e => setSiteUrl(e.target.value)}
                placeholder="Ex : https://mon-mariage.fr"
                className="bg-cream text-charcoal text-sm border border-taupe rounded-lg px-4 py-2 focus:outline-none w-full"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] text-stone-500 font-sans tracking-widest uppercase font-bold">
                Titre de la Carte
              </label>
              <input
                type="text"
                value={customTitle}
                onChange={e => setCustomTitle(e.target.value)}
                maxLength={40}
                className="bg-cream text-charcoal text-sm border border-taupe rounded-lg px-4 py-2 focus:outline-none w-full"
              />
            </div>
          </div>

          <button
            onClick={handlePrint}
            className="px-5 py-3 bg-charcoal hover:bg-black text-white font-sans text-xs tracking-widest font-semibold uppercase rounded-lg transition-colors cursor-pointer flex items-center gap-2 self-start shadow-xs"
          >
            <FiPrinter className="w-4 h-4 text-gold" />
            <span>Exporter en PDF / Imprimer</span>
          </button>
        </div>

        <div className="w-full md:w-[320px] bg-parchment p-6 rounded-2xl border border-gold/25 shadow-sm flex flex-col items-center text-center font-serif shrink-0">
          <span className="text-[9px] uppercase tracking-widest text-stone-400 font-sans block mb-4">
            Aperçu de la Carte
          </span>
          <div className="bg-[#EDF1F9] border-2 border-gold/30 p-6 rounded-2xl w-full flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border border-gold/25 flex items-center justify-center mb-4 bg-white/70">
              <span className="font-serif text-sm tracking-widest text-gold-dark font-semibold">
                {brideInitial}&amp;{groomInitial}
              </span>
            </div>
            <h5 className="text-[8px] tracking-[0.2em] text-gold uppercase font-bold font-sans mb-0.5">
              {customTitle}
            </h5>
            <h3 className="text-lg font-light text-charcoal tracking-wide mb-2">
              {brideShort} &amp; {groomShort}
            </h3>
            <div className="w-10 h-px bg-gold/20 mb-4" />

            <div className="bg-white p-2.5 rounded-xl border border-taupe/40 inline-block mb-4">
              <img src={qrUrl} alt="QR Preview" className="w-36 h-36 block select-none" />
            </div>

            <p className="text-[10px] text-stone-500 font-sans tracking-[0.08em] uppercase font-semibold mb-1">
              Flashez pour répondre
            </p>
            <p className="text-[9px] text-stone-405 leading-normal italic px-2">
              Scannez le code QR pour confirmer votre RSVP et consulter les détails logistiques.
            </p>
          </div>
        </div>
      </div>

      {isMounted && createPortal(
        <div id="premium-qr-print-card-container" className="hidden print:flex print:fixed print:inset-0 print:bg-white print:z-[9999999] print:items-center print:justify-center print:flex-col">
          <style dangerouslySetInnerHTML={{
            __html: `
            @media print {
              body > *:not(#premium-qr-print-card-container) {
                display: none !important;
              }
              @page {
                size: A4 portrait;
                margin: 0;
              }
              body {
                margin: 0;
                background: white !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            }
          `}} />
          <div className="bg-[#EDF1F9] border-[3px] border-double border-gold/50 p-12 rounded-3xl max-w-sm text-center shadow-none flex flex-col items-center justify-center font-serif text-charcoal" style={{ width: '400px', minHeight: '520px' }}>
            <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center mb-6 bg-white">
              <span className="font-serif text-xl tracking-widest text-gold-dark font-semibold">
                {brideInitial}&amp;{groomInitial}
              </span>
            </div>
            <h2 className="text-[10px] tracking-[0.25em] text-gold uppercase font-bold font-sans mb-1">
              {customTitle}
            </h2>
            <h1 className="text-2xl font-light text-charcoal tracking-wide mb-3">
              {brideShort} &amp; {groomShort}
            </h1>
            <div className="w-16 h-px bg-gold/30 mb-6" />

            <div className="bg-white p-4 rounded-2xl border border-taupe/50 inline-block mb-6 shadow-sm">
              <img src={qrUrl} alt="QR Code" className="w-48 h-48 block" />
            </div>

            <p className="text-[12px] text-stone-500 font-sans tracking-widest uppercase font-semibold mb-2">
              Scannez pour Confirmer
            </p>
            <p className="text-xs text-stone-400 max-w-xs leading-relaxed italic px-4">
              Veuillez flasher ce code QR afin d'accéder au site officiel, RSVP et consulter les détails logistiques de notre union.
            </p>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

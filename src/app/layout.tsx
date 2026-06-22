import type { Metadata } from 'next'
import { Playfair_Display, Alex_Brush, Inter } from 'next/font/google'
import { ToastProvider } from '@/modules/ui/Toast'
import '@/styles/globals.css'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const alexBrush = Alex_Brush({
  subsets: ['latin'],
  variable: '--font-alex-brush',
  weight: '400',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Albert & Madame — A Wedding in Provence',
  description: 'A bespoke digital invitation for a luxury destination wedding in the heart of Provence, France.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className={`${playfairDisplay.variable} ${alexBrush.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-charcoal font-serif selection:bg-gold/30 selection:text-charcoal">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  )
}

import './globals.css'

import type { Metadata } from 'next'
import { dir } from 'i18next'
import { Inter } from 'next/font/google'
import { i18nConfig } from '@/i18n/settings'
import { ClientTranslationProvider } from '@/i18n'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Drift Zone NFT Game',
  description: 'Drift Zone',
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }))
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: {
    locale: string
  }
}) {
  return (
    <html lang={locale} dir={dir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

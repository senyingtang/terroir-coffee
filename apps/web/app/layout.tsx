import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import CustomCursor from '@/components/ui/CustomCursor'
import '@/styles/globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jost',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Terroir Coffee — Origin. Process. Cup.',
    template: '%s | Terroir Coffee',
  },
  description:
    "Single-origin specialty coffee sourced from the world's finest terroirs. From seed to cup.",
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    url: 'https://terroir-coffee.vercel.app',
    siteName: 'Terroir Coffee',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="zh-TW"
      className={`${cormorant.variable} ${jost.variable}`}
      suppressHydrationWarning
    >
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}

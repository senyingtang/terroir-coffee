import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import LenisProvider from '@/components/layout/LenisProvider'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <Nav />
      <main>{children}</main>
      <Footer />
    </LenisProvider>
  )
}

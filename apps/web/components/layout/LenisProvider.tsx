'use client'

import { useEffect } from 'react'
import { createLenis, destroyLenis } from '@/lib/lenis'

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = createLenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const id = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(id)
      destroyLenis()
    }
  }, [])

  return <>{children}</>
}

'use client'

import { useEffect, useRef, ReactNode, CSSProperties } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  className?: string
  style?: CSSProperties
  y?: number
}

export default function ScrollReveal({
  children,
  delay = 0,
  className = '',
  style,
  y = 28,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.style.opacity = '0'
    el.style.transform = `translateY(${y}px)`
    el.style.transition = `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          observer.disconnect()
        }
      },
      { threshold: 0.12 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, y])

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}

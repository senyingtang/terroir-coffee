'use client'

import { useEffect, useRef } from 'react'
import type { ManifestoData } from '@/lib/db-types'
import { MANIFESTO_FALLBACK } from '@/lib/db-types'

interface ManifestoProps {
  data?: ManifestoData
}

export default function Manifesto({ data }: ManifestoProps) {
  const d = data ?? MANIFESTO_FALLBACK
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const spans = container.querySelectorAll<HTMLSpanElement>('[data-word]')
    spans.forEach((span) => {
      span.style.opacity = '0'
      span.style.transform = 'translateY(16px)'
    })

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        spans.forEach((span, i) => {
          span.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`
          span.style.opacity = '1'
          span.style.transform = 'translateY(0)'
        })
        obs.disconnect()
      },
      { threshold: 0.2 }
    )
    obs.observe(container)
    return () => obs.disconnect()
  }, [d.quote])

  const words = d.quote.split(' ')

  return (
    <section
      className="py-32 md:py-48 px-8 md:px-16"
      style={{ backgroundColor: 'var(--bg3)' }}
    >
      <div className="mx-auto max-w-4xl text-center">
        <div className="flex justify-center mb-16">
          <div className="w-px h-16" style={{ backgroundColor: 'var(--line)' }} />
        </div>

        <p
          className="mb-8 text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-jost)]"
          style={{ color: 'var(--taupe)' }}
        >
          {d.label}
        </p>

        <div
          ref={containerRef}
          className="font-[family-name:var(--font-cormorant)] font-light italic leading-snug"
          style={{ fontSize: 'clamp(1.6rem, 3.5vw, 3rem)', color: 'var(--text)' }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              data-word
              style={{ display: 'inline-block', willChange: 'transform, opacity', marginRight: '0.3em' }}
            >
              {word}
            </span>
          ))}
        </div>

        <p
          className="mt-12 text-sm font-[family-name:var(--font-jost)]"
          style={{ color: 'var(--taupe)' }}
        >
          {d.attribution}
        </p>
      </div>
    </section>
  )
}

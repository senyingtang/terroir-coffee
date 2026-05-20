'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import type { OriginChapter } from '@/lib/db-types'
import { ORIGIN_CHAPTERS_FALLBACK } from '@/lib/db-types'

interface OriginStoryProps {
  chapters?: OriginChapter[]
}

export default function OriginStory({ chapters }: OriginStoryProps) {
  const data = chapters?.length ? chapters : ORIGIN_CHAPTERS_FALLBACK

  const scrollRef  = useRef<HTMLDivElement>(null)
  const panelRefs  = useRef<(HTMLDivElement | null)[]>([])
  const textRefs   = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const observers: IntersectionObserver[] = []

    panelRefs.current.forEach((panel, i) => {
      if (!panel) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(i) },
        { root: container, threshold: 0.5 }
      )
      obs.observe(panel)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [data])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const observers: IntersectionObserver[] = []

    textRefs.current.forEach((el) => {
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
            obs.disconnect()
          }
        },
        { root: container, threshold: 0.25 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [data])

  const scrollTo = useCallback((index: number) => {
    scrollRef.current?.scrollTo({ left: index * window.innerWidth, behavior: 'smooth' })
  }, [])

  return (
    <section style={{ backgroundColor: 'var(--bg)' }}>

      <div className="origin-header" style={{ backgroundColor: 'var(--bg)' }}>
        <p
          className="font-[family-name:var(--font-jost)]"
          style={{ fontSize: 9, letterSpacing: 5, textTransform: 'uppercase', color: 'var(--taupe)', marginBottom: 18 }}
        >
          OUR JOURNEY
        </p>
        <h2
          className="font-[family-name:var(--font-cormorant)]"
          style={{ fontSize: 'clamp(48px, 7vw, 80px)', fontWeight: 300, lineHeight: 1, color: 'var(--text)' }}
        >
          From <em style={{ fontStyle: 'italic', color: 'var(--taupe)' }}>Farm</em> to Cup
        </h2>
      </div>

      <div
        ref={scrollRef}
        className="origin-scroll"
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          height: '85vh',
          backgroundColor: 'var(--line)',
          gap: '1px',
        }}
      >
        {data.map((ch, i) => (
          <div
            key={ch.id}
            ref={(el) => { panelRefs.current[i] = el }}
            className="origin-panel"
            style={{
              flex: '0 0 100vw',
              scrollSnapAlign: 'start',
              display: 'grid',
              height: '100%',
            }}
          >
            <div
              className="origin-image-side"
              style={{ position: 'relative', overflow: 'hidden', backgroundColor: 'var(--bg3)' }}
            >
              <Image
                src={ch.image_url}
                alt={ch.title}
                fill
                loading={i === 0 ? 'eager' : 'lazy'}
                priority={i === 0}
                sizes="(max-width: 768px) 100vw, 60vw"
                style={{
                  objectFit: 'cover',
                  filter: 'saturate(0.65)',
                  transition: 'filter 0.8s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLImageElement).style.filter = 'saturate(1)'
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLImageElement).style.filter = 'saturate(0.65)'
                }}
              />
              <span
                className="origin-ghost-num font-[family-name:var(--font-cormorant)]"
                style={{
                  position: 'absolute',
                  bottom: 32,
                  left: 40,
                  fontWeight: 300,
                  lineHeight: 1,
                  color: 'rgba(255,255,255,0.08)',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              >
                {ch.chapter_num}
              </span>
            </div>

            <div
              ref={(el) => { textRefs.current[i] = el }}
              className="origin-text-side"
              style={{
                backgroundColor: 'var(--bg2)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                opacity: 0,
                transform: 'translateY(20px)',
                transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
              }}
            >
              <p
                className="font-[family-name:var(--font-jost)]"
                style={{ fontSize: 9, letterSpacing: 5, textTransform: 'uppercase', color: 'var(--taupe)', marginBottom: 24 }}
              >
                {ch.label}
              </p>
              <h3
                className="font-[family-name:var(--font-cormorant)]"
                style={{ fontSize: 44, fontWeight: 300, lineHeight: 1.1, marginBottom: 24, color: 'var(--text)' }}
              >
                {ch.title}
              </h3>
              <div style={{ width: 40, height: 1, backgroundColor: 'var(--line)', marginBottom: 24 }} />
              <p
                className="font-[family-name:var(--font-jost)]"
                style={{ fontSize: 15, lineHeight: 1.9, color: 'var(--text2)', maxWidth: 380 }}
              >
                {ch.description}
              </p>
              <p
                className="font-[family-name:var(--font-jost)]"
                style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--taupe-lt)', marginTop: 32 }}
              >
                {ch.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 64px',
          backgroundColor: 'var(--bg)',
          borderTop: '1px solid var(--line)',
        }}
      >
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {data.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to chapter ${i + 1}`}
              style={{
                width:  i === activeIndex ? 32 : 8,
                height: 3,
                backgroundColor: i === activeIndex ? 'var(--accent)' : 'var(--line)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'width 0.35s ease, background-color 0.35s ease',
              }}
            />
          ))}
        </div>

        <span
          className="font-[family-name:var(--font-jost)]"
          style={{ fontSize: 9, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--taupe-lt)' }}
        >
          {String(activeIndex + 1).padStart(2, '0')} / {String(data.length).padStart(2, '0')}
        </span>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => scrollRef.current?.scrollBy({ left: -window.innerWidth, behavior: 'smooth' })}
            aria-label="Previous chapter"
            style={{
              width: 44, height: 44,
              border: '1px solid var(--line)',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              fontSize: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text2)',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.5')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            ←
          </button>
          <button
            onClick={() => scrollRef.current?.scrollBy({ left: window.innerWidth, behavior: 'smooth' })}
            aria-label="Next chapter"
            style={{
              width: 44, height: 44,
              border: '1px solid var(--line)',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              fontSize: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text2)',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.5')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            →
          </button>
        </div>
      </div>

    </section>
  )
}

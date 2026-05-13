'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import Image from 'next/image'

const chapters = [
  {
    num: '01',
    label: 'CHAPTER 01 — ETHIOPIA',
    title: 'The Ancient Forest',
    desc: "At 1,900 metres above sea level in Ethiopia's Gedeo Zone, wild coffee trees grow beneath a canopy that has stood for millennia. Here, coffee is not cultivated — it is discovered.",
    detail: 'Yirgacheffe · 1,900m · Heirloom Varieties',
    image: 'https://images.unsplash.com/photo-1524350876685-274059332603?w=1400&q=80',
  },
  {
    num: '02',
    label: 'CHAPTER 02 — HARVEST',
    title: 'Only Ripe Cherries',
    desc: 'Pickers visit each tree up to fifteen times per season, selecting only cherries at peak ripeness. This patience is the invisible ingredient in every bag we sell.',
    detail: 'Hand-picked · Peak ripeness only',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1400&q=80',
  },
  {
    num: '03',
    label: 'CHAPTER 03 — PROCESS',
    title: 'Sun & Patience',
    desc: 'Cherries are spread on raised African beds and turned by hand twice daily for twenty-one days. The fruit ferments slowly — gifting a wine-like complexity no machine can replicate.',
    detail: 'Natural process · 21 days · Raised beds',
    image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=1400&q=80',
  },
  {
    num: '04',
    label: 'CHAPTER 04 — ROASTERY',
    title: 'The Transformation',
    desc: 'In our Zhongzheng roastery, each lot is roasted to a profile designed for that specific harvest. We listen for first crack and trust what the bean tells us.',
    detail: 'Taipei · Small batch · Profile roasted',
    image: 'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=1400&q=80',
  },
]

export default function OriginStory() {
  const scrollRef  = useRef<HTMLDivElement>(null)
  const panelRefs  = useRef<(HTMLDivElement | null)[]>([])
  const textRefs   = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  /* ── Active-panel tracker (drives nav dots) ── */
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
  }, [])

  /* ── Text fade-up per panel ── */
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
  }, [])

  const scrollTo = useCallback((index: number) => {
    scrollRef.current?.scrollTo({ left: index * window.innerWidth, behavior: 'smooth' })
  }, [])

  return (
    <section style={{ backgroundColor: 'var(--bg)' }}>

      {/* ── Section Header ── */}
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

      {/* ── Horizontal Scroll Container ── */}
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
        {chapters.map((ch, i) => (
          <div
            key={i}
            ref={(el) => { panelRefs.current[i] = el }}
            className="origin-panel"
            style={{
              flex: '0 0 100vw',
              scrollSnapAlign: 'start',
              display: 'grid',
              height: '100%',
            }}
          >
            {/* Image side */}
            <div
              className="origin-image-side"
              style={{ position: 'relative', overflow: 'hidden', backgroundColor: 'var(--bg3)' }}
            >
              <Image
                src={ch.image}
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
              {/* Ghost chapter number */}
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
                {ch.num}
              </span>
            </div>

            {/* Text side */}
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
                {ch.desc}
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

      {/* ── Navigation Bar ── */}
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
        {/* Progress pills */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {chapters.map((_, i) => (
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

        {/* Chapter label */}
        <span
          className="font-[family-name:var(--font-jost)]"
          style={{ fontSize: 9, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--taupe-lt)' }}
        >
          {String(activeIndex + 1).padStart(2, '0')} / 04
        </span>

        {/* Arrow buttons */}
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

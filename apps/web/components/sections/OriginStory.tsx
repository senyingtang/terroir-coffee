'use client'

import { useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'

const cards = [
  {
    id: 1,
    label: '01 — Ethiopia · Yirgacheffe',
    title: 'The Ancient Forest',
    body: 'At 1,900m, wild coffee trees grow under a canopy that has existed for millennia. The forest defines the cup.',
    src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
  },
  {
    id: 2,
    label: '02 — Selective Harvest',
    title: 'Only Ripe Cherries',
    body: 'Pickers return to each branch up to fifteen times per season. Patience is the first ingredient.',
    src: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80',
  },
  {
    id: 3,
    label: '03 — Natural Process',
    title: 'Sun & Patience',
    body: 'Twenty-one days on raised drying beds. The fruit ferments slowly — gifting wine-like sweetness.',
    src: 'https://images.unsplash.com/photo-1524350876685-274059332603?w=800&q=80',
  },
  {
    id: 4,
    label: '04 — Taipei Roastery',
    title: 'The Transformation',
    body: 'Each lot is roasted to its own profile — never a template, always a conversation with the bean.',
    src: 'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=800&q=80',
  },
]

function Card({ card, index }: { card: typeof cards[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(32px)'
    el.style.transition = `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          obs.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [index])

  return (
    <div
      ref={ref}
      className="group shrink-0 flex flex-col overflow-hidden"
      style={{ flex: '0 0 460px', scrollSnapAlign: 'start', backgroundColor: 'var(--bg2)' }}
    >
      <div className="relative overflow-hidden" style={{ height: '340px' }}>
        <Image
          src={card.src}
          alt={card.title}
          fill
          loading="lazy"
          className="object-cover transition-all duration-700 group-hover:scale-[1.06]"
          style={{ filter: 'saturate(0.7)', transition: 'transform 0.7s ease, filter 0.7s ease' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.filter = 'saturate(1)' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.filter = 'saturate(0.7)' }}
          sizes="460px"
        />
      </div>
      <div className="flex flex-col gap-3 p-8">
        <span
          className="text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-jost)]"
          style={{ color: 'var(--taupe)' }}
        >
          {card.label}
        </span>
        <h3
          className="font-[family-name:var(--font-cormorant)] text-2xl font-medium"
          style={{ color: 'var(--text)' }}
        >
          {card.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
          {card.body}
        </p>
      </div>
    </div>
  )
}

export default function OriginStory() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = useCallback((dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 480, behavior: 'smooth' })
  }, [])

  return (
    <section className="py-24 md:py-32 overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Header */}
      <div className="mx-auto max-w-7xl px-8 md:px-16 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <p
            className="mb-4 text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-jost)]"
            style={{ color: 'var(--taupe)' }}
          >
            OUR JOURNEY
          </p>
          <h2
            className="font-[family-name:var(--font-cormorant)] font-light leading-none"
            style={{ color: 'var(--text)', fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
          >
            From <em>Farm</em>
            <br />
            to Cup
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
          Every bean carries the memory of its land — altitude, rainfall, harvest day. We trace each lot from the specific plot it came from.
        </p>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-px overflow-x-auto pl-8 md:pl-16 pb-4"
        style={{
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          backgroundColor: 'var(--line)',
        }}
      >
        {cards.map((card, i) => (
          <Card key={card.id} card={card} index={i} />
        ))}
        {/* Trailing spacer */}
        <div className="shrink-0 w-8 md:w-16" style={{ backgroundColor: 'var(--bg)' }} />
      </div>

      {/* Arrow navigation */}
      <div className="mx-auto max-w-7xl px-8 md:px-16 mt-8 flex items-center gap-4">
        <button
          onClick={() => scroll(-1)}
          className="flex h-12 w-12 items-center justify-center border transition-all duration-200 hover:opacity-60 active:scale-95"
          style={{ borderColor: 'var(--line)', color: 'var(--text2)' }}
          aria-label="Previous"
        >
          ←
        </button>
        <button
          onClick={() => scroll(1)}
          className="flex h-12 w-12 items-center justify-center border transition-all duration-200 hover:opacity-60 active:scale-95"
          style={{ borderColor: 'var(--line)', color: 'var(--text2)' }}
          aria-label="Next"
        >
          →
        </button>
        <span
          className="ml-2 text-xs tracking-widest uppercase font-[family-name:var(--font-jost)]"
          style={{ color: 'var(--taupe-lt)' }}
        >
          Drag to explore
        </span>
      </div>
    </section>
  )
}

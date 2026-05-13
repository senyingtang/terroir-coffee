'use client'

import { useState } from 'react'
import Image from 'next/image'

const products = [
  {
    id: '1', name: 'Yirgacheffe Natural', origin: 'Ethiopia', detail: 'Yirgacheffe · 1,900m · Heirloom',
    process: 'Natural', notes: ['Blueberry', 'Jasmine', 'Dark Chocolate'], price: 580,
    src: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=700&q=80',
  },
  {
    id: '2', name: 'Shakiso Washed', origin: 'Ethiopia', detail: 'Shakiso · 1,750m · Heirloom',
    process: 'Washed', notes: ['Apricot', 'Earl Grey', 'Citrus'], price: 560,
    src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&q=80',
  },
  {
    id: '3', name: 'Huila Honey', origin: 'Colombia', detail: 'Huila · 1,650m · Castillo',
    process: 'Honey', notes: ['Mango', 'Honey', 'Almond'], price: 620,
    src: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=700&q=80',
  },
  {
    id: '4', name: 'Nariño Washed', origin: 'Colombia', detail: 'Nariño · 1,800m · Caturra',
    process: 'Washed', notes: ['Red Apple', 'Caramel', 'Walnut'], price: 640,
    src: 'https://images.unsplash.com/photo-1459755486867-b55449bb39ff?w=700&q=80',
  },
  {
    id: '5', name: 'Alishan Oolong Process', origin: 'Taiwan', detail: 'Alishan · 1,400m · Typica',
    process: 'Honey', notes: ['Oolong', 'Lychee', 'Rose Water'], price: 780,
    src: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=700&q=80',
  },
  {
    id: '6', name: 'Sun Moon Lake Honey', origin: 'Taiwan', detail: 'Sun Moon Lake · 1,100m · Bourbon',
    process: 'Honey', notes: ['Black Tea', 'Plum', 'Brown Sugar'], price: 720,
    src: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=700&q=80',
  },
]

const filters = ['All', 'Ethiopia', 'Colombia', 'Taiwan', 'Natural', 'Washed', 'Honey']

export default function ProductPage() {
  const [active, setActive] = useState('All')

  const filtered = products.filter((p) => {
    if (active === 'All') return true
    return p.origin === active || p.process === active
  })

  return (
    <>
      {/* ── Header ────────────────────────────────────── */}
      <section
        className="flex flex-col items-center justify-center px-8 py-32 pt-44 text-center"
        style={{ backgroundColor: 'var(--bg)' }}
      >
        <p
          className="mb-4 text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-jost)]"
          style={{ color: 'var(--taupe)' }}
        >
          CURRENT OFFERINGS
        </p>
        <h1
          className="font-[family-name:var(--font-cormorant)] font-light italic"
          style={{ color: 'var(--text)', fontSize: 'clamp(3rem, 7vw, 7rem)' }}
        >
          This Season's <em style={{ color: 'var(--taupe)' }}>Lots</em>
        </h1>
        <p
          className="mt-6 max-w-lg text-sm leading-relaxed font-[family-name:var(--font-jost)]"
          style={{ color: 'var(--text2)' }}
        >
          Every lot is sourced directly and cupped before and after roasting. When it's gone, it's gone.
          <br />
          That's what Single Origin means.
        </p>
      </section>

      {/* ── Filters ───────────────────────────────────── */}
      <div
        className="sticky top-[73px] z-40 border-y"
        style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--line)' }}
      >
        <div className="mx-auto max-w-7xl px-8 md:px-16 py-4 flex gap-6 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className="shrink-0 text-sm font-[family-name:var(--font-jost)] transition-all duration-200 pb-1"
              style={{
                color: active === f ? 'var(--accent)' : 'var(--text2)',
                borderBottom: active === f ? '1px solid var(--accent)' : '1px solid transparent',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── Products grid ─────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-8 md:px-16 py-16 md:py-24">
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ backgroundColor: 'var(--line)' }}
        >
          {filtered.map((p) => (
            <div
              key={p.id}
              className="group flex flex-col"
              style={{ backgroundColor: 'var(--bg)' }}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: '2/3' }}>
                <Image
                  src={p.src}
                  alt={p.name}
                  fill
                  loading="lazy"
                  className="object-cover transition-all duration-700 group-hover:scale-[1.05]"
                  style={{ filter: 'saturate(0.72)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.filter = 'saturate(1)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.filter = 'saturate(0.72)' }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6 flex flex-col gap-2">
                <div
                  className="flex items-center justify-between text-xs tracking-wider uppercase font-[family-name:var(--font-jost)]"
                  style={{ color: 'var(--taupe)' }}
                >
                  <span>{p.origin}</span>
                  <span style={{ color: 'var(--taupe-lt)' }}>{p.process}</span>
                </div>
                <h3
                  className="font-[family-name:var(--font-cormorant)] text-xl font-medium"
                  style={{ color: 'var(--text)' }}
                >
                  {p.name}
                </h3>
                <p className="text-xs font-[family-name:var(--font-jost)]" style={{ color: 'var(--taupe-lt)' }}>
                  {p.detail}
                </p>
                <p className="text-sm italic font-[family-name:var(--font-cormorant)]" style={{ color: 'var(--taupe)' }}>
                  {p.notes.join(' · ')}
                </p>
                <p className="mt-1 text-sm font-[family-name:var(--font-jost)]" style={{ color: 'var(--text2)' }}>
                  NT$ {p.price} <span style={{ color: 'var(--taupe-lt)' }}>/ 150g</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const products = [
  {
    id: '1',
    originTag: 'ETHIOPIA',
    name: 'Yirgacheffe Natural',
    detail: 'Yirgacheffe · 1,900m · Heirloom',
    notes: ['Blueberry', 'Jasmine', 'Dark Chocolate'],
    price: 'NT$ 580',
    src: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=700&q=80',
    alt: 'Yirgacheffe natural process coffee',
  },
  {
    id: '2',
    originTag: 'COLOMBIA',
    name: 'Huila Honey',
    detail: 'Huila · 1,650m · Castillo',
    notes: ['Mango', 'Honey', 'Almond'],
    price: 'NT$ 620',
    src: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=700&q=80',
    alt: 'Huila honey process coffee',
  },
  {
    id: '3',
    originTag: 'TAIWAN',
    name: 'Alishan Oolong Process',
    detail: 'Alishan · 1,400m · Typica',
    notes: ['Oolong', 'Lychee', 'Rose Water'],
    price: 'NT$ 780',
    src: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=700&q=80',
    alt: 'Alishan oolong process coffee',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

export default function Products() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="mx-auto max-w-7xl px-8 md:px-16">

        {/* Header */}
        <div className="mb-16">
          <p
            className="mb-4 text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-jost)]"
            style={{ color: 'var(--taupe)' }}
          >
            CURRENT OFFERINGS
          </p>
          <h2
            className="font-[family-name:var(--font-cormorant)] font-light leading-none"
            style={{ color: 'var(--text)', fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
          >
            This Season's
            <br />
            <em>Lots</em>
          </h2>
        </div>

        {/* Grid */}
        <div
          ref={sectionRef}
          className="grid md:grid-cols-3"
          style={{ gap: '2px', backgroundColor: 'var(--line)' }}
        >
          <AnimatePresence>
            {visible && products.map((p, i) => (
              <motion.div
                key={p.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="group flex flex-col"
                style={{ backgroundColor: 'var(--bg)' }}
              >
                {/* Photo */}
                <div className="relative overflow-hidden" style={{ aspectRatio: '2/3' }}>
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-all duration-700 group-hover:scale-[1.06]"
                    style={{ filter: 'saturate(0.7)' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.filter = 'saturate(1)' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.filter = 'saturate(0.7)' }}
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col gap-3 p-6">
                  <div
                    className="flex items-center justify-between text-xs tracking-wider uppercase font-[family-name:var(--font-jost)]"
                    style={{ color: 'var(--taupe)' }}
                  >
                    <span>{p.originTag}</span>
                  </div>

                  <h3
                    className="font-[family-name:var(--font-cormorant)] text-xl font-medium"
                    style={{ color: 'var(--text)' }}
                  >
                    {p.name}
                  </h3>

                  <p
                    className="text-xs font-[family-name:var(--font-jost)]"
                    style={{ color: 'var(--taupe-lt)' }}
                  >
                    {p.detail}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {p.notes.map((note) => (
                      <span
                        key={note}
                        className="px-2 py-1 text-xs font-[family-name:var(--font-jost)]"
                        style={{
                          backgroundColor: 'var(--bg2)',
                          color: 'var(--text2)',
                          border: '1px solid var(--line)',
                        }}
                      >
                        {note}
                      </span>
                    ))}
                  </div>

                  <p
                    className="mt-1 text-sm font-[family-name:var(--font-jost)]"
                    style={{ color: 'var(--taupe-lt)' }}
                  >
                    {p.price} / 150g
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

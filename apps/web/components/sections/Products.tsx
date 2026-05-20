'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import type { Product } from '@/lib/db-types'
import { PRODUCTS_FALLBACK } from '@/lib/db-types'

interface ProductsProps {
  products?: Product[]
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
}

export default function Products({ products }: ProductsProps) {
  const data = products?.length ? products : PRODUCTS_FALLBACK

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

        <div
          ref={sectionRef}
          className="grid md:grid-cols-3"
          style={{ gap: '2px', backgroundColor: 'var(--line)' }}
        >
          <AnimatePresence>
            {visible && data.map((p, i) => (
              <motion.div
                key={p.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="group flex flex-col"
                style={{ backgroundColor: 'var(--bg)' }}
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: '2/3' }}>
                  <Image
                    src={p.image_url}
                    alt={p.name}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-all duration-700 group-hover:scale-[1.06]"
                    style={{ filter: 'saturate(0.7)' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.filter = 'saturate(1)' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.filter = 'saturate(0.7)' }}
                  />
                </div>

                <div className="flex flex-col gap-3 p-6">
                  <div
                    className="flex items-center justify-between text-xs tracking-wider uppercase font-[family-name:var(--font-jost)]"
                    style={{ color: 'var(--taupe)' }}
                  >
                    <span>{p.origin_country}</span>
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
                    {p.origin_detail}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {(p.flavor_tags || []).map((note) => (
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

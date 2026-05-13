'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const products = [
  { id: '1', name: 'Ethiopia Yirgacheffe', origin: 'Ethiopia', process: 'Washed', roast: 'Light', price: 580 },
  { id: '2', name: 'Colombia El Paraíso', origin: 'Colombia', process: 'Double Anaerobic', roast: 'Light-Medium', price: 680 },
  { id: '3', name: 'Panama Elida Gesha', origin: 'Panama', process: 'Natural', roast: 'Light', price: 1280 },
]

export default function FeaturedProducts() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section ref={ref} className="mx-auto max-w-7xl px-6 py-32 md:px-10 md:py-40">
      <div className="mb-16 flex items-end justify-between">
        <div className="flex flex-col gap-4">
          <p className="text-xs tracking-[0.25em] uppercase" style={{ color: 'var(--taupe)' }}>
            Current Offering
          </p>
          <h2
            className="font-[family-name:var(--font-cormorant)] font-light"
            style={{ color: 'var(--text)' }}
          >
            In the Bag
          </h2>
        </div>
        <Link
          href="/shop"
          className="hidden md:inline text-sm tracking-widest uppercase transition-opacity hover:opacity-60"
          style={{ color: 'var(--accent)' }}
        >
          View All →
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-px" style={{ backgroundColor: 'var(--line)' }}>
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="group cursor-pointer"
            style={{ backgroundColor: 'var(--bg)' }}
          >
            {/* Image placeholder */}
            <div
              className="aspect-square overflow-hidden"
              style={{ backgroundColor: 'var(--bg3)' }}
            >
              <div
                className="h-full w-full flex items-center justify-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundColor: 'var(--bg2)' }}
              >
                <span
                  className="font-[family-name:var(--font-cormorant)] text-6xl italic opacity-30"
                  style={{ color: 'var(--taupe)' }}
                >
                  {i + 1}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-6 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-wider uppercase" style={{ color: 'var(--taupe)' }}>
                  {product.origin} · {product.process}
                </span>
                <span className="text-xs" style={{ color: 'var(--taupe-lt)' }}>
                  {product.roast}
                </span>
              </div>
              <h3
                className="font-[family-name:var(--font-cormorant)] text-xl font-medium"
                style={{ color: 'var(--text)' }}
              >
                {product.name}
              </h3>
              <div className="mt-2 flex items-center justify-between">
                <span style={{ color: 'var(--text2)' }}>NT$ {product.price}</span>
                <span
                  className="text-xs tracking-widest uppercase transition-opacity group-hover:opacity-100 opacity-0"
                  style={{ color: 'var(--accent)' }}
                >
                  Add to Cart →
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-center md:hidden">
        <Link
          href="/shop"
          className="text-sm tracking-widest uppercase"
          style={{ color: 'var(--accent)' }}
        >
          View All Coffees →
        </Link>
      </div>
    </section>
  )
}

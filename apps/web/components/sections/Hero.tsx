'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'

const textLines = ['Where', 'Soil', 'Becomes Flavour']

const springVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 18, stiffness: 100, delay: 0.3 + i * 0.15 },
  }),
}

export default function Hero() {
  const imgRef     = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  // GSAP zoom-out
  useEffect(() => {
    if (!imgRef.current) return
    gsap.fromTo(imgRef.current, { scale: 1.12 }, { scale: 1.0, duration: 3, ease: 'power2.out' })
  }, [])

  // Parallax
  useEffect(() => {
    const onScroll = () => {
      if (!imgRef.current) return
      imgRef.current.style.transform = `scale(1) translateY(${window.scrollY * 0.28}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section ref={sectionRef} className="relative h-[100dvh] w-full overflow-hidden">

      {/* Background image */}
      <div ref={imgRef} className="absolute inset-0 will-change-transform">
        <Image
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1800&q=85"
          alt="Coffee farm landscape"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-2/3 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--bg) 0%, transparent 100%)' }}
      />

      {/* Left-bottom text */}
      <div className="absolute bottom-16 left-8 md:left-16 max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-6 font-[family-name:var(--font-jost)] uppercase"
          style={{ fontSize: '9px', letterSpacing: '5px', color: 'var(--taupe-lt)' }}
        >
          Single Origin · Micro Lot · Taipei Roastery
        </motion.p>

        <h1
          className="font-[family-name:var(--font-cormorant)] font-light leading-none"
          style={{ fontSize: 'clamp(64px, 10vw, 128px)', color: 'var(--bg)' }}
        >
          {textLines.map((line, i) => (
            <motion.span
              key={line}
              custom={i}
              variants={springVariant}
              initial="hidden"
              animate="visible"
              className="block"
            >
              {i === 1
                ? <em style={{ color: 'var(--taupe)', fontStyle: 'italic' }}>{line}</em>
                : line
              }
            </motion.span>
          ))}
        </h1>
      </div>

      {/* Right-bottom: description + scroll hint */}
      <div className="absolute bottom-16 right-8 md:right-16 flex flex-col items-end gap-6 max-w-xs text-right">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-sm leading-relaxed font-[family-name:var(--font-jost)]"
          style={{ color: 'var(--taupe-lt)' }}
        >
          We source directly from smallholder farmers in Ethiopia,
          <br />
          Colombia, and Taiwan — then roast every lot to its own rhythm.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-col items-center gap-3"
        >
          <span
            className="font-[family-name:var(--font-jost)]"
            style={{ fontSize: '8px', letterSpacing: '4px', color: 'var(--taupe-lt)' }}
          >
            Scroll to explore
          </span>
          <div
            className="h-16 w-px origin-top"
            style={{ backgroundColor: 'var(--taupe-lt)', animation: 'grow 2s ease-in-out infinite' }}
          />
        </motion.div>
      </div>
    </section>
  )
}

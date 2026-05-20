'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import type { HeroData } from '@/lib/db-types'
import { HERO_FALLBACK } from '@/lib/db-types'

function parseTitleLines(title: string): string[] {
  if (title.includes('\n')) return title.split('\n').filter(Boolean)
  const words = title.split(' ')
  if (words.length <= 2) return words
  return [words[0], words[1], words.slice(2).join(' ')]
}

const springVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 18, stiffness: 100, delay: 0.3 + i * 0.15 },
  }),
}

interface HeroProps {
  data?: HeroData
}

export default function Hero({ data }: HeroProps) {
  const d = data ?? HERO_FALLBACK
  const textLines = parseTitleLines(d.title)

  const imgRef     = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!imgRef.current) return
    gsap.fromTo(imgRef.current, { scale: 1.12 }, { scale: 1.0, duration: 3, ease: 'power2.out' })
  }, [])

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

      <div ref={imgRef} className="absolute inset-0 will-change-transform">
        <Image
          src={d.background_image}
          alt="Coffee farm landscape"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 bg-black/40" />

      <div
        className="absolute bottom-0 left-0 right-0 h-2/3 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--bg) 0%, transparent 100%)' }}
      />

      <div className="absolute bottom-16 left-8 md:left-16 max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-6 font-[family-name:var(--font-jost)] uppercase"
          style={{ fontSize: '9px', letterSpacing: '5px', color: 'var(--taupe-lt)' }}
        >
          {d.eyebrow}
        </motion.p>

        <h1
          className="font-[family-name:var(--font-cormorant)] font-light leading-none"
          style={{ fontSize: 'clamp(64px, 10vw, 128px)', color: 'var(--bg)' }}
        >
          {textLines.map((line, i) => (
            <motion.span
              key={i}
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

      <div className="absolute bottom-16 right-8 md:right-16 flex flex-col items-end gap-6 max-w-xs text-right">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-sm leading-relaxed font-[family-name:var(--font-jost)]"
          style={{ color: 'var(--taupe-lt)' }}
        >
          {d.description}
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
            {d.scroll_text}
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

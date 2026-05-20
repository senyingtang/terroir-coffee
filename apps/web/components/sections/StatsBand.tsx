'use client'

import { useEffect, useRef } from 'react'
import type { Stat } from '@/lib/db-types'
import { STATS_FALLBACK } from '@/lib/db-types'

interface StatsBandProps {
  stats?: Stat[]
}

function parseStatValue(val: string): { num: number; suffix: string } {
  const match = val.match(/^(\d+)(.*)$/)
  return { num: Number(match?.[1] ?? 0), suffix: match?.[2] ?? '' }
}

export default function StatsBand({ stats }: StatsBandProps) {
  const data = stats?.length ? stats : STATS_FALLBACK

  const sectionRef   = useRef<HTMLElement>(null)
  const numberRefs   = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return

    let ctx: { revert: () => void } | null = null

    const init = async () => {
      const { gsap }          = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')

      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        numberRefs.current.forEach((el, i) => {
          if (!el) return
          const { num } = parseStatValue(data[i]?.value ?? '0')
          const obj = { val: 0 }
          gsap.fromTo(
            obj,
            { val: 0 },
            {
              val: num,
              duration: 2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                once: true,
              },
              onUpdate() { if (el) el.textContent = Math.round(obj.val).toString() },
            }
          )
        })
      }, sectionRef)
    }

    init()

    return () => {
      ctx?.revert()
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((t) => t.kill())
      })
    }
  }, [data])

  return (
    <section
      ref={sectionRef}
      className="py-24"
      style={{ backgroundColor: 'var(--text)' }}
    >
      <div className="mx-auto max-w-7xl px-8 md:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {data.map((stat, i) => {
            const { suffix } = parseStatValue(stat.value)
            return (
              <div
                key={stat.id}
                className="flex flex-col gap-3 py-12 px-8"
                style={{
                  borderRight: i < data.length - 1
                    ? '1px solid rgba(255,255,255,0.08)'
                    : undefined,
                }}
              >
                <div
                  className="font-[family-name:var(--font-cormorant)] font-light leading-none"
                  style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', color: 'var(--bg)' }}
                >
                  <span
                    ref={(el) => { numberRefs.current[i] = el }}
                    aria-label={stat.value}
                  >
                    0
                  </span>
                  <span style={{ color: 'var(--taupe)' }}>{suffix}</span>
                </div>
                <p
                  className="text-xs tracking-[0.2em] font-[family-name:var(--font-jost)]"
                  style={{ color: 'var(--taupe-lt)' }}
                >
                  {stat.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

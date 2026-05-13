'use client'

import { useEffect, useRef } from 'react'

const stats = [
  { value: 12, suffix: '',     label: 'Origin Farms' },
  { value: 86, suffix: '+',    label: 'Avg. Cup Score' },
  { value: 48, suffix: ' Hrs', label: 'Hrs Rest After Roast' },
  { value: 6,  suffix: ' Yrs', label: 'Yrs Direct Trade' },
]

export default function StatsBand() {
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
          const obj = { val: 0 }
          gsap.fromTo(
            obj,
            { val: 0 },
            {
              val: stats[i].value,
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
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24"
      style={{ backgroundColor: 'var(--text)' }}
    >
      <div className="mx-auto max-w-7xl px-8 md:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col gap-3 py-12 px-8"
              style={{
                borderRight: i < stats.length - 1
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
                  aria-label={String(stat.value)}
                >
                  0
                </span>
                <span style={{ color: 'var(--taupe)' }}>{stat.suffix}</span>
              </div>
              <p
                className="text-xs tracking-[0.2em] font-[family-name:var(--font-jost)]"
                style={{ color: 'var(--taupe-lt)' }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

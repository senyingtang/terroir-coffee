'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const steps = [
  {
    num: 'Step 01',
    title: 'Green Bean Selection',
    body: 'Each shipment is cupped blind. Only lots scoring above 86 points earn a place in our roastery.',
    src: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=900&q=75',
  },
  {
    num: 'Step 02',
    title: 'Profile Development',
    body: 'We map every roast on a data logger — but the final call is made by nose and intuition.',
    src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&q=75',
  },
  {
    num: 'Step 03',
    title: 'The Roast',
    body: 'Twelve minutes at precisely managed heat. We listen for first crack — the moment the bean opens itself.',
    src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=75',
  },
  {
    num: 'Step 04',
    title: 'Rest & Release',
    body: 'Freshly roasted beans rest 48 hours. CO₂ dissipates, flavours integrate, the cup finds its character.',
    src: 'https://images.unsplash.com/photo-1459755486867-b55449bb39ff?w=900&q=75',
  },
]

export default function Process() {
  const [activeStep, setActiveStep]   = useState(0)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    stepRefs.current.forEach((el, i) => {
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveStep(i) },
        { threshold: 0.4, rootMargin: '-10% 0px -10% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <section className="relative" style={{ backgroundColor: 'var(--bg2)' }}>
      <div className="mx-auto max-w-7xl grid md:grid-cols-[1fr_1fr]">

        {/* LEFT sticky */}
        <div
          className="hidden md:flex flex-col justify-between p-16 pt-24"
          style={{ position: 'sticky', top: 0, height: '100vh', backgroundColor: 'var(--bg2)' }}
        >
          {/* Faded step number */}
          <div
            className="absolute top-12 right-0 font-[family-name:var(--font-cormorant)] font-light leading-none select-none pointer-events-none transition-all duration-500"
            style={{ fontSize: 'clamp(8rem, 16vw, 14rem)', color: 'var(--text)', opacity: 0.05 }}
          >
            {String(activeStep + 1).padStart(2, '0')}
          </div>

          <div className="flex flex-col gap-8 relative z-10">
            <p
              className="text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-jost)]"
              style={{ color: 'var(--taupe)' }}
            >
              ROASTING CRAFT
            </p>
            <h2
              className="font-[family-name:var(--font-cormorant)] font-light leading-tight transition-all duration-500"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--text)' }}
            >
              The <em>{steps[activeStep].title}</em>
            </h2>
            <p
              className="text-sm leading-relaxed max-w-sm transition-all duration-500"
              style={{ color: 'var(--text2)' }}
            >
              {steps[activeStep].body}
            </p>
          </div>

          {/* Step dots */}
          <div className="flex flex-col gap-3 relative z-10">
            <p
              className="text-xs tracking-widest uppercase mb-4 font-[family-name:var(--font-jost)]"
              style={{ color: 'var(--taupe-lt)' }}
            >
              Roasting Craft
            </p>
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center gap-4">
                <div
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === activeStep ? '24px' : '6px',
                    height: '6px',
                    backgroundColor: i === activeStep ? 'var(--accent)' : 'var(--line)',
                  }}
                />
                <span
                  className="text-xs tracking-wider font-[family-name:var(--font-jost)] transition-opacity duration-300"
                  style={{ color: 'var(--taupe)', opacity: i === activeStep ? 1 : 0.4 }}
                >
                  {s.num}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT scrolling steps */}
        <div className="flex flex-col" style={{ borderLeft: '1px solid var(--line)' }}>
          {steps.map((step, i) => (
            <div
              key={step.num}
              ref={(el) => { stepRefs.current[i] = el }}
              className="flex flex-col"
              style={{ minHeight: '80vh', borderBottom: '1px solid var(--line)' }}
            >
              {/* Mobile title */}
              <div className="md:hidden p-8 pb-0">
                <span
                  className="text-xs tracking-widest uppercase font-[family-name:var(--font-jost)]"
                  style={{ color: 'var(--taupe)' }}
                >
                  {step.num}
                </span>
                <h3
                  className="mt-2 font-[family-name:var(--font-cormorant)] text-2xl"
                  style={{ color: 'var(--text)' }}
                >
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
                  {step.body}
                </p>
              </div>

              {/* Image */}
              <div className="relative flex-1 overflow-hidden group" style={{ minHeight: '400px' }}>
                <Image
                  src={step.src}
                  alt={step.title}
                  fill
                  loading="lazy"
                  className="object-cover transition-all duration-700"
                  style={{ filter: 'saturate(0.65)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.filter = 'saturate(1)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.filter = 'saturate(0.65)' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, var(--bg2), transparent)' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

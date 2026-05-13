import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/ui/ScrollReveal'
import HoverImage from '@/components/ui/HoverImage'

export const metadata: Metadata = {
  title: 'The Process',
  description: 'From green bean selection to the 48-hour rest — every step is our most faithful interpretation of terroir.',
}

const stages = [
  {
    num: '01', title: 'Green Bean Selection',
    body: 'Every incoming shipment is cupped blind by at least two team members. Only lots scoring 86 points or above earn a place in our roastery — we never purchase from spot markets. Each bean comes from a farm we know by name.',
    src: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=900&q=80', alt: 'Green bean selection',
  },
  {
    num: '02', title: 'Profile Development',
    body: 'A data logger tracks temperature, rate-of-rise, and colour value for every batch. But the final decision always comes from the roaster\'s nose and years of experience. Every new lot goes through at least three trial roasts before we commit to a production profile.',
    src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&q=80', alt: 'Roast profile development',
  },
  {
    num: '03', title: 'The Roast',
    body: 'Twelve minutes of precisely managed heat. We listen for first crack — that\'s the moment the bean\'s internal structure transforms. Light roasts preserve terroir; dark roasts develop sweetness. Our job is to find the perfect balance point between the two.',
    src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80', alt: 'Coffee roasting',
  },
  {
    num: '04', title: 'Rest & Release',
    body: 'Freshly roasted beans need 48 hours of rest before packaging. CO₂ dissipates slowly, flavours integrate, and the cup finds its true character. We never ship before the rest period is complete — that is our most basic commitment to quality.',
    src: 'https://images.unsplash.com/photo-1459755486867-b55449bb39ff?w=900&q=80', alt: 'Rest and packaging',
  },
]

export default function ProcessPage() {
  return (
    <>
      {/* ── Page Hero ─────────────────────────────────── */}
      <section className="relative flex min-h-[60vh] items-end pb-20 pt-36 px-8 md:px-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=1800&q=85"
            alt="Taipei Roastery"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none"
            style={{ background: 'linear-gradient(to top, var(--bg) 0%, transparent 100%)' }}
          />
        </div>
        <div className="relative z-10 max-w-2xl">
          <p className="mb-4 text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-jost)]" style={{ color: 'var(--taupe-lt)' }}>
            ROASTING CRAFT
          </p>
          <h1 className="font-[family-name:var(--font-cormorant)] font-light leading-none" style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', color: 'var(--bg)' }}>
            The <em style={{ color: 'var(--taupe)' }}>Process</em>
          </h1>
        </div>
      </section>

      {/* ── Timeline Stages ───────────────────────────── */}
      <section className="py-16 md:py-24" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="mx-auto max-w-7xl px-8 md:px-16 flex flex-col gap-0">
          {stages.map((stage, i) => {
            const isEven = i % 2 === 1
            return (
              <div
                key={stage.num}
                className="grid md:grid-cols-2 gap-px"
                style={{ borderBottom: '1px solid var(--line)', backgroundColor: 'var(--line)' }}
              >
                {/* Image — client component handles hover */}
                <ScrollReveal delay={0} className={isEven ? 'md:order-2' : 'md:order-1'}>
                  <HoverImage
                    src={stage.src}
                    alt={stage.alt}
                    saturateFrom={0.7}
                    saturateTo={1}
                    containerStyle={{ aspectRatio: '4/3' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </ScrollReveal>

                {/* Text */}
                <ScrollReveal
                  delay={0.1}
                  className={`flex flex-col justify-center gap-6 p-10 md:p-16 ${isEven ? 'md:order-1' : 'md:order-2'}`}
                  style={{ backgroundColor: 'var(--bg)' }}
                >
                  <span className="font-[family-name:var(--font-cormorant)] italic leading-none" style={{ fontSize: 'clamp(4rem, 8vw, 7rem)', color: 'var(--line)', lineHeight: 1 }}>
                    {stage.num}
                  </span>
                  <h2 className="font-[family-name:var(--font-cormorant)] font-light" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: 'var(--text)' }}>
                    {stage.title}
                  </h2>
                  <p className="text-sm leading-relaxed max-w-md" style={{ color: 'var(--text2)' }}>
                    {stage.body}
                  </p>
                </ScrollReveal>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="py-24 md:py-32 px-8 md:px-16" style={{ backgroundColor: 'var(--bg2)' }}>
        <ScrollReveal className="mx-auto max-w-2xl text-center flex flex-col items-center gap-8">
          <p className="text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-jost)]" style={{ color: 'var(--taupe)' }}>
            PUBLIC CUPPING
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] font-light" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--text)' }}>
            Want to see the roast in person?
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
            Every Saturday at 2pm, we host a free public cupping at our Zhongzheng roastery.
            <br />No reservation needed — just bring your curiosity.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center border px-10 py-4 text-sm tracking-widest uppercase transition-opacity hover:opacity-60 font-[family-name:var(--font-jost)]"
            style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
          >
            Book a Visit
          </Link>
        </ScrollReveal>
      </section>
    </>
  )
}

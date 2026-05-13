import type { Metadata } from 'next'
import Image from 'next/image'
import ScrollReveal from '@/components/ui/ScrollReveal'
import HoverImage from '@/components/ui/HoverImage'

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'We believe in the power of terroir — from Ethiopia to Taiwan, every cup is an honest expression of a place.',
}

const team = [
  {
    name: 'Wei-Ling Chen',
    role: 'Founder & Head Roaster',
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=75',
  },
  {
    name: 'Ming-Zhe Xu',
    role: 'Green Buyer · Q Grader',
    src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=75',
  },
  {
    name: 'Yuki Tanaka',
    role: 'Head Barista · Education',
    src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=75',
  },
  {
    name: 'Amara Bekele',
    role: 'Origin Liaison · Ethiopia',
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=75',
  },
]

const values = [
  {
    title: 'Radical Transparency',
    body: 'We publish the purchase price, farm name, location, and pre- and post-roast cup scores for every lot we carry. You have the right to know where every dollar goes.',
  },
  {
    title: 'Long-Term Relationships',
    body: 'We don\'t buy from spot markets. Every farmer we work with signs a minimum three-year contract. Stable relationships produce stable quality — and it\'s simply the right thing to do.',
  },
  {
    title: 'Roast to Reveal',
    body: 'Light roasts preserve terroir; dark roasts develop sweetness. Our mission is to stay out of the way of the bean. The farmer did the hardest work — our job is to honour it.',
  },
]

const timeline = [
  { year: '2019', title: 'Zhongzheng Roastery Opens', body: 'A former 40-ping print shop, rebuilt. First lot: 60 kg Ethiopia Yirgacheffe natural. Sold out in four days.' },
  { year: '2020', title: 'First Origin Trip — Huila', body: 'Wei-Ling travels to Colombia during the pandemic and signs our first direct-trade contract.' },
  { year: '2021', title: 'Taiwan Origin Added', body: 'We partner with three Alishan smallholders and release the brand\'s first Taiwan lot — a natural-process Typica.' },
  { year: '2022', title: 'Subscription Programme Launches', body: 'Bi-weekly subscriptions hit 800 members in year one. Proceeds fund two new Ethiopia partnerships.' },
  { year: '2023', title: 'Q Grader Joins the Team', body: 'Ming-Zhe joins as dedicated green buyer, bringing Q Grader expertise. Cupping volume triples.' },
  { year: '2024', title: 'Twelve Farm Partners', body: 'Twelve active farm relationships across three countries — every one built on multi-year contracts and transparent pricing.' },
]

export default function AboutPage() {
  return (
    <>
      {/* ── Page Hero ─────────────────────────────────── */}
      <section className="relative flex min-h-[65vh] items-end pb-20 pt-36 px-8 md:px-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1800&q=85"
            alt="Our story"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div
            className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none"
            style={{ background: 'linear-gradient(to top, var(--bg) 0%, transparent 100%)' }}
          />
        </div>
        <div className="relative z-10 max-w-3xl">
          <p
            className="mb-4 text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-jost)]"
            style={{ color: 'var(--taupe-lt)' }}
          >
            OUR STORY
          </p>
          <h1
            className="font-[family-name:var(--font-cormorant)] font-light leading-tight"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 6rem)', color: 'var(--bg)' }}
          >
            We believe in the power<br />of <em style={{ color: 'var(--taupe)' }}>terroir</em>
          </h1>
        </div>
      </section>

      {/* ── Intro + Founder ───────────────────────────── */}
      <section className="mx-auto max-w-7xl px-8 md:px-16 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <ScrollReveal className="flex flex-col gap-8">
            <p
              className="text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-jost)]"
              style={{ color: 'var(--taupe)' }}
            >
              ORIGIN
            </p>
            <h2
              className="font-[family-name:var(--font-cormorant)] font-light leading-tight"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', color: 'var(--text)' }}
            >
              Rooted in <em>Terroir</em>
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
              Terroir began with a simple question: why does the same coffee variety taste completely different depending on the land it grows in? We set out to find the answer — visiting the Gedeo Zone in Ethiopia, the Huila region of Colombia, Taiwan's Alishan — and discovered that the answer is everything.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
              Today we sign multi-year contracts with smallholder farmers only, pay above fair-trade prices, and invest in post-harvest infrastructure. Every lot we buy improves the next year's harvest.
            </p>
            <p
              className="font-[family-name:var(--font-cormorant)] italic text-xl border-l-2 pl-6"
              style={{ color: 'var(--taupe)', borderColor: 'var(--accent)' }}
            >
              We are a roastery, a research project, and a love letter to growers.
            </p>
          </ScrollReveal>

          {/* Founder quote + photo */}
          <ScrollReveal delay={0.15} className="flex flex-col gap-8">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80"
                alt="Founder Wei-Ling Chen"
                fill
                loading="lazy"
                className="object-cover"
                style={{ filter: 'saturate(0.8)' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div
              className="border-l-2 pl-6 flex flex-col gap-4"
              style={{ borderColor: 'var(--line)' }}
            >
              <p
                className="font-[family-name:var(--font-cormorant)] italic text-lg leading-relaxed"
                style={{ color: 'var(--text)' }}
              >
                "I spent three years as a barista before I ever set foot on a coffee farm. Standing in the forest of Yirgacheffe watching the sun rise, I understood — everything I'd known about coffee until then was just a translation. I wanted to read the original."
              </p>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>Wei-Ling Chen</p>
                <p className="text-xs tracking-wider font-[family-name:var(--font-jost)]" style={{ color: 'var(--taupe)' }}>
                  Founder & Head Roaster
                </p>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text2)' }}>
                Wei-Ling trained at the Specialty Coffee Association in London, earned her Q Grader certification in 2017, and spent a season working at a washed-processing station in Colombia's Huila region before returning to Taipei to found Terroir.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: 'var(--bg2)' }}>
        <div className="mx-auto max-w-7xl px-8 md:px-16">
          <ScrollReveal className="mb-16">
            <p
              className="mb-4 text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-jost)]"
              style={{ color: 'var(--taupe)' }}
            >
              VALUES
            </p>
            <h2
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--text)' }}
            >
              What We Stand For
            </h2>
          </ScrollReveal>
          <div
            className="grid md:grid-cols-3 gap-px"
            style={{ backgroundColor: 'var(--line)' }}
          >
            {values.map((v, i) => (
              <ScrollReveal
                key={v.title}
                delay={i * 0.1}
                className="flex flex-col gap-5 p-10"
                style={{ backgroundColor: 'var(--bg2)' } as React.CSSProperties}
              >
                <span
                  className="font-[family-name:var(--font-cormorant)] italic"
                  style={{ fontSize: '4rem', color: 'var(--line)', lineHeight: 1 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3
                  className="font-[family-name:var(--font-cormorant)] text-2xl font-medium"
                  style={{ color: 'var(--text)' }}
                >
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
                  {v.body}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ──────────────────────────────────────── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="mx-auto max-w-7xl px-8 md:px-16">
          <ScrollReveal className="mb-16">
            <p
              className="mb-4 text-xs tracking-[0.3em] uppercase font-[family-name:var(--font-jost)]"
              style={{ color: 'var(--taupe)' }}
            >
              TEAM
            </p>
            <h2
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--text)' }}
            >
              The People Behind It
            </h2>
          </ScrollReveal>
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-px"
            style={{ backgroundColor: 'var(--line)' }}
          >
            {team.map((member, i) => (
              <ScrollReveal
                key={member.name}
                delay={i * 0.1}
                className="group flex flex-col"
                style={{ backgroundColor: 'var(--bg)' } as React.CSSProperties}
              >
                <HoverImage
                  src={member.src}
                  alt={member.name}
                  saturateFrom={0.75}
                  saturateTo={1}
                  className="group-hover:scale-[1.04]"
                  containerStyle={{ aspectRatio: '3/4' }}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="p-6 flex flex-col gap-1">
                  <h3
                    className="font-[family-name:var(--font-cormorant)] text-lg font-medium"
                    style={{ color: 'var(--text)' }}
                  >
                    {member.name}
                  </h3>
                  <p
                    className="text-xs tracking-wider font-[family-name:var(--font-jost)]"
                    style={{ color: 'var(--taupe)' }}
                  >
                    {member.role}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────── */}
      <section className="py-24 md:py-32" style={{ backgroundColor: 'var(--bg3)' }}>
        <div className="mx-auto max-w-4xl px-8 md:px-16">
          <ScrollReveal className="mb-16 text-center">
            <h2
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--text)' }}
            >
              Six Years, <em>One Belief</em>
            </h2>
          </ScrollReveal>
          <div className="flex flex-col">
            {timeline.map((item, i) => (
              <ScrollReveal
                key={item.year}
                delay={i * 0.08}
                className="flex gap-8 md:gap-12 pb-12"
                style={{ borderLeft: '1px solid var(--line)', paddingLeft: '2rem' } as React.CSSProperties}
              >
                <div className="flex flex-col gap-2 min-w-0">
                  <span
                    className="font-[family-name:var(--font-cormorant)] italic text-3xl"
                    style={{ color: 'var(--taupe)' }}
                  >
                    {item.year}
                  </span>
                  <h3
                    className="font-[family-name:var(--font-cormorant)] text-xl font-medium"
                    style={{ color: 'var(--text)' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
                    {item.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

import Hero from '@/components/sections/Hero'
import MarqueeStrip from '@/components/sections/MarqueeStrip'
import OriginStory from '@/components/sections/OriginStory'
import Process from '@/components/sections/Process'
import Products from '@/components/sections/Products'
import Manifesto from '@/components/sections/Manifesto'
import StatsBand from '@/components/sections/StatsBand'
import { supabase } from '@/lib/supabase'
import {
  HERO_FALLBACK,
  ORIGIN_CHAPTERS_FALLBACK,
  PROCESS_STEPS_FALLBACK,
  PRODUCTS_FALLBACK,
  MANIFESTO_FALLBACK,
  STATS_FALLBACK,
} from '@/lib/db-types'

export const revalidate = 60

export default async function HomePage() {
  const [
    heroRes,
    chaptersRes,
    stepsRes,
    productsRes,
    manifestoRes,
    statsRes,
  ] = await Promise.allSettled([
    supabase.from('hero').select('*').eq('is_active', true).limit(1).maybeSingle(),
    supabase.from('origin_chapters').select('*').eq('is_active', true).order('sort_order'),
    supabase.from('process_steps').select('*').eq('is_active', true).order('sort_order'),
    supabase.from('products').select('*').eq('is_active', true).order('sort_order').limit(3),
    supabase.from('manifesto').select('*').eq('is_active', true).limit(1).maybeSingle(),
    supabase.from('stats').select('*').eq('is_active', true).order('sort_order'),
  ])

  const hero      = heroRes.status === 'fulfilled'      ? (heroRes.value.data      ?? HERO_FALLBACK)               : HERO_FALLBACK
  const chapters  = chaptersRes.status === 'fulfilled'  ? (chaptersRes.value.data  ?? ORIGIN_CHAPTERS_FALLBACK)    : ORIGIN_CHAPTERS_FALLBACK
  const steps     = stepsRes.status === 'fulfilled'     ? (stepsRes.value.data     ?? PROCESS_STEPS_FALLBACK)      : PROCESS_STEPS_FALLBACK
  const products  = productsRes.status === 'fulfilled'  ? (productsRes.value.data  ?? PRODUCTS_FALLBACK)           : PRODUCTS_FALLBACK
  const manifesto = manifestoRes.status === 'fulfilled' ? (manifestoRes.value.data ?? MANIFESTO_FALLBACK)          : MANIFESTO_FALLBACK
  const stats     = statsRes.status === 'fulfilled'     ? (statsRes.value.data     ?? STATS_FALLBACK)              : STATS_FALLBACK

  return (
    <>
      <Hero data={hero} />
      <MarqueeStrip />
      <OriginStory chapters={chapters} />
      <Process steps={steps} />
      <Products products={products} />
      <Manifesto data={manifesto} />
      <StatsBand stats={stats} />
    </>
  )
}

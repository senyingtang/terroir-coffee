import Hero from '@/components/sections/Hero'
import MarqueeStrip from '@/components/sections/MarqueeStrip'
import OriginStory from '@/components/sections/OriginStory'
import Process from '@/components/sections/Process'
import Products from '@/components/sections/Products'
import Manifesto from '@/components/sections/Manifesto'
import StatsBand from '@/components/sections/StatsBand'

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <OriginStory />
      <Process />
      <Products />
      <Manifesto />
      <StatsBand />
    </>
  )
}

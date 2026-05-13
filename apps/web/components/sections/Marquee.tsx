'use client'

import { useRef } from 'react'
import { motion } from 'motion/react'

const items = [
  'Ethiopia Yirgacheffe',
  'Colombia Huila',
  'Guatemala Antigua',
  'Kenya AA',
  'Panama Gesha',
  'Yemen Mocha',
  'Brazil Cerrado',
  'Costa Rica Tarrazu',
]

export default function Marquee() {
  return (
    <div
      className="overflow-hidden border-y py-5"
      style={{ borderColor: 'var(--line)', backgroundColor: 'var(--bg2)' }}
    >
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="font-[family-name:var(--font-cormorant)] text-xl italic shrink-0"
            style={{ color: 'var(--taupe)' }}
          >
            {item}
            <span className="mx-6" style={{ color: 'var(--line)' }}>·</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

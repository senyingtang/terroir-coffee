'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const [hovered, setHovered] = useState(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('a, button, [data-cursor-hover]')) setHovered(true)
    }
    const onLeave = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('a, button, [data-cursor-hover]')) setHovered(false)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onEnter, { passive: true })
    window.addEventListener('mouseout', onLeave, { passive: true })

    function animate() {
      // Dot snaps immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`
      }
      // Ring follows with lerp
      ring.current.x += (pos.current.x - ring.current.x) * 0.1
      ring.current.y += (pos.current.y - ring.current.y) * 0.1
      if (ringRef.current) {
        const size = hovered ? 56 : 32
        ringRef.current.style.transform = `translate(${ring.current.x - size / 2}px, ${ring.current.y - size / 2}px)`
        ringRef.current.style.width = `${size}px`
        ringRef.current.style.height = `${size}px`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onEnter)
      window.removeEventListener('mouseout', onLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [hovered])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full"
        style={{ backgroundColor: 'var(--bg)', mixBlendMode: 'difference' }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full border transition-[width,height] duration-200"
        style={{ borderColor: 'var(--bg)', mixBlendMode: 'difference' }}
      />
    </>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const links = [
  { href: '/about',   label: 'Origin' },
  { href: '/process', label: 'Process' },
  { href: '/product', label: 'Product' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname  = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll() // run once on mount
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  // ── Colour tokens that flip with scroll state ──
  const logoColor    = scrolled ? 'var(--text)'                  : 'var(--bg)'
  const linkColor    = scrolled ? 'var(--taupe)'                 : 'rgba(249,247,244,0.75)'
  const linkHover    = scrolled ? 'var(--text)'                  : 'rgba(249,247,244,1)'
  const btnBorder    = scrolled ? 'var(--text)'                  : 'var(--bg)'
  const btnColor     = scrolled ? 'var(--text)'                  : 'var(--bg)'
  const burgerColor  = scrolled ? 'var(--text)'                  : 'var(--bg)'

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? 'rgba(249,247,244,0.92)' : 'transparent',
        backdropFilter:  scrolled ? 'blur(12px)'              : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)'         : 'none',
        borderBottom:    scrolled ? '1px solid var(--line)'   : '1px solid transparent',
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5 md:px-16">

        {/* Logo */}
        <Link
          href="/"
          className="font-[family-name:var(--font-cormorant)] text-xl font-medium tracking-[0.3em] uppercase"
          style={{ color: logoColor, transition: 'color 0.4s' }}
        >
          TERROIR
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <li key={href}>
                <Link
                  href={href}
                  className="font-[family-name:var(--font-jost)] text-sm tracking-wider transition-colors duration-300"
                  style={{
                    color: isActive
                      ? (scrolled ? 'var(--accent)' : 'rgba(249,247,244,1)')
                      : linkColor,
                    transition: 'color 0.4s',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = linkHover }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = isActive
                      ? (scrolled ? 'var(--accent)' : 'rgba(249,247,244,1)')
                      : linkColor
                  }}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-6">
          <Link
            href="/subscribe"
            className="hidden md:inline-flex items-center border px-5 py-2.5 text-xs tracking-widest uppercase font-[family-name:var(--font-jost)]"
            style={{
              borderColor: btnBorder,
              color: btnColor,
              transition: 'color 0.4s, border-color 0.4s, background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              if (scrolled) {
                el.style.backgroundColor = 'var(--text)'
                el.style.color = 'var(--bg)'
              } else {
                el.style.backgroundColor = 'var(--bg)'
                el.style.color = 'var(--text)'
              }
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.backgroundColor = 'transparent'
              el.style.color = btnColor
            }}
          >
            Subscribe
          </Link>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-px w-6 transition-all duration-300"
                style={{
                  backgroundColor: burgerColor,
                  transition: 'background-color 0.4s, transform 0.3s, opacity 0.3s',
                  transform:
                    i === 0 && menuOpen ? 'translateY(6px) rotate(45deg)'   :
                    i === 2 && menuOpen ? 'translateY(-6px) rotate(-45deg)' : '',
                  opacity: i === 1 && menuOpen ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu — always uses light bg */}
      {menuOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 border-t"
          style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--line)' }}
        >
          <ul className="flex flex-col px-8 py-10 gap-7">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="font-[family-name:var(--font-cormorant)] text-3xl font-light italic"
                  style={{ color: 'var(--text)' }}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/subscribe"
                className="inline-flex border px-6 py-3 text-xs tracking-widest uppercase font-[family-name:var(--font-jost)]"
                style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
              >
                Subscribe
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

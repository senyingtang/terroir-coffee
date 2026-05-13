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
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? 'var(--bg)'        : 'transparent',
        borderBottom:    scrolled ? '1px solid var(--line)' : '1px solid transparent',
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5 md:px-16">

        {/* Logo */}
        <Link
          href="/"
          className="font-[family-name:var(--font-cormorant)] text-xl font-medium tracking-[0.3em] uppercase"
          style={{ color: 'var(--text)' }}
        >
          TERROIR
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="font-[family-name:var(--font-jost)] text-sm tracking-wider transition-opacity duration-200 hover:opacity-50"
                style={{ color: pathname === href ? 'var(--accent)' : 'var(--text)' }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-6">
          <Link
            href="/subscribe"
            className="hidden md:inline-flex items-center border px-5 py-2.5 text-xs tracking-widest uppercase transition-opacity hover:opacity-60 font-[family-name:var(--font-jost)]"
            style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
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
                  backgroundColor: 'var(--text)',
                  transform:
                    i === 0 && menuOpen ? 'translateY(6px) rotate(45deg)'  :
                    i === 2 && menuOpen ? 'translateY(-6px) rotate(-45deg)' : '',
                  opacity: i === 1 && menuOpen ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
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

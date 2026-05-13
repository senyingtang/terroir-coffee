import Link from 'next/link'

const nav = {
  Explore: [
    { href: '/about',     label: 'Our Story' },
    { href: '/process',   label: 'The Roast' },
    { href: '/product',   label: 'Shop' },
    { href: '/subscribe', label: 'Subscriptions' },
  ],
  Connect: [
    { href: 'https://instagram.com', label: 'Instagram' },
    { href: '/newsletter',           label: 'Newsletter' },
    { href: '/wholesale',            label: 'Wholesale' },
    { href: '/contact',              label: 'Contact' },
  ],
  Visit: [
    { href: '/visit',      label: 'Zhongzheng Roastery' },
    { href: '/hours',      label: 'Opening Hours' },
    { href: '/directions', label: 'Find Us' },
  ],
}

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{ borderColor: 'var(--line)', backgroundColor: 'var(--bg2)' }}
    >
      <div className="mx-auto max-w-7xl px-8 py-16 md:px-16 md:py-20">

        {/* Top row */}
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          {/* Brand */}
          <div className="flex flex-col gap-4 md:max-w-[220px] shrink-0">
            <Link
              href="/"
              className="font-[family-name:var(--font-cormorant)] text-2xl font-medium tracking-[0.3em] uppercase"
              style={{ color: 'var(--text)' }}
            >
              TERROIR
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
              Single-origin specialty coffee sourced from the world's finest terroirs.
            </p>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 flex-1">
            {Object.entries(nav).map(([category, links]) => (
              <div key={category} className="flex flex-col gap-4">
                <p
                  className="text-xs tracking-[0.25em] uppercase font-[family-name:var(--font-jost)]"
                  style={{ color: 'var(--taupe)' }}
                >
                  {category}
                </p>
                <ul className="flex flex-col gap-3">
                  {links.map(({ href, label }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-sm transition-opacity hover:opacity-60 font-[family-name:var(--font-jost)]"
                        style={{ color: 'var(--text2)' }}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="mt-16 pt-8 border-t flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          style={{ borderColor: 'var(--line)' }}
        >
          <div className="flex flex-col gap-1">
            <span
              className="text-xs font-[family-name:var(--font-jost)]"
              style={{ color: 'var(--taupe-lt)' }}
            >
              © 2024 Terroir Coffee Co. — Taipei, Taiwan
            </span>
            <span
              className="text-xs font-[family-name:var(--font-jost)]"
              style={{ color: 'var(--taupe-lt)', opacity: 0.6 }}
            >
              All lots are seasonal and limited
            </span>
          </div>

          <span
            className="font-[family-name:var(--font-cormorant)] italic text-lg"
            style={{ color: 'var(--taupe)' }}
          >
            Origin. Process. Cup.
          </span>
        </div>
      </div>
    </footer>
  )
}

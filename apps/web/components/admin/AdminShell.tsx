'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Hero', href: '/admin/hero' },
  { label: 'Origin Story', href: '/admin/origin' },
  { label: 'Process', href: '/admin/process' },
  { label: 'Products', href: '/admin/products' },
  { label: 'Manifesto', href: '/admin/manifesto' },
  { label: 'Stats', href: '/admin/stats' },
  { label: 'Team', href: '/admin/team' },
  { label: 'Pages', href: '/admin/pages' },
  { label: 'Settings', href: '/admin/settings' },
]

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const pathnameRef = useRef(pathname)
  pathnameRef.current = pathname

  const [loading, setLoading] = useState(true)
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setAuthed(true)
      } else if (pathnameRef.current !== '/admin/login') {
        router.replace('/admin/login')
      }
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setAuthed(!!session)
      if (!session && pathnameRef.current !== '/admin/login') {
        router.replace('/admin/login')
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  const logout = async () => {
    await supabase.auth.signOut()
    router.replace('/admin/login')
  }

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#F9F7F4' }}>
        <p style={{ fontFamily: 'sans-serif', color: '#8C7B6B', fontSize: 14 }}>Loading...</p>
      </div>
    )
  }

  if (!authed) return null

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{
        width: 220,
        flexShrink: 0,
        backgroundColor: '#111010',
        display: 'flex',
        flexDirection: 'column',
        padding: '0',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 50,
      }}>
        <div style={{ padding: '28px 24px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <p style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8C7B6B', marginBottom: 4 }}>Terroir</p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>CMS Admin</p>
        </div>

        <nav style={{ flex: 1, padding: '16px 0', overflowY: 'auto' }}>
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'block',
                  padding: '10px 24px',
                  fontSize: 13,
                  color: active ? '#fff' : 'rgba(255,255,255,0.45)',
                  textDecoration: 'none',
                  backgroundColor: active ? 'rgba(255,255,255,0.07)' : 'transparent',
                  borderLeft: active ? '2px solid #7A6355' : '2px solid transparent',
                  transition: 'all 0.15s',
                }}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            onClick={logout}
            style={{
              width: '100%',
              padding: '8px 12px',
              fontSize: 12,
              color: 'rgba(255,255,255,0.45)',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 3,
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            登出
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, marginLeft: 220, backgroundColor: '#F9F7F4', minHeight: '100vh' }}>
        {children}
      </main>
    </div>
  )
}

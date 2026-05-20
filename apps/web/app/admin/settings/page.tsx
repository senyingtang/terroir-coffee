'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { SiteSettings } from '@/lib/db-types'

export default function SettingsAdmin() {
  const [data, setData] = useState<SiteSettings | null>(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    supabase.from('site_settings').select('*').limit(1).single()
      .then(({ data }) => { if (data) setData(data) })
  }, [])

  const save = async () => {
    if (!data) return
    setSaving(true)
    setMsg('')
    const { error } = await supabase.from('site_settings')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', data.id)
    setSaving(false)
    setMsg(error ? `錯誤: ${error.message}` : '已儲存')
    setTimeout(() => setMsg(''), 3000)
  }

  if (!data) return <div style={{ padding: 40, color: '#8C7B6B' }}>載入中...</div>

  return (
    <div style={{ padding: 40, maxWidth: 900, margin: 'auto', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <p style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8C7B6B', marginBottom: 4 }}>Terroir CMS</p>
          <h1 style={{ fontSize: 20, fontWeight: 500, color: '#111010', margin: 0 }}>網站設定</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {msg && (
            <span style={{
              fontSize: 12,
              color: msg.startsWith('錯誤') ? '#c0392b' : '#27ae60',
              padding: '8px 12px',
              backgroundColor: msg.startsWith('錯誤') ? '#fff5f5' : '#f0fff4',
              border: `1px solid ${msg.startsWith('錯誤') ? '#fcc' : '#b7f5c8'}`,
              borderRadius: 3,
            }}>{msg}</span>
          )}
          <button
            onClick={save}
            disabled={saving}
            style={{ padding: '10px 24px', fontSize: 13, backgroundColor: saving ? '#B8AFA5' : '#111010', color: '#fff', border: 'none', borderRadius: 3, cursor: saving ? 'not-allowed' : 'pointer' }}
          >
            {saving ? '儲存中...' : '儲存'}
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: '#fff', border: '1px solid #D8D2CA', padding: 24, marginBottom: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 500, color: '#5A5147', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>網站名稱</label>
          <input
            value={data.site_name}
            onChange={e => setData({ ...data, site_name: e.target.value })}
            style={{ width: '100%', padding: '9px 12px', fontSize: 14, border: '1px solid #D8D2CA', borderRadius: 3, outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 500, color: '#5A5147', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>網站描述</label>
          <textarea
            value={data.site_description}
            onChange={e => setData({ ...data, site_description: e.target.value })}
            style={{ width: '100%', padding: '9px 12px', fontSize: 14, border: '1px solid #D8D2CA', borderRadius: 3, outline: 'none', boxSizing: 'border-box', resize: 'vertical', minHeight: 80 }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 500, color: '#5A5147', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Footer 標語</label>
          <input
            value={data.footer_tagline}
            onChange={e => setData({ ...data, footer_tagline: e.target.value })}
            style={{ width: '100%', padding: '9px 12px', fontSize: 14, border: '1px solid #D8D2CA', borderRadius: 3, outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 500, color: '#5A5147', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>版權聲明</label>
          <input
            value={data.copyright}
            onChange={e => setData({ ...data, copyright: e.target.value })}
            style={{ width: '100%', padding: '9px 12px', fontSize: 14, border: '1px solid #D8D2CA', borderRadius: 3, outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 500, color: '#5A5147', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Instagram URL</label>
          <input
            value={data.instagram_url}
            onChange={e => setData({ ...data, instagram_url: e.target.value })}
            type="url"
            placeholder="https://instagram.com/..."
            style={{ width: '100%', padding: '9px 12px', fontSize: 14, border: '1px solid #D8D2CA', borderRadius: 3, outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 500, color: '#5A5147', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Newsletter URL</label>
          <input
            value={data.newsletter_url}
            onChange={e => setData({ ...data, newsletter_url: e.target.value })}
            type="url"
            placeholder="https://..."
            style={{ width: '100%', padding: '9px 12px', fontSize: 14, border: '1px solid #D8D2CA', borderRadius: 3, outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
      </div>
    </div>
  )
}

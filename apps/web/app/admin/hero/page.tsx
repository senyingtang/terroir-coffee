'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import ImageUpload from '@/components/admin/ImageUpload'
import type { HeroData } from '@/lib/db-types'

export default function HeroAdmin() {
  const [data, setData] = useState<HeroData | null>(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    supabase.from('hero').select('*').limit(1).single()
      .then(({ data }) => { if (data) setData(data) })
  }, [])

  const save = async () => {
    if (!data) return
    setSaving(true)
    setMsg('')
    const { error } = await supabase.from('hero')
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
          <h1 style={{ fontSize: 20, fontWeight: 500, color: '#111010', margin: 0 }}>Hero 區塊</h1>
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
          <label style={{ fontSize: 12, fontWeight: 500, color: '#5A5147', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Eyebrow 小標題</label>
          <input
            value={data.eyebrow}
            onChange={e => setData({ ...data, eyebrow: e.target.value })}
            style={{ width: '100%', padding: '9px 12px', fontSize: 14, border: '1px solid #D8D2CA', borderRadius: 3, outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 500, color: '#5A5147', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>主標題 Title</label>
          <textarea
            value={data.title}
            onChange={e => setData({ ...data, title: e.target.value })}
            style={{ width: '100%', padding: '9px 12px', fontSize: 14, border: '1px solid #D8D2CA', borderRadius: 3, outline: 'none', boxSizing: 'border-box', resize: 'vertical', minHeight: 80 }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 500, color: '#5A5147', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>描述文字</label>
          <textarea
            value={data.description}
            onChange={e => setData({ ...data, description: e.target.value })}
            style={{ width: '100%', padding: '9px 12px', fontSize: 14, border: '1px solid #D8D2CA', borderRadius: 3, outline: 'none', boxSizing: 'border-box', resize: 'vertical', minHeight: 80 }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 500, color: '#5A5147', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>背景圖片</label>
          <ImageUpload
            value={data.background_image}
            onChange={url => setData({ ...data, background_image: url })}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 500, color: '#5A5147', marginBottom: 6, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Scroll 提示文字</label>
          <input
            value={data.scroll_text}
            onChange={e => setData({ ...data, scroll_text: e.target.value })}
            style={{ width: '100%', padding: '9px 12px', fontSize: 14, border: '1px solid #D8D2CA', borderRadius: 3, outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            id="is_active"
            checked={data.is_active}
            onChange={e => setData({ ...data, is_active: e.target.checked })}
          />
          <label htmlFor="is_active" style={{ fontSize: 13, color: '#5A5147', cursor: 'pointer' }}>啟用</label>
        </div>
      </div>
    </div>
  )
}

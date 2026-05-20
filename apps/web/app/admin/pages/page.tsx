'use client'
import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import ImageUpload from '@/components/admin/ImageUpload'
import type { PageData } from '@/lib/db-types'

export default function PagesAdmin() {
  const [list, setList] = useState<PageData[]>([])
  const [selected, setSelected] = useState<PageData | null>(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  const fetchData = useCallback(async () => {
    const { data } = await supabase.from('pages').select('*').order('slug')
    if (data) setList(data)
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const save = async () => {
    if (!selected) return
    setSaving(true)
    setMsg('')
    const { error } = await supabase.from('pages')
      .update({ ...selected, updated_at: new Date().toISOString() })
      .eq('id', selected.id)
    setSaving(false)
    setMsg(error ? `錯誤: ${error.message}` : '已儲存')
    setTimeout(() => setMsg(''), 3000)
    fetchData()
  }

  if (selected !== null) {
    return (
      <div style={{ padding: 40, maxWidth: 900, margin: 'auto', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8C7B6B', marginBottom: 4 }}>Terroir CMS</p>
            <h1 style={{ fontSize: 20, fontWeight: 500, color: '#111010', margin: 0 }}>編輯頁面</h1>
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
            <button onClick={() => setSelected(null)} style={{ padding: '8px 16px', fontSize: 13, backgroundColor: 'transparent', color: '#5A5147', border: '1px solid #D8D2CA', borderRadius: 3, cursor: 'pointer' }}>
              返回列表
            </button>
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
            <label style={{ fontSize: 12, fontWeight: 500, color: '#5A5147', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>頁面 Slug</label>
            <input
              value={selected.slug}
              readOnly
              style={{ width: '100%', padding: '9px 12px', fontSize: 14, border: '1px solid #D8D2CA', borderRadius: 3, outline: 'none', boxSizing: 'border-box', backgroundColor: '#F9F7F4', color: '#8C7B6B' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: '#5A5147', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Hero 小標題</label>
            <input
              value={selected.hero_label}
              onChange={e => setSelected({ ...selected, hero_label: e.target.value })}
              style={{ width: '100%', padding: '9px 12px', fontSize: 14, border: '1px solid #D8D2CA', borderRadius: 3, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: '#5A5147', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Hero 主標題</label>
            <input
              value={selected.hero_title}
              onChange={e => setSelected({ ...selected, hero_title: e.target.value })}
              style={{ width: '100%', padding: '9px 12px', fontSize: 14, border: '1px solid #D8D2CA', borderRadius: 3, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: '#5A5147', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Hero 圖片</label>
            <ImageUpload
              value={selected.hero_image}
              onChange={url => setSelected({ ...selected, hero_image: url })}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: '#5A5147', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Meta Title</label>
            <input
              value={selected.meta_title}
              onChange={e => setSelected({ ...selected, meta_title: e.target.value })}
              style={{ width: '100%', padding: '9px 12px', fontSize: 14, border: '1px solid #D8D2CA', borderRadius: 3, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: '#5A5147', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Meta Description</label>
            <textarea
              value={selected.meta_description}
              onChange={e => setSelected({ ...selected, meta_description: e.target.value })}
              style={{ width: '100%', padding: '9px 12px', fontSize: 14, border: '1px solid #D8D2CA', borderRadius: 3, outline: 'none', boxSizing: 'border-box', resize: 'vertical', minHeight: 80 }}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: 40, maxWidth: 900, margin: 'auto', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <p style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8C7B6B', marginBottom: 4 }}>Terroir CMS</p>
          <h1 style={{ fontSize: 20, fontWeight: 500, color: '#111010', margin: 0 }}>頁面設定</h1>
        </div>
      </div>

      <div style={{ backgroundColor: '#fff', border: '1px solid #D8D2CA', marginBottom: 16 }}>
        {list.length === 0 && (
          <div style={{ padding: 24, color: '#8C7B6B', fontSize: 14 }}>尚無資料</div>
        )}
        {list.map((item, idx) => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: idx < list.length - 1 ? '1px solid #EEEBE5' : 'none', backgroundColor: '#fff' }}>
            <span style={{ fontSize: 13, fontFamily: 'monospace', color: '#8C7B6B', width: 120 }}>{item.slug}</span>
            <span style={{ fontSize: 14, color: '#111010', flex: 1 }}>{item.hero_title || '(無標題)'}</span>
            <button
              onClick={() => setSelected(item)}
              style={{ padding: '6px 14px', fontSize: 12, backgroundColor: 'transparent', color: '#5A5147', border: '1px solid #D8D2CA', borderRadius: 3, cursor: 'pointer' }}
            >
              編輯
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

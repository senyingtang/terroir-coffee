'use client'
import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import ImageUpload from '@/components/admin/ImageUpload'
import type { Product } from '@/lib/db-types'

type ProductEdit = Product & { flavor_tags_str?: string }

export default function ProductsAdmin() {
  const [list, setList] = useState<Product[]>([])
  const [selected, setSelected] = useState<ProductEdit | null>(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  const fetchData = useCallback(async () => {
    const { data } = await supabase.from('products').select('*').order('sort_order')
    if (data) setList(data)
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const openEdit = (item: Product) => {
    setSelected({ ...item, flavor_tags_str: (item.flavor_tags || []).join(', ') })
  }

  const save = async () => {
    if (!selected) return
    setSaving(true)
    setMsg('')
    const { flavor_tags_str, ...rest } = selected
    const payload = {
      ...rest,
      flavor_tags: (flavor_tags_str || '').split(',').map(s => s.trim()).filter(Boolean),
      updated_at: new Date().toISOString(),
    }
    let error
    if (selected.id) {
      const res = await supabase.from('products').update(payload).eq('id', selected.id)
      error = res.error
    } else {
      const res = await supabase.from('products').insert(payload)
      error = res.error
    }
    setSaving(false)
    setMsg(error ? `錯誤: ${error.message}` : '已儲存')
    setTimeout(() => setMsg(''), 3000)
    fetchData()
  }

  const deleteItem = async () => {
    if (!selected?.id) return
    if (!confirm('確定要刪除嗎？')) return
    const { error } = await supabase.from('products').delete().eq('id', selected.id)
    if (error) { setMsg(`錯誤: ${error.message}`); return }
    fetchData()
    setSelected(null)
  }

  const moveUp = async (item: Product) => {
    const idx = list.findIndex(x => x.id === item.id)
    if (idx === 0) return
    const prev = list[idx - 1]
    await supabase.from('products').update({ sort_order: item.sort_order }).eq('id', prev.id)
    await supabase.from('products').update({ sort_order: prev.sort_order }).eq('id', item.id)
    fetchData()
  }

  const moveDown = async (item: Product) => {
    const idx = list.findIndex(x => x.id === item.id)
    if (idx === list.length - 1) return
    const next = list[idx + 1]
    await supabase.from('products').update({ sort_order: item.sort_order }).eq('id', next.id)
    await supabase.from('products').update({ sort_order: next.sort_order }).eq('id', item.id)
    fetchData()
  }

  const newItem = (): ProductEdit => ({
    id: '',
    sort_order: list.length + 1,
    origin_country: '',
    name: '',
    origin_detail: '',
    flavor_tags: [],
    flavor_tags_str: '',
    price: '',
    image_url: '',
    altitude: '',
    process_method: '',
    is_active: true,
  })

  if (selected !== null) {
    return (
      <div style={{ padding: 40, maxWidth: 900, margin: 'auto', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8C7B6B', marginBottom: 4 }}>Terroir CMS</p>
            <h1 style={{ fontSize: 20, fontWeight: 500, color: '#111010', margin: 0 }}>
              {selected.id ? '編輯產品' : '新增產品'}
            </h1>
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
            {selected.id && (
              <button onClick={deleteItem} style={{ padding: '8px 16px', fontSize: 12, backgroundColor: 'transparent', color: '#c0392b', border: '1px solid #c0392b', borderRadius: 3, cursor: 'pointer' }}>
                刪除
              </button>
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
            <label style={{ fontSize: 12, fontWeight: 500, color: '#5A5147', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>產地 e.g. ETHIOPIA</label>
            <input
              value={selected.origin_country}
              onChange={e => setSelected({ ...selected, origin_country: e.target.value })}
              style={{ width: '100%', padding: '9px 12px', fontSize: 14, border: '1px solid #D8D2CA', borderRadius: 3, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: '#5A5147', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>產品名稱</label>
            <input
              value={selected.name}
              onChange={e => setSelected({ ...selected, name: e.target.value })}
              style={{ width: '100%', padding: '9px 12px', fontSize: 14, border: '1px solid #D8D2CA', borderRadius: 3, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: '#5A5147', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>產地細節 e.g. Yirgacheffe · 1,900m · Heirloom</label>
            <input
              value={selected.origin_detail}
              onChange={e => setSelected({ ...selected, origin_detail: e.target.value })}
              style={{ width: '100%', padding: '9px 12px', fontSize: 14, border: '1px solid #D8D2CA', borderRadius: 3, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: '#5A5147', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>風味標籤（逗號分隔）</label>
            <input
              value={selected.flavor_tags_str || ''}
              onChange={e => setSelected({ ...selected, flavor_tags_str: e.target.value })}
              placeholder="e.g. Blueberry, Jasmine, Dark Chocolate"
              style={{ width: '100%', padding: '9px 12px', fontSize: 14, border: '1px solid #D8D2CA', borderRadius: 3, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: '#5A5147', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>價格 e.g. NT$ 580</label>
            <input
              value={selected.price}
              onChange={e => setSelected({ ...selected, price: e.target.value })}
              style={{ width: '100%', padding: '9px 12px', fontSize: 14, border: '1px solid #D8D2CA', borderRadius: 3, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: '#5A5147', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>圖片</label>
            <ImageUpload
              value={selected.image_url}
              onChange={url => setSelected({ ...selected, image_url: url })}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: '#5A5147', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>海拔</label>
            <input
              value={selected.altitude}
              onChange={e => setSelected({ ...selected, altitude: e.target.value })}
              style={{ width: '100%', padding: '9px 12px', fontSize: 14, border: '1px solid #D8D2CA', borderRadius: 3, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: '#5A5147', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>處理法 e.g. Natural</label>
            <input
              value={selected.process_method}
              onChange={e => setSelected({ ...selected, process_method: e.target.value })}
              style={{ width: '100%', padding: '9px 12px', fontSize: 14, border: '1px solid #D8D2CA', borderRadius: 3, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              id="is_active"
              checked={selected.is_active}
              onChange={e => setSelected({ ...selected, is_active: e.target.checked })}
            />
            <label htmlFor="is_active" style={{ fontSize: 13, color: '#5A5147', cursor: 'pointer' }}>啟用</label>
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
          <h1 style={{ fontSize: 20, fontWeight: 500, color: '#111010', margin: 0 }}>產品列表</h1>
        </div>
        <button
          onClick={() => setSelected(newItem())}
          style={{ padding: '10px 24px', fontSize: 13, backgroundColor: '#111010', color: '#fff', border: 'none', borderRadius: 3, cursor: 'pointer' }}
        >
          新增
        </button>
      </div>

      <div style={{ backgroundColor: '#fff', border: '1px solid #D8D2CA', marginBottom: 16 }}>
        {list.length === 0 && (
          <div style={{ padding: 24, color: '#8C7B6B', fontSize: 14 }}>尚無資料</div>
        )}
        {list.map((item, idx) => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: idx < list.length - 1 ? '1px solid #EEEBE5' : 'none', backgroundColor: '#fff' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <button onClick={() => moveUp(item)} disabled={idx === 0} style={{ padding: '4px 8px', fontSize: 12, border: '1px solid #D8D2CA', backgroundColor: 'transparent', cursor: idx === 0 ? 'not-allowed' : 'pointer', borderRadius: 2, opacity: idx === 0 ? 0.4 : 1 }}>▲</button>
              <button onClick={() => moveDown(item)} disabled={idx === list.length - 1} style={{ padding: '4px 8px', fontSize: 12, border: '1px solid #D8D2CA', backgroundColor: 'transparent', cursor: idx === list.length - 1 ? 'not-allowed' : 'pointer', borderRadius: 2, opacity: idx === list.length - 1 ? 0.4 : 1 }}>▼</button>
            </div>
            <span style={{ fontSize: 12, color: '#8C7B6B', width: 24 }}>{item.sort_order}</span>
            <span style={{ fontSize: 13, color: '#8C7B6B', width: 80 }}>{item.origin_country}</span>
            <span style={{ fontSize: 14, color: '#111010', flex: 1 }}>{item.name || '(無名稱)'}</span>
            <span style={{ fontSize: 13, color: '#5A5147' }}>{item.price}</span>
            <span style={{ fontSize: 12, padding: '2px 8px', backgroundColor: item.is_active ? '#f0fff4' : '#f9f7f4', color: item.is_active ? '#27ae60' : '#8C7B6B', borderRadius: 2 }}>
              {item.is_active ? '啟用' : '停用'}
            </span>
            <button
              onClick={() => openEdit(item)}
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

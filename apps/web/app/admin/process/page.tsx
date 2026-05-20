'use client'
import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import ImageUpload from '@/components/admin/ImageUpload'
import type { ProcessStep } from '@/lib/db-types'

export default function ProcessAdmin() {
  const [list, setList] = useState<ProcessStep[]>([])
  const [selected, setSelected] = useState<ProcessStep | null>(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  const fetchData = useCallback(async () => {
    const { data } = await supabase.from('process_steps').select('*').order('sort_order')
    if (data) setList(data)
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const save = async () => {
    if (!selected) return
    setSaving(true)
    setMsg('')
    let error
    if (selected.id) {
      const res = await supabase.from('process_steps')
        .update({ ...selected, updated_at: new Date().toISOString() })
        .eq('id', selected.id)
      error = res.error
    } else {
      const res = await supabase.from('process_steps')
        .insert({ ...selected, updated_at: new Date().toISOString() })
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
    const { error } = await supabase.from('process_steps').delete().eq('id', selected.id)
    if (error) { setMsg(`錯誤: ${error.message}`); return }
    fetchData()
    setSelected(null)
  }

  const moveUp = async (item: ProcessStep) => {
    const idx = list.findIndex(x => x.id === item.id)
    if (idx === 0) return
    const prev = list[idx - 1]
    await supabase.from('process_steps').update({ sort_order: item.sort_order }).eq('id', prev.id)
    await supabase.from('process_steps').update({ sort_order: prev.sort_order }).eq('id', item.id)
    fetchData()
  }

  const moveDown = async (item: ProcessStep) => {
    const idx = list.findIndex(x => x.id === item.id)
    if (idx === list.length - 1) return
    const next = list[idx + 1]
    await supabase.from('process_steps').update({ sort_order: item.sort_order }).eq('id', next.id)
    await supabase.from('process_steps').update({ sort_order: next.sort_order }).eq('id', item.id)
    fetchData()
  }

  const newItem = (): ProcessStep => ({
    id: '',
    sort_order: list.length + 1,
    step_num: '',
    title: '',
    description: '',
    image_url: '',
    is_active: true,
  })

  if (selected !== null) {
    return (
      <div style={{ padding: 40, maxWidth: 900, margin: 'auto', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8C7B6B', marginBottom: 4 }}>Terroir CMS</p>
            <h1 style={{ fontSize: 20, fontWeight: 500, color: '#111010', margin: 0 }}>
              {selected.id ? '編輯烘焙步驟' : '新增烘焙步驟'}
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
            <label style={{ fontSize: 12, fontWeight: 500, color: '#5A5147', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>步驟編號 e.g. 01</label>
            <input
              value={selected.step_num}
              onChange={e => setSelected({ ...selected, step_num: e.target.value })}
              style={{ width: '100%', padding: '9px 12px', fontSize: 14, border: '1px solid #D8D2CA', borderRadius: 3, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: '#5A5147', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>步驟名稱</label>
            <input
              value={selected.title}
              onChange={e => setSelected({ ...selected, title: e.target.value })}
              style={{ width: '100%', padding: '9px 12px', fontSize: 14, border: '1px solid #D8D2CA', borderRadius: 3, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: '#5A5147', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>描述</label>
            <textarea
              value={selected.description}
              onChange={e => setSelected({ ...selected, description: e.target.value })}
              style={{ width: '100%', padding: '9px 12px', fontSize: 14, border: '1px solid #D8D2CA', borderRadius: 3, outline: 'none', boxSizing: 'border-box', resize: 'vertical', minHeight: 80 }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: '#5A5147', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>圖片</label>
            <ImageUpload
              value={selected.image_url}
              onChange={url => setSelected({ ...selected, image_url: url })}
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
          <h1 style={{ fontSize: 20, fontWeight: 500, color: '#111010', margin: 0 }}>烘焙工序</h1>
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
            <span style={{ fontSize: 13, color: '#8C7B6B', width: 32 }}>{item.step_num}</span>
            <span style={{ fontSize: 14, color: '#111010', flex: 1 }}>{item.title || '(無標題)'}</span>
            <span style={{ fontSize: 12, padding: '2px 8px', backgroundColor: item.is_active ? '#f0fff4' : '#f9f7f4', color: item.is_active ? '#27ae60' : '#8C7B6B', borderRadius: 2 }}>
              {item.is_active ? '啟用' : '停用'}
            </span>
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

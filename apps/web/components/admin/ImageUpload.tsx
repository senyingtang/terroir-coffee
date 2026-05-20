'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  folder?: string
}

export default function ImageUpload({ value, onChange, folder = 'uploads' }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)

  const upload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('請選擇圖片檔案')
      return
    }
    setUploading(true)
    setError('')
    const ext = file.name.split('.').pop()
    const path = `${folder}/${Date.now()}.${ext}`
    const { error: uploadError } = await supabase.storage.from('images').upload(path, file, { upsert: true })
    if (uploadError) {
      setError(uploadError.message)
      setUploading(false)
      return
    }
    const { data } = supabase.storage.from('images').getPublicUrl(path)
    onChange(data.publicUrl)
    setUploading(false)
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) upload(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) upload(file)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${dragging ? '#7A6355' : '#D8D2CA'}`,
          borderRadius: 4,
          padding: '16px 12px',
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: dragging ? '#F5F0EB' : '#FAFAFA',
          transition: 'all 0.2s',
        }}
      >
        {uploading ? (
          <p style={{ fontSize: 13, color: '#8C7B6B' }}>上傳中...</p>
        ) : (
          <p style={{ fontSize: 13, color: '#8C7B6B' }}>
            拖曳圖片至此，或 <span style={{ color: '#7A6355', textDecoration: 'underline' }}>點擊選擇</span>
          </p>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
      {error && <p style={{ fontSize: 12, color: '#c0392b' }}>{error}</p>}
      {value && (
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <div style={{ position: 'relative', width: 80, height: 60, flexShrink: 0, borderRadius: 2, overflow: 'hidden', border: '1px solid #D8D2CA' }}>
            <Image src={value} alt="preview" fill style={{ objectFit: 'cover' }} unoptimized />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="或直接貼上圖片 URL"
              style={{
                width: '100%',
                padding: '6px 8px',
                fontSize: 12,
                border: '1px solid #D8D2CA',
                borderRadius: 3,
                fontFamily: 'monospace',
                color: '#5A5147',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>
      )}
      {!value && (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="或直接貼上圖片 URL"
          style={{
            width: '100%',
            padding: '6px 8px',
            fontSize: 12,
            border: '1px solid #D8D2CA',
            borderRadius: 3,
            fontFamily: 'monospace',
            color: '#5A5147',
            boxSizing: 'border-box',
          }}
        />
      )}
    </div>
  )
}

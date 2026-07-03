'use client'
import { useRef, useState } from 'react'
import { Upload, Trash2, RefreshCw, ImagePlus } from 'lucide-react'
import { toast } from 'sonner'
import ImagePositioner from './ImagePositioner'

/**
 * Upload an image from the computer to Cloudinary and return the delivery URL.
 * - `url` / `onUrlChange`  : the stored image URL
 * - `pos` / `onPosChange`  : optional object-position ("40% 25%") for drag-to-reposition
 * Replacing or removing an image deletes the previously uploaded one (best effort).
 */
export default function ImageUploader({ url, onUrlChange, pos, onPosChange, height = 200, rounded = 10 }) {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const deletePrevious = (prev, next) => {
    if (!prev || prev === next) return
    fetch('/api/upload', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: prev }) }).catch(() => {})
  }

  const doUpload = async (file) => {
    if (!file) return
    if (!file.type?.startsWith('image/')) { toast.error('Please choose an image file'); return }
    if (file.size > 10 * 1024 * 1024) { toast.error('Image must be under 10 MB'); return }
    setUploading(true)
    const prev = url
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) { toast.error(data.error || 'Upload failed'); return }
      onUrlChange(data.url)
      if (onPosChange) onPosChange('') // reset framing for the new image
      deletePrevious(prev, data.url)
    } catch {
      toast.error('Upload failed. Check your connection.')
    } finally {
      setUploading(false)
    }
  }

  const onPick = (e) => { const f = e.target.files?.[0]; if (f) doUpload(f); e.target.value = '' }
  const onDrop = (e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files?.[0]; if (f) doUpload(f) }
  const remove = () => {
    const prev = url
    onUrlChange('')
    if (onPosChange) onPosChange('')
    deletePrevious(prev, '')
  }

  const spin = <span style={{ width: 20, height: 20, border: '3px solid rgba(232,82,10,0.25)', borderTop: '3px solid #e8520a', borderRadius: '50%', animation: 'iuspin 0.8s linear infinite', display: 'inline-block' }} />

  return (
    <div style={{ marginTop: 6 }}>
      <style>{'@keyframes iuspin{to{transform:rotate(360deg)}}'}</style>
      <input ref={inputRef} type="file" accept="image/*" onChange={onPick} style={{ display: 'none' }} />

      {uploading ? (
        <div style={{ height, borderRadius: rounded, background: '#f9fafb', border: '1.5px dashed #e5e7eb', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, color: '#e8520a' }}>
          {spin}
          <span style={{ fontSize: 12, fontWeight: 600, color: '#9a3412' }}>Uploading…</span>
        </div>
      ) : url ? (
        <div>
          {onPosChange
            ? <ImagePositioner src={url} value={pos} onChange={onPosChange} height={height} rounded={rounded} />
            : (
              <div style={{ height, borderRadius: rounded, overflow: 'hidden', background: '#f3f4f6' }}>
                <img src={url} alt="upload" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none' }} />
              </div>
            )}
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <button type="button" onClick={() => inputRef.current?.click()} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', color: '#374151', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>
              <RefreshCw size={13} /> Replace
            </button>
            <button type="button" onClick={remove} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 8, border: '1px solid #fee2e2', background: '#fff', color: '#ef4444', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>
              <Trash2 size={13} /> Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          style={{ width: '100%', height, borderRadius: rounded, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, textAlign: 'center', padding: 12, background: dragOver ? '#fff5ef' : '#f9fafb', border: `1.5px dashed ${dragOver ? '#e8520a' : '#d1d5db'}`, transition: 'background 0.15s, border-color 0.15s' }}
        >
          <div style={{ width: 42, height: 42, borderRadius: 12, background: '#fff5ef', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ImagePlus size={20} style={{ color: '#e8520a' }} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#374151', display: 'inline-flex', alignItems: 'center', gap: 6 }}><Upload size={13} /> Upload image</span>
          <span style={{ fontSize: 11, color: '#9ca3af' }}>Click or drop a file · PNG/JPG up to 10 MB</span>
        </button>
      )}
    </div>
  )
}

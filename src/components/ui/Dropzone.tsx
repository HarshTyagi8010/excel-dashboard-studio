'use client'

import { useState, useCallback, useRef } from 'react'
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DropzoneProps {
  onFile: (file: File) => void
  isLoading?: boolean
  error?: string | null
}

const ACCEPTED = ['.xlsx', '.xls', '.csv']
const MAX_SIZE = 50 * 1024 * 1024 // 50MB

export function Dropzone({ onFile, isLoading, error }: DropzoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragError, setDragError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const validate = (file: File): string | null => {
    const ext = '.' + file.name.split('.').pop()?.toLowerCase()
    if (!ACCEPTED.includes(ext)) return `Unsupported format. Use ${ACCEPTED.join(', ')}`
    if (file.size > MAX_SIZE) return 'File too large. Max 50MB.'
    return null
  }

  const handleFile = useCallback((file: File) => {
    const err = validate(file)
    if (err) { setDragError(err); return }
    setDragError(null)
    onFile(file)
  }, [onFile])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true) }
  const onDragLeave = () => setIsDragging(false)

  const displayError = dragError || error

  return (
    <div
      className={cn(
        'relative rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer',
        'p-12 flex flex-col items-center justify-center text-center gap-4',
        isDragging
          ? 'border-blue-400 bg-blue-500/10 scale-[1.01]'
          : displayError
            ? 'border-red-500/50 bg-red-500/5'
            : 'border-slate-700 bg-slate-900/50 hover:border-slate-500 hover:bg-slate-900',
      )}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onClick={() => !isLoading && inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={ACCEPTED.join(',')}
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
      />

      {isLoading ? (
        <>
          <div className="w-16 h-16 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin" />
          <p className="text-slate-300 font-medium">Parsing your file...</p>
          <p className="text-slate-500 text-sm">Detecting columns and building charts</p>
        </>
      ) : displayError ? (
        <>
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
            <AlertCircle size={32} className="text-red-400" />
          </div>
          <p className="text-red-400 font-medium">{displayError}</p>
          <p className="text-slate-500 text-sm">Click to try a different file</p>
        </>
      ) : (
        <>
          <div className={cn('w-16 h-16 rounded-full flex items-center justify-center transition-colors',
            isDragging ? 'bg-blue-500/20' : 'bg-slate-800')}>
            <Upload size={28} className={isDragging ? 'text-blue-400' : 'text-slate-400'} />
          </div>
          <div>
            <p className="text-slate-200 font-semibold text-lg">
              {isDragging ? 'Drop to analyze' : 'Drop your file here'}
            </p>
            <p className="text-slate-500 text-sm mt-1">
              or <span className="text-blue-400">browse files</span>
            </p>
          </div>
          <div className="flex items-center gap-2 mt-2">
            {ACCEPTED.map((ext) => (
              <span key={ext} className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-400 font-mono">
                {ext}
              </span>
            ))}
            <span className="text-slate-600 text-xs">· Up to 50MB</span>
          </div>
        </>
      )}
    </div>
  )
}

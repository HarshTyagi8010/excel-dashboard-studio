'use client'

import { useState, useCallback } from 'react'
import { BarChart2, Zap, Shield, Download, ChevronRight, Play, FileSpreadsheet } from 'lucide-react'
import { Dropzone } from '@/components/ui/Dropzone'
import { Dashboard } from '@/components/layout/Dashboard'
import { Navbar } from '@/components/layout/Navbar'
import { parseFile } from '@/lib/parser'
import { DEMO_DATA } from '@/lib/demo-data'
import type { SheetData } from '@/types'

type View = 'landing' | 'dashboard'

const FEATURES = [
  { icon: Zap, title: 'Instant Charts', text: 'Auto-generated bar, line, area & pie charts from your data' },
  { icon: BarChart2, title: 'KPI Cards', text: 'Automatic aggregation of key metrics and statistics' },
  { icon: Download, title: 'Export Ready', text: 'Download your dashboard as a PDF report or PowerPoint deck' },
  { icon: Shield, title: 'Private & Secure', text: 'All processing is done locally in your browser' },
]

export default function Home() {
  const [view, setView] = useState<View>('landing')
  const [sheets, setSheets] = useState<SheetData[]>([])
  const [activeSheet, setActiveSheet] = useState(0)
  const [fileName, setFileName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFile = useCallback(async (file: File) => {
    setIsLoading(true)
    setError(null)
    try {
      const parsed = await parseFile(file)
      if (parsed.length === 0) throw new Error('No data found in the file.')
      setSheets(parsed)
      setActiveSheet(0)
      setFileName(file.name)
      setView('dashboard')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to parse file.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleDemo = useCallback(() => {
    setSheets([DEMO_DATA])
    setActiveSheet(0)
    setFileName('demo-sales-data.xlsx')
    setView('dashboard')
  }, [])

  const handleNewFile = useCallback(() => {
    setView('landing')
    setSheets([])
    setFileName('')
    setError(null)
  }, [])

  const currentData = sheets[activeSheet]?.data

  if (view === 'dashboard' && currentData) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
        <Navbar
          fileName={fileName}
          onNewFile={handleNewFile}
        />
        <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
          {/* Sheet tabs */}
          {sheets.length > 1 && (
            <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
              {sheets.map((s, i) => (
                <button
                  key={s.name}
                  onClick={() => setActiveSheet(i)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    i === activeSheet
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <FileSpreadsheet size={12} />
                  {s.name}
                </button>
              ))}
            </div>
          )}
          <Dashboard data={currentData} fileName={fileName} />
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Simple nav */}
      <nav className="border-b border-slate-800/60 px-6 h-14 flex items-center justify-between max-w-screen-xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
            <BarChart2 size={16} className="text-blue-400" />
          </div>
          <span className="font-semibold text-slate-100 text-sm">Excel Dashboard Studio</span>
        </div>
        <button
          onClick={handleDemo}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors"
        >
          <Play size={13} />
          View Demo
        </button>
      </nav>

      <main className="max-w-screen-lg mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Hero */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-xs font-medium text-blue-400 mb-6">
            <Zap size={12} />
            Instant analytics · No sign-up required
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-100 leading-tight tracking-tight mb-4">
            Turn spreadsheets into
            <br />
            <span className="text-blue-400">interactive dashboards</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Upload any Excel or CSV file. Get instant charts, KPI cards, a searchable table, and export-ready reports in seconds.
          </p>
        </div>

        {/* Upload zone */}
        <div className="max-w-2xl mx-auto mb-16 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <Dropzone onFile={handleFile} isLoading={isLoading} error={error} />
          <div className="flex items-center justify-center mt-4 gap-4">
            <div className="h-px flex-1 bg-slate-800" />
            <span className="text-xs text-slate-600">or</span>
            <div className="h-px flex-1 bg-slate-800" />
          </div>
          <button
            onClick={handleDemo}
            className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600 hover:bg-slate-800/50 transition-all text-sm font-medium"
          >
            <Play size={14} />
            Try with demo sales data
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
          {FEATURES.map((f) => (
            <div key={f.title} className="card p-4 text-center">
              <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto mb-3">
                <f.icon size={16} className="text-blue-400" />
              </div>
              <p className="text-sm font-semibold text-slate-200 mb-1">{f.title}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-20 text-slate-600 text-xs">
          Excel Dashboard Studio · All processing runs locally in your browser
        </div>
      </main>
    </div>
  )
}

'use client'

import { BarChart2, Download, FileSpreadsheet, Upload, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavbarProps {
  fileName?: string
  isExporting?: boolean
  onExportPDF?: () => void
  onExportPPTX?: () => void
  onNewFile?: () => void
}

export function Navbar({ fileName, isExporting, onExportPDF, onExportPPTX, onNewFile }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-slate-800/80">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
            <BarChart2 size={16} className="text-blue-400" />
          </div>
          <span className="font-semibold text-slate-100 text-sm hidden sm:block">Excel Dashboard Studio</span>
        </div>

        {fileName && (
          <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700 rounded-full px-3 py-1 flex-1 max-w-xs">
            <FileSpreadsheet size={12} className="text-emerald-400 flex-shrink-0" />
            <span className="text-xs text-slate-300 truncate">{fileName}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          {onNewFile && (
            <button
              onClick={onNewFile}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              <Upload size={13} />
              <span className="hidden sm:block">New File</span>
            </button>
          )}
          {onExportPDF && (
            <button
              onClick={onExportPDF}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors disabled:opacity-50"
            >
              {isExporting ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
              PDF
            </button>
          )}
          {onExportPPTX && (
            <button
              onClick={onExportPPTX}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 transition-colors disabled:opacity-50"
            >
              {isExporting ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
              PPTX
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

'use client'

import { useMemo, useState } from 'react'
import {
  TrendingUp, Table2, Hash, Layers, Download, Loader2,
  BarChart3, PieChart, Activity, Grid3x3
} from 'lucide-react'
import { KPICard } from '@/components/ui/KPICard'
import { ChartCard } from '@/components/charts/ChartCard'
import { DataTable } from '@/components/ui/DataTable'
import { analyzeData, generateChartData, generateCategoryData } from '@/lib/parser'
import { exportToPDF, exportToPPTX } from '@/lib/export'
import { formatNumber } from '@/lib/utils'
import type { ParsedData } from '@/types'

interface DashboardProps {
  data: ParsedData
  fileName: string
}

export function Dashboard({ data, fileName }: DashboardProps) {
  const [isExportingPDF, setIsExportingPDF] = useState(false)
  const [isExportingPPTX, setIsExportingPPTX] = useState(false)
  const [exportError, setExportError] = useState<string | null>(null)

  const metrics = useMemo(() => analyzeData(data), [data])

  const charts = useMemo(() => {
    const result: { title: string; data: { name: string; value: number }[]; type: 'bar' | 'line' | 'pie' | 'area'; color: string }[] = []

    // Numeric × categorical charts
    if (metrics.numericColumns.length > 0 && metrics.categoricalColumns.length > 0) {
      const numCol = metrics.numericColumns[0]
      const catCol = metrics.categoricalColumns[0]
      result.push({
        title: `${numCol.name} by ${catCol.name}`,
        data: generateChartData(data.rows, catCol.name, numCol.name, 12),
        type: 'bar',
        color: '#3b82f6',
      })
    }

    // Second numeric × categorical
    if (metrics.numericColumns.length > 1 && metrics.categoricalColumns.length > 0) {
      const numCol = metrics.numericColumns[1]
      const catCol = metrics.categoricalColumns[0]
      result.push({
        title: `${numCol.name} by ${catCol.name}`,
        data: generateChartData(data.rows, catCol.name, numCol.name, 12),
        type: 'area',
        color: '#8b5cf6',
      })
    }

    // Category distribution pie
    if (metrics.categoricalColumns.length > 0) {
      const catCol = metrics.categoricalColumns[0]
      result.push({
        title: `${catCol.name} Distribution`,
        data: generateCategoryData(data.rows, catCol.name, 8),
        type: 'pie',
        color: '#10b981',
      })
    }

    // 2nd category
    if (metrics.categoricalColumns.length > 1) {
      const catCol = metrics.categoricalColumns[1]
      result.push({
        title: `${catCol.name} Breakdown`,
        data: generateCategoryData(data.rows, catCol.name, 10),
        type: 'bar',
        color: '#f59e0b',
      })
    }

    // Line chart for 3rd numeric
    if (metrics.numericColumns.length > 2 && metrics.categoricalColumns.length > 0) {
      const numCol = metrics.numericColumns[2]
      const catCol = metrics.categoricalColumns[0]
      result.push({
        title: `${numCol.name} Trend`,
        data: generateChartData(data.rows, catCol.name, numCol.name, 12),
        type: 'line',
        color: '#06b6d4',
      })
    }

    return result
  }, [data, metrics])

  const kpiCards = useMemo(() => {
    const cards = [
      { label: 'Total Records', value: formatNumber(metrics.totalRows), icon: Table2, color: 'blue' as const },
      { label: 'Columns', value: String(metrics.totalColumns), icon: Grid3x3, color: 'purple' as const },
    ]
    metrics.numericColumns.slice(0, 2).forEach((col, i) => {
      cards.push({
        label: `Total ${col.name}`,
        value: formatNumber(col.sum ?? 0),
        icon: i === 0 ? TrendingUp : Activity,
        color: i === 0 ? 'green' as const : 'orange' as const,
      })
    })
    return cards
  }, [metrics])

  const handleExportPDF = async () => {
    setIsExportingPDF(true)
    setExportError(null)
    try {
      await exportToPDF('dashboard-content', fileName.replace(/\.[^.]+$/, '') + '-report')
    } catch (e) {
      setExportError('PDF export failed. Please try again.')
    } finally {
      setIsExportingPDF(false)
    }
  }

  const handleExportPPTX = async () => {
    setIsExportingPPTX(true)
    setExportError(null)
    try {
      const kpis = kpiCards.map((k) => ({ label: k.label, value: k.value }))
      await exportToPPTX(kpis, charts, fileName.replace(/\.[^.]+$/, '') + '-presentation')
    } catch (e) {
      setExportError('PPTX export failed. Please try again.')
    } finally {
      setIsExportingPPTX(false)
    }
  }

  const isExporting = isExportingPDF || isExportingPPTX

  return (
    <div className="space-y-6">
      {/* Export toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-100">{data.sheetName}</h2>
          <p className="text-sm text-slate-500 mt-0.5">{metrics.totalRows.toLocaleString()} rows · {metrics.totalColumns} columns</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {exportError && <p className="text-xs text-red-400 self-center">{exportError}</p>}
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors disabled:opacity-50"
          >
            {isExportingPDF ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
            Export PDF
          </button>
          <button
            onClick={handleExportPPTX}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 transition-colors disabled:opacity-50"
          >
            {isExportingPPTX ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
            Export PPTX
          </button>
        </div>
      </div>

      <div id="dashboard-content" className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map((card, i) => (
            <KPICard key={card.label} {...card} delay={i * 80} />
          ))}
        </div>

        {/* Charts grid */}
        {charts.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {charts.map((chart, i) => (
              <ChartCard
                key={chart.title}
                title={chart.title}
                data={chart.data}
                type={chart.type}
                color={chart.color}
                delay={200 + i * 100}
              />
            ))}
          </div>
        )}

        {/* Data table */}
        <DataTable headers={data.headers} rows={data.rows} />
      </div>
    </div>
  )
}

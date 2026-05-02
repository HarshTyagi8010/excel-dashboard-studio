export interface ParsedData {
  headers: string[]
  rows: Record<string, unknown>[]
  sheetName: string
  totalRows: number
}

export interface SheetData {
  name: string
  data: ParsedData
}

export interface ColumnStats {
  name: string
  type: 'number' | 'string' | 'date' | 'boolean'
  uniqueCount: number
  nullCount: number
  min?: number
  max?: number
  sum?: number
  avg?: number
  topValues?: { value: string; count: number }[]
}

export interface DashboardMetrics {
  totalRows: number
  totalColumns: number
  numericColumns: ColumnStats[]
  categoricalColumns: ColumnStats[]
  dateColumns: ColumnStats[]
}

export type ChartType = 'bar' | 'line' | 'pie' | 'area'

export interface ChartConfig {
  id: string
  type: ChartType
  title: string
  xKey: string
  yKey?: string
  dataKey?: string
  color?: string
}

export interface FilterState {
  search: string
  column: string
  value: string
}

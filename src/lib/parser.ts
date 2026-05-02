import * as XLSX from 'xlsx'
import type { ParsedData, SheetData, ColumnStats, DashboardMetrics } from '@/types'

export function parseFile(file: File): Promise<SheetData[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = e.target?.result
        if (!data) throw new Error('Empty file')

        const workbook = XLSX.read(data, {
          type: 'binary',
          cellDates: true,
        })

        const sheets: SheetData[] = []

        workbook.SheetNames.forEach((name) => {
          const ws = workbook.Sheets[name]

          const jsonData = XLSX.utils.sheet_to_json(ws, {
            defval: null,
            raw: false,
          }) as Record<string, unknown>[]

          if (!jsonData.length) return

          const headers = Object.keys(jsonData[0])

          sheets.push({
            name,
            data: {
              headers,
              rows: jsonData,
              sheetName: name,
              totalRows: jsonData.length,
            },
          })
        })

        resolve(sheets)
      } catch {
        reject(new Error('Invalid Excel/CSV file'))
      }
    }

    reader.onerror = () => reject(new Error('File reading failed'))

    reader.readAsBinaryString(file)
  })
}

export function detectColumnType(values: unknown[]): ColumnStats['type'] {
  const nonNull = values.filter((v) => v !== null && v !== undefined && v !== '')

  if (!nonNull.length) return 'string'

  const numCount = nonNull.filter((v) => !isNaN(Number(v))).length
  if (numCount / nonNull.length > 0.8) return 'number'

  const dateCount = nonNull.filter((v) => !isNaN(Date.parse(String(v)))).length
  if (dateCount / nonNull.length > 0.8) return 'date'

  return 'string'
}

export function analyzeData(data: ParsedData): DashboardMetrics {
  const { headers, rows } = data

  const columnStats: ColumnStats[] = headers.map((col) => {
    const values = rows.map((r) => r[col])
    const type = detectColumnType(values)

    const nonNull = values.filter((v) => v !== null && v !== undefined && v !== '')
    const nullCount = values.length - nonNull.length

    // 🔢 Numeric columns
    if (type === 'number') {
      const nums = nonNull.map(Number).filter((n) => !isNaN(n))

      if (!nums.length) {
        return {
          name: col,
          type,
          uniqueCount: 0,
          nullCount,
        }
      }

      const sum = nums.reduce((a, b) => a + b, 0)

      return {
        name: col,
        type,
        uniqueCount: new Set(nums).size,
        nullCount,
        min: Math.min(...nums),
        max: Math.max(...nums),
        sum,
        avg: sum / nums.length,
      }
    }

    // 🔤 Categorical / string
    const freq: Record<string, number> = {}

    nonNull.forEach((v) => {
      const key = String(v)
      freq[key] = (freq[key] || 0) + 1
    })

    const topValues = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([value, count]) => ({ value, count }))

    return {
      name: col,
      type,
      uniqueCount: Object.keys(freq).length, // ✅ FIXED
      nullCount,
      topValues,
    }
  })

  return {
    totalRows: rows.length,
    totalColumns: headers.length,
    numericColumns: columnStats.filter((c) => c.type === 'number'),
    categoricalColumns: columnStats.filter((c) => c.type === 'string'),
    dateColumns: columnStats.filter((c) => c.type === 'date'),
  }
}

export function generateChartData(
  rows: Record<string, unknown>[],
  xKey: string,
  yKey: string,
  limit = 20
) {
  const freq: Record<string, number> = {}

  rows.forEach((r) => {
    const x = String(r[xKey] ?? 'Unknown')
    const y = Number(r[yKey] ?? 0)

    freq[x] = (freq[x] || 0) + (isNaN(y) ? 1 : y)
  })

  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, value]) => ({
      name,
      value: Math.round(value * 100) / 100,
    }))
}

export function generateCategoryData(
  rows: Record<string, unknown>[],
  colKey: string,
  limit = 8
) {
  const freq: Record<string, number> = {}

  rows.forEach((r) => {
    const key = String(r[colKey] ?? 'Unknown')
    freq[key] = (freq[key] || 0) + 1
  })

  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, value]) => ({ name, value }))
}

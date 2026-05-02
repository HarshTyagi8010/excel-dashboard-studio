'use client'

export async function exportToPDF(elementId: string, filename = 'dashboard-report') {
  const { default: jsPDF } = await import('jspdf')
  const { default: html2canvas } = await import('html2canvas')

  const element = document.getElementById(elementId)
  if (!element) throw new Error('Element not found')

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#0f172a',
    logging: false,
  })

  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width / 2, canvas.height / 2] })
  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2)
  pdf.save(`${filename}.pdf`)
}

export async function exportToPPTX(
  metrics: { label: string; value: string }[],
  chartData: { title: string; data: { name: string; value: number }[] }[],
  filename = 'dashboard-presentation'
) {
  const pptxgen = (await import('pptxgenjs')).default
  const prs = new pptxgen()

  // Slide 1 - Title
  const slide1 = prs.addSlide()
  slide1.background = { color: '0f172a' }
  slide1.addText('Dashboard Report', {
    x: '5%', y: '35%', w: '90%', h: '15%',
    fontSize: 40, bold: true, color: '60a5fa', align: 'center',
  })
  slide1.addText(`Generated on ${new Date().toLocaleDateString()}`, {
    x: '5%', y: '55%', w: '90%', h: '10%',
    fontSize: 16, color: '94a3b8', align: 'center',
  })

  // Slide 2 - KPIs
  if (metrics.length > 0) {
    const slide2 = prs.addSlide()
    slide2.background = { color: '0f172a' }
    slide2.addText('Key Metrics', {
      x: '5%', y: '5%', w: '90%', h: '12%',
      fontSize: 28, bold: true, color: 'f1f5f9',
    })
    metrics.slice(0, 4).forEach((m, i) => {
      const slideWidth = 10
const slideHeight = 5.625

data.forEach((m, i) => {
  // Convert grid layout into inch-based positions
  const x = 0.5 + (i % 2) * 5      // 2 columns
  const y = 1.5 + Math.floor(i / 2) * 3  // rows

  slide2.addShape(prs.ShapeType.rect, {
    x,
    y,
    w: 4.5,
    h: 2.5,
    fill: { color: '1e293b' },
    line: { color: '334155', width: 1 }
  })

  slide2.addText(m.value, {
    x,
    y,
    w: 4.5,
    h: 1.4,
    fontSize: 32,
    bold: true,
    color: '60a5fa',
    align: 'center',
    valign: 'bottom'
  })

  slide2.addText(m.label, {
    x,
    y: y + 1.4, // offset instead of %
    w: 4.5,
    h: 1,
    fontSize: 14,
    color: '94a3b8',
    align: 'center',
    valign: 'top'
  })
})
  }

  // Slides 3+ - Chart Data Tables
  chartData.slice(0, 3).forEach((chart) => {
    const slide = prs.addSlide()
    slide.background = { color: '0f172a' }
    slide.addText(chart.title, {
      x: '5%', y: '5%', w: '90%', h: '12%',
      fontSize: 24, bold: true, color: 'f1f5f9',
    })

    const rows: pptxgen.TableRow[] = [
      [
        { text: 'Category', options: { bold: true, color: '60a5fa', fill: { color: '1e3a5f' } } },
        { text: 'Value', options: { bold: true, color: '60a5fa', fill: { color: '1e3a5f' } } },
      ],
      ...chart.data.slice(0, 10).map((d) => [
        { text: d.name, options: { color: 'e2e8f0' } },
        { text: String(d.value), options: { color: 'e2e8f0' } },
      ]),
    ]

    slide.addTable(rows, {
      x: '5%', y: '20%', w: '90%',
      border: { type: 'solid', color: '334155', pt: 1 },
      rowH: 0.45,
      fill: { color: '0f1f35' },
      color: 'e2e8f0',
      fontSize: 14,
    })
  })

  await prs.writeFile({ fileName: `${filename}.pptx` })
}

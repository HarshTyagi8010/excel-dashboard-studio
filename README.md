# Excel Dashboard Studio

A production-ready web app that lets users upload Excel/CSV files and instantly generates interactive analytics dashboards with charts, KPI cards, data tables, and export options.

## Features

- 📊 **Auto-generated charts** — bar, line, area, and pie charts based on detected data types
- 📋 **KPI cards** — automatic aggregation of key metrics
- 🔍 **Searchable data table** — with pagination and column sorting
- 📄 **Export to PDF** — captures the full dashboard via html2canvas + jsPDF
- 📑 **Export to PPTX** — multi-slide PowerPoint via pptxgenjs
- 🗂️ **Multi-sheet support** — navigate between Excel sheets
- 🎨 **Demo mode** — works without uploading a file
- 🔒 **Client-side only** — all file parsing happens in the browser

## Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Parsing**: SheetJS (xlsx)
- **PDF**: jsPDF + html2canvas
- **PPTX**: pptxgenjs

## Local Setup

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open http://localhost:3000
```

## Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Deploy to Vercel (recommended)

```bash
npx vercel
```

### Deploy to Netlify

```bash
npm run build
# Upload the .next folder or connect your repo to Netlify
```

## Environment Variables

No environment variables are required. See `.env.example` for reference.

## Project Structure

```
src/
├── app/
│   ├── globals.css       # Global styles + design tokens
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main page (landing + dashboard)
├── components/
│   ├── charts/
│   │   └── ChartCard.tsx # Recharts wrapper
│   ├── layout/
│   │   ├── Navbar.tsx    # Top navigation
│   │   └── Dashboard.tsx # Dashboard view
│   └── ui/
│       ├── Dropzone.tsx  # File upload dropzone
│       ├── KPICard.tsx   # KPI metric card
│       └── DataTable.tsx # Paginated data table
├── lib/
│   ├── demo-data.ts      # Sample data for demo mode
│   ├── export.ts         # PDF + PPTX export utilities
│   ├── parser.ts         # Excel/CSV parsing + analysis
│   └── utils.ts          # Helper functions
└── types/
    └── index.ts          # TypeScript types
```

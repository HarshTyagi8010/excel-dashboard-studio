# 🚀 Excel Dashboard Studio

> Transform Excel & CSV files into interactive analytics dashboards in seconds

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-Production--Ready-success)

---

## 🌐 Live Demo

👉 https://your-demo-link.vercel.app *(add after deployment)*

---

## 📸 Preview

![Dashboard Preview](./public/demo.png)

---

## ✨ Features

* 📊 **Auto-generated charts** — bar, line, area, pie based on smart data detection
* 📋 **KPI cards** — automatic aggregation of key business metrics
* 🔍 **Advanced data table** — search, pagination, sorting
* 📄 **Export to PDF** — full dashboard capture via html2canvas + jsPDF
* 📑 **Export to PPTX** — multi-slide presentation via pptxgenjs
* 🗂️ **Multi-sheet support** — navigate Excel sheets easily
* 🎨 **Demo mode** — explore without uploading files
* 🔒 **Client-side only** — no data leaves the browser

---

## 🛠 Tech Stack

| Layer     | Technology                    |
| --------- | ----------------------------- |
| Framework | Next.js (App Router)          |
| Language  | TypeScript                    |
| Styling   | Tailwind CSS                  |
| Charts    | Recharts                      |
| Parsing   | SheetJS (xlsx)                |
| Export    | jsPDF, html2canvas, pptxgenjs |

---

## 🚀 Getting Started

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/excel-dashboard-studio.git

# Navigate
cd excel-dashboard-studio

# Install dependencies
npm install

# Start dev server
npm run dev
```

👉 Open: http://localhost:3000

---

## 🐳 Docker Setup

```bash
# Build Docker image
docker build -t excel-dashboard .

# Run container
docker run -p 3000:3000 excel-dashboard
```

---

## 📦 Build & Production

```bash
# Build app
npm run build

# Start production server
npm start
```

---

## ☁️ Deployment

### Deploy to Vercel (Recommended)

```bash
npx vercel
```

### Deploy to Netlify

```bash
npm run build
```

---

## 📂 Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── charts/
│   ├── layout/
│   └── ui/
├── lib/
│   ├── parser.ts
│   ├── export.ts
│   └── utils.ts
└── types/
```

---

## ⚠️ Notes

* Some npm audit warnings may appear (common in JS ecosystem)
* For production, use optimized build (`npm run build`)
* Large Excel files may impact performance in browser

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Harsh Tyagi**

---

## ⭐ Support

If you found this project helpful:

👉 Star this repo
👉 Share it with others
👉 Use it in your portfolio

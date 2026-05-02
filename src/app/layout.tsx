import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Excel Dashboard Studio',
  description: 'Upload Excel or CSV files and instantly get interactive analytics dashboards.',
  keywords: ['excel', 'csv', 'dashboard', 'analytics', 'charts'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  )
}

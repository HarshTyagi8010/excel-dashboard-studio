import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface KPICardProps {
  label: string
  value: string
  subtext?: string
  icon?: LucideIcon
  trend?: number
  color?: 'blue' | 'purple' | 'green' | 'orange'
  delay?: number
}

const colorMap = {
  blue: { icon: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  purple: { icon: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  green: { icon: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  orange: { icon: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
}

export function KPICard({ label, value, subtext, icon: Icon, trend, color = 'blue', delay = 0 }: KPICardProps) {
  const colors = colorMap[color]
  return (
    <div
      className={cn('card card-hover p-5 flex flex-col gap-3 animate-slide-up')}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-slate-400">{label}</p>
        {Icon && (
          <div className={cn('p-2 rounded-lg', colors.bg, colors.border, 'border')}>
            <Icon size={16} className={colors.icon} />
          </div>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-100 tracking-tight">{value}</p>
        {subtext && <p className="text-xs text-slate-500 mt-1">{subtext}</p>}
      </div>
      {trend !== undefined && (
        <div className={cn('text-xs font-medium', trend >= 0 ? 'text-emerald-400' : 'text-red-400')}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend).toFixed(1)}% vs previous
        </div>
      )}
    </div>
  )
}

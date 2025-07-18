import { LucideIcon } from "lucide-react"
import { GradientCard } from "@/components/ui/gradient-card"

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon: LucideIcon
}

export function StatCard({ title, value, change, changeType = "neutral", icon: Icon }: StatCardProps) {
  const changeColorClass = {
    positive: "text-green-600",
    negative: "text-red-600", 
    neutral: "text-muted"
  }[changeType]

  return (
    <GradientCard className="p-6 card-glass bg-background/80 border border-purple-accent/20">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-light text-gray-700 dark:text-gray-300">{title}</p>
          <p className="text-2xl font-semibold text-primary text-heading">{value}</p>
          {change && (
            <p className={`text-sm font-light ${changeColorClass}`}>{change}</p>
          )}
        </div>
        <div className="p-3 bg-gradient-to-br from-purple-accent to-purple-dark rounded-xl shadow-sm">
          <Icon className="h-5 w-5 text-purple-light" />
        </div>
      </div>
    </GradientCard>
  )
}
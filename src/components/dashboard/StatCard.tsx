
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
    neutral: "text-gray-700 dark:text-gray-300"
  }[changeType]

  return (
    <GradientCard className="p-4 md:p-6 card-glass bg-background/80 border border-purple-accent/20">
      <div className="flex items-center justify-between">
        <div className="space-y-1 md:space-y-2 flex-1 min-w-0">
          <p className="text-xs md:text-sm font-light text-gray-700 dark:text-gray-300 truncate">{title}</p>
          <p className="text-xl md:text-2xl font-semibold text-primary text-heading">{value}</p>
          {change && (
            <p className={`text-xs md:text-sm font-light ${changeColorClass} truncate`}>{change}</p>
          )}
        </div>
        <div className="p-2 md:p-3 bg-gradient-to-br from-purple-accent to-purple-dark rounded-xl shadow-sm flex-shrink-0">
          <Icon className="h-4 w-4 md:h-5 md:w-5 text-purple-light" />
        </div>
      </div>
    </GradientCard>
  )
}

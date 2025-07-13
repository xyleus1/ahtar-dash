import { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"

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
    <Card className="p-6 card-interactive bg-background border border-border">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-secondary">{title}</p>
          <p className="text-2xl font-bold text-primary">{value}</p>
          {change && (
            <p className={`text-sm ${changeColorClass}`}>{change}</p>
          )}
        </div>
        <div className="p-3 bg-purple-light rounded-lg">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </Card>
  )
}
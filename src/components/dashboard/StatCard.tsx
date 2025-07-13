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
    <Card className="p-6 card-glass bg-background/80 border border-border/20">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-light text-secondary">{title}</p>
          <p className="text-2xl font-light text-primary text-heading">{value}</p>
          {change && (
            <p className={`text-sm font-light ${changeColorClass}`}>{change}</p>
          )}
        </div>
        <div className="p-3 bg-purple-glow rounded-xl border border-purple-accent/10">
          <Icon className="h-5 w-5 text-purple-accent" />
        </div>
      </div>
    </Card>
  )
}
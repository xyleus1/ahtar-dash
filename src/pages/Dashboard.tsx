import { StatCard } from "@/components/dashboard/StatCard"
import { RecentProjects } from "@/components/dashboard/RecentProjects"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  FolderOpen, 
  Users, 
  Package, 
  TrendingUp,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react"

const quickActions = [
  { title: "Start New Project", icon: Plus, description: "Upload designs and find manufacturers" },
  { title: "Browse Marketplace", icon: Package, description: "Discover recent drops and inspiration" },
  { title: "Message Manufacturers", icon: Users, description: "Connect with your supplier network" },
  { title: "Track Shipments", icon: Clock, description: "Monitor production and delivery status" }
]

const alerts = [
  { type: "warning", message: "Sample approval needed for Denim Jacket Series", time: "2 hours ago" },
  { type: "success", message: "Sustainable Tees shipped successfully", time: "1 day ago" },
  { type: "info", message: "New manufacturer match for Winter Coats", time: "2 days ago" }
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
          <p className="text-secondary">Manage your fashion production pipeline</p>
        </div>
        <Button className="button-hover">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Projects"
          value={12}
          change="+2 from last month"
          changeType="positive"
          icon={FolderOpen}
        />
        <StatCard
          title="Manufacturers"
          value={34}
          change="+5 new this month"
          changeType="positive"
          icon={Users}
        />
        <StatCard
          title="In Production"
          value={8}
          change="3 shipping soon"
          changeType="neutral"
          icon={Package}
        />
        <StatCard
          title="Success Rate"
          value="94%"
          change="+3% improvement"
          changeType="positive"
          icon={TrendingUp}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <div className="lg:col-span-2">
          <RecentProjects />
        </div>

        {/* Quick Actions & Alerts */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="p-6 bg-background border border-border">
            <h2 className="text-lg font-semibold text-primary mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start h-auto p-3 hover:bg-grey-50"
                >
                  <action.icon className="h-4 w-4 mr-3 text-primary" />
                  <div className="text-left">
                    <p className="font-medium text-primary">{action.title}</p>
                    <p className="text-xs text-secondary">{action.description}</p>
                  </div>
                  <ArrowRight className="h-3 w-3 ml-auto text-muted" />
                </Button>
              ))}
            </div>
          </Card>

          {/* Recent Alerts */}
          <Card className="p-6 bg-background border border-border">
            <h2 className="text-lg font-semibold text-primary mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-grey-50">
                  {alert.type === "warning" && <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />}
                  {alert.type === "success" && <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />}
                  {alert.type === "info" && <Clock className="h-4 w-4 text-blue-600 mt-0.5" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-primary">{alert.message}</p>
                    <p className="text-xs text-muted">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
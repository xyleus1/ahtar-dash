
import { useState } from "react"
import { StatCard } from "@/components/dashboard/StatCard"
import { RecentProjects } from "@/components/dashboard/RecentProjects"
import { GradientCard } from "@/components/ui/gradient-card"
import { GradientButton } from "@/components/ui/gradient-button"
import { Button } from "@/components/ui/button"
import { NewProjectModal } from "@/components/project/NewProjectModal"
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
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-light text-primary text-heading">Dashboard</h1>
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-light">Manage your fashion production pipeline</p>
        </div>
        <GradientButton 
          variant="primary" 
          className="font-light w-full sm:w-auto" 
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </GradientButton>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
        {/* Recent Projects */}
        <div className="xl:col-span-2">
          <RecentProjects />
        </div>

        {/* Quick Actions & Alerts */}
        <div className="space-y-4 md:space-y-6">
          {/* Quick Actions */}
          <GradientCard className="p-4 md:p-6 card-glass bg-background/80 border border-border/20">
            <h2 className="text-base md:text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Quick Actions</h2>
            <div className="space-y-2 md:space-y-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start h-auto p-3 hover:bg-purple-light/30 font-light transition-all duration-300 text-left"
                >
                  <action.icon className="h-4 w-4 mr-3 text-purple-accent flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 dark:text-gray-200 text-sm md:text-base">{action.title}</p>
                    <p className="text-xs text-gray-700 dark:text-gray-300 font-light hidden sm:block">{action.description}</p>
                  </div>
                  <ArrowRight className="h-3 w-3 ml-auto text-gray-500 flex-shrink-0" />
                </Button>
              ))}
            </div>
          </GradientCard>

          {/* Recent Alerts */}
          <GradientCard className="p-4 md:p-6 card-glass bg-background/80 border border-border/20">
            <h2 className="text-base md:text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Recent Activity</h2>
            <div className="space-y-2 md:space-y-3">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-3 p-2 rounded-xl hover:bg-purple-light/30 transition-all duration-300">
                  {alert.type === "warning" && <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />}
                  {alert.type === "success" && <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />}
                  {alert.type === "info" && <Clock className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">{alert.message}</p>
                    <p className="text-xs text-gray-700 dark:text-gray-300 font-light">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </GradientCard>
        </div>
      </div>

      <NewProjectModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
    </div>
  )
}

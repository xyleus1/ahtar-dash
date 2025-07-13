import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Clock, Package, Truck } from "lucide-react"

const projects = [
  {
    id: 1,
    name: "Summer 2024 Collection",
    manufacturer: "Apex Textiles",
    status: "In Production",
    statusColor: "bg-blue-100 text-blue-700",
    progress: 75,
    deadline: "Mar 15, 2024",
    image: "/api/placeholder/60/60"
  },
  {
    id: 2,
    name: "Denim Jacket Series",
    manufacturer: "Premium Denim Co.",
    status: "Sample Review",
    statusColor: "bg-yellow-100 text-yellow-700",
    progress: 45,
    deadline: "Mar 22, 2024",
    image: "/api/placeholder/60/60"
  },
  {
    id: 3,
    name: "Sustainable Tees",
    manufacturer: "EcoFab Solutions",
    status: "Shipping",
    statusColor: "bg-green-100 text-green-700",
    progress: 90,
    deadline: "Mar 8, 2024",
    image: "/api/placeholder/60/60"
  },
  {
    id: 4,
    name: "Winter Coat Line",
    manufacturer: "Arctic Manufacturing",
    status: "Design Review",
    statusColor: "bg-purple-100 text-purple-700",
    progress: 20,
    deadline: "Apr 5, 2024",
    image: "/api/placeholder/60/60"
  }
]

export function RecentProjects() {
  return (
    <Card className="p-6 bg-background border border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-primary">Recent Projects</h2>
        <Button variant="ghost" size="sm" className="text-primary">
          View All
        </Button>
      </div>
      
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-grey-50 transition-colors">
            <div className="w-12 h-12 bg-grey-100 rounded-lg flex items-center justify-center">
              <Package className="h-5 w-5 text-muted" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-primary truncate">{project.name}</h3>
                <Badge variant="secondary" className={`${project.statusColor} text-xs`}>
                  {project.status}
                </Badge>
              </div>
              <p className="text-sm text-secondary mb-2">{project.manufacturer}</p>
              
              {/* Progress bar */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-grey-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <span className="text-xs text-muted">{project.progress}%</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-secondary">
              <Clock className="h-3 w-3" />
              <span>{project.deadline}</span>
            </div>
            
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  )
}
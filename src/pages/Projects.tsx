import { AppLayout } from "@/components/layout/AppLayout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, MoreHorizontal, Calendar, User, Package } from "lucide-react"
import { Input } from "@/components/ui/input"

const projects = [
  {
    id: 1,
    name: "Summer 2024 Collection",
    manufacturer: "Apex Textiles",
    status: "In Production",
    statusColor: "bg-blue-100 text-blue-800",
    progress: 75,
    deadline: "Mar 15, 2024",
    items: 8
  },
  {
    id: 2,
    name: "Denim Jacket Series",
    manufacturer: "Premium Denim Co.",
    status: "Sample Review",
    statusColor: "bg-yellow-100 text-yellow-800",
    progress: 45,
    deadline: "Mar 22, 2024",
    items: 3
  },
  {
    id: 3,
    name: "Sustainable Tees",
    manufacturer: "EcoFab Solutions",
    status: "Shipping",
    statusColor: "bg-green-100 text-green-800",
    progress: 90,
    deadline: "Mar 8, 2024",
    items: 12
  },
  {
    id: 4,
    name: "Winter Coat Line",
    manufacturer: "Arctic Manufacturing",
    status: "Design Review",
    statusColor: "bg-purple-100 text-purple-800",
    progress: 20,
    deadline: "Apr 5, 2024",
    items: 5
  }
]

export default function Projects() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">Projects</h1>
            <p className="text-secondary">Manage your production pipeline</p>
          </div>
          <Button className="button-hover">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
            <Input
              placeholder="Search projects..."
              className="pl-10"
            />
          </div>
          
          <Button variant="outline" className="sm:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="p-6 card-interactive bg-background border border-border">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-primary mb-1">{project.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-secondary">
                    <User className="h-3 w-3" />
                    <span>{project.manufacturer}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={`${project.statusColor} text-xs`}>
                    {project.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-secondary">Progress</span>
                  <span className="text-sm font-medium text-primary">{project.progress}%</span>
                </div>
                <div className="h-2 bg-grey-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted" />
                  <div>
                    <p className="text-xs text-secondary">Items</p>
                    <p className="text-sm font-medium text-primary">{project.items}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted" />
                  <div>
                    <p className="text-xs text-secondary">Deadline</p>
                    <p className="text-sm font-medium text-primary">{project.deadline}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button size="sm" className="flex-1 button-hover">
                  Update
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
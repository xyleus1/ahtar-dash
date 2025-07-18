
import { useState } from "react"
import { GradientCard } from "@/components/ui/gradient-card"
import { Badge } from "@/components/ui/badge"
import { GradientButton } from "@/components/ui/gradient-button"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Clock, Package, Truck } from "lucide-react"
import { useProject } from "@/contexts/ProjectContext"
import { ProjectDetailsModal } from "@/components/project/ProjectDetailsModal"


export function RecentProjects() {
  const { recentProjects } = useProject()
  const [selectedProject, setSelectedProject] = useState(null)
  const [showProjectModal, setShowProjectModal] = useState(false)
  return (
    <GradientCard className="p-6 card-glass bg-background/80 border border-purple-accent/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">Recent Projects</h2>
        <GradientButton variant="default" size="sm" className="text-purple-accent font-light">
          View All
        </GradientButton>
      </div>
      
      <div className="space-y-4">
        {recentProjects.length > 0 ? (
          recentProjects.map((project) => (
            <div 
              key={project.id} 
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-purple-light/30 transition-all duration-300 cursor-pointer border border-transparent hover:border-purple-accent/20"
              onClick={() => {
                setSelectedProject(project)
                setShowProjectModal(true)
              }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-accent to-purple-dark rounded-xl flex items-center justify-center shadow-sm">
                <Package className="h-5 w-5 text-purple-light" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 truncate">{project.name}</h3>
                  <Badge 
                    variant="secondary" 
                    className={
                      project.currentStage === "Order Samples" 
                        ? "bg-green-100/50 text-green-800 border border-green-200/50"
                        : project.currentStage === "In Production"
                        ? "bg-blue-100/50 text-blue-800 border border-blue-200/50"
                        : project.currentStage === "Sample Review"  
                        ? "bg-yellow-100/50 text-yellow-800 border border-yellow-200/50"
                        : project.currentStage === "Shipping"
                        ? "bg-green-100/50 text-green-800 border border-green-200/50"
                        : `${project.statusColor} text-xs font-medium`
                    }
                  >
                    {project.currentStage === "Order Samples" 
                      ? "Active - awaiting sample response" 
                      : project.currentStage
                    }
                  </Badge>
                </div>
                <p className="text-sm text-gray-800 dark:text-gray-200 font-medium mb-1">
                  {project.manufacturer || "Finding manufacturers..."}
                </p>
                <p className="text-xs text-gray-800 dark:text-gray-200 font-medium overflow-hidden">
                  <span className="block truncate">{project.aiDescription}</span>
                </p>
                {/* Progress bar */}
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex-1 h-2 bg-purple-light/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-accent to-purple-dark rounded-full transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-800 dark:text-gray-200 font-medium">{project.progress}%</span>
                    <div className="w-12 h-2 bg-purple-light/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-accent to-purple-dark rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200 font-light">
                <Clock className="h-3 w-3" />
                <span>{new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
              
              <GradientButton 
                variant="default" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedProject(project)
                  setShowProjectModal(true)
                }}
              >
                <MoreHorizontal className="h-4 w-4" />
              </GradientButton>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Package className="h-12 w-12 text-muted mx-auto mb-3" />
            <p className="text-muted font-light">No recent projects</p>
            <p className="text-xs text-muted font-light">Start a new project to see it here</p>
          </div>
        )}
      </div>
      
      <ProjectDetailsModal 
        project={selectedProject}
        open={showProjectModal}
        onOpenChange={setShowProjectModal}
      />
    </GradientCard>
  )
}

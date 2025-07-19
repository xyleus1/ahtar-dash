
import { useState } from "react"
import { GradientCard } from "@/components/ui/gradient-card"
import { Badge } from "@/components/ui/badge"
import { GradientButton } from "@/components/ui/gradient-button"
import { MoreHorizontal, Clock, Package } from "lucide-react"
import { useProject } from "@/contexts/ProjectContext"
import { ProjectDetailsModal } from "@/components/project/ProjectDetailsModal"

export function RecentProjects() {
  const { recentProjects } = useProject()
  const [selectedProject, setSelectedProject] = useState(null)
  const [showProjectModal, setShowProjectModal] = useState(false)
  
  return (
    <GradientCard className="p-4 md:p-6 card-glass bg-background/80 border border-purple-accent/20">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-base md:text-lg font-medium text-gray-800 dark:text-gray-200">Recent Projects</h2>
        <GradientButton variant="default" size="sm" className="text-purple-accent font-light">
          View All
        </GradientButton>
      </div>
      
      <div className="space-y-3 md:space-y-4">
        {recentProjects.length > 0 ? (
          recentProjects.map((project) => (
            <div 
              key={project.id} 
              className="flex items-center gap-3 md:gap-4 p-3 rounded-xl hover:bg-purple-light/30 transition-all duration-300 cursor-pointer border border-transparent hover:border-purple-accent/20"
              onClick={() => {
                setSelectedProject(project)
                setShowProjectModal(true)
              }}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-accent to-purple-dark rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                <Package className="h-4 w-4 md:h-5 md:w-5 text-purple-light" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 truncate text-sm md:text-base">{project.name}</h3>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs flex-shrink-0 ${
                      project.currentStage === "Order Samples" 
                        ? "bg-green-100/50 text-green-800 border border-green-200/50"
                        : project.currentStage === "In Production"
                        ? "bg-blue-100/50 text-blue-800 border border-blue-200/50"
                        : project.currentStage === "Sample Review"  
                        ? "bg-yellow-100/50 text-yellow-800 border border-yellow-200/50"
                        : project.currentStage === "Shipping"
                        ? "bg-green-100/50 text-green-800 border border-green-200/50"
                        : `${project.statusColor} font-medium`
                    }`}
                  >
                    {project.currentStage === "Order Samples" 
                      ? "Active" 
                      : project.currentStage
                    }
                  </Badge>
                </div>
                <p className="text-xs md:text-sm text-gray-800 dark:text-gray-200 font-medium mb-1 truncate">
                  {project.manufacturer || "Finding manufacturers..."}
                </p>
                <p className="text-xs text-gray-800 dark:text-gray-200 font-medium truncate hidden sm:block">
                  {project.aiDescription}
                </p>
                {/* Progress bar */}
                <div className="flex items-center gap-2 mt-2 md:mt-3">
                  <div className="flex-1 h-1.5 md:h-2 bg-purple-light/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-accent to-purple-dark rounded-full transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <span className="text-xs md:text-sm text-gray-800 dark:text-gray-200 font-medium flex-shrink-0">{project.progress}%</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-xs md:text-sm text-gray-800 dark:text-gray-200 font-light flex-shrink-0 hidden sm:flex">
                <Clock className="h-3 w-3" />
                <span>{new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
              
              <GradientButton 
                variant="default" 
                size="sm"
                className="flex-shrink-0"
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
          <div className="text-center py-6 md:py-8">
            <Package className="h-10 w-10 md:h-12 md:w-12 text-muted mx-auto mb-3" />
            <p className="text-muted font-light text-sm md:text-base">No recent projects</p>
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

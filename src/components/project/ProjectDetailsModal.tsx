import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { 
  CheckCircle, 
  Circle, 
  Clock, 
  Users, 
  MessageSquare, 
  Package,
  ArrowRight,
  Calendar
} from "lucide-react"
import { ProjectData } from "@/contexts/ProjectContext"
import { useNavigate } from "react-router-dom"

interface ProjectDetailsModalProps {
  project: ProjectData | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const projectStages = [
  {
    id: "concept",
    title: "Project Concept",
    description: "Define project requirements and goals",
    icon: Package,
    page: "/",
    completed: true
  },
  {
    id: "manufacturers",
    title: "Find Manufacturers",
    description: "Search and connect with suitable manufacturers",
    icon: Users,
    page: "/manufacturers",
    completed: true
  },
  {
    id: "samples",
    title: "Order Samples",
    description: "Request and review product samples",
    icon: MessageSquare,
    page: "/manufacturers?view=inbox",
    completed: false,
    active: true
  },
  {
    id: "production",
    title: "Production Setup",
    description: "Finalize production details and timeline",
    icon: Clock,
    page: "/production",
    completed: false
  }
]

export function ProjectDetailsModal({ project, open, onOpenChange }: ProjectDetailsModalProps) {
  const navigate = useNavigate()

  if (!project) return null

  const handleStageClick = (stage: typeof projectStages[0]) => {
    onOpenChange(false)
    navigate(stage.page)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-background/95 backdrop-blur-sm border border-purple-accent/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light text-foreground mb-2">
            {project.name}
          </DialogTitle>
          <div className="flex items-center gap-3">
            <Badge 
              variant="secondary" 
              className="bg-green-100/50 text-green-700 border border-green-200/50"
            >
              Active - awaiting sample response
            </Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Started {new Date(project.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Project Overview */}
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Project Overview</h3>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              {project.aiDescription}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-3 rounded-lg bg-purple-light/10 border border-purple-accent/20">
                <div className="text-sm text-muted-foreground">Current Stage</div>
                <div className="font-medium text-foreground">{project.currentStage}</div>
              </div>
              <div className="p-3 rounded-lg bg-purple-light/10 border border-purple-accent/20">
                <div className="text-sm text-muted-foreground">Manufacturer</div>
                <div className="font-medium text-foreground">{project.manufacturer || "Not assigned"}</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground">Overall Progress</h3>
              <span className="text-sm font-medium text-purple-accent">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>

          <Separator />

          {/* Project Stages */}
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Project Stages</h3>
            <div className="space-y-3">
              {projectStages.map((stage, index) => {
                const IconComponent = stage.icon
                const isActive = stage.active
                const isCompleted = stage.completed
                
                return (
                  <button
                    key={stage.id}
                    onClick={() => handleStageClick(stage)}
                    className="w-full group"
                  >
                    <div className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 ${
                      isActive
                        ? "border-purple-accent/50 bg-purple-light/20"
                        : isCompleted
                        ? "border-green-200/50 bg-green-50/30"
                        : "border-border/30 bg-muted/20 hover:border-purple-accent/30 hover:bg-purple-light/10"
                    }`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? "bg-green-100 text-green-600"
                          : isActive
                          ? "bg-purple-light/50 text-purple-accent"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <IconComponent className="h-5 w-5" />
                        )}
                      </div>
                      
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <h4 className={`font-medium ${
                            isActive ? "text-purple-accent" : isCompleted ? "text-green-700" : "text-foreground"
                          }`}>
                            {stage.title}
                          </h4>
                          {isActive && (
                            <Badge variant="secondary" className="text-xs bg-purple-light/30 text-purple-accent">
                              Current
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground font-light">
                          {stage.description}
                        </p>
                      </div>
                      
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-purple-accent transition-colors" />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
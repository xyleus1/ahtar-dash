
import { createContext, useContext, useState, ReactNode } from "react"

export interface ProjectData {
  id: string
  name: string
  currentStage: string
  progress: number
  aiDescription: string
  createdAt: string
  manufacturer?: string
  statusColor: string
  uploadedFiles?: Record<string, File>
}

interface ProjectContextType {
  currentProject: ProjectData | null
  recentProjects: ProjectData[]
  updateProject: (project: ProjectData) => void
  addProject: (project: ProjectData) => void
  addInboxProject: () => void
  createProjectFromContact: (manufacturerName: string, uploadedFiles: Record<string, File>) => ProjectData
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function useProject() {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider')
  }
  return context
}

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [currentProject, setCurrentProject] = useState<ProjectData | null>(null)
  const [recentProjects, setRecentProjects] = useState<ProjectData[]>([
    {
      id: "1",
      name: "Summer 2024 Collection",
      currentStage: "In Production",
      progress: 75,
      aiDescription: "High-performance activewear collection featuring moisture-wicking fabrics and ergonomic designs. Currently in mass production phase with quality checkpoints scheduled.",
      createdAt: "2024-02-15",
      manufacturer: "Apex Textiles",
      statusColor: "bg-blue-100 text-blue-800"
    },
    {
      id: "2", 
      name: "Denim Jacket Series",
      currentStage: "Sample Review",
      progress: 45,
      aiDescription: "Premium denim jackets with vintage-inspired washes and contemporary fits. Samples received, awaiting approval before moving to production.",
      createdAt: "2024-02-20",
      manufacturer: "Premium Denim Co.",
      statusColor: "bg-yellow-100 text-yellow-800"
    },
    {
      id: "3",
      name: "Sustainable Tees",
      currentStage: "Shipping",
      progress: 90,
      aiDescription: "Eco-friendly t-shirt line made from organic cotton and recycled materials. Production completed, currently in shipping phase.",
      createdAt: "2024-02-10",
      manufacturer: "EcoFab Solutions", 
      statusColor: "bg-green-100 text-green-800"
    }
  ])

  const updateProject = (project: ProjectData) => {
    setCurrentProject(project)
    setRecentProjects(prev => {
      const existing = prev.find(p => p.id === project.id)
      if (existing) {
        return prev.map(p => p.id === project.id ? project : p)
      } else {
        return [project, ...prev.slice(0, 3)] // Keep only 4 most recent
      }
    })
  }

  const addProject = (project: ProjectData) => {
    setCurrentProject(project)
    setRecentProjects(prev => [project, ...prev.slice(0, 3)])
  }

  const createProjectFromContact = (manufacturerName: string, uploadedFiles: Record<string, File>) => {
    const timestamp = Date.now()
    const projectName = `New Project - ${manufacturerName}`
    
    const newProject: ProjectData = {
      id: `project-${timestamp}`,
      name: projectName,
      currentStage: "Order Samples",
      progress: 50,
      aiDescription: `Project created through manufacturer contact workflow. Successfully connected with ${manufacturerName} for production partnership. Project requirements and design files have been shared. Moving to sample ordering phase to validate quality and specifications.`,
      createdAt: new Date().toISOString().split('T')[0],
      manufacturer: manufacturerName,
      statusColor: "bg-yellow-100 text-yellow-800",
      uploadedFiles
    }
    
    addProject(newProject)
    return newProject
  }

  const addInboxProject = () => {
    const newProject: ProjectData = {
      id: Date.now().toString(),
      name: "Urban Streetwear Collection",
      currentStage: "Order Samples",
      progress: 35,
      aiDescription: "Contemporary streetwear line featuring oversized silhouettes and urban-inspired graphics. Currently awaiting sample responses from contacted manufacturers to proceed with production.",
      createdAt: new Date().toISOString(),
      manufacturer: "Apex Textiles",
      statusColor: "bg-green-100 text-green-800"
    }
    addProject(newProject)
  }

  return (
    <ProjectContext.Provider value={{
      currentProject,
      recentProjects,
      updateProject,
      addProject,
      addInboxProject,
      createProjectFromContact
    }}>
      {children}
    </ProjectContext.Provider>
  )
}

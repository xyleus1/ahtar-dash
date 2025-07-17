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
}

interface ProjectContextType {
  currentProject: ProjectData | null
  recentProjects: ProjectData[]
  updateProject: (project: ProjectData) => void
  addProject: (project: ProjectData) => void
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

  return (
    <ProjectContext.Provider value={{
      currentProject,
      recentProjects,
      updateProject,
      addProject
    }}>
      {children}
    </ProjectContext.Provider>
  )
}
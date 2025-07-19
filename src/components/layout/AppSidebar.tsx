
import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useProject } from "@/contexts/ProjectContext"
import {
  LayoutDashboard,
  FolderOpen,
  Users,
  MessageSquare,
  Store,
  FileText,
  Settings,
  Plus,
  ChevronDown,
  ChevronRight
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { GradientButton } from "@/components/ui/gradient-button"
import { NewProjectModal } from "@/components/project/NewProjectModal"
import { ProjectDetailsModal } from "@/components/project/ProjectDetailsModal"
import { Badge } from "@/components/ui/badge"
import { useIsMobile } from "@/hooks/use-mobile"

const mainItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Projects", url: "/projects", icon: FolderOpen },
  { title: "Manufacturers", url: "/manufacturers", icon: Users },
  { title: "Inbox", url: "/inbox", icon: MessageSquare },
  { title: "Marketplace", url: "/marketplace", icon: Store },
  { title: "Blueprints", url: "/blueprints", icon: FileText },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const { recentProjects } = useProject()
  const location = useLocation()
  const isMobile = useIsMobile()
  const [projectsExpanded, setProjectsExpanded] = useState(true)
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [showProjectModal, setShowProjectModal] = useState(false)
  const collapsed = state === "collapsed"
  
  const isActive = (path: string) => location.pathname === path
  
  const getNavClassName = (path: string) => {
    const baseClasses = "flex items-center gap-3 px-3 py-2 text-sm font-light rounded-xl transition-all duration-300 relative overflow-hidden w-full"
    return isActive(path) 
      ? `${baseClasses} active-nav-item text-purple-light shadow-lg transform scale-105 border border-purple-accent/30 font-medium`
      : `${baseClasses} text-primary hover:bg-purple-light/30 hover:text-purple-accent hover:transform hover:scale-102`
  }

  return (
    <Sidebar className={`${collapsed && !isMobile ? "w-16" : "w-64"}`} collapsible="offcanvas">
      <SidebarContent className="p-3 md:p-4 sidebar-glass">
        {/* Brand */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-accent to-purple-dark rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-purple-light font-medium text-sm">FP</span>
            </div>
            {(!collapsed || isMobile) && (
              <div>
                <h1 className="font-medium text-primary text-heading text-sm md:text-base">Fashion Production</h1>
                <p className="text-xs text-gray-700 dark:text-gray-300 font-light">OS Platform</p>
              </div>
            )}
          </div>
        </div>

        {/* New Project Button */}
        {(!collapsed || isMobile) && (
          <GradientButton 
            variant="primary" 
            className="w-full mb-4 md:mb-6 text-sm" 
            size="sm"
            onClick={() => setShowNewProjectModal(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </GradientButton>
        )}

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClassName(item.url)}>
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {(!collapsed || isMobile) && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Recent Projects */}
        {(!collapsed || isMobile) && (
          <SidebarGroup className="mt-6 md:mt-8">
            <SidebarGroupLabel 
              className="flex items-center justify-between cursor-pointer px-2"
              onClick={() => setProjectsExpanded(!projectsExpanded)}
            >
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">Recent Projects</span>
              {projectsExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
            </SidebarGroupLabel>
            
            {projectsExpanded && (
              <SidebarGroupContent>
                <div className="space-y-2 mt-2">
                  {recentProjects.slice(0, isMobile ? 3 : 5).map((project) => (
                    <div 
                      key={project.id} 
                      className="p-2 md:p-3 rounded-xl hover:bg-purple-light/30 transition-colors cursor-pointer border border-transparent hover:border-purple-accent/20"
                      onClick={() => {
                        setSelectedProject(project)
                        setShowProjectModal(true)
                      }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{project.name}</p>
                        {project.currentStage === "Order Samples" && (
                          <Badge variant="secondary" className="text-xs bg-green-100/50 text-green-700 border border-green-200/50 ml-2 flex-shrink-0">
                            Active
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-700 dark:text-gray-300 font-medium truncate">{project.currentStage}</p>
                    </div>
                  ))}
                </div>
              </SidebarGroupContent>
            )}
          </SidebarGroup>
        )}

        {/* Settings at bottom */}
        <div className="mt-auto">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/settings" className={getNavClassName("/settings")}>
                <Settings className="h-4 w-4 flex-shrink-0" />
                {(!collapsed || isMobile) && <span>Settings</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </div>
      </SidebarContent>
      
      <NewProjectModal 
        open={showNewProjectModal} 
        onOpenChange={setShowNewProjectModal} 
      />
      <ProjectDetailsModal 
        project={selectedProject}
        open={showProjectModal}
        onOpenChange={setShowProjectModal}
      />
    </Sidebar>
  )
}

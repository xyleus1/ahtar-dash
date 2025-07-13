import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
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
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

const mainItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Projects", url: "/projects", icon: FolderOpen },
  { title: "Manufacturers", url: "/manufacturers", icon: Users },
  { title: "Inbox", url: "/inbox", icon: MessageSquare },
  { title: "Marketplace", url: "/marketplace", icon: Store },
  { title: "Blueprints", url: "/blueprints", icon: FileText },
]

const recentProjects = [
  { name: "Summer 2024 Collection", status: "In Production" },
  { name: "Denim Jacket Series", status: "Sample Review" },
  { name: "Sustainable Tees", status: "Completed" },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const [projectsExpanded, setProjectsExpanded] = useState(true)
  const collapsed = state === "collapsed"
  
  const isActive = (path: string) => location.pathname === path
  
  const getNavClassName = (path: string) => {
    const baseClasses = "flex items-center gap-3 px-3 py-2 text-sm font-light rounded-xl transition-all duration-300"
    return isActive(path) 
      ? `${baseClasses} bg-purple-glow text-purple-accent shadow-sm`
      : `${baseClasses} text-secondary hover:bg-accent hover:text-accent-foreground`
  }

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"}>
      <SidebarContent className="p-4 sidebar-glass">
        {/* Brand */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-glow rounded-xl flex items-center justify-center">
              <span className="text-purple-accent font-light text-sm">FP</span>
            </div>
            {!collapsed && (
              <div>
                <h1 className="font-medium text-primary text-heading">Fashion Production</h1>
                <p className="text-xs text-muted font-light">OS Platform</p>
              </div>
            )}
          </div>
        </div>

        {/* New Project Button */}
        {!collapsed && (
          <Button className="w-full mb-6 button-glass font-light" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        )}

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClassName(item.url)}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Recent Projects */}
        {!collapsed && (
          <SidebarGroup className="mt-8">
            <SidebarGroupLabel 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setProjectsExpanded(!projectsExpanded)}
            >
              <span className="text-xs font-light text-muted uppercase tracking-wider">Recent Projects</span>
              {projectsExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
            </SidebarGroupLabel>
            
            {projectsExpanded && (
              <SidebarGroupContent>
                <div className="space-y-2 mt-2">
                  {recentProjects.map((project, index) => (
                    <div key={index} className="p-2 rounded-xl hover:bg-purple-light transition-colors cursor-pointer">
                      <p className="text-sm font-light text-primary truncate">{project.name}</p>
                      <p className="text-xs text-muted font-light">{project.status}</p>
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
                <Settings className="h-4 w-4" />
                {!collapsed && <span>Settings</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
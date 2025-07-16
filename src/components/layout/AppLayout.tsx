import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { GradientButton } from "@/components/ui/gradient-button"
import { Search, Bell, User, Plus } from "lucide-react"
import { NewProjectModal } from "@/components/project/NewProjectModal"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-grey-50">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 bg-glass border-b border-border/20 flex items-center justify-between px-6 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
                <input 
                  type="text" 
                  placeholder="Search projects, manufacturers..."
                  className="w-80 pl-10 pr-4 py-2 bg-glass border border-border/30 rounded-xl text-sm font-light placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-purple-accent/20 focus:border-purple-accent/30 backdrop-blur-md"
                />
              </div>
            </div>
            
            {/* Right side */}
            <div className="flex items-center gap-3">
              <GradientButton 
                variant="primary" 
                size="sm"
                onClick={() => setShowNewProjectModal(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </GradientButton>
              
              <GradientButton variant="default" size="sm" className="relative">
                <Bell className="h-4 w-4 text-purple-accent" />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-purple-accent rounded-full"></span>
              </GradientButton>
              
              <GradientButton variant="default" size="sm">
                <User className="h-4 w-4 text-purple-accent" />
              </GradientButton>
            </div>
          </header>
          
          {/* Main Content */}
          <main className="flex-1 p-6 bg-grey-50/50">
            {children}
          </main>
        </div>
      </div>
      
      <NewProjectModal 
        open={showNewProjectModal} 
        onOpenChange={setShowNewProjectModal} 
      />
    </SidebarProvider>
  )
}
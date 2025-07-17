import { createRoot } from 'react-dom/client'
import { ProjectProvider } from "@/contexts/ProjectContext"
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <ProjectProvider>
    <App />
  </ProjectProvider>
)

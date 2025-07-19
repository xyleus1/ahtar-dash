
import { useState, useCallback } from 'react'

export interface WorkflowData {
  uploadedFiles: Record<string, File>
  projectName?: string
  skippedSteps?: {
    sizing: boolean
    materials: boolean
  }
}

export function useWorkflowData() {
  const [workflowData, setWorkflowData] = useState<WorkflowData | null>(null)

  const setData = useCallback((data: WorkflowData) => {
    setWorkflowData(data)
  }, [])

  const clearData = useCallback(() => {
    setWorkflowData(null)
  }, [])

  return {
    workflowData,
    setData,
    clearData
  }
}

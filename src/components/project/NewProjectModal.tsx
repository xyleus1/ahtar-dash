import { useState, useRef } from "react"
import { Upload, FileText, Package, ArrowRight, ArrowLeft, X, SkipForward } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"

interface NewProjectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewProjectModal({ open, onOpenChange }: NewProjectModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [uploads, setUploads] = useState({
    techPack: false,
    sizing: false,
    materials: false
  })
  const [skippedSteps, setSkippedSteps] = useState({
    sizing: false,
    materials: false
  })
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({})
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({})
  const navigate = useNavigate()
  const { toast } = useToast()

  const steps = [
    {
      id: 1,
      title: "Design Upload",
      description: "Upload your tech pack with design specifications",
      icon: FileText,
      key: "techPack" as keyof typeof uploads
    },
    {
      id: 2,
      title: "Sizing Documentation",
      description: "Upload sizing charts and measurements",
      icon: Package,
      key: "sizing" as keyof typeof uploads
    },
    {
      id: 3,
      title: "Materials Information",
      description: "Upload material specifications and requirements",
      icon: Upload,
      key: "materials" as keyof typeof uploads
    }
  ]

  const validateFile = (file: File): boolean => {
    const allowedTypes = ['.pdf', '.ai', '.xlsx']
    const maxSize = 50 * 1024 * 1024 // 50MB
    
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
    
    if (!allowedTypes.includes(fileExtension)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, AI, or XLSX file only.",
        variant: "destructive"
      })
      return false
    }
    
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 50MB.",
        variant: "destructive"
      })
      return false
    }
    
    return true
  }

  const handleFileUpload = (stepKey: keyof typeof uploads) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.pdf,.ai,.xlsx'
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file && validateFile(file)) {
        setUploadedFiles(prev => ({ ...prev, [stepKey]: file }))
        setUploads(prev => ({ ...prev, [stepKey]: true }))
        
        toast({
          title: "File uploaded successfully",
          description: `${file.name} has been uploaded.`
        })
        
        // Check if all steps are complete after this upload
        const updatedUploads = { ...uploads, [stepKey]: true }
        const allComplete = Object.values(updatedUploads).every(Boolean) || 
                          (updatedUploads.techPack && skippedSteps.sizing && skippedSteps.materials)
        
        // Auto-advance to next step or navigate to manufacturer matching
        setTimeout(() => {
          if (allComplete) {
            // All steps complete, navigate to manufacturer matching
            onOpenChange(false)
            navigate("/manufacturer-matching")
          } else if (currentStep < 3) {
            setCurrentStep(currentStep + 1)
          }
        }, 1500)
      }
    }
    
    input.click()
  }

  const handleSkipRemainingSteps = () => {
    setSkippedSteps({
      sizing: true,
      materials: true
    })
    
    toast({
      title: "Steps skipped successfully",
      description: "Proceeding to manufacturer matching with tech pack only.",
    })
    
    setTimeout(() => {
      onOpenChange(false)
      navigate("/manufacturer-matching")
    }, 1000)
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      // All steps completed, navigate to manufacturer matching
      onOpenChange(false)
      navigate("/manufacturer-matching")
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceed = uploads[steps[currentStep - 1].key]
  const allStepsComplete = Object.values(uploads).every(Boolean) || 
                          (uploads.techPack && skippedSteps.sizing && skippedSteps.materials)
  const canSkip = currentStep === 1 && uploads.techPack

  const getStepStatus = (step: typeof steps[0]) => {
    if (uploads[step.key]) return 'completed'
    if ((step.key === 'sizing' && skippedSteps.sizing) || 
        (step.key === 'materials' && skippedSteps.materials)) return 'skipped'
    return 'pending'
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-4xl max-h-[95vh] p-0 flex flex-col">
        <DialogHeader className="p-4 sm:p-6 pb-0 shrink-0">
          <DialogTitle className="text-xl sm:text-2xl font-semibold text-center">
            Create New Project
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col flex-1 min-h-0">
          {/* Progress Steps */}
          <div className="flex justify-center px-3 sm:px-6 py-3 sm:py-4 shrink-0">
            <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto">
              {steps.map((step, index) => {
                const status = getStepStatus(step)
                return (
                  <div key={step.id} className="flex items-center shrink-0">
                    <div className={`
                      flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all
                      ${status === 'completed'
                        ? 'bg-primary border-primary text-primary-foreground' 
                        : status === 'skipped'
                        ? 'bg-muted border-muted-foreground text-muted-foreground'
                        : currentStep >= step.id
                        ? 'bg-primary border-primary text-primary-foreground'
                        : 'border-muted-foreground text-muted-foreground'
                      }
                    `}>
                      {status === 'completed' ? (
                        <X className="h-3 w-3 sm:h-5 sm:w-5 rotate-45" />
                      ) : status === 'skipped' ? (
                        <SkipForward className="h-3 w-3 sm:h-4 sm:w-4" />
                      ) : (
                        <span className="text-xs sm:text-sm font-medium">{step.id}</span>
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`
                        w-8 sm:w-16 h-0.5 mx-1 sm:mx-2 transition-all
                        ${currentStep > step.id || status === 'completed' || status === 'skipped' 
                          ? 'bg-primary' 
                          : 'bg-muted'
                        }
                      `} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Current Step Content */}
          <div className="flex-1 px-3 sm:px-6 py-4 sm:py-8 overflow-y-auto">
            {steps.map((step) => (
              currentStep === step.id && (
                <div key={step.id} className="h-full flex flex-col items-center justify-center">
                  <Card className="w-full max-w-md p-4 sm:p-8 text-center">
                    <step.icon className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-3 sm:mb-4 text-primary" />
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">{step.description}</p>
                    
                    {uploads[step.key] ? (
                      <div className="space-y-3 sm:space-y-4">
                        <div className="p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-green-700 font-medium text-sm sm:text-base">✓ File uploaded successfully</p>
                          {uploadedFiles[step.key] && (
                            <p className="text-green-600 text-xs sm:text-sm mt-1 break-all">
                              {uploadedFiles[step.key].name}
                            </p>
                          )}
                        </div>
                        <Button 
                          onClick={() => {
                            setUploads(prev => ({ ...prev, [step.key]: false }))
                            setUploadedFiles(prev => {
                              const newFiles = { ...prev }
                              delete newFiles[step.key]
                              return newFiles
                            })
                          }}
                          variant="outline"
                          className="w-full"
                          size="sm"
                        >
                          Upload Different File
                        </Button>
                        
                        {/* Skip Button - Only show after tech pack upload */}
                        {canSkip && (
                          <div className="pt-3 sm:pt-4 border-t">
                            <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                              Tech pack includes all sizing and materials info?
                            </p>
                            <Button 
                              onClick={handleSkipRemainingSteps}
                              variant="outline"
                              className="w-full flex items-center gap-2"
                              size="sm"
                            >
                              <SkipForward className="h-3 w-3 sm:h-4 sm:w-4" />
                              Skip Remaining Steps
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-3 sm:space-y-4">
                        <div className="border-2 border-dashed border-muted-foreground rounded-lg p-6 sm:p-8 cursor-pointer hover:border-primary transition-colors min-h-[120px] flex flex-col items-center justify-center"
                             onClick={() => handleFileUpload(step.key)}>
                          <Upload className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-xs sm:text-sm text-muted-foreground text-center">
                            Click to upload or drag and drop
                          </p>
                        </div>
                        <Button 
                          onClick={() => handleFileUpload(step.key)}
                          className="w-full"
                          size="sm"
                        >
                          Upload File
                        </Button>
                      </div>
                    )}
                  </Card>
                </div>
              )
            ))}
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-4 sm:p-6 border-t shrink-0">
            <Button 
              onClick={handlePrevious}
              variant="outline"
              disabled={currentStep === 1}
              className="flex items-center order-2 sm:order-1"
              size="sm"
            >
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              Previous
            </Button>

            <div className="text-xs sm:text-sm text-muted-foreground order-1 sm:order-2">
              Step {currentStep} of {steps.length}
            </div>

            <Button 
              onClick={handleNext}
              disabled={!canProceed}
              className="flex items-center order-3"
              size="sm"
            >
              {currentStep === 3 && allStepsComplete ? 'Find Manufacturers' : 'Next'}
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

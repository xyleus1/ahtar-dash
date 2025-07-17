import { useState, useRef } from "react"
import { Upload, FileText, Package, ArrowRight, ArrowLeft, X } from "lucide-react"
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
        const allComplete = Object.values(updatedUploads).every(Boolean)
        
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
  const allStepsComplete = Object.values(uploads).every(Boolean)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[80vw] h-[80vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-semibold text-center">
            Create New Project
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-full">
          {/* Progress Steps */}
          <div className="flex justify-center px-6 py-4">
            <div className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all
                    ${currentStep >= step.id 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : 'border-muted-foreground text-muted-foreground'
                    }
                  `}>
                    {uploads[step.key] ? (
                      <X className="h-5 w-5 rotate-45" />
                    ) : (
                      <span className="text-sm font-medium">{step.id}</span>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`
                      w-16 h-0.5 mx-2 transition-all
                      ${currentStep > step.id ? 'bg-primary' : 'bg-muted'}
                    `} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Current Step Content */}
          <div className="flex-1 px-6 py-8">
            {steps.map((step) => (
              currentStep === step.id && (
                <div key={step.id} className="h-full flex flex-col items-center justify-center">
                  <Card className="w-full max-w-md p-8 text-center">
                    <step.icon className="h-16 w-16 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground mb-6">{step.description}</p>
                    
                    {uploads[step.key] ? (
                      <div className="space-y-4">
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-green-700 font-medium">✓ File uploaded successfully</p>
                          {uploadedFiles[step.key] && (
                            <p className="text-green-600 text-sm mt-1">
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
                        >
                          Upload Different File
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="border-2 border-dashed border-muted-foreground rounded-lg p-8 cursor-pointer hover:border-primary transition-colors"
                             onClick={() => handleFileUpload(step.key)}>
                          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Click to upload or drag and drop
                          </p>
                        </div>
                        <Button 
                          onClick={() => handleFileUpload(step.key)}
                          className="w-full"
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
          <div className="flex justify-between items-center p-6 border-t">
            <Button 
              onClick={handlePrevious}
              variant="outline"
              disabled={currentStep === 1}
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="text-sm text-muted-foreground">
              Step {currentStep} of {steps.length}
            </div>

            <Button 
              onClick={handleNext}
              disabled={!canProceed}
              className="flex items-center"
            >
              {currentStep === 3 && allStepsComplete ? 'Find Manufacturers' : 'Next'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
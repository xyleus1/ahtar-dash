import { X, MapPin, Star, Users, Mail, CheckCircle, ArrowRight, RotateCcw, Paperclip, FileText, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GradientButton } from "@/components/ui/gradient-button"
import { GradientCard } from "@/components/ui/gradient-card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useProject } from "@/contexts/ProjectContext"
import { useState } from "react"

interface Manufacturer {
  id: number
  name: string
  location: string
  rating: number
  reviews: number
  employees: string
  specialties: string[]
  images: string[]
  description: string
}

interface ContactPopupProps {
  manufacturer: Manufacturer
  isOpen: boolean
  onClose: () => void
  onProceedToSamples?: () => void
}

export function ContactPopup({ manufacturer, isOpen, onClose, onProceedToSamples }: ContactPopupProps) {
  const { updateProject, currentProject } = useProject()
  const [showSuccess, setShowSuccess] = useState(false)
  
  if (!isOpen) return null

  const handleContact = () => {
    // Update project to next stage when contact is made
    if (currentProject) {
      updateProject({
        ...currentProject,
        currentStage: "Order Samples",
        progress: 50,
        manufacturer: manufacturer.name,
        aiDescription: `Connected with ${manufacturer.name} for production partnership. Project requirements shared and initial discussions completed. Moving to sample ordering phase to validate quality and specifications.`,
        statusColor: "bg-yellow-100 text-yellow-800"
      })
    }
    setShowSuccess(true)
  }

  const handleProceedToSamples = () => {
    onProceedToSamples?.()
    onClose()
  }

  const handleBrowseOthers = () => {
    setShowSuccess(false)
  }

  const defaultRequestDetails = `Project Details:
• Product Type: Custom apparel design
• Quantity: 500-1000 units per order
• Materials: Premium cotton blend, sustainable fabrics preferred
• Size Range: XS-XXL (full size run)
• Color Options: 3-5 colorways per design
• Printing: Screen printing and embroidery
• Timeline: 4-6 weeks production after sample approval
• Budget: $15-25 per unit
• Special Requirements: Eco-friendly packaging, compliance with US/EU standards

Additional Notes:
Looking for a long-term manufacturing partner for ongoing seasonal collections. Quality and ethical production practices are top priorities.`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative w-[80%] max-w-4xl max-h-[90vh] overflow-auto">
        <GradientCard className="card-glass bg-background/95 border border-border/20 animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border/20">
            <h2 className="text-2xl font-light text-foreground">Contact Manufacturer</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-purple-light/30"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {showSuccess ? (
            /* Success Animation */
            <div className="p-12 text-center space-y-8">
              <div className="flex flex-col items-center space-y-4 animate-scale-in">
                <div className="relative">
                  <CheckCircle className="h-20 w-20 text-green-500 animate-pulse" />
                  <div className="absolute inset-0 h-20 w-20 border-4 border-green-500/30 rounded-full animate-ping" />
                </div>
                <h3 className="text-3xl font-light text-foreground">Message Sent!</h3>
                <p className="text-gray-600 dark:text-gray-400 font-light max-w-md">
                  Your inquiry has been sent to {manufacturer.name}. They typically respond within 24 hours.
                </p>
              </div>

              {/* Action Options */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <GradientButton onClick={handleProceedToSamples} className="font-light">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Proceed to Sample Overview
                </GradientButton>
                <Button variant="outline" onClick={handleBrowseOthers} className="font-light">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Browse Other Manufacturers
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {/* Manufacturer Profile */}
              <div className="flex gap-6">
                {/* Images */}
                <div className="flex gap-2">
                  {manufacturer.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${manufacturer.name} facility ${index + 1}`}
                      className="w-24 h-24 rounded-xl object-cover border border-border/20"
                    />
                  ))}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-xl font-light text-foreground mb-2">{manufacturer.name}</h3>
                  <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm font-light">{manufacturer.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-light">{manufacturer.rating}</span>
                      <span className="text-sm font-light">({manufacturer.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span className="text-sm font-light">{manufacturer.employees} employees</span>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 font-light mb-4">{manufacturer.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {manufacturer.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="font-light text-xs bg-purple-light/30 text-purple-accent border-purple-accent/20">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Services Description */}
              <div className="space-y-3">
                <h4 className="text-lg font-light text-foreground">What We Provide</h4>
                <p className="text-gray-700 dark:text-gray-300 font-light">
                  {manufacturer.name} specializes in high-quality textile manufacturing with comprehensive services including design consultation, material sourcing, prototyping, mass production, and quality assurance. We maintain strict quality standards and offer competitive pricing with flexible MOQs to support businesses of all sizes.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <h5 className="font-light text-foreground">Core Services:</h5>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Custom design development</li>
                      <li>• Sample production & prototyping</li>
                      <li>• Bulk manufacturing</li>
                      <li>• Quality control & testing</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-light text-foreground">Additional Benefits:</h5>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Competitive pricing</li>
                      <li>• Flexible MOQs</li>
                      <li>• Fast turnaround times</li>
                      <li>• International shipping</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Request Details */}
              <div className="space-y-3">
                <h4 className="text-lg font-light text-foreground">Your Request Details</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-light">
                  The following details have been automatically populated based on your project requirements. You can edit them before sending.
                </p>
                
                {/* Attachments */}
                <div className="bg-background/50 border border-border/50 rounded-lg p-3 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-foreground">Tech Pack.pdf</span>
                    <CheckCircle className="h-3 w-3 text-green-600 dark:text-green-400" />
                  </div>
                  <button className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
                    <Paperclip className="h-4 w-4" />
                    <span>Attach additional files</span>
                  </button>
                </div>
                
                <Textarea
                  className="min-h-[200px] font-mono text-sm bg-background/50 border-border/50 focus:bg-background/80"
                  defaultValue={defaultRequestDetails}
                  placeholder="Enter your project requirements..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-border/20">
                <Button variant="ghost" onClick={onClose} className="font-light">
                  Cancel
                </Button>
                <GradientButton onClick={handleContact} className="font-light">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Contact Request
                </GradientButton>
              </div>
            </div>
          )}
        </GradientCard>
      </div>
    </div>
  )
}

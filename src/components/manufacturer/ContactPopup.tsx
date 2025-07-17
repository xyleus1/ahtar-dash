import { X, MapPin, Star, Users, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GradientButton } from "@/components/ui/gradient-button"
import { GradientCard } from "@/components/ui/gradient-card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

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
}

export function ContactPopup({ manufacturer, isOpen, onClose }: ContactPopupProps) {
  if (!isOpen) return null

  const handleContact = () => {
    // Handle contact submission here
    onClose()
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
            <h2 className="text-2xl font-light text-primary text-heading">Contact Manufacturer</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-purple-light/30"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

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
                <h3 className="text-xl font-light text-primary text-heading mb-2">{manufacturer.name}</h3>
                <div className="flex items-center gap-4 text-secondary mb-3">
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

                <p className="text-secondary font-light mb-4">{manufacturer.description}</p>

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
              <h4 className="text-lg font-light text-primary text-heading">What We Provide</h4>
              <p className="text-secondary font-light">
                {manufacturer.name} specializes in high-quality textile manufacturing with comprehensive services including design consultation, material sourcing, prototyping, mass production, and quality assurance. We maintain strict quality standards and offer competitive pricing with flexible MOQs to support businesses of all sizes.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <h5 className="font-light text-primary">Core Services:</h5>
                  <ul className="text-sm text-secondary space-y-1">
                    <li>• Custom design development</li>
                    <li>• Sample production & prototyping</li>
                    <li>• Bulk manufacturing</li>
                    <li>• Quality control & testing</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h5 className="font-light text-primary">Additional Benefits:</h5>
                  <ul className="text-sm text-secondary space-y-1">
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
              <h4 className="text-lg font-light text-primary text-heading">Your Request Details</h4>
              <p className="text-sm text-secondary font-light">
                The following details have been automatically populated based on your project requirements. You can edit them before sending.
              </p>
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
        </GradientCard>
      </div>
    </div>
  )
}
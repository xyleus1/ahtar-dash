import { useState, useEffect, useCallback } from "react"
import { ArrowLeft, Search, Sparkles, MapPin, Star, Users, MessageCircle, Phone, Mail, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { GradientCard } from "@/components/ui/gradient-card"
import { GradientButton } from "@/components/ui/gradient-button"
import { useNavigate } from "react-router-dom"
import { ContactPopup } from "@/components/manufacturer/ContactPopup"
import { SampleOverview } from "@/components/inbox/SampleOverview"
import { useProject } from "@/contexts/ProjectContext"

const blueprintSteps = [
  { id: 1, title: "Design", completed: true },
  { id: 2, title: "Find Manufacturers", completed: false, current: true },
  { id: 3, title: "Order Samples", completed: false },
  { id: 4, title: "Review Samples", completed: false },
  { id: 5, title: "Place Order", completed: false }
]

const initialManufacturers = [
  {
    id: 1,
    name: "Premium Textile Solutions Ltd.",
    location: "Guangzhou, China",
    rating: 4.8,
    reviews: 127,
    employees: "500-1000",
    specialties: ["Apparel", "Custom Design", "Sustainable"],
    suggested: true,
    images: [
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1621799521295-10f1723b2c5a?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop"
    ],
    description: "Leading manufacturer specializing in premium textiles with 15 years of experience."
  },
  {
    id: 2,
    name: "Elite Fashion Manufacturing",
    location: "Shenzhen, China",
    rating: 4.9,
    reviews: 89,
    employees: "200-500",
    specialties: ["Fashion", "Rapid Prototyping", "Quality Control"],
    suggested: true,
    images: [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=400&h=300&fit=crop"
    ],
    description: "High-end fashion manufacturer with state-of-the-art facilities and expert craftsmanship."
  },
  {
    id: 3,
    name: "Global Apparel Partners",
    location: "Shanghai, China",
    rating: 4.7,
    reviews: 203,
    employees: "1000+",
    specialties: ["Mass Production", "Cost Effective", "Export Ready"],
    suggested: true,
    images: [
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1581783898377-1d4920134112?w=400&h=300&fit=crop"
    ],
    description: "Large-scale manufacturer with extensive global supply chain capabilities."
  },
  {
    id: 4,
    name: "Artisan Textile Works",
    location: "Hangzhou, China",
    rating: 4.6,
    reviews: 156,
    employees: "100-200",
    specialties: ["Handcrafted", "Luxury", "Small Batch"],
    suggested: false,
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop"
    ],
    description: "Boutique manufacturer focusing on high-quality, artisanal textile production."
  }
]

// Additional manufacturers for infinite scroll
const generateMoreManufacturers = (startId: number) => [
  {
    id: startId,
    name: "Modern Manufacturing Co.",
    location: "Ho Chi Minh City, Vietnam",
    rating: 4.5,
    reviews: 92,
    employees: "300-500",
    specialties: ["Activewear", "Technical Fabrics", "Quick Turnaround"],
    suggested: false,
    images: [
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1609205260088-38eef5a8bbfa?w=400&h=300&fit=crop"
    ],
    description: "Innovative manufacturer focusing on technical apparel and sustainable practices."
  },
  {
    id: startId + 1,
    name: "Heritage Textiles Ltd.",
    location: "Mumbai, India",
    rating: 4.4,
    reviews: 156,
    employees: "200-300",
    specialties: ["Cotton", "Traditional Crafts", "Ethical Production"],
    suggested: false,
    images: [
      "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    ],
    description: "Traditional textile manufacturer with modern quality standards and ethical practices."
  }
]

const filters = {
  location: ["China", "India", "Vietnam", "Bangladesh", "Turkey"],
  employees: ["1-50", "50-200", "200-500", "500-1000", "1000+"],
  specialties: ["Apparel", "Fashion", "Sustainable", "Custom Design", "Mass Production", "Luxury"],
  rating: ["4.5+", "4.0+", "3.5+", "3.0+"]
}

export default function ManufacturerMatching() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [manufacturers, setManufacturers] = useState(initialManufacturers)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [selectedManufacturer, setSelectedManufacturer] = useState<typeof initialManufacturers[0] | null>(null)
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'manufacturers' | 'samples'>('manufacturers')
  const [contactedManufacturers, setContactedManufacturers] = useState<typeof initialManufacturers>([])
  const navigate = useNavigate()
  const { addProject, updateProject, currentProject } = useProject()

  // Create or update project when component mounts (user reaches manufacturer matching stage)
  useEffect(() => {
    const projectData = {
      id: currentProject?.id || `project-${Date.now()}`,
      name: currentProject?.name || "New Fashion Project",
      currentStage: "Find Manufacturers",
      progress: 25,
      aiDescription: "Project initiated and design phase completed. Currently in manufacturer discovery phase to find suitable production partners. AI recommendation system is analyzing requirements and matching with verified manufacturers.",
      createdAt: currentProject?.createdAt || new Date().toISOString().split('T')[0],
      statusColor: "bg-blue-100 text-blue-800"
    }

    if (currentProject?.id) {
      updateProject(projectData)
    } else {
      addProject(projectData)
    }
  }, []) // Run only once when component mounts

  const handleContactClick = (manufacturer: typeof initialManufacturers[0]) => {
    setSelectedManufacturer(manufacturer)
    setIsContactPopupOpen(true)
  }

  const handleCloseContactPopup = () => {
    setIsContactPopupOpen(false)
    setSelectedManufacturer(null)
  }

  const handleProceedToSamples = () => {
    if (selectedManufacturer && !contactedManufacturers.find(m => m.id === selectedManufacturer.id)) {
      setContactedManufacturers(prev => [...prev, selectedManufacturer])
    }
    setViewMode('samples')
  }

  const handleBackToManufacturers = () => {
    setViewMode('manufacturers')
  }

  const toggleFilter = (category: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category]?.includes(value) 
        ? prev[category].filter(v => v !== value)
        : [...(prev[category] || []), value]
    }))
  }

  // Infinite scroll handler
  const loadMoreManufacturers = useCallback(async () => {
    if (loading || !hasMore) return
    
    setLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const nextId = manufacturers.length + 1
    const newManufacturers = generateMoreManufacturers(nextId)
    
    setManufacturers(prev => [...prev, ...newManufacturers])
    
    // Stop loading more after 10 total manufacturers
    if (manufacturers.length >= 8) {
      setHasMore(false)
    }
    
    setLoading(false)
  }, [manufacturers.length, loading, hasMore])

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop 
          >= document.documentElement.offsetHeight - 1000) {
        loadMoreManufacturers()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadMoreManufacturers])

  // Render sample overview mode
  if (viewMode === 'samples') {
    return (
      <SampleOverview 
        manufacturers={contactedManufacturers}
        onBack={handleBackToManufacturers}
      />
    )
  }

  // Render manufacturer matching mode
  return (
    <>
      <div className="space-y-6 px-6">
        {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light text-primary text-heading">Find Manufacturers</h1>
          <p className="text-secondary font-light">Discover verified manufacturing partners</p>
        </div>
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 font-light"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      {/* Blueprint Steps */}
      <GradientCard className="p-6 card-glass bg-background/80 border border-border/20">
        <div className="flex justify-center">
          <div className="flex items-center space-x-4">
            {blueprintSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all font-light
                  ${step.completed 
                    ? 'bg-purple-accent border-purple-accent text-white' 
                    : step.current
                    ? 'bg-purple-accent/20 border-purple-accent text-purple-accent'
                    : 'border-border text-muted'
                  }
                `}>
                  {step.completed ? (
                    <span className="text-xs">✓</span>
                  ) : (
                    <span className="text-xs">{step.id}</span>
                  )}
                </div>
                <span className={`ml-2 text-sm font-light ${step.current ? 'text-primary' : 'text-muted'}`}>
                  {step.title}
                </span>
                {index < blueprintSteps.length - 1 && (
                  <div className={`
                    w-12 h-0.5 mx-4 transition-all
                    ${step.completed ? 'bg-purple-accent' : 'bg-border'}
                  `} />
                )}
              </div>
            ))}
          </div>
        </div>
      </GradientCard>

      {/* Search Section */}
      <div className="relative max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
          <Input
            placeholder="Search manufacturers or describe what you're looking for..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-16 font-light bg-background/50 border-border/50 focus:bg-background/80"
          />
          <GradientButton
            variant="primary"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 font-light"
          >
            <Sparkles className="h-4 w-4 mr-1" />
            AI
          </GradientButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1">
          <GradientCard className="p-6 card-glass bg-background/80 border border-border/20 sticky top-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-4 w-4 text-purple-accent" />
              <h3 className="text-lg font-light text-primary text-heading">Filters</h3>
            </div>
            <div className="space-y-6">
              {Object.entries(filters).map(([category, options]) => (
                <div key={category}>
                  <h4 className="font-light text-primary mb-2 capitalize text-heading">{category}</h4>
                  <div className="space-y-2">
                    {options.map((option) => (
                      <label key={option} className="flex items-center space-x-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedFilters[category]?.includes(option) || false}
                          onChange={() => toggleFilter(category, option)}
                          className="rounded accent-purple-accent"
                        />
                        <span className="text-sm font-light text-muted-foreground group-hover:text-primary transition-colors">{option}</span>
                      </label>
                    ))}
                  </div>
                  {category !== "rating" && <Separator className="mt-4 bg-border/50" />}
                </div>
              ))}
            </div>
          </GradientCard>
        </div>

        {/* Manufacturer Cards */}
        <div className="lg:col-span-3 space-y-6">
          <div className="mb-6">
            <h2 className="text-xl font-light text-primary text-heading">Recommended Manufacturers</h2>
            <p className="text-secondary font-light">Based on your project requirements</p>
          </div>

          <div className="space-y-6">
            {manufacturers.map((manufacturer) => (
              <GradientCard 
                key={manufacturer.id} 
                className={`card-glass bg-background/80 border border-border/20 transition-all duration-300 hover:shadow-lg hover:shadow-purple-accent/10 ${
                  manufacturer.suggested ? 'ring-1 ring-purple-accent/30 bg-purple-light/5' : ''
                }`}
              >
                {manufacturer.suggested && (
                  <div className="bg-gradient-primary text-white px-4 py-2 text-sm font-light rounded-t-xl">
                    ⭐ Recommended Match
                  </div>
                )}
                <div className="p-6">
                  <div className="flex gap-6">
                    {/* Images */}
                    <div className="flex gap-2">
                      {manufacturer.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${manufacturer.name} facility ${index + 1}`}
                          className="w-20 h-20 rounded-xl object-cover border border-border/20"
                        />
                      ))}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-light text-primary text-heading">{manufacturer.name}</h3>
                          <div className="flex items-center gap-2 text-secondary">
                            <MapPin className="h-3 w-3" />
                            <span className="text-sm font-light">{manufacturer.location}</span>
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 ml-2" />
                            <span className="text-sm font-light">{manufacturer.rating}</span>
                            <span className="text-sm font-light">({manufacturer.reviews} reviews)</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" className="font-light hover:bg-purple-light/30">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Chat
                          </Button>
                          <Button size="sm" variant="ghost" className="font-light hover:bg-purple-light/30">
                            <Phone className="h-4 w-4 mr-1" />
                            Call
                          </Button>
                          <GradientButton 
                            size="sm" 
                            variant="primary" 
                            className="font-light"
                            onClick={() => handleContactClick(manufacturer)}
                          >
                            <Mail className="h-4 w-4 mr-1" />
                            Contact
                          </GradientButton>
                        </div>
                      </div>

                      <p className="text-secondary font-light mb-4 text-sm">{manufacturer.description}</p>

                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted" />
                          <span className="text-sm font-light text-secondary">{manufacturer.employees} employees</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {manufacturer.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="font-light text-xs bg-purple-light/30 text-purple-accent border-purple-accent/20">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </GradientCard>
            ))}
          </div>

          {/* Loading indicator */}
          {loading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-accent"></div>
            </div>
          )}

          {/* End of results */}
          {!hasMore && manufacturers.length > 4 && (
            <div className="text-center py-8">
              <p className="text-secondary font-light">You've reached the end of the results</p>
            </div>
          )}
        </div>
      </div>
      </div>

      {/* Contact Popup */}
      {selectedManufacturer && (
        <ContactPopup
          manufacturer={selectedManufacturer}
          isOpen={isContactPopupOpen}
          onClose={handleCloseContactPopup}
          onProceedToSamples={handleProceedToSamples}
        />
      )}
    </>
  )
}
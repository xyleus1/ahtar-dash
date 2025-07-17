import { useState } from "react"
import { ArrowLeft, Search, Sparkles, MapPin, Star, Users, MessageCircle, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useNavigate } from "react-router-dom"

const blueprintSteps = [
  { id: 1, title: "Design", completed: true },
  { id: 2, title: "Find Manufacturers", completed: false, current: true },
  { id: 3, title: "Order Samples", completed: false },
  { id: 4, title: "Review Samples", completed: false },
  { id: 5, title: "Place Order", completed: false }
]

const manufacturers = [
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
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop"
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
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop"
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
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
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
      "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop"
    ],
    description: "Boutique manufacturer focusing on high-quality, artisanal textile production."
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
  const navigate = useNavigate()

  const toggleFilter = (category: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category]?.includes(value) 
        ? prev[category].filter(v => v !== value)
        : [...(prev[category] || []), value]
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>

          {/* Blueprint Steps */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-4">
              {blueprintSteps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all
                    ${step.completed 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : step.current
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'border-muted-foreground text-muted-foreground'
                    }
                  `}>
                    {step.completed ? (
                      <span className="text-sm font-medium">✓</span>
                    ) : (
                      <span className="text-sm font-medium">{step.id}</span>
                    )}
                  </div>
                  <span className={`ml-2 text-sm ${step.current ? 'font-medium' : ''}`}>
                    {step.title}
                  </span>
                  {index < blueprintSteps.length - 1 && (
                    <div className={`
                      w-16 h-0.5 mx-4 transition-all
                      ${step.completed ? 'bg-green-500' : 'bg-muted'}
                    `} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search manufacturers or describe what you're looking for..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-12"
              />
              <Button
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8"
              >
                <Sparkles className="h-4 w-4 mr-1" />
                AI
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className="w-64 shrink-0">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Filters</h3>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(filters).map(([category, options]) => (
                  <div key={category}>
                    <h4 className="font-medium mb-2 capitalize">{category}</h4>
                    <div className="space-y-2">
                      {options.map((option) => (
                        <label key={option} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedFilters[category]?.includes(option) || false}
                            onChange={() => toggleFilter(category, option)}
                            className="rounded"
                          />
                          <span className="text-sm">{option}</span>
                        </label>
                      ))}
                    </div>
                    <Separator className="mt-4" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Manufacturer Cards */}
          <div className="flex-1">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold">Recommended Manufacturers</h2>
              <p className="text-muted-foreground">Based on your project requirements</p>
            </div>

            <div className="grid gap-6">
              {manufacturers.map((manufacturer) => (
                <Card 
                  key={manufacturer.id} 
                  className={`${manufacturer.suggested ? 'ring-2 ring-primary bg-primary/5' : ''}`}
                >
                  {manufacturer.suggested && (
                    <div className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium">
                      ⭐ Recommended Match
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      {/* Images */}
                      <div className="flex gap-2">
                        {manufacturer.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`${manufacturer.name} facility ${index + 1}`}
                            className="w-24 h-24 rounded-lg object-cover"
                          />
                        ))}
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-semibold">{manufacturer.name}</h3>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span>{manufacturer.location}</span>
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{manufacturer.rating}</span>
                              <span>({manufacturer.reviews} reviews)</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Chat
                            </Button>
                            <Button size="sm" variant="outline">
                              <Phone className="h-4 w-4 mr-1" />
                              Call
                            </Button>
                            <Button size="sm">
                              <Mail className="h-4 w-4 mr-1" />
                              Contact
                            </Button>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-3">{manufacturer.description}</p>

                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{manufacturer.employees} employees</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {manufacturer.specialties.map((specialty) => (
                            <Badge key={specialty} variant="secondary">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
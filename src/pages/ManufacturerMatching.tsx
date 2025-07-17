import { useState, useEffect, useRef, useCallback } from "react"
import { ArrowLeft, Search, Sparkles, MapPin, Star, Users, MessageCircle, Phone, Mail, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"

const blueprintSteps = [
  { id: 1, title: "Design", completed: true },
  { id: 2, title: "Find Manufacturers", completed: false, current: true },
  { id: 3, title: "Order Samples", completed: false },
  { id: 4, title: "Review Samples", completed: false },
  { id: 5, title: "Place Order", completed: false }
]

const manufacturersData = [
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
    description: "Leading manufacturer specializing in premium textiles with 15 years of experience.",
    response_time: "< 2 hours",
    verified: true
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
    description: "High-end fashion manufacturer with state-of-the-art facilities and expert craftsmanship.",
    response_time: "< 1 hour",
    verified: true
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
    description: "Large-scale manufacturer with extensive global supply chain capabilities.",
    response_time: "< 4 hours",
    verified: true
  }
]

// Generate additional manufacturers for infinite scroll
const generateManufacturers = (startId: number) => {
  const names = ["Artisan Textile Works", "Modern Fabric Co.", "Eco Fashion Hub", "Precision Manufacturing", "Creative Textiles Ltd."]
  const locations = ["Hangzhou, China", "Ningbo, China", "Dongguan, China", "Xiamen, China", "Qingdao, China"]
  const specs = [["Handcrafted", "Luxury"], ["Eco-Friendly", "Organic"], ["Tech Wear", "Innovation"], ["Bulk Orders", "Wholesale"], ["Designer", "Premium"]]
  
  return Array.from({ length: 6 }, (_, i) => ({
    id: startId + i,
    name: names[i % names.length] + ` ${Math.floor((startId + i) / 10) + 1}`,
    location: locations[i % locations.length],
    rating: 4.3 + Math.random() * 0.6,
    reviews: Math.floor(Math.random() * 200) + 50,
    employees: ["50-200", "200-500", "500-1000"][i % 3],
    specialties: specs[i % specs.length],
    suggested: false,
    images: [
      `https://images.unsplash.com/photo-${["1483058712412-4245e9b90334", "1488590528505-98d2b5aba04b", "1486312338219-ce68d2c6f44d"][i % 3]}?w=400&h=300&fit=crop`,
      `https://images.unsplash.com/photo-${["1531297484001-80022131f5a1", "1460925895917-afdab827c52f", "1483058712412-4245e9b90334"][i % 3]}?w=400&h=300&fit=crop`,
      `https://images.unsplash.com/photo-${["1488590528505-98d2b5aba04b", "1486312338219-ce68d2c6f44d", "1531297484001-80022131f5a1"][i % 3]}?w=400&h=300&fit=crop`
    ],
    description: "Professional manufacturing services with modern facilities and quality assurance.",
    response_time: `< ${Math.floor(Math.random() * 8) + 1} hours`,
    verified: Math.random() > 0.3
  }))
}

const filters = {
  location: ["China", "India", "Vietnam", "Bangladesh", "Turkey"],
  employees: ["1-50", "50-200", "200-500", "500-1000", "1000+"],
  specialties: ["Apparel", "Fashion", "Sustainable", "Custom Design", "Mass Production", "Luxury"],
  rating: ["4.5+", "4.0+", "3.5+", "3.0+"]
}

export default function ManufacturerMatching() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [manufacturers, setManufacturers] = useState(manufacturersData)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const navigate = useNavigate()
  const observer = useRef<IntersectionObserver>()

  const lastManufacturerElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreManufacturers()
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  const loadMoreManufacturers = () => {
    if (loading) return
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const newManufacturers = generateManufacturers(manufacturers.length + 1)
      setManufacturers(prev => [...prev, ...newManufacturers])
      setLoading(false)
      
      // Stop loading after 50 manufacturers for demo
      if (manufacturers.length >= 47) {
        setHasMore(false)
      }
    }, 1000)
  }

  const toggleFilter = (category: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category]?.includes(value) 
        ? prev[category].filter(v => v !== value)
        : [...(prev[category] || []), value]
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 glass border-b-0 backdrop-blur-xl bg-background/80">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="flex items-center gap-2 glass-hover rounded-full px-4 py-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="font-medium">Dashboard</span>
            </Button>
          </div>

          {/* Blueprint Steps */}
          <div className="flex justify-center mb-8">
            <div className="glass rounded-full px-8 py-4">
              <div className="flex items-center space-x-6">
                {blueprintSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`
                      relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500
                      ${step.completed 
                        ? 'bg-green-500 text-white shadow-lg shadow-green-500/50' 
                        : step.current
                        ? 'bg-primary text-primary-foreground glow-primary'
                        : 'bg-muted text-muted-foreground'
                      }
                    `}>
                      {step.completed ? (
                        <span className="text-sm font-medium">✓</span>
                      ) : (
                        <span className="text-sm font-medium">{step.id}</span>
                      )}
                    </div>
                    <span className={`ml-3 text-sm font-medium ${step.current ? 'gradient-text' : ''}`}>
                      {step.title}
                    </span>
                    {index < blueprintSteps.length - 1 && (
                      <div className={`
                        w-12 h-0.5 mx-6 transition-all duration-500
                        ${step.completed ? 'bg-green-500 shadow-sm shadow-green-500/50' : 'bg-border'}
                      `} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative group">
              <div className="glass rounded-2xl p-1 group-focus-within:glow-primary transition-all duration-300">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search manufacturers or describe what you're looking for..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-20 py-4 bg-transparent border-0 text-lg placeholder:text-muted-foreground/70 focus-visible:ring-0"
                  />
                  <Button
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Sparkles className="h-4 w-4 mr-1" />
                    AI
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-80 shrink-0">
            <div className="glass rounded-2xl p-6 sticky top-8">
              <h3 className="text-xl font-semibold mb-6 gradient-text">Filters</h3>
              <div className="space-y-6">
                {Object.entries(filters).map(([category, options]) => (
                  <div key={category}>
                    <h4 className="font-medium mb-3 text-foreground capitalize">{category}</h4>
                    <div className="space-y-2">
                      {options.map((option) => (
                        <label key={option} className="flex items-center space-x-3 cursor-pointer group">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={selectedFilters[category]?.includes(option) || false}
                              onChange={() => toggleFilter(category, option)}
                              className="sr-only"
                            />
                            <div className={`w-4 h-4 rounded border-2 transition-all duration-200 ${
                              selectedFilters[category]?.includes(option) 
                                ? 'bg-primary border-primary' 
                                : 'border-border group-hover:border-primary/50'
                            }`}>
                              {selectedFilters[category]?.includes(option) && (
                                <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{option}</span>
                        </label>
                      ))}
                    </div>
                    <div className="h-px bg-border mt-4" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Manufacturer Cards */}
          <div className="flex-1">
            <div className="mb-8">
              <h2 className="text-3xl font-semibold mb-2 gradient-text">AI-Matched Manufacturers</h2>
              <p className="text-muted-foreground text-lg">Curated based on your project requirements</p>
            </div>

            <div className="grid gap-6">
              {manufacturers.map((manufacturer, index) => (
                <div
                  key={manufacturer.id}
                  ref={index === manufacturers.length - 1 ? lastManufacturerElementRef : null}
                >
                  <Card className={`glass glass-hover rounded-2xl overflow-hidden group ${
                    manufacturer.suggested ? 'glow-primary ring-1 ring-primary/20' : ''
                  }`}>
                    {manufacturer.suggested && (
                      <div className="bg-gradient-to-r from-primary to-blue-500 text-primary-foreground px-6 py-3 text-sm font-medium flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        AI Recommended Match
                      </div>
                    )}
                    <CardContent className="p-8">
                      <div className="flex gap-8">
                        {/* Images */}
                        <div className="flex gap-3">
                          {manufacturer.images.slice(0, 2).map((image, imgIndex) => (
                            <div key={imgIndex} className="relative overflow-hidden rounded-xl">
                              <img
                                src={image}
                                alt={`${manufacturer.name} facility ${imgIndex + 1}`}
                                className="w-28 h-28 object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            </div>
                          ))}
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-2xl font-semibold text-foreground">{manufacturer.name}</h3>
                                {manufacturer.verified && (
                                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-4 text-muted-foreground mb-3">
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4" />
                                  <span>{manufacturer.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="font-medium">{manufacturer.rating.toFixed(1)}</span>
                                  <span>({manufacturer.reviews} reviews)</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  <span>{manufacturer.employees} employees</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <p className="text-muted-foreground mb-4 leading-relaxed">{manufacturer.description}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                              {manufacturer.specialties.map((specialty) => (
                                <Badge key={specialty} variant="secondary" className="glass">
                                  {specialty}
                                </Badge>
                              ))}
                              <Badge className="bg-primary/20 text-primary border-primary/30">
                                {manufacturer.response_time} response
                              </Badge>
                            </div>
                            
                            <div className="flex gap-3">
                              <Button size="sm" variant="outline" className="glass-hover rounded-full">
                                <MessageCircle className="h-4 w-4 mr-2" />
                                Chat
                              </Button>
                              <Button size="sm" className="rounded-full bg-primary hover:bg-primary/90 glow-primary">
                                <Mail className="h-4 w-4 mr-2" />
                                Contact
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}

              {/* Loading indicator */}
              {loading && (
                <div className="flex justify-center py-8">
                  <div className="glass rounded-full px-6 py-3 flex items-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent"></div>
                    <span className="text-muted-foreground">Finding more manufacturers...</span>
                  </div>
                </div>
              )}

              {/* End message */}
              {!hasMore && manufacturers.length > 3 && (
                <div className="text-center py-8">
                  <div className="glass rounded-2xl p-6 inline-block">
                    <p className="text-muted-foreground">You've viewed all available manufacturers</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
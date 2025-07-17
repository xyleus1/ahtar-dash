import { useState, useEffect, useCallback } from "react"
import { ArrowLeft, Search, Sparkles, MapPin, Star, Users, MessageCircle, Phone, Mail, Loader2 } from "lucide-react"
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

// Additional manufacturers for infinite scroll
const generateManufacturers = (startId: number, count: number) => {
  const locations = ["Beijing, China", "Mumbai, India", "Ho Chi Minh, Vietnam", "Dhaka, Bangladesh", "Istanbul, Turkey"];
  const names = ["Advanced Textiles Co.", "Modern Manufacturing", "Precision Fabrics Ltd.", "Quality Garments Inc.", "Sustainable Solutions"];
  const specialtyOptions = ["Eco-Friendly", "Fast Fashion", "Luxury Goods", "Technical Textiles", "Organic Cotton"];
  
  return Array.from({ length: count }, (_, i) => ({
    id: startId + i,
    name: names[i % names.length],
    location: locations[i % locations.length],
    rating: 4.0 + Math.random() * 0.9,
    reviews: Math.floor(Math.random() * 200) + 50,
    employees: ["50-200", "200-500", "500-1000"][Math.floor(Math.random() * 3)],
    specialties: [specialtyOptions[i % specialtyOptions.length], specialtyOptions[(i + 1) % specialtyOptions.length]],
    suggested: false,
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop"
    ],
    description: `Professional manufacturer with expertise in textile production and quality assurance.`
  }));
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
  const [manufacturers, setManufacturers] = useState(initialManufacturers)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const navigate = useNavigate()

  const toggleFilter = (category: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category]?.includes(value) 
        ? prev[category].filter(v => v !== value)
        : [...(prev[category] || []), value]
    }))
  }

  const loadMoreManufacturers = useCallback(async () => {
    if (loading || !hasMore) return
    
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newManufacturers = generateManufacturers(manufacturers.length + 1, 3)
    setManufacturers(prev => [...prev, ...newManufacturers])
    
    // Stop loading more after 20 manufacturers
    if (manufacturers.length >= 17) {
      setHasMore(false)
    }
    
    setLoading(false)
  }, [loading, hasMore, manufacturers.length])

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

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Futuristic background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-100/20 via-transparent to-transparent"></div>
      
      {/* Floating header */}
      <div className="relative z-10 sticky top-0">
        <div className="backdrop-blur-xl bg-white/70 border-b border-white/20 shadow-lg">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between mb-8">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/")}
                className="flex items-center gap-2 hover:bg-white/50 transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </div>

            {/* Modern blueprint steps */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-6 bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-white/30 shadow-lg">
                {blueprintSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`
                      flex items-center justify-center w-12 h-12 rounded-xl border-2 transition-all duration-300
                      ${step.completed 
                        ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/25' 
                        : step.current
                        ? 'bg-gradient-to-r from-violet-500 to-purple-600 border-violet-500 text-white shadow-lg shadow-violet-500/25 animate-glow'
                        : 'border-slate-300 text-slate-400 bg-white/50'
                      }
                    `}>
                      {step.completed ? (
                        <span className="text-sm font-semibold">✓</span>
                      ) : (
                        <span className="text-sm font-semibold">{step.id}</span>
                      )}
                    </div>
                    <span className={`ml-3 text-sm font-medium ${step.current ? 'text-slate-900' : 'text-slate-600'}`}>
                      {step.title}
                    </span>
                    {index < blueprintSteps.length - 1 && (
                      <div className={`
                        w-20 h-0.5 mx-6 transition-all duration-500
                        ${step.completed ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' : 'bg-slate-200'}
                      `} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Futuristic search bar */}
            <div className="relative max-w-3xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-400/20 to-purple-600/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    placeholder="Search manufacturers or describe what you're looking for..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-20 h-14 text-lg bg-white/80 backdrop-blur-md border-white/30 rounded-2xl shadow-lg focus:shadow-xl focus:ring-2 focus:ring-violet-500/25 transition-all duration-300"
                  />
                  <Button
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 px-4 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    AI Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Glass morphism sidebar */}
          <div className="w-80 shrink-0">
            <div className="sticky top-32">
              <div className="backdrop-blur-xl bg-white/70 border border-white/30 rounded-3xl shadow-xl p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse"></div>
                  Filters
                </h3>
                <div className="space-y-6">
                  {Object.entries(filters).map(([category, options]) => (
                    <div key={category} className="animate-slide-up">
                      <h4 className="font-medium mb-3 capitalize text-slate-700">{category}</h4>
                      <div className="space-y-3">
                        {options.map((option) => (
                          <label key={option} className="flex items-center space-x-3 cursor-pointer group">
                            <div className="relative">
                              <input
                                type="checkbox"
                                checked={selectedFilters[category]?.includes(option) || false}
                                onChange={() => toggleFilter(category, option)}
                                className="w-4 h-4 text-violet-600 bg-white/80 border-slate-300 rounded focus:ring-violet-500 focus:ring-2 transition-all duration-200"
                              />
                            </div>
                            <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors duration-200">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Manufacturer cards with glass morphism */}
          <div className="flex-1">
            <div className="mb-8 animate-slide-up">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2">
                Recommended Manufacturers
              </h2>
              <p className="text-slate-600 text-lg">Based on your project requirements</p>
            </div>

            <div className="space-y-6">
              {manufacturers.map((manufacturer, index) => (
                <div 
                  key={manufacturer.id} 
                  className="group animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`
                    relative backdrop-blur-xl border rounded-3xl shadow-xl transition-all duration-500 hover:shadow-2xl overflow-hidden
                    ${manufacturer.suggested 
                      ? 'bg-gradient-to-br from-violet-50/80 to-purple-50/80 border-violet-200/50 hover:border-violet-300/60' 
                      : 'bg-white/70 border-white/30 hover:border-white/50'
                    }
                  `}>
                    {manufacturer.suggested && (
                      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-violet-500 to-purple-600 text-white px-6 py-3 text-sm font-semibold flex items-center gap-2">
                        <Star className="h-4 w-4 fill-current" />
                        AI Recommended Match
                      </div>
                    )}
                    
                    <div className={`p-8 ${manufacturer.suggested ? 'pt-16' : ''}`}>
                      <div className="flex gap-6">
                        {/* Enhanced image gallery */}
                        <div className="flex gap-3">
                          {manufacturer.images.map((image, imageIndex) => (
                            <div key={imageIndex} className="relative group/img">
                              <img
                                src={image}
                                alt={`${manufacturer.name} facility ${imageIndex + 1}`}
                                className="w-28 h-28 rounded-2xl object-cover shadow-lg group-hover/img:shadow-xl transition-all duration-300 group-hover/img:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover/img:opacity-100 transition-opacity duration-300"></div>
                            </div>
                          ))}
                        </div>

                        {/* Enhanced info section */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-violet-900 transition-colors duration-300">
                                {manufacturer.name}
                              </h3>
                              <div className="flex items-center gap-4 text-slate-600">
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4" />
                                  <span className="font-medium">{manufacturer.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                  <span className="font-semibold text-slate-700">{manufacturer.rating.toFixed(1)}</span>
                                  <span className="text-slate-500">({manufacturer.reviews} reviews)</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <Button size="sm" variant="outline" className="backdrop-blur-md bg-white/60 border-white/40 hover:bg-white/80 transition-all duration-300 hover:scale-105">
                                <MessageCircle className="h-4 w-4 mr-2" />
                                Chat
                              </Button>
                              <Button size="sm" variant="outline" className="backdrop-blur-md bg-white/60 border-white/40 hover:bg-white/80 transition-all duration-300 hover:scale-105">
                                <Phone className="h-4 w-4 mr-2" />
                                Call
                              </Button>
                              <Button size="sm" className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                <Mail className="h-4 w-4 mr-2" />
                                Contact
                              </Button>
                            </div>
                          </div>

                          <p className="text-slate-600 mb-4 leading-relaxed">{manufacturer.description}</p>

                          <div className="flex items-center gap-6 mb-4">
                            <div className="flex items-center gap-2 text-slate-600">
                              <Users className="h-4 w-4" />
                              <span className="font-medium">{manufacturer.employees} employees</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {manufacturer.specialties.map((specialty) => (
                              <Badge 
                                key={specialty} 
                                variant="secondary"
                                className="bg-white/60 text-slate-700 border-white/40 hover:bg-white/80 transition-all duration-300 hover:scale-105"
                              >
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Loading indicator */}
              {loading && (
                <div className="flex justify-center py-8">
                  <div className="backdrop-blur-xl bg-white/70 border border-white/30 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center gap-3">
                      <Loader2 className="h-5 w-5 animate-spin text-violet-600" />
                      <span className="text-slate-600 font-medium">Loading more manufacturers...</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* End of results */}
              {!hasMore && !loading && (
                <div className="flex justify-center py-8">
                  <div className="backdrop-blur-xl bg-white/70 border border-white/30 rounded-2xl p-6 shadow-lg">
                    <p className="text-slate-600 font-medium">You've reached the end of our manufacturer recommendations</p>
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
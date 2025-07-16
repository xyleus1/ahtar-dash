import { useState } from "react"
import { Search, Filter, MapPin, Star, Phone, Mail, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import { AppLayout } from "@/components/layout/AppLayout"

const manufacturers = [
  {
    id: 1,
    name: "Premium Fashion Manufacturing Co.",
    location: "Guangzhou, China",
    rating: 4.9,
    reviews: 1247,
    specialties: ["Denim", "Casual Wear", "Sustainable"],
    minOrder: "500 pieces",
    leadTime: "15-20 days",
    verified: true,
    topRated: true,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop",
    description: "Leading manufacturer specializing in premium denim and casual wear with 15+ years experience."
  },
  {
    id: 2,
    name: "Global Textile Solutions",
    location: "Istanbul, Turkey",
    rating: 4.8,
    reviews: 892,
    specialties: ["Knitwear", "Activewear", "Technical Fabrics"],
    minOrder: "300 pieces",
    leadTime: "12-18 days",
    verified: true,
    topRated: true,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop",
    description: "Innovative textile solutions with advanced technical fabric capabilities."
  },
  {
    id: 3,
    name: "Sustainable Apparel Group",
    location: "Bangalore, India",
    rating: 4.7,
    reviews: 654,
    specialties: ["Organic Cotton", "Eco-Friendly", "Basics"],
    minOrder: "1000 pieces",
    leadTime: "20-25 days",
    verified: true,
    topRated: true,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=200&fit=crop",
    description: "Committed to sustainable manufacturing with certified organic materials."
  },
  {
    id: 4,
    name: "Fashion Forward Manufacturing",
    location: "Ho Chi Minh, Vietnam",
    rating: 4.6,
    reviews: 423,
    specialties: ["Fast Fashion", "Womenswear", "Accessories"],
    minOrder: "200 pieces",
    leadTime: "10-15 days",
    verified: true,
    topRated: false,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop",
    description: "Quick turnaround specialist for fast fashion and trend-driven pieces."
  },
  {
    id: 5,
    name: "Luxury Garment Works",
    location: "Milan, Italy",
    rating: 4.5,
    reviews: 312,
    specialties: ["Luxury", "Tailoring", "High-End"],
    minOrder: "100 pieces",
    leadTime: "25-30 days",
    verified: true,
    topRated: false,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop",
    description: "Artisanal craftsmanship for luxury and high-end fashion pieces."
  }
]

export default function ManufacturerSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  const topManufacturers = manufacturers.filter(m => m.topRated).slice(0, 3)
  const otherManufacturers = manufacturers.filter(m => !m.topRated)

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              onClick={() => navigate("/")}
              variant="outline"
              size="sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-primary">Find Manufacturers</h1>
              <p className="text-muted-foreground">Discover the perfect manufacturing partner for your project</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search manufacturers by name, location, or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Top Rated Manufacturers */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold text-primary">Top Recommended</h2>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-300">
              ⭐ Featured
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topManufacturers.map((manufacturer) => (
              <Card key={manufacturer.id} className="border-2 border-primary/20 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-primary/5 to-transparent">
                <div className="relative">
                  <img 
                    src={manufacturer.image} 
                    alt={manufacturer.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-2 right-2 bg-yellow-500 text-white">
                    TOP RATED
                  </Badge>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{manufacturer.name}</CardTitle>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{manufacturer.location}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 font-medium">{manufacturer.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({manufacturer.reviews} reviews)</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{manufacturer.description}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {manufacturer.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Min Order:</span>
                      <span className="font-medium">{manufacturer.minOrder}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lead Time:</span>
                      <span className="font-medium">{manufacturer.leadTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button className="flex-1" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Other Manufacturers */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-primary">More Manufacturers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherManufacturers.map((manufacturer) => (
              <Card key={manufacturer.id} className="hover:shadow-md transition-shadow">
                <div className="relative">
                  <img 
                    src={manufacturer.image} 
                    alt={manufacturer.name}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{manufacturer.name}</CardTitle>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{manufacturer.location}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm font-medium">{manufacturer.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">({manufacturer.reviews})</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {manufacturer.specialties.slice(0, 2).map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button className="w-full" size="sm">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

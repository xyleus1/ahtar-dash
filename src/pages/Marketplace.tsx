import { useState } from "react"
import { ProductCard } from "@/components/marketplace/ProductCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Grid, List } from "lucide-react"

const categories = ["All", "T-Shirts", "Denim", "Outerwear", "Dresses", "Accessories"]
const materials = ["Cotton", "Polyester", "Denim", "Wool", "Sustainable"]
const countries = ["China", "India", "Turkey", "Bangladesh", "Vietnam"]

const products = [
  {
    id: 1,
    name: "Organic Cotton Tee",
    brand: "EcoWear Co.",
    category: "T-Shirts",
    material: "Organic Cotton",
    moq: "500 units",
    leadTime: "4-6 weeks",
    image: "/placeholder.jpg",
    supplierCountry: "India"
  },
  {
    id: 2,
    name: "Premium Denim Jacket",
    brand: "Urban Edge",
    category: "Denim",
    material: "Cotton Denim",
    moq: "200 units",
    leadTime: "6-8 weeks", 
    image: "/placeholder.jpg",
    supplierCountry: "Turkey"
  },
  {
    id: 3,
    name: "Sustainable Hoodie",
    brand: "Green Label",
    category: "Outerwear",
    material: "Recycled Polyester",
    moq: "300 units",
    leadTime: "5-7 weeks",
    image: "/placeholder.jpg",
    supplierCountry: "China"
  },
  {
    id: 4,
    name: "Minimalist Dress",
    brand: "Simple Studio",
    category: "Dresses",
    material: "Cotton Blend",
    moq: "150 units",
    leadTime: "3-5 weeks",
    image: "/placeholder.jpg",
    supplierCountry: "Vietnam"
  },
  {
    id: 5,
    name: "Performance Athletic Wear",
    brand: "FitTech",
    category: "T-Shirts",
    material: "Technical Polyester",
    moq: "1000 units",
    leadTime: "4-6 weeks",
    image: "/placeholder.jpg",
    supplierCountry: "China"
  },
  {
    id: 6,
    name: "Artisan Wool Coat",
    brand: "Heritage Craft",
    category: "Outerwear", 
    material: "Merino Wool",
    moq: "100 units",
    leadTime: "8-10 weeks",
    image: "/placeholder.jpg",
    supplierCountry: "Turkey"
  }
]

export default function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Marketplace</h1>
          <p className="text-gray-600">Discover recent drops and production inspiration</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant={viewMode === "grid" ? "default" : "outline"} 
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button 
            variant={viewMode === "list" ? "default" : "outline"} 
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search products, brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Button variant="outline" className="sm:w-auto">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="button-hover"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredProducts.length} products
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <Button variant="ghost" size="sm">
            Most Recent
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <div className={
        viewMode === "grid" 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "space-y-4"
      }>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More */}
      {filteredProducts.length > 0 && (
        <div className="flex justify-center">
          <Button variant="outline" className="button-hover">
            Load More Products
          </Button>
        </div>
      )}
    </div>
  )
}
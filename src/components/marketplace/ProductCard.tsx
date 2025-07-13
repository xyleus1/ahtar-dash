import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, FileText } from "lucide-react"

interface ProductCardProps {
  product: {
    id: number
    name: string
    brand: string
    category: string
    material: string
    moq: string
    leadTime: string
    image: string
    supplierCountry: string
  }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden card-interactive bg-background border border-border">
      <div className="aspect-[4/3] bg-grey-100 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-grey-200 rounded-lg flex items-center justify-center">
            <FileText className="h-8 w-8 text-muted" />
          </div>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-primary mb-1">{product.name}</h3>
          <p className="text-sm text-secondary">{product.brand}</p>
        </div>
        
        <div className="flex flex-wrap gap-1">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {product.material}
          </Badge>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-secondary">MOQ:</span>
            <span className="text-primary font-medium">{product.moq}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-secondary">Lead Time:</span>
            <span className="text-primary font-medium">{product.leadTime}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-secondary">Origin:</span>
            <span className="text-primary font-medium">{product.supplierCountry}</span>
          </div>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Eye className="h-3 w-3 mr-1" />
            View
          </Button>
          <Button size="sm" className="flex-1 button-hover">
            <FileText className="h-3 w-3 mr-1" />
            Blueprint
          </Button>
        </div>
      </div>
    </Card>
  )
}
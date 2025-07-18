import { useState } from "react"
import { ArrowLeft, MapPin, Star, Users, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GradientCard } from "@/components/ui/gradient-card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

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

interface Message {
  id: string
  content: string
  timestamp: Date
  isFromMe: boolean
}

interface SampleOverviewProps {
  manufacturers: Manufacturer[]
  onBack: () => void
}

export function SampleOverview({ manufacturers, onBack }: SampleOverviewProps) {
  const [selectedManufacturer, setSelectedManufacturer] = useState<Manufacturer | null>(
    manufacturers.length > 0 ? manufacturers[0] : null
  )
  const [newMessage, setNewMessage] = useState("")

  // Mock messages for the selected manufacturer
  const messages: Message[] = [
    {
      id: "1",
      content: `Project Details:
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
Looking for a long-term manufacturing partner for ongoing seasonal collections. Quality and ethical production practices are top priorities.`,
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      isFromMe: true
    }
  ]

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-light/10">
      {/* Header */}
      <div className="border-b border-border/20 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="hover:bg-purple-light/30">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Manufacturers
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <h1 className="text-2xl font-light text-foreground">Sample Overview</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8 h-[calc(100vh-200px)]">
          {/* Manufacturers List */}
          <div className="col-span-4">
            <GradientCard className="h-full card-glass bg-background/95 border border-border/20">
              <div className="p-4 border-b border-border/20">
                <h2 className="text-lg font-light text-foreground">Contacted Manufacturers</h2>
                <p className="text-sm text-muted-foreground font-light">
                  Manage your conversations with manufacturers
                </p>
              </div>
              
              <div className="p-4 space-y-3 overflow-y-auto flex-1">
                {manufacturers.map((manufacturer) => (
                  <div
                    key={manufacturer.id}
                    onClick={() => setSelectedManufacturer(manufacturer)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                      selectedManufacturer?.id === manufacturer.id
                        ? "border-purple-accent/50 bg-purple-light/20"
                        : "border-border/20 hover:border-purple-accent/30 hover:bg-purple-light/10"
                    }`}
                  >
                    <div className="flex gap-3">
                      <img
                        src={manufacturer.images[0]}
                        alt={manufacturer.name}
                        className="w-12 h-12 rounded-lg object-cover border border-border/20"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-light text-foreground truncate">{manufacturer.name}</h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{manufacturer.location}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-muted-foreground">{manufacturer.rating}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-xs text-muted-foreground">30m ago</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GradientCard>
          </div>

          {/* Messages Panel */}
          <div className="col-span-8">
            {selectedManufacturer ? (
              <GradientCard className="h-full card-glass bg-background/95 border border-border/20 flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-border/20">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedManufacturer.images[0]}
                      alt={selectedManufacturer.name}
                      className="w-12 h-12 rounded-lg object-cover border border-border/20"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-light text-foreground">{selectedManufacturer.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{selectedManufacturer.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{selectedManufacturer.employees} employees</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {selectedManufacturer.specialties.slice(0, 2).map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs bg-purple-light/30 text-purple-accent border-purple-accent/20">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isFromMe ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] p-4 rounded-xl ${
                          message.isFromMe
                            ? "bg-purple-light/20 border border-purple-accent/20"
                            : "bg-muted/50 border border-border/20"
                        }`}
                      >
                        <div className="whitespace-pre-wrap text-sm font-light text-foreground">
                          {message.content}
                        </div>
                        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{message.timestamp.toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-border/20">
                  <div className="flex gap-3">
                    <Textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 min-h-[50px] resize-none bg-background/50 border-border/50 focus:bg-background/80"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="self-end bg-purple-accent hover:bg-purple-accent/90 text-white"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </GradientCard>
            ) : (
              <GradientCard className="h-full card-glass bg-background/95 border border-border/20 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-light text-foreground">Select a Manufacturer</h3>
                  <p className="text-muted-foreground font-light">
                    Choose a manufacturer from the list to view your conversation
                  </p>
                </div>
              </GradientCard>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
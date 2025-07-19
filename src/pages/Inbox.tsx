import { AppLayout } from "@/components/layout/AppLayout"
import { SampleOverview } from "@/components/inbox/SampleOverview"

// Mock data - in a real app this would come from an API
const contactedManufacturers = [
  {
    id: 1,
    name: "Premium Textiles Co.",
    location: "Los Angeles, CA",
    rating: 4.8,
    reviews: 156,
    employees: "50-100",
    specialties: ["Premium Cotton", "Sustainable Materials", "Small Batches"],
    images: ["/placeholder.svg"],
    description: "High-quality textile manufacturer specializing in premium cotton and sustainable materials."
  },
  {
    id: 2, 
    name: "Urban Factory Ltd.",
    location: "New York, NY",
    rating: 4.6,
    reviews: 89,
    employees: "20-50",
    specialties: ["Streetwear", "Denim", "Custom Printing"],
    images: ["/placeholder.svg"],
    description: "Modern urban fashion manufacturer with expertise in streetwear and custom printing."
  }
]

const Inbox = () => {
  const handleBack = () => {
    // This could navigate back or to a different page if needed
    window.history.back()
  }

  return (
    <AppLayout>
      <SampleOverview 
        manufacturers={contactedManufacturers}
        onBack={handleBack}
      />
    </AppLayout>
  )
}

export default Inbox
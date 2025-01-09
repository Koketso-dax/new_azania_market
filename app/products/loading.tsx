// Import the Skeleton component for displaying loading placeholders
import { Skeleton } from "../../components/ui/skeleton"

// Define and export the Loading component, which renders a loading state
export default function Loading() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  )
}

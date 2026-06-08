// Import necessary modules and components
import Link from 'next/link' // Provides client-side navigation in a Next.js app
import { Button } from '@/components/ui/button' // Custom button component for consistent UI styling
import { FeaturedProducts } from '@/components/FeaturedProducts'

// Main functional component for the Home page
export default async function Home() {
  // Fetch the featured products using the `getFeaturedProducts` function

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center">Welcome to New Azania Market</h1>
      <p className="text-center text-gray-600">Discover our featured products</p>
      <FeaturedProducts/>
      <div className="text-center">
        <Link href="/products">
          <Button variant="outline">View All Products</Button>
        </Link>
      </div>
    </div>
  )
}

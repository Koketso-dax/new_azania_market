// Import necessary modules and components
import Link from 'next/link' // Provides client-side navigation in a Next.js app
import { ProductCard } from '../components/ProductCard' // Custom component for displaying product details
import { Button } from '@/components/ui/button' // Custom button component for consistent UI styling
import type { Product } from '@/types/product' // TypeScript type for product objects

// Function to fetch featured products from a fake API
async function getFeaturedProducts(): Promise<Product[]> {
  // Fetch 3 products from the Fake Store API
  const res = await fetch('https://fakestoreapi.com/products?limit=3')

  // Handle unsuccessful responses by throwing an error
  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }

  // Return the fetched data as JSON
  return res.json()
}

// Main functional component for the Home page
export default async function Home() {

  // Fetch the featured products using the `getFeaturedProducts` function
  const featuredProducts = await getFeaturedProducts()

  // Return the JSX structure for the Home page
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center">Welcome to New Azania Market</h1>
      <p className="text-center text-gray-600">Discover our featured products</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="text-center">
        <Link href="/products">
          <Button variant="outline">View All Products</Button>
        </Link>
      </div>
    </div>
  )
}


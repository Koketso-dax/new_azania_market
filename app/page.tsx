import Link from 'next/link'
import { ProductCard } from '../components/ProductCard'
import { Button } from '@/components/ui/button'
import type { Product } from '@/types/product'

async function getFeaturedProducts(): Promise<Product[]> {
  const res = await fetch('https://fakestoreapi.com/products?limit=3')
  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }
  return res.json()
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts()

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


import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  const featuredProducts = [
    { id: 1, name: 'Azanian Coffee', price: 15.99 },
    { id: 2, name: 'Handmade Basket', price: 29.99 },
    { id: 3, name: 'Traditional Necklace', price: 49.99 },
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center">Welcome to New Azania Market</h1>
      <p className="text-center text-gray-600">Discover the best of Azanian culture and craftsmanship</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredProducts.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 text-center">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
            <Button className="mt-2">Add to Cart</Button>
          </div>
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

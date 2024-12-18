import { Button } from '@/components/ui/button'

const products = [
  { id: 1, name: 'Azanian Coffee', price: 15.99 },
  { id: 2, name: 'Handmade Basket', price: 29.99 },
  { id: 3, name: 'Traditional Necklace', price: 49.99 },
  { id: 4, name: 'Azanian Spice Mix', price: 9.99 },
  { id: 5, name: 'Handwoven Rug', price: 79.99 },
  { id: 6, name: 'Carved Wooden Mask', price: 39.99 },
]

export default function ProductsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
            <Button className="mt-2">Add to Cart</Button>
          </div>
        ))}
      </div>
    </div>
  )
}


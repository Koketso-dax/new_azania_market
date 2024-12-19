import { ProductCard } from '../../components/ProductCard'
import type { Product } from '../../types/product'

async function getProducts(): Promise<Product[]> {
  const res = await fetch('https://fakestoreapi.com/products')
  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }
  return res.json()
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}


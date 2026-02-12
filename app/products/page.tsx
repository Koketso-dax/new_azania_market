// Import the ProductCard component to display individual product details
import { ProductCard } from '../../components/ProductCard'

// Import the Product type to define the structure of product data
import type { Product } from '../../types/product'

// Function to fetch featured products from a fake API
async function getProducts(): Promise<Product[]> {
  // Fetch 3 products from the Fake Store API
  try {
  const res = await fetch('https://fakestoreapi.com/products')
  // Return the fetched data as JSON
  return res.json()
}
  catch(error){
    // Exception on fail
    throw new Error('Failed to fetch products')
  }
}

// Define and export the ProductsPage component as the default export
export default async function ProductsPage() {
  // Fetch the list of products using the getProducts function
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

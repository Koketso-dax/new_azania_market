// Import the ProductCard component to display individual product details
import { ProductCard } from '../../components/ProductCard'

// Import the Product type to define the structure of product data
import type { Product } from '../../types/product'

// Function to fetch products from a fake API and return them as a list of Product objects
async function getProducts(): Promise<Product[]> {
  // Make a request to the fake store API
  const res = await fetch('https://fakestoreapi.com/products')

  // Check if the response is successful; throw an error if not
  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }
  
  // Parse and return the response JSON as an array of products
  return res.json()
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

import { ProductGrid } from "@/components/ProductGrid"
// Define and export the ProductsPage component as the default export

export default async function ProductsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Our Products</h1>
      <ProductGrid/>
    </div>
  )
}

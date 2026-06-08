"use client"

import { ProductCard } from "./ProductCard"
import Loading from "./ProductLoad"
import { useFeaturedProducts } from "@/hooks/use-products"

export function FeaturedProducts() {
    const {data: FeaturedProducts = [], error, isLoading} = useFeaturedProducts()

    if (isLoading) return <Loading/>
    if (error) return <div>ERROR</div>

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FeaturedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    )
}
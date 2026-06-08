"use client"

import { ProductCard } from "./ProductCard"
import Loading from "./ProductLoad"
import { useProducts } from "@/hooks/use-products"

export function ProductGrid() {
    const { data: allProducts = [], error, isLoading } = useProducts()
    
    if (isLoading) return <Loading/>
    if (error) return <div>ERROR</div>

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProducts.map((product) => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    )
}
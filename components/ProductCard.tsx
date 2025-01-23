'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import type { Product } from '@/types/product'
import { useCart } from '@/contexts/CartContext'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [imageError, setImageError] = useState(false)

  const handleAddToCart = () => {
    addToCart(product)
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    })
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="line-clamp-1">{product.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="relative w-full h-48 mb-4">
          {imageError ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
              Image not available
            </div>
          ) : (
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={handleImageError}
            />
          )}
        </div>
        <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-500 capitalize">{product.category}</p>
        <p className="mt-2 text-sm line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleAddToCart}>Add to Cart</Button>
      </CardFooter>
    </Card>
  )
}


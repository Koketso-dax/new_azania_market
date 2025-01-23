// Indicates that this component is rendered on the client-side in Next.js
'use client'

// Import required modules and components
import Image from 'next/image' // Next.js Image component for optimized image handling
import { useState } from 'react' // React hook for managing local state
import { Button } from '@/components/ui/button' // Custom reusable button component
// Custom card components for consistent UI
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast' // Hook to display toast notifications
import type { Product } from '@/types/product' // Type definition for the Product object
import { useCart } from '@/contexts/CartContext' // Custom context for managing cart state

// Define the interface for ProductCard props
interface ProductCardProps {
  product: Product // Expects a single product of type Product
}

// Component to display a product card
export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart() // Retrieve the addToCart function from the CartContext
  const { toast } = useToast() // Retrieve the toast function for displaying notifications
  const [imageError, setImageError] = useState(false) // State to track image load errors

  // Function to handle adding a product to the cart
  const handleAddToCart = () => {
    addToCart(product) // Add the product to the cart
    toast({
      title: "Added to cart", // Notification title
      description: `${product.title} has been added to your cart.`, // Notification description
    })
  }

  // Function to handle errors when loading the product image
  const handleImageError = () => {
    setImageError(true) // Update state to indicate an image load error
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


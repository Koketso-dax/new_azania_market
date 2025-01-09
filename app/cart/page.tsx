'use client'

// Import necessary dependencies and components
import { useCart } from '@/contexts/CardContext' // Custom hook for managing cart state
import { Button } from '@/components/ui/button' // Reusable button component
import Image from 'next/image' // Optimized image component from Next.js
import Link from 'next/link' // Next.js component for client-side navigation

// Component to display the shopping cart page
export default function CartPage() {
  // Destructure cart-related functionalities from the custom Cart context
  const { cart, removeFromCart, clearCart, totalPrice } = useCart()

  // Handle the case where the cart is empty
  if (cart.length === 0) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    )
  }

  // Render the cart page when items are present
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Your Cart</h1>
      <ul className="space-y-4">
        {cart.map((item) => (
          <li key={item.id} className="flex items-center space-x-4 border-b pb-4">
            <div className="relative w-24 h-24">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex-grow">
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-gray-600">
                ${item.price.toFixed(2)} x {item.quantity}
              </p>
            </div>
            <Button variant="destructive" onClick={() => removeFromCart(item.id)}>
              Remove
            </Button>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={clearCart}>Clear Cart</Button>
        <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
      </div>
      <Link href="/checkout">
        <Button className="w-full">Proceed to Checkout</Button>
      </Link>
    </div>
  )
}

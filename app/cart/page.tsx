'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

const initialCartItems = [
  { id: 1, name: 'Azanian Coffee', price: 15.99, quantity: 2 },
  { id: 2, name: 'Handmade Basket', price: 29.99, quantity: 1 },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-gray-600">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <Button variant="destructive" onClick={() => removeItem(item.id)}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
          <div className="text-right">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            <Button className="mt-4">Checkout</Button>
          </div>
        </>
      )}
    </div>
  )
}


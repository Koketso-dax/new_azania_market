'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { useCart } from '@/contexts/CardContext'
import { supabase } from '@/lib/supabase-client'
import { User } from '@supabase/supabase-js'

export default function CheckoutPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { cart, totalPrice, clearCart } = useCart()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    fetchUser()
  }, [])

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Clear the cart and show success message
    clearCart()
    toast({
      title: "Payment Successful",
      description: "Your order has been placed successfully!",
    })
    router.push('/profile')
  }

  if (loading) {
    return <div className="text-center">Loading...</div>
  }

  if (!user) {
    router.push('/auth/signin')
    return null
  }

  return (
    <div className="max-w-md mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">Checkout</h1>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>{item.title} (x{item.quantity})</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="font-bold">
          Total: ${totalPrice.toFixed(2)}
        </div>
      </div>
      <form onSubmit={handleCheckout} className="space-y-4">
        <Input type="text" placeholder="Card Number" required />
        <div className="flex space-x-4">
          <Input type="text" placeholder="MM/YY" required />
          <Input type="text" placeholder="CVC" required />
        </div>
        <Button type="submit" className="w-full">Pay ${totalPrice.toFixed(2)}</Button>
      </form>
    </div>
  )
}


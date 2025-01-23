'use client'

// Import necessary dependencies and components
import { useState, useEffect } from 'react' // React hooks for managing state and side effects
import { useRouter } from 'next/navigation' // Next.js router for navigation
import { Button } from '@/components/ui/button' // Reusable button component
import { Input } from '@/components/ui/input' // Reusable input component
import { useToast } from '@/hooks/use-toast' // Custom hook for displaying toast notifications
import { useCart } from '@/contexts/CartContext' // Custom hook for managing cart state
import { supabase } from '@/lib/supabase-client' // Supabase client for user authentication and data fetching
import { User } from '@supabase/supabase-js' // Supabase User type

// CheckoutPage component handles the checkout process
export default function CheckoutPage() {
  const [user, setUser] = useState<User | null>(null) // State to store the authenticated user
  const [loading, setLoading] = useState(true) // State to indicate loading state
  const { cart, totalPrice, clearCart } = useCart() // Access cart data and related functions from the cart context
  const router = useRouter() // Next.js router instance for navigation
  const { toast } = useToast() // Toast notifications handler

  // Fetch the current authenticated user when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser() // Get the authenticated user from Supabase
      setUser(user) // Update the user state
      setLoading(false) // Set loading to false after fetching user
    }
    fetchUser() // Call the function to fetch user data
  }, [])

  // Handle the checkout process
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault() // Prevent the default form submission behavior
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Clear the cart and show success message
    clearCart()
    toast({
      title: "Payment Successful", // Toast title
      description: "Your order has been placed successfully!", // Toast description
    })
    router.push('/profile') // Navigate to the user's profile page after successful checkout
  }

  // Display a loading message while fetching user data
  if (loading) {
    return <div className="text-center">Loading...</div>
  }

  // Redirect to the sign-in page if the user is not authenticated
  if (!user) {
    router.push('/auth/signin')
    return null // Render nothing during the redirect
  }

  // Render the checkout page
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


'use client' // Indicates the use of client-side rendering for this component

// Import necessary hooks and components
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase-client' // Supabase client for authentication
import { User } from '@supabase/supabase-js' // Type definition for Supabase User
import { useCart } from '@/contexts/CartContext'


// Define the ProfilePage component
export default function ProfilePage() {
  // State to manage the current user and loading status
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter() // Router for navigation
  const { clearCart } = useCart()

  // Effect to fetch the authenticated user's information
  useEffect(() => {
    const fetchUser = async () => {
      try {

        // Get the current session
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {

          // If a session exists, fetch the user details
          const { data: { user } } = await supabase.auth.getUser()
          setUser(user)
        } else {
          // If no session exists, set user to null
          setUser(null)
        }
      } catch (error) {
        console.error('Error fetching user:', error) // Handle Log errors
        setUser(null)
      } finally {
        setLoading(false) // Set loading to false after fetching
      }
    }

    fetchUser() // Trigger the fetch function on component mount
  }, [])

  // Handle user sign-out
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setUser(null) // Clear user state after sign-out
      clearCart() // Clear the cart when signing out
      router.push('/') // Redirect to the home page
    } catch (error) {
      console.error('Error signing out:', error) // Log errors
    }
  }

  // Display a loading spinner while fetching user data
  if (loading) {
    return <div className="text-center">Loading...</div>
  }

  // Render a message if the user is not signed in
  if (!user) {
    return (
      <div className="space-y-8 text-center">
        <h1 className="text-3xl font-bold">Profile</h1>
        <p>You are not signed in.</p>
        <div className="space-y-4">
          <Button onClick={() => router.push('/auth/signin')} className="w-full">
            Sign In
          </Button>
          <p>Don&aspo;t have an account?</p>
          <Button onClick={() => router.push('/auth/signup')} variant="outline" className="w-full">
            Sign Up
          </Button>
        </div>
      </div>
    )
  }

  // Render the user's profile details if signed in
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Your Profile</h1>
      <div className="space-y-2">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User ID:</strong> {user.id}</p>
        <p><strong>Last Sign In:</strong> {new Date(user.last_sign_in_at || '').toLocaleString()}</p>
      </div>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  )
}


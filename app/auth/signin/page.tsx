'use client' // Enable client-side rendering for this component

// Import required hooks and components
import { useState } from 'react' // React hook for managing component state
import { useRouter } from 'next/navigation' // Next.js router for programmatic navigation
import Link from 'next/link' // Next.js Link component for navigation
import { Button } from '@/components/ui/button' // Custom Button component for UI consistency
import { Input } from '@/components/ui/input' // Custom Input component for styled form inputs
import { supabase } from '@/lib/supabase-client' // Supabase client for authentication
import { AuthError } from '@supabase/supabase-js' // TypeScript type for Supabase authentication errors

// Define the SignIn component for user authentication
export default function SignIn() {
  // State to manage email input
  const [email, setEmail] = useState('')
  // State to manage password input
  const [password, setPassword] = useState('')
  // State to store and display authentication errors
  const [error, setError] = useState<AuthError | null>(null)
  // Hook to enable navigation
  const router = useRouter()

  // Function to handle the sign-in process
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault() // Prevent the default form submission behavior
    try {
      // Attempt to sign in with email and password using Supabase
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error // Throw error if authentication fails
      router.push('/profile') // Redirect to the profile page upon successful login
    } catch (error) {
      setError(error as AuthError) // Update the error state if sign-in fails
    }
  }

  // JSX structure for the sign-in form
  return (
    <div className="max-w-md mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-center">Sign In</h1>
      {error && <p className="text-red-500 text-center">{error.message}</p>}
      <form onSubmit={handleSignIn} className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" className="w-full">Sign In</Button>
      </form>
      <p className="text-center">
        Don&apos;t have an account?{' '}
        <Link href="/auth/signup" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  )
}

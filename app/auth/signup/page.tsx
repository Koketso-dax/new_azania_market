'use client' // Enable client-side rendering for this component

// Import required hooks and components
import { useState } from 'react' // React hook for managing component state
import Link from 'next/link' // Next.js Link component for navigation
import { Button } from '@/components/ui/button' // Custom Button component for UI consistency
import { Input } from '@/components/ui/input' // Custom Input component for styled form inputs
import { supabase } from '@/lib/supabase-client' // Supabase client for authentication
import { AuthError } from '@supabase/supabase-js' // TypeScript type for Supabase authentication errors

// Define the SignUp component for user registration
export default function SignUp() {
  // declare state variables and router for redirect
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<AuthError | null>(null)
  const [message, setMessage] = useState("")

  // Function to handle the sign-up process
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault() // Prevent the default form submission behavior
    try {
      // Attempt to sign up with email and password using Supabase
      const { error } = await supabase.auth.signUp({ email, password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
       })
      if (error) throw error // throw error on fail
      setMessage("Check your email for the confirmation link.")
      }catch (error){
      setError(error as AuthError) // Update the error state if sign-up fails
    }
  }

  // JSX structure for the sign-up form
  return (
    <div className="max-w-md mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-center">Sign Up</h1>
      {error && <p className="text-red-500 text-center">{error.message}</p>}
      {message && <p className="text-green-500 text-center">{message}</p>}
      <form onSubmit={handleSignUp} className="space-y-4">
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </form>
      <p className="text-center">
        Already have an account?{" "}
        <Link href="/auth/signin" className="text-blue-500 hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  )
}

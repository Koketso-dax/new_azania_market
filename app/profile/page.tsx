'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase-client'
import { User } from '@supabase/supabase-js'

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          const { data: { user } } = await supabase.auth.getUser()
          setUser(user)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Error fetching user:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setUser(null)
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (loading) {
    return <div className="text-center">Loading...</div>
  }

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


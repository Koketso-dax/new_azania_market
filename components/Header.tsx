"use client"

import Link from "next/link"
import { ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/CartContext"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase-client"
import type { User as SupabaseUser } from "@supabase/supabase-js"

const Header = () => {
  const router = useRouter()
  const { totalItems, clearCart } = useCart()
  const [user, setUser] = useState<SupabaseUser | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      if (!user) {
        clearCart() // Clear the cart when no user is found (e.g., after logout)
      }
    }
    fetchUser()
  }, [clearCart])

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          New Azania Market
        </Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link href="/products" className="text-gray-600 hover:text-gray-800">
                Products
              </Link>
            </li>
            <li>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/cart")}
                aria-label="Shopping Cart"
                className="relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {totalItems}
                  </span>
                )}
              </Button>
            </li>
            <li>
              {user ? (
                <Button variant="ghost" size="sm" onClick={() => router.push("/profile")}>
                  {user.email}
                </Button>
              ) : (
                <Button variant="ghost" size="icon" onClick={() => router.push("/auth/signin")} aria-label="Sign In">
                  <User className="h-5 w-5" />
                </Button>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header


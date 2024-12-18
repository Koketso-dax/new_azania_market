'use client'

import Link from 'next/link'
import { ShoppingCart, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const Header = () => {
  const router = useRouter()

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
                onClick={() => router.push('/cart')}
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push('/profile')}
                aria-label="User Profile"
              >
                <User className="h-5 w-5" />
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header

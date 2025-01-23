"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"
import type { Product } from "@/types/product"
import { supabase } from "@/lib/supabase-client"

interface CartItem extends Product {
  quantity: number
  expiresAt: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_EXPIRY_TIME = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const loadCart = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session) {
        const { data, error } = await supabase
          .from("carts")
          .select("cart_items")
          .eq("user_id", session.user.id)
          .single()

        if (error) {
          console.error("Error fetching cart:", error)
        } else if (data) {
          const now = Date.now()
          const validItems = data.cart_items.filter((item: CartItem) => item.expiresAt > now)
          setCart(validItems)
        }
      } else {
        const savedCart = localStorage.getItem("cart")
        if (savedCart) {
          const parsedCart: CartItem[] = JSON.parse(savedCart)
          const now = Date.now()
          const validItems = parsedCart.filter((item) => item.expiresAt > now)
          setCart(validItems)
        }
      }
    }

    loadCart()
  }, [])

  useEffect(() => {
    const saveCart = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session) {
        const { error } = await supabase
          .from("carts")
          .upsert({ user_id: session.user.id, cart_items: cart }, { onConflict: "user_id" })

        if (error) {
          console.error("Error saving cart:", error)
        }
      } else {
        localStorage.setItem("cart", JSON.stringify(cart))
      }
    }

    saveCart()
  }, [cart])

  useEffect(() => {
    const clearExpiredItems = () => {
      const now = Date.now()
      setCart((prevCart) => prevCart.filter((item) => item.expiresAt > now))
    }

    const intervalId = setInterval(clearExpiredItems, 60000) // Check every minute

    return () => clearInterval(intervalId)
  }, [])

  const addToCart = useCallback((product: Product) => {
    setCart((prevCart) => {
      const now = Date.now()
      const expiresAt = now + CART_EXPIRY_TIME
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1, expiresAt } : item,
        )
      }
      return [...prevCart, { ...product, quantity: 1, expiresAt }]
    })
  }, [])

  const removeFromCart = useCallback((productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }, [])

  const clearCart = useCallback(async () => {
    setCart([])
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (session) {
      const { error } = await supabase.from("carts").delete().eq("user_id", session.user.id)

      if (error) {
        console.error("Error clearing cart:", error)
      }
    } else {
      localStorage.removeItem("cart")
    }
  }, [])

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}


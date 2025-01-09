// Import global CSS styles for consistent design across the app
import './globals.css'

// Import TypeScript type for Metadata from Next.js
import type { Metadata } from 'next'

// Import the Inter font from Google Fonts for use in the layout
import { Inter } from 'next/font/google'

// Import Header and Footer components for consistent layout structure
import Header from '../components/Header'
import Footer from '../components/Footer'

// Import the CartProvider context to manage cart state globally
import { CartProvider } from '../contexts/CardContext'

// Initialize the Inter font with Latin subset for typography
const inter = Inter({ subsets: ['latin'] })

// Define metadata for the app, including title and description for SEO purposes
export const metadata: Metadata = {
  // The title of the website
  title: 'New Azania Market',
  // Short description for meta tags
  description: 'Your one-stop shop for all things Azanian',
}

// Defines the RootLayout component, serving as the base layout for the app
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Set the language attribute for the HTML document to English
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}

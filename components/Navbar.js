"use client"

import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-heading font-bold text-primary">
              OMNI E‑RIDE
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/" className="text-accent hover:text-primary transition font-medium">
                Home
              </Link>
              <Link href="/models" className="text-accent hover:text-primary transition font-medium">
                Models
              </Link>
              <Link href="/dealers" className="text-accent hover:text-primary transition font-medium">
                Dealers
              </Link>
              <Link href="/contact" className="text-accent hover:text-primary transition font-medium">
                Contact
              </Link>
              <Link href="/login" className="btn-primary">
                Login
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-accent hover:text-primary focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link href="/" className="block px-3 py-2 text-accent hover:text-primary transition">
              Home
            </Link>
            <Link href="/models" className="block px-3 py-2 text-accent hover:text-primary transition">
              Models
            </Link>
            <Link href="/dealers" className="block px-3 py-2 text-accent hover:text-primary transition">
              Dealers
            </Link>
            <Link href="/contact" className="block px-3 py-2 text-accent hover:text-primary transition">
              Contact
            </Link>
            <Link href="/login" className="block px-3 py-2 text-primary font-medium">
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

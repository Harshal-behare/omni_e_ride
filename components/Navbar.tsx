"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState("")
  const router = useRouter()

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn")
    const type = localStorage.getItem("userType")
    setIsLoggedIn(!!loggedIn)
    setUserType(type || "")
  }, [])

  const handleDashboardClick = () => {
    if (userType === "admin") {
      router.push("/admin/dashboard")
    } else if (userType === "dealer") {
      router.push("/dealer/dashboard")
    } else if (userType === "customer") {
      router.push("/customer/dashboard")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("userType")
    localStorage.removeItem("isLoggedIn")
    setIsLoggedIn(false)
    setUserType("")
    router.push("/")
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-[#3CB043]">
              OMNI E‑RIDE
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/" className="text-[#1F2937] hover:text-[#3CB043] transition-colors font-medium">
                Home
              </Link>
              <Link href="/models" className="text-[#1F2937] hover:text-[#3CB043] transition-colors font-medium">
                Models
              </Link>
              <Link href="/dealers" className="text-[#1F2937] hover:text-[#3CB043] transition-colors font-medium">
                Dealers
              </Link>
              <Link href="/contact" className="text-[#1F2937] hover:text-[#3CB043] transition-colors font-medium">
                Contact
              </Link>
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleDashboardClick}
                    className="text-[#1F2937] hover:text-[#3CB043] transition-colors font-medium"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="bg-[#3CB043] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#2D7A32] transition-colors"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#1F2937] hover:text-[#3CB043] focus:outline-none"
            >
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
            <Link href="/" className="block px-3 py-2 text-[#1F2937] hover:text-[#3CB043] transition-colors">
              Home
            </Link>
            <Link href="/models" className="block px-3 py-2 text-[#1F2937] hover:text-[#3CB043] transition-colors">
              Models
            </Link>
            <Link href="/dealers" className="block px-3 py-2 text-[#1F2937] hover:text-[#3CB043] transition-colors">
              Dealers
            </Link>
            <Link href="/contact" className="block px-3 py-2 text-[#1F2937] hover:text-[#3CB043] transition-colors">
              Contact
            </Link>
            {isLoggedIn ? (
              <>
                <button
                  onClick={handleDashboardClick}
                  className="block w-full text-left px-3 py-2 text-[#1F2937] hover:text-[#3CB043] transition-colors"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-red-600 hover:text-red-800 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="block px-3 py-2 text-[#3CB043] font-medium">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

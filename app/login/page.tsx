"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [userType, setUserType] = useState("customer")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  })
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Demo credentials
    const demoCredentials = {
      admin: { email: "admin@omnierride.com", password: "admin123" },
      dealer: { email: "dealer@omnierride.com", password: "dealer123" },
      customer: { email: "customer@omnierride.com", password: "customer123" },
    }

    if (isLogin) {
      const credentials = demoCredentials[userType as keyof typeof demoCredentials]
      if (formData.email === credentials.email && formData.password === credentials.password) {
        // Store user type in localStorage for demo
        localStorage.setItem("userType", userType)
        localStorage.setItem("isLoggedIn", "true")

        // Redirect based on user type
        switch (userType) {
          case "admin":
            router.push("/admin/dashboard")
            break
          case "dealer":
            router.push("/dealer/dashboard")
            break
          default:
            router.push("/customer/dashboard")
        }
      } else {
        alert(
          "Invalid credentials! Use demo credentials:\nAdmin: admin@omnierride.com / admin123\nDealer: dealer@omnierride.com / dealer123\nCustomer: customer@omnierride.com / customer123",
        )
      }
    } else {
      alert("Registration successful! Please login with your credentials.")
      setIsLogin(true)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="text-3xl font-bold text-[#3CB043]">
            OMNI E‑RIDE
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-[#1F2937]">{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? "Sign in to your account" : "Join the Omni E-Ride family"}
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-xl p-8">
          {/* User Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#1F2937] mb-2">Login As</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setUserType("customer")}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  userType === "customer" ? "bg-[#3CB043] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => setUserType("dealer")}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  userType === "dealer" ? "bg-[#3CB043] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Dealer
              </button>
              <button
                type="button"
                onClick={() => setUserType("admin")}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  userType === "admin" ? "bg-[#3CB043] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#1F2937] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required={!isLogin}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3CB043] focus:border-transparent transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#1F2937] mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3CB043] focus:border-transparent transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#1F2937] mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3CB043] focus:border-transparent transition-colors"
                placeholder="Enter your password"
              />
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#1F2937] mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required={!isLogin}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3CB043] focus:border-transparent transition-colors"
                  placeholder="Confirm your password"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#3CB043] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#2D7A32] transition-colors"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Demo Credentials:</h4>
            <div className="text-xs text-blue-800 space-y-1">
              <p>
                <strong>Admin:</strong> admin@omnierride.com / admin123
              </p>
              <p>
                <strong>Dealer:</strong> dealer@omnierride.com / dealer123
              </p>
              <p>
                <strong>Customer:</strong> customer@omnierride.com / customer123
              </p>
            </div>
          </div>

          {isLogin && (
            <div className="text-center mt-4">
              <a href="#" className="text-[#3CB043] hover:text-[#2D7A32] transition-colors text-sm">
                Forgot your password?
              </a>
            </div>
          )}

          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#3CB043] hover:text-[#2D7A32] transition-colors font-medium ml-1"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

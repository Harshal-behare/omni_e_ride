"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function DealerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()

  useEffect(() => {
    const userType = localStorage.getItem("userType")
    const isLoggedIn = localStorage.getItem("isLoggedIn")

    if (!isLoggedIn || userType !== "dealer") {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("userType")
    localStorage.removeItem("isLoggedIn")
    router.push("/")
  }

  const stats = [
    { title: "Monthly Sales", value: "₹12L", change: "+15%", color: "bg-green-500" },
    { title: "Units Sold", value: "18", change: "+3", color: "bg-blue-500" },
    { title: "Test Rides", value: "45", change: "+22%", color: "bg-purple-500" },
    { title: "Customer Leads", value: "28", change: "+8", color: "bg-orange-500" },
  ]

  const recentSales = [
    { id: "SALE001", customer: "Rajesh Kumar", model: "Omni Swift", amount: "₹63,000", date: "2024-01-15" },
    { id: "SALE002", customer: "Priya Singh", model: "Omni Power", amount: "₹78,000", date: "2024-01-14" },
    { id: "SALE003", customer: "Amit Sharma", model: "Omni Elite", amount: "₹95,000", date: "2024-01-13" },
  ]

  const inventory = [
    { model: "Omni Swift", stock: 8, sold: 12, price: "₹63,000" },
    { model: "Omni Power", stock: 5, sold: 8, price: "₹78,000" },
    { model: "Omni Elite", stock: 3, sold: 5, price: "₹95,000" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-[#3CB043]">
                OMNI E‑RIDE
              </Link>
              <span className="ml-4 text-sm text-gray-500">Dealer Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, Dealer</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: "overview", label: "Overview" },
              { id: "inventory", label: "Inventory" },
              { id: "sales", label: "Sales" },
              { id: "customers", label: "Customers" },
              { id: "reports", label: "Reports" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id ? "bg-[#3CB043] text-white" : "text-gray-600 hover:text-[#3CB043]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-green-600">{stat.change}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Sales & Inventory */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Sales */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Sales</h3>
                <div className="space-y-4">
                  {recentSales.map((sale) => (
                    <div key={sale.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{sale.customer}</p>
                        <p className="text-sm text-gray-600">{sale.model}</p>
                        <p className="text-xs text-gray-500">{sale.date}</p>
                      </div>
                      <p className="text-lg font-bold text-[#3CB043]">{sale.amount}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inventory Status */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Inventory Status</h3>
                <div className="space-y-4">
                  {inventory.map((item, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-gray-900">{item.model}</p>
                        <p className="text-sm font-medium text-[#3CB043]">{item.price}</p>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Stock: {item.stock}</span>
                        <span>Sold: {item.sold}</span>
                      </div>
                      <div className="mt-2 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#3CB043] h-2 rounded-full"
                          style={{ width: `${(item.sold / (item.stock + item.sold)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs content */}
        {activeTab !== "overview" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
            </h3>
            <p className="text-gray-600">This section is under development. Coming soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}

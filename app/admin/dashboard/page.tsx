"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Demo data
const dashboardStats = {
  totalSales: 1250,
  monthlyRevenue: 9750000,
  activeCustomers: 8500,
  pendingOrders: 45,
  totalDealers: 25,
  serviceRequests: 12,
}

const recentOrders = [
  {
    id: "ORD001",
    customer: "Rajesh Kumar",
    model: "Omni Swift",
    amount: 63000,
    status: "Delivered",
    date: "2024-01-15",
  },
  {
    id: "ORD002",
    customer: "Priya Singh",
    model: "Omni Power",
    amount: 78000,
    status: "Processing",
    date: "2024-01-14",
  },
  { id: "ORD003", customer: "Amit Sharma", model: "Omni Elite", amount: 95000, status: "Shipped", date: "2024-01-13" },
  { id: "ORD004", customer: "Sunita Devi", model: "Omni Pro", amount: 110000, status: "Confirmed", date: "2024-01-12" },
  {
    id: "ORD005",
    customer: "Vikash Yadav",
    model: "Omni Max",
    amount: 125000,
    status: "Delivered",
    date: "2024-01-11",
  },
]

const dealerRequests = [
  {
    id: "DR001",
    name: "Bihar Motors",
    location: "Muzaffarpur",
    contact: "+91 9876543210",
    status: "Pending",
    date: "2024-01-15",
  },
  {
    id: "DR002",
    name: "Green Wheels",
    location: "Gaya",
    contact: "+91 9876543211",
    status: "Approved",
    date: "2024-01-14",
  },
  {
    id: "DR003",
    name: "Electric Zone",
    location: "Bhagalpur",
    contact: "+91 9876543212",
    status: "Under Review",
    date: "2024-01-13",
  },
  {
    id: "DR004",
    name: "Eco Riders",
    location: "Darbhanga",
    contact: "+91 9876543213",
    status: "Pending",
    date: "2024-01-12",
  },
]

const testRideBookings = [
  {
    id: "TR001",
    customer: "Rahul Gupta",
    model: "Omni Swift",
    date: "2024-01-16",
    time: "10:00 AM",
    dealer: "Patna Central",
    status: "Confirmed",
  },
  {
    id: "TR002",
    customer: "Neha Kumari",
    model: "Omni Power",
    date: "2024-01-16",
    time: "2:00 PM",
    dealer: "Patna East",
    status: "Pending",
  },
  {
    id: "TR003",
    customer: "Suresh Singh",
    model: "Omni Elite",
    date: "2024-01-17",
    time: "11:00 AM",
    dealer: "Patna West",
    status: "Confirmed",
  },
  {
    id: "TR004",
    customer: "Kavita Devi",
    model: "Omni Pro",
    date: "2024-01-17",
    time: "3:00 PM",
    dealer: "Patna South",
    status: "Completed",
  },
]

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState("")
  const router = useRouter()

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn")
    const type = localStorage.getItem("userType")

    if (!loggedIn || type !== "admin") {
      router.push("/login")
      return
    }

    setIsLoggedIn(true)
    setUserType(type)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("userType")
    localStorage.removeItem("isLoggedIn")
    router.push("/")
  }

  if (!isLoggedIn) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-[#3CB043]">OMNI E‑RIDE</h1>
              <p className="text-sm text-gray-600">Admin Dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, Admin</span>
              <Button onClick={handleLogout} variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalSales.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
                />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{(dashboardStats.monthlyRevenue / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
              <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.activeCustomers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>

          <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.pendingOrders}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger
              value="orders"
              className="transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Recent Orders
            </TabsTrigger>
            <TabsTrigger
              value="dealers"
              className="transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Dealer Requests
            </TabsTrigger>
            <TabsTrigger
              value="testrides"
              className="transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Test Rides
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="transition-all duration-300 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            <Card className="transform transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border rounded-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-md transform hover:scale-[1.01]"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="font-semibold">{order.id}</p>
                            <p className="text-sm text-gray-600">{order.customer}</p>
                          </div>
                          <div>
                            <p className="font-medium">{order.model}</p>
                            <p className="text-sm text-gray-600">₹{order.amount.toLocaleString()}</p>
                          </div>
                          <div>
                            <Badge
                              variant={
                                order.status === "Delivered"
                                  ? "default"
                                  : order.status === "Shipped"
                                    ? "secondary"
                                    : order.status === "Processing"
                                      ? "destructive"
                                      : "outline"
                              }
                            >
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">{order.date}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dealers" className="space-y-4">
            <Card className="transform transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <CardTitle>Dealer Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dealerRequests.map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between p-4 border rounded-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-md transform hover:scale-[1.01]"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="font-semibold">{request.name}</p>
                            <p className="text-sm text-gray-600">{request.location}</p>
                          </div>
                          <div>
                            <p className="text-sm">{request.contact}</p>
                            <p className="text-sm text-gray-600">{request.date}</p>
                          </div>
                          <div>
                            <Badge
                              variant={
                                request.status === "Approved"
                                  ? "default"
                                  : request.status === "Under Review"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {request.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="transition-all duration-300 hover:scale-105 bg-transparent"
                        >
                          View
                        </Button>
                        <Button
                          size="sm"
                          className="transition-all duration-300 hover:scale-105 bg-[#3CB043] hover:bg-[#2D7A32]"
                        >
                          Approve
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testrides" className="space-y-4">
            <Card className="transform transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <CardTitle>Test Ride Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testRideBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 border rounded-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-md transform hover:scale-[1.01]"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="font-semibold">{booking.customer}</p>
                            <p className="text-sm text-gray-600">{booking.model}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{booking.date}</p>
                            <p className="text-sm text-gray-600">{booking.time}</p>
                          </div>
                          <div>
                            <p className="text-sm">{booking.dealer}</p>
                            <Badge
                              variant={
                                booking.status === "Completed"
                                  ? "default"
                                  : booking.status === "Confirmed"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {booking.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="transition-all duration-300 hover:scale-105 bg-transparent"
                        >
                          Contact
                        </Button>
                        <Button size="sm">Confirm</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="transform transition-all duration-300 hover:shadow-xl">
                <CardHeader>
                  <CardTitle>Sales Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Omni Swift</span>
                      <span className="font-semibold">450 units</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Omni Power</span>
                      <span className="font-semibold">320 units</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Omni Elite</span>
                      <span className="font-semibold">280 units</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Omni Pro</span>
                      <span className="font-semibold">150 units</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Omni Max</span>
                      <span className="font-semibold">50 units</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="transform transition-all duration-300 hover:shadow-xl">
                <CardHeader>
                  <CardTitle>Regional Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Patna</span>
                      <span className="font-semibold">35%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Gaya</span>
                      <span className="font-semibold">18%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Muzaffarpur</span>
                      <span className="font-semibold">15%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Bhagalpur</span>
                      <span className="font-semibold">12%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Others</span>
                      <span className="font-semibold">20%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

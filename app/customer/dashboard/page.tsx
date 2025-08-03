"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import {
  User,
  ShoppingCart,
  Calendar,
  Settings,
  HelpCircle,
  LogOut,
  Package,
  Clock,
  CheckCircle,
  Truck,
  Star,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"
import Link from "next/link"

export default function CustomerDashboard() {
  const router = useRouter()
  const { user, userProfile, loading, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (!loading && (!user || !userProfile || userProfile.user_type !== "customer")) {
      router.push("/login")
    }
  }, [user, userProfile, loading, router])

  const handleLogout = async () => {
    await signOut()
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
          </div>
        </div>
      </div>
    )
  }

  if (!user || !userProfile || userProfile.user_type !== "customer") {
    return null
  }

  // Mock data for demonstration
  const mockOrders = [
    {
      id: "ORD001",
      model: "Omni Swift",
      status: "delivered",
      date: "2024-01-10",
      amount: "₹63,000",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "ORD002",
      model: "Omni Power",
      status: "processing",
      date: "2024-01-15",
      amount: "₹78,000",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const mockTestRides = [
    {
      id: "TR001",
      model: "Omni Elite",
      date: "2024-01-20",
      time: "10:00 AM",
      dealer: "Patna Showroom",
      status: "confirmed",
    },
    {
      id: "TR002",
      model: "Omni Max",
      date: "2024-01-22",
      time: "2:00 PM",
      dealer: "Gaya Center",
      status: "pending",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "processing":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "shipped":
        return <Truck className="h-4 w-4 text-orange-500" />
      default:
        return <Package className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-orange-100 text-orange-800"
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
              <span className="ml-4 text-sm text-gray-500">Customer Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {userProfile.full_name || "Customer"}</span>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="test-rides" className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Test Rides
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center">
              <HelpCircle className="h-4 w-4 mr-2" />
              Support
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <ShoppingCart className="h-8 w-8 text-[#3CB043]" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Orders</p>
                      <p className="text-2xl font-bold text-gray-900">{mockOrders.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Calendar className="h-8 w-8 text-blue-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Test Rides</p>
                      <p className="text-2xl font-bold text-gray-900">{mockTestRides.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Star className="h-8 w-8 text-yellow-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Loyalty Points</p>
                      <p className="text-2xl font-bold text-gray-900">1,250</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Completed</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {mockOrders.filter((order) => order.status === "delivered").length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <ShoppingCart className="h-12 w-12 text-[#3CB043] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Browse Models</h3>
                  <p className="text-gray-600 mb-4">Explore our latest electric scooters</p>
                  <Link href="/models">
                    <Button className="w-full">View Models</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Calendar className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Book Test Ride</h3>
                  <p className="text-gray-600 mb-4">Experience our scooters firsthand</p>
                  <Button className="w-full bg-transparent" variant="outline">
                    Book Now
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <MapPin className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Find Dealers</h3>
                  <p className="text-gray-600 mb-4">Locate nearest showrooms</p>
                  <Link href="/dealers">
                    <Button className="w-full bg-transparent" variant="outline">
                      Find Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Your latest purchases</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockOrders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <img
                        src={order.image || "/placeholder.svg"}
                        alt={order.model}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{order.model}</p>
                        <p className="text-sm text-gray-600">Order #{order.id}</p>
                        <p className="text-xs text-gray-500">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#3CB043]">{order.amount}</p>
                        <Badge className={getStatusColor(order.status)}>
                          <div className="flex items-center">
                            {getStatusIcon(order.status)}
                            <span className="ml-1 capitalize">{order.status}</span>
                          </div>
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Test Rides</CardTitle>
                  <CardDescription>Your scheduled test rides</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockTestRides.map((ride) => (
                    <div key={ride.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{ride.model}</p>
                        <p className="text-sm text-gray-600">{ride.dealer}</p>
                        <p className="text-sm text-gray-500">
                          {ride.date} at {ride.time}
                        </p>
                      </div>
                      <Badge className={getStatusColor(ride.status)}>{ride.status}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View all your orders and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="flex items-center space-x-4 p-6 border rounded-lg">
                      <img
                        src={order.image || "/placeholder.svg"}
                        alt={order.model}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{order.model}</h3>
                        <p className="text-gray-600">Order #{order.id}</p>
                        <p className="text-sm text-gray-500">Ordered on {order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-[#3CB043] mb-2">{order.amount}</p>
                        <Badge className={getStatusColor(order.status)}>
                          <div className="flex items-center">
                            {getStatusIcon(order.status)}
                            <span className="ml-1 capitalize">{order.status}</span>
                          </div>
                        </Badge>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        {order.status === "delivered" && (
                          <Button size="sm" variant="outline">
                            Download Invoice
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="test-rides" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Test Ride History</CardTitle>
                <CardDescription>Manage your test ride bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTestRides.map((ride) => (
                    <div key={ride.id} className="flex items-center justify-between p-6 border rounded-lg">
                      <div>
                        <h3 className="font-semibold text-lg">{ride.model}</h3>
                        <p className="text-gray-600">{ride.dealer}</p>
                        <p className="text-sm text-gray-500">
                          {ride.date} at {ride.time}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className={getStatusColor(ride.status)}>{ride.status}</Badge>
                        <div className="flex flex-col space-y-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          {ride.status === "pending" && (
                            <Button size="sm" variant="outline">
                              Reschedule
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <p className="text-lg">{userProfile.full_name || "Not provided"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <p className="text-lg">{userProfile.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <p className="text-lg">{userProfile.phone || "Not provided"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                    <Badge className="capitalize">{userProfile.user_type}</Badge>
                  </div>
                </div>
                <div className="pt-4">
                  <Button>Edit Profile</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>Get help with your orders and queries</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-[#3CB043]" />
                    <div>
                      <p className="font-medium">Phone Support</p>
                      <p className="text-sm text-gray-600">+91 1800-123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-[#3CB043]" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-sm text-gray-600">support@omnierride.com</p>
                    </div>
                  </div>
                  <Button className="w-full">Contact Support</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Help</CardTitle>
                  <CardDescription>Common questions and resources</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    How to track my order?
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Warranty information
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Service center locations
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Return policy
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

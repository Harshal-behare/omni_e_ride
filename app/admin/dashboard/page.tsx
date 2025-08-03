"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/components/AuthProvider"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Plus, Users, ShoppingCart, TrendingUp, AlertTriangle } from "lucide-react"

export default function AdminDashboard() {
  const { user, userProfile, loading: authLoading, signOut } = useAuthContext()
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalDealers: 0,
    pendingDealers: 0,
    monthlyRevenue: 0,
  })

  // Add user form
  const [showAddUser, setShowAddUser] = useState(false)
  const [addUserLoading, setAddUserLoading] = useState(false)
  const [addUserError, setAddUserError] = useState("")
  const [addUserSuccess, setAddUserSuccess] = useState("")
  const [newUserEmail, setNewUserEmail] = useState("")
  const [newUserType, setNewUserType] = useState<"admin" | "dealer">("dealer")
  const [newUserName, setNewUserName] = useState("")
  const [newUserPhone, setNewUserPhone] = useState("")

  // Recent data
  const [recentOrders, setRecentOrders] = useState([])
  const [recentUsers, setRecentUsers] = useState([])
  const [pendingDealers, setPendingDealers] = useState([])

  useEffect(() => {
    if (!authLoading && (!user || userProfile?.user_type !== "admin")) {
      router.push("/login")
      return
    }

    if (user && userProfile?.user_type === "admin") {
      fetchDashboardData()
    }
  }, [user, userProfile, authLoading, router])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      // Fetch stats
      const [usersResult, ordersResult, dealersResult] = await Promise.all([
        supabase.from("user_profiles").select("id, user_type").eq("user_type", "customer"),
        supabase.from("orders").select("id, amount, status"),
        supabase.from("dealers").select("id, status"),
      ])

      // Calculate stats
      const totalUsers = usersResult.data?.length || 0
      const totalOrders = ordersResult.data?.length || 0
      const totalDealers = dealersResult.data?.length || 0
      const pendingDealersCount = dealersResult.data?.filter((d) => d.status === "pending").length || 0
      const monthlyRevenue = ordersResult.data?.reduce((sum, order) => sum + (order.amount || 0), 0) || 0

      setStats({
        totalUsers,
        totalOrders,
        totalDealers,
        pendingDealers: pendingDealersCount,
        monthlyRevenue,
      })

      // Fetch recent data
      const [recentOrdersResult, recentUsersResult, pendingDealersResult] = await Promise.all([
        supabase.from("orders").select("*, models(name)").order("created_at", { ascending: false }).limit(5),
        supabase.from("user_profiles").select("*").order("created_at", { ascending: false }).limit(5),
        supabase.from("dealers").select("*").eq("status", "pending").order("created_at", { ascending: false }).limit(5),
      ])

      setRecentOrders(recentOrdersResult.data || [])
      setRecentUsers(recentUsersResult.data || [])
      setPendingDealers(pendingDealersResult.data || [])
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setAddUserLoading(true)
    setAddUserError("")
    setAddUserSuccess("")

    try {
      // Create user profile directly (admin privilege)
      const { data, error } = await supabase
        .from("user_profiles")
        .insert({
          email: newUserEmail,
          user_type: newUserType,
          full_name: newUserName,
          phone: newUserPhone,
        })
        .select()
        .single()

      if (error) throw error

      // If dealer, also create dealer record
      if (newUserType === "dealer") {
        const { error: dealerError } = await supabase.from("dealers").insert({
          user_id: data.id,
          name: newUserName,
          location: "To be updated",
          address: "To be updated",
          phone: newUserPhone,
          email: newUserEmail,
          manager_name: newUserName,
          status: "pending",
        })

        if (dealerError) throw dealerError
      }

      setAddUserSuccess(`${newUserType} account created successfully! They can now sign in with their email.`)

      // Clear form
      setNewUserEmail("")
      setNewUserName("")
      setNewUserPhone("")
      setNewUserType("dealer")

      // Refresh data
      fetchDashboardData()
    } catch (error: any) {
      setAddUserError(error.message || "Failed to create user")
    } finally {
      setAddUserLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut()
    router.push("/")
  }

  const approveDealerRequest = async (dealerId: string) => {
    try {
      const { error } = await supabase.from("dealers").update({ status: "active" }).eq("id", dealerId)

      if (error) throw error

      // Refresh data
      fetchDashboardData()
    } catch (error) {
      console.error("Error approving dealer:", error)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user || userProfile?.user_type !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-[#3CB043]">OMNI E‑RIDE</h1>
              <p className="text-sm text-gray-600">Admin Dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {userProfile?.full_name}</span>
              <Button onClick={handleLogout} variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Dealers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDealers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Dealers</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingDealers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.monthlyRevenue.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        {/* Add User Button */}
        <div className="mb-6">
          <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Admin/Dealer Account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Admin/Dealer Account</DialogTitle>
                <DialogDescription>
                  Create a new admin or dealer account. They will be able to sign in with their email.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <Label htmlFor="user-type">Account Type</Label>
                  <Select value={newUserType} onValueChange={(value: "admin" | "dealer") => setNewUserType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dealer">Dealer</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="user-email">Email</Label>
                  <Input
                    id="user-email"
                    type="email"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    required
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <Label htmlFor="user-name">Full Name</Label>
                  <Input
                    id="user-name"
                    type="text"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    required
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <Label htmlFor="user-phone">Phone Number</Label>
                  <Input
                    id="user-phone"
                    type="tel"
                    value={newUserPhone}
                    onChange={(e) => setNewUserPhone(e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>

                {addUserError && (
                  <Alert variant="destructive">
                    <AlertDescription>{addUserError}</AlertDescription>
                  </Alert>
                )}

                {addUserSuccess && (
                  <Alert>
                    <AlertDescription>{addUserSuccess}</AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-2">
                  <Button type="submit" disabled={addUserLoading}>
                    {addUserLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Account
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddUser(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Recent Orders</TabsTrigger>
            <TabsTrigger value="users">Recent Users</TabsTrigger>
            <TabsTrigger value="dealers">Pending Dealers</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order: any) => (
                      <div key={order.id} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">{order.customer_name}</p>
                          <p className="text-sm text-gray-600">{order.models?.name || order.model_name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">₹{order.amount.toLocaleString()}</p>
                          <Badge variant={order.status === "delivered" ? "default" : "secondary"}>{order.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUsers.map((user: any) => (
                      <div key={user.id} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">{user.full_name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                        <Badge variant="outline">{user.user_type}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <Card className="transform transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order: any) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border rounded-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-md transform hover:scale-[1.01]"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="font-semibold">{order.id}</p>
                            <p className="text-sm text-gray-600">{order.customer_name}</p>
                          </div>
                          <div>
                            <p className="font-medium">{order.models?.name || order.model_name}</p>
                            <p className="text-sm text-gray-600">₹{order.amount.toLocaleString()}</p>
                          </div>
                          <div>
                            <Badge
                              variant={
                                order.status === "delivered"
                                  ? "default"
                                  : order.status === "shipped"
                                    ? "secondary"
                                    : order.status === "processing"
                                      ? "destructive"
                                      : "outline"
                              }
                            >
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">{order.created_at}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className="transform transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user: any) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 border rounded-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-md transform hover:scale-[1.01]"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="font-semibold">{user.id}</p>
                            <p className="text-sm text-gray-600">{user.full_name}</p>
                          </div>
                          <div>
                            <p className="text-sm">{user.email}</p>
                            <p className="text-sm text-gray-600">{user.created_at}</p>
                          </div>
                          <div>
                            <Badge variant="outline">{user.user_type}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">{user.created_at}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dealers">
            <Card>
              <CardHeader>
                <CardTitle>Pending Dealer Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingDealers.map((dealer: any) => (
                    <div key={dealer.id} className="flex items-center justify-between p-4 border rounded">
                      <div>
                        <p className="font-medium">{dealer.name}</p>
                        <p className="text-sm text-gray-600">{dealer.email}</p>
                        <p className="text-sm text-gray-600">{dealer.location}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => approveDealerRequest(dealer.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Approve
                        </Button>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                  {pendingDealers.length === 0 && (
                    <p className="text-center text-gray-500 py-8">No pending dealer requests</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

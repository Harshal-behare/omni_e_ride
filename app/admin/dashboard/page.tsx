"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/components/AuthProvider"
import { useAdminActions } from "@/hooks/useAdminActions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Skeleton } from "@/components/ui/skeleton"
import {
  Loader2,
  Plus,
  Users,
  ShoppingCart,
  TrendingUp,
  Mail,
  Settings,
  BarChart3,
  MessageSquare,
  Crown,
  Store,
  LogOut,
  Trash2,
  CheckCircle,
  XCircle,
} from "lucide-react"

export default function AdminDashboard() {
  const { user, userProfile, loading: authLoading, signOut } = useAuthContext()
  const {
    loading: adminLoading,
    addPreApprovedEmail,
    getPreApprovedEmails,
    removePreApprovedEmail,
    updateUserRole,
    getAllUsers,
    getDashboardStats,
  } = useAdminActions()
  const router = useRouter()

  const [stats, setStats] = useState<any>(null)
  const [users, setUsers] = useState<any[]>([])
  const [preApprovedEmails, setPreApprovedEmails] = useState<any[]>([])

  // Add email form
  const [showAddEmail, setShowAddEmail] = useState(false)
  const [newEmail, setNewEmail] = useState("")
  const [newRole, setNewRole] = useState<"admin" | "dealer">("dealer")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    if (!authLoading && (!user || userProfile?.user_type !== "admin")) {
      router.push("/login")
      return
    }

    if (user && userProfile?.user_type === "admin") {
      loadDashboardData()
    }
  }, [user, userProfile, authLoading, router])

  const loadDashboardData = async () => {
    try {
      const [statsResult, usersResult, emailsResult] = await Promise.all([
        getDashboardStats(),
        getAllUsers(),
        getPreApprovedEmails(),
      ])

      if (statsResult.data) setStats(statsResult.data)
      if (usersResult.data) setUsers(usersResult.data)
      if (emailsResult.data) setPreApprovedEmails(emailsResult.data)
    } catch (error) {
      console.error("Error loading dashboard data:", error)
    }
  }

  const handleAddEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    const { data, error: addError } = await addPreApprovedEmail(newEmail, newRole)

    if (addError) {
      setError(addError.message)
    } else {
      setSuccess(`Email ${newEmail} added successfully for ${newRole} role!`)
      setNewEmail("")
      setNewRole("dealer")
      loadDashboardData()
    }
  }

  const handleRemoveEmail = async (id: string) => {
    const { error: removeError } = await removePreApprovedEmail(id)
    if (!removeError) {
      loadDashboardData()
    }
  }

  const handleUpdateUserRole = async (userId: string, role: "customer" | "dealer" | "admin") => {
    const { error: updateError } = await updateUserRole(userId, role)
    if (!updateError) {
      loadDashboardData()
    }
  }

  const handleLogout = async () => {
    await signOut()
    router.push("/")
  }

  if (authLoading || !stats) {
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
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
            <div className="flex items-center">
              <Crown className="h-8 w-8 text-[#3CB043] mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-[#3CB043]">OMNI E‑RIDE</h1>
                <p className="text-sm text-gray-600">Admin Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Crown className="h-3 w-3 mr-1" />
                Admin
              </Badge>
              <span className="text-gray-700">Welcome, {userProfile?.full_name}</span>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs opacity-80">
                {stats.totalCustomers} customers, {stats.totalDealers} dealers
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs opacity-80">{stats.completedOrders} completed</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <TrendingUp className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.paidRevenue.toLocaleString()}</div>
              <p className="text-xs opacity-80">Total: ₹{stats.totalRevenue.toLocaleString()}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Dealers</CardTitle>
              <Store className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeDealers}</div>
              <p className="text-xs opacity-80">{stats.pendingDealers} pending approval</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="emails" className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              Email Management
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Inquiries
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                  <CardDescription>System overview at a glance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Customers</span>
                    <Badge variant="outline">{stats.totalCustomers}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Active Dealers</span>
                    <Badge variant="outline">{stats.activeDealers}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Pending Orders</span>
                    <Badge variant="outline">{stats.pendingOrders}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">New Inquiries</span>
                    <Badge variant="outline">{stats.newInquiries}</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                  <CardDescription>Current system health</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Database</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Online
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Authentication</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Email Service</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Working
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user roles and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">{user.full_name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-gray-500">
                            Joined: {new Date(user.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge
                          variant={
                            user.user_type === "admin"
                              ? "default"
                              : user.user_type === "dealer"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {user.user_type}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Select
                          value={user.user_type}
                          onValueChange={(value: "customer" | "dealer" | "admin") =>
                            handleUpdateUserRole(user.id, value)
                          }
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="customer">Customer</SelectItem>
                            <SelectItem value="dealer">Dealer</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                  {users.length === 0 && <p className="text-center text-gray-500 py-8">No users found</p>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="emails">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Pre-approved Emails</CardTitle>
                  <CardDescription>
                    Add emails that can signup with specific roles. Users with these emails will automatically get the
                    assigned role.
                  </CardDescription>
                </div>
                <Dialog open={showAddEmail} onOpenChange={setShowAddEmail}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Email
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Pre-approved Email</DialogTitle>
                      <DialogDescription>
                        Add an email that can signup with admin or dealer role. When this person signs up, they will
                        automatically get the selected role.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddEmail} className="space-y-4">
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                          required
                          placeholder="Enter email address"
                        />
                      </div>

                      <div>
                        <Label htmlFor="role">Role</Label>
                        <Select value={newRole} onValueChange={(value: "admin" | "dealer") => setNewRole(value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dealer">Dealer</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {error && (
                        <Alert variant="destructive">
                          <XCircle className="h-4 w-4" />
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}

                      {success && (
                        <Alert className="border-green-200 bg-green-50">
                          <CheckCircle className="h-4 w-4" />
                          <AlertDescription className="text-green-800">{success}</AlertDescription>
                        </Alert>
                      )}

                      <div className="flex gap-2">
                        <Button type="submit" disabled={adminLoading}>
                          {adminLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          Add Email
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setShowAddEmail(false)}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {preApprovedEmails.map((email) => (
                    <div key={email.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">{email.email}</p>
                          <p className="text-sm text-gray-600">
                            Added on {new Date(email.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={email.role === "admin" ? "default" : "secondary"}>{email.role}</Badge>
                        {email.used && (
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Used
                          </Badge>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveEmail(email.id)}
                        disabled={adminLoading}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  ))}
                  {preApprovedEmails.length === 0 && (
                    <p className="text-center text-gray-500 py-8">No pre-approved emails found</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inquiries">
            <Card>
              <CardHeader>
                <CardTitle>Contact Inquiries</CardTitle>
                <CardDescription>Manage customer inquiries and support requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Inquiry management coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure system-wide settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Settings panel coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

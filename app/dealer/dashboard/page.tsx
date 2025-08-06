"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { useDealerData } from "@/hooks/useDealerData"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { 
    Calendar, 
    Package, 
    TrendingUp, 
    DollarSign, 
    CheckCircle, 
    Clock, 
    Users, 
    AlertTriangle, 
    ArrowRight,
    ShoppingCart // <-- ADD THIS ICON
} from "lucide-react"
import Link from "next/link"

export default function DealerDashboard() {
  const { user, userProfile, loading: authLoading } = useAuth()
  const router = useRouter()
  const {
    loading: dataLoading,
    error,
    getDashboardStats,
    getRecentActivity,
    dealerProfile,
    refetch,
  } = useDealerData()

  useEffect(() => {
    if (!authLoading && (!user || userProfile?.user_type !== 'dealer')) {
      router.push('/login')
    }
  }, [user, userProfile, authLoading, router])

  const stats = getDashboardStats()
  const recentActivity = getRecentActivity()

  const isLoading = authLoading || dataLoading

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2"><Skeleton className="h-96" /></div>
            <div><Skeleton className="h-96" /></div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
        <div className="flex justify-between items-start">
            <div>
                <h1 className="text-3xl font-bold">Welcome, {dealerProfile?.business_name || userProfile?.full_name}</h1>
                <p className="text-gray-600">Here's a summary of your dealership's activity.</p>
            </div>
            <Button onClick={() => refetch()} variant="outline" size="sm">Refresh Data</Button>
        </div>

        {error && (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">All-time sales revenue</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.completedOrders}</div>
                    <p className="text-xs text-muted-foreground">Out of {stats.totalOrders} total orders</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.pendingOrders}</div>
                    <p className="text-xs text-muted-foreground">Awaiting confirmation/processing</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Test Rides</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.pendingTestRides}</div>
                    <p className="text-xs text-muted-foreground">Need to be confirmed</p>
                </CardContent>
            </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest orders and test ride requests.</CardDescription>
                </CardHeader>
                <CardContent>
                   {recentActivity.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>No recent activity found.</p>
                        </div>
                   ) : (
                    <div className="space-y-4">
                        {recentActivity.map((activity) => (
                            <div key={`${activity.type}-${activity.id}`} className="flex items-center">
                                <div className="p-2 bg-gray-100 rounded-full mr-4">
                                    {activity.type === 'order' ? <ShoppingCart className="h-5 w-5 text-gray-600" /> : <Calendar className="h-5 w-5 text-gray-600" />}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">{activity.title}</p>
                                    <p className="text-xs text-gray-500">{activity.subtitle} - {new Date(activity.date).toLocaleDateString()}</p>
                                </div>
                                <Badge variant={activity.status === 'pending' ? 'secondary' : 'default'}>{activity.status}</Badge>
                            </div>
                        ))}
                    </div>
                   )}
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
                 <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Navigate to key sections</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Link href="/dealer/orders">
                        <Button className="w-full justify-between" variant="outline">
                            Manage Orders <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="/dealer/inventory">
                        <Button className="w-full justify-between" variant="outline">
                            Update Inventory <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href="/dealer/test-rides">
                        <Button className="w-full justify-between" variant="outline">
                            Confirm Test Rides <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                     <Link href="/dealer/sales">
                        <Button className="w-full justify-between" variant="outline">
                            View Sales Reports <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}
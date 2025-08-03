"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/components/AuthProvider"
import { useTestRides } from "@/hooks/useTestRides"
import { useOrders } from "@/hooks/useOrders"
import { useInventory } from "@/hooks/useInventory"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Package, TrendingUp, CheckCircle, XCircle, AlertTriangle, Edit, Eye } from "lucide-react"

export default function DealerDashboard() {
  const { user, profile, loading: authLoading } = useAuthContext()
  const { testRides, loading: testRidesLoading, updateTestRideStatus } = useTestRides()
  const { orders, loading: ordersLoading, updateOrderStatus } = useOrders()
  const { inventory, loading: inventoryLoading, updateStock, getLowStockItems } = useInventory()
  const router = useRouter()

  const [selectedTestRide, setSelectedTestRide] = useState<any>(null)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [stockUpdateDialog, setStockUpdateDialog] = useState<any>(null)
  const [newStockQuantity, setNewStockQuantity] = useState("")

  useEffect(() => {
    if (!authLoading && (!user || profile?.user_type !== "dealer")) {
      router.push("/login")
    }
  }, [user, profile, authLoading, router])

  if (authLoading || testRidesLoading || ordersLoading || inventoryLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#3CB043]"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user || profile?.user_type !== "dealer") {
    return null
  }

  const pendingTestRides = testRides.filter((ride) => ride.status === "pending")
  const pendingOrders = orders.filter((order) => order.status === "pending")
  const lowStockItems = getLowStockItems()

  const handleTestRideStatusUpdate = async (id: number, status: string, notes?: string) => {
    await updateTestRideStatus(id, status as any, notes)
    setSelectedTestRide(null)
  }

  const handleOrderStatusUpdate = async (id: number, status: string) => {
    await updateOrderStatus(id, status as any)
    setSelectedOrder(null)
  }

  const handleStockUpdate = async () => {
    if (stockUpdateDialog && newStockQuantity) {
      await updateStock(stockUpdateDialog.id, Number.parseInt(newStockQuantity))
      setStockUpdateDialog(null)
      setNewStockQuantity("")
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: "secondary" as const, label: "Pending" },
      confirmed: { variant: "default" as const, label: "Confirmed" },
      completed: { variant: "default" as const, label: "Completed" },
      cancelled: { variant: "destructive" as const, label: "Cancelled" },
      processing: { variant: "default" as const, label: "Processing" },
      shipped: { variant: "default" as const, label: "Shipped" },
      delivered: { variant: "default" as const, label: "Delivered" },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dealer Dashboard</h1>
              <p className="text-gray-600">Welcome back, {profile?.full_name}</p>
            </div>
            <Button onClick={() => router.push("/")} variant="outline">
              Back to Website
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Test Rides</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingTestRides.length}</div>
              <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingOrders.length}</div>
              <p className="text-xs text-muted-foreground">Need processing</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lowStockItems.length}</div>
              <p className="text-xs text-muted-foreground">Need restocking</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₹
                {orders
                  .filter((o) => o.payment_status === "paid")
                  .reduce((sum, o) => sum + o.total_amount, 0)
                  .toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="test-rides" className="space-y-6">
          <TabsList>
            <TabsTrigger value="test-rides">Test Rides</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="test-rides">
            <Card>
              <CardHeader>
                <CardTitle>Test Ride Bookings</CardTitle>
                <CardDescription>Manage customer test ride requests</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Model</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {testRides.map((ride) => (
                      <TableRow key={ride.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{ride.customer_name}</div>
                            <div className="text-sm text-gray-500">{ride.customer_phone}</div>
                          </div>
                        </TableCell>
                        <TableCell>{ride.scooter_models?.name}</TableCell>
                        <TableCell>
                          {new Date(ride.preferred_date).toLocaleDateString()} at {ride.preferred_time}
                        </TableCell>
                        <TableCell>{getStatusBadge(ride.status)}</TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedTestRide(ride)}>
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Test Ride Details</DialogTitle>
                                <DialogDescription>Manage this test ride booking</DialogDescription>
                              </DialogHeader>
                              {selectedTestRide && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label>Customer Name</Label>
                                      <p className="text-sm">{selectedTestRide.customer_name}</p>
                                    </div>
                                    <div>
                                      <Label>Phone</Label>
                                      <p className="text-sm">{selectedTestRide.customer_phone}</p>
                                    </div>
                                    <div>
                                      <Label>Email</Label>
                                      <p className="text-sm">{selectedTestRide.customer_email}</p>
                                    </div>
                                    <div>
                                      <Label>Model</Label>
                                      <p className="text-sm">{selectedTestRide.scooter_models?.name}</p>
                                    </div>
                                    <div>
                                      <Label>Preferred Date</Label>
                                      <p className="text-sm">
                                        {new Date(selectedTestRide.preferred_date).toLocaleDateString()}
                                      </p>
                                    </div>
                                    <div>
                                      <Label>Preferred Time</Label>
                                      <p className="text-sm">{selectedTestRide.preferred_time}</p>
                                    </div>
                                  </div>
                                  {selectedTestRide.notes && (
                                    <div>
                                      <Label>Notes</Label>
                                      <p className="text-sm">{selectedTestRide.notes}</p>
                                    </div>
                                  )}
                                  <div className="flex gap-2">
                                    {selectedTestRide.status === "pending" && (
                                      <>
                                        <Button
                                          onClick={() => handleTestRideStatusUpdate(selectedTestRide.id, "confirmed")}
                                          className="bg-green-600 hover:bg-green-700"
                                        >
                                          <CheckCircle className="h-4 w-4 mr-1" />
                                          Confirm
                                        </Button>
                                        <Button
                                          variant="destructive"
                                          onClick={() => handleTestRideStatusUpdate(selectedTestRide.id, "cancelled")}
                                        >
                                          <XCircle className="h-4 w-4 mr-1" />
                                          Cancel
                                        </Button>
                                      </>
                                    )}
                                    {selectedTestRide.status === "confirmed" && (
                                      <Button
                                        onClick={() => handleTestRideStatusUpdate(selectedTestRide.id, "completed")}
                                        className="bg-blue-600 hover:bg-blue-700"
                                      >
                                        <CheckCircle className="h-4 w-4 mr-1" />
                                        Mark Complete
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Orders</CardTitle>
                <CardDescription>Manage customer orders and deliveries</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Model</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>#{order.id}</TableCell>
                        <TableCell>
                          <div className="font-medium">Customer {order.customer_id.slice(0, 8)}</div>
                        </TableCell>
                        <TableCell>{order.scooter_models?.name}</TableCell>
                        <TableCell>₹{order.total_amount.toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Order Details</DialogTitle>
                                <DialogDescription>Update order status and manage delivery</DialogDescription>
                              </DialogHeader>
                              {selectedOrder && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label>Order ID</Label>
                                      <p className="text-sm">#{selectedOrder.id}</p>
                                    </div>
                                    <div>
                                      <Label>Model</Label>
                                      <p className="text-sm">{selectedOrder.scooter_models?.name}</p>
                                    </div>
                                    <div>
                                      <Label>Amount</Label>
                                      <p className="text-sm">₹{selectedOrder.total_amount.toLocaleString()}</p>
                                    </div>
                                    <div>
                                      <Label>Payment Status</Label>
                                      <p className="text-sm">{selectedOrder.payment_status}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <Label>Delivery Address</Label>
                                    <p className="text-sm">{selectedOrder.delivery_address}</p>
                                  </div>
                                  <div>
                                    <Label>Update Status</Label>
                                    <Select onValueChange={(value) => handleOrderStatusUpdate(selectedOrder.id, value)}>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select new status" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="confirmed">Confirmed</SelectItem>
                                        <SelectItem value="processing">Processing</SelectItem>
                                        <SelectItem value="shipped">Shipped</SelectItem>
                                        <SelectItem value="delivered">Delivered</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Management</CardTitle>
                <CardDescription>Track and update your stock levels</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Model</TableHead>
                      <TableHead>Stock Quantity</TableHead>
                      <TableHead>Reserved</TableHead>
                      <TableHead>Available</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.scooter_models?.name}</TableCell>
                        <TableCell>{item.stock_quantity}</TableCell>
                        <TableCell>{item.reserved_quantity}</TableCell>
                        <TableCell>{item.available_quantity}</TableCell>
                        <TableCell>
                          {item.available_quantity <= 5 ? (
                            <Badge variant="destructive">Low Stock</Badge>
                          ) : item.available_quantity <= 10 ? (
                            <Badge variant="secondary">Medium Stock</Badge>
                          ) : (
                            <Badge variant="default">Good Stock</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setStockUpdateDialog(item)
                                  setNewStockQuantity(item.stock_quantity.toString())
                                }}
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                Update
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Update Stock</DialogTitle>
                                <DialogDescription>
                                  Update stock quantity for {stockUpdateDialog?.scooter_models?.name}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="stock-quantity">New Stock Quantity</Label>
                                  <Input
                                    id="stock-quantity"
                                    type="number"
                                    value={newStockQuantity}
                                    onChange={(e) => setNewStockQuantity(e.target.value)}
                                    min="0"
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <Button onClick={handleStockUpdate}>Update Stock</Button>
                                  <Button variant="outline" onClick={() => setStockUpdateDialog(null)}>
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Orders</span>
                      <span className="font-semibold">{orders.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Completed Orders</span>
                      <span className="font-semibold">{orders.filter((o) => o.status === "delivered").length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Revenue</span>
                      <span className="font-semibold">
                        ₹
                        {orders
                          .filter((o) => o.payment_status === "paid")
                          .reduce((sum, o) => sum + o.total_amount, 0)
                          .toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Test Ride Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Test Rides</span>
                      <span className="font-semibold">{testRides.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Completed</span>
                      <span className="font-semibold">{testRides.filter((r) => r.status === "completed").length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Conversion Rate</span>
                      <span className="font-semibold">
                        {testRides.length > 0 ? Math.round((orders.length / testRides.length) * 100) : 0}%
                      </span>
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

"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAdminActions } from "@/hooks/useAdminActions";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Users,
  Building2,
  ShoppingCart,
  DollarSign,
  Shield,
  Star,
  Plus,
  Edit,
  CheckCircle,
  XCircle,
  AlertCircle,
  Wrench,
  FileText,
  LogOut,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const { userProfile, signOut } = useAuth();
  const { addPreApprovedEmail, updateUserRole } = useAdminActions();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Data states
  const [users, setUsers] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [applications, setApplications] = useState([]);
  const [preApprovedEmails, setPreApprovedEmails] = useState([]);
  const [serviceBookings, setServiceBookings] = useState([]);
  const [warranties, setWarranties] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [reviews, setReviews] = useState([]);

  // Form states
  const [newEmail, setNewEmail] = useState("");
  const [newEmailRole, setNewEmailRole] = useState("customer");
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("customer");

  // Stats
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDealers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingApplications: 0,
    activeWarranties: 0,
    pendingServiceBookings: 0,
    averageRating: 0,
  });

  useEffect(() => {
    if (userProfile?.user_type === "admin") {
      fetchAllData();
    }
  }, [userProfile]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [
        { data: usersData },
        { data: dealersData },
        { data: ordersData },
        { data: applicationsData },
        { data: emailsData },
        { data: serviceBookingsData },
        { data: warrantiesData },
        { data: transactionsData },
        { data: reviewsData },
      ] = await Promise.all([
        supabase
          .from("user_profiles")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("dealers")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("orders")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("dealer_applications")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("pre_approved_emails")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("service_bookings")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("warranties")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("financial_transactions")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("customer_reviews")
          .select("*")
          .order("created_at", { ascending: false }),
      ]);

      setUsers(usersData || []);
      setDealers(dealersData || []);
      setOrders(ordersData || []);
      setApplications(applicationsData || []);
      setPreApprovedEmails(emailsData || []);
      setServiceBookings(serviceBookingsData || []);
      setWarranties(warrantiesData || []);
      setTransactions(transactionsData || []);
      setReviews(reviewsData || []);

      // Calculate stats
      const totalRevenue = (transactionsData || [])
        .filter(
          (t) => t.transaction_type === "sale" && t.status === "completed"
        )
        .reduce((sum, t) => sum + t.amount, 0);

      const averageRating =
        (reviewsData || []).length > 0
          ? (reviewsData || []).reduce((sum, r) => sum + r.rating, 0) /
            (reviewsData || []).length
          : 0;

      setStats({
        totalUsers: usersData?.length || 0,
        totalDealers: dealersData?.length || 0,
        totalOrders: ordersData?.length || 0,
        totalRevenue,
        pendingApplications: (applicationsData || []).filter(
          (a) => a.status === "pending"
        ).length,
        activeWarranties: (warrantiesData || []).filter(
          (w) => w.status === "active"
        ).length,
        pendingServiceBookings: (serviceBookingsData || []).filter(
          (s) => s.status === "scheduled"
        ).length,
        averageRating: Math.round(averageRating * 10) / 10,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleAddPreApprovedEmail = async () => {
    if (!newEmail.trim()) {
      setError("Email is required");
      return;
    }

    setLoading(true);
    try {
      const result = await addPreApprovedEmail(newEmail, newEmailRole);
      if (result.success) {
        setSuccess("Email added successfully");
        setNewEmail("");
        setNewEmailRole("customer");
        fetchAllData();
      } else {
        setError(result.error || "Failed to add email");
      }
    } catch (error) {
      setError("Failed to add email");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUserRole = async () => {
    if (!selectedUser) return;

    setLoading(true);
    try {
      const result = await updateUserRole(selectedUser.id, newRole);
      if (result.success) {
        setSuccess("User role updated successfully");
        setSelectedUser(null);
        fetchAllData();
      } else {
        setError(result.error || "Failed to update user role");
      }
    } catch (error) {
      setError("Failed to update user role");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateApplicationStatus = async (applicationId, status) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("dealer_applications")
        .update({ status })
        .eq("id", applicationId);

      if (error) throw error;

      setSuccess(`Application ${status} successfully`);
      fetchAllData();
    } catch (error) {
      setError("Failed to update application status");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (userProfile?.user_type !== "admin") {
    return (
      <div className="container mx-auto p-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Access denied. Admin privileges required.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">
            Manage your Omni E-Ride showroom system
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            Welcome, {userProfile?.full_name}
          </span>
          <Button onClick={handleSignOut} variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      {error && (
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {typeof error === "string" ? error : "An error occurred"}
          </AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-4">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="dealers">Dealers</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
                <p className="text-xs text-muted-foreground">
                  {users.filter((u) => u.user_type === "customer").length}{" "}
                  customers
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Dealers
                </CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalDealers}</div>
                <p className="text-xs text-muted-foreground">
                  {dealers.filter((d) => d.status === "approved").length} active
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Orders
                </CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalOrders}</div>
                <p className="text-xs text-muted-foreground">
                  {orders.filter((o) => o.status === "delivered").length}{" "}
                  delivered
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{stats.totalRevenue.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">All time sales</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Applications
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.pendingApplications}
                </div>
                <p className="text-xs text-muted-foreground">
                  Dealer applications
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Warranties
                </CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.activeWarranties}
                </div>
                <p className="text-xs text-muted-foreground">
                  Valid warranties
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Service Bookings
                </CardTitle>
                <Wrench className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.pendingServiceBookings}
                </div>
                <p className="text-xs text-muted-foreground">
                  Pending services
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Rating
                </CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.averageRating}/5
                </div>
                <p className="text-xs text-muted-foreground">
                  Customer satisfaction
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage all users in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.full_name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.user_type === "admin"
                              ? "destructive"
                              : user.user_type === "dealer"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {user.user_type}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>
                        {new Date(user.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedUser(user)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Update User Role</DialogTitle>
                              <DialogDescription>
                                Change the role for {user.full_name}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="role">Role</Label>
                                <Select
                                  value={newRole}
                                  onValueChange={(value) => setNewRole(value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="customer">
                                      Customer
                                    </SelectItem>
                                    <SelectItem value="dealer">
                                      Dealer
                                    </SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                onClick={handleUpdateUserRole}
                                disabled={loading}
                              >
                                {loading ? "Updating..." : "Update Role"}
                              </Button>
                            </DialogFooter>
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

        <TabsContent value="dealers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dealer Management</CardTitle>
              <CardDescription>
                Manage all dealers and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Business Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dealers.map((dealer) => (
                    <TableRow key={dealer.id}>
                      <TableCell>{dealer.business_name}</TableCell>
                      <TableCell>
                        <div>
                          <div>{dealer.email}</div>
                          <div className="text-sm text-gray-500">
                            {dealer.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{dealer.business_address}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            dealer.status === "approved"
                              ? "default"
                              : dealer.status === "pending"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {dealer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(dealer.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Management</CardTitle>
              <CardDescription>View and manage all orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Dealer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id.slice(0, 8)}...</TableCell>
                      <TableCell>{order.customer_id}</TableCell>
                      <TableCell>{order.dealer_id}</TableCell>
                      <TableCell>₹{order.total_amount}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.status === "delivered"
                              ? "default"
                              : order.status === "cancelled"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.payment_status === "paid"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {order.payment_status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(order.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Bookings</CardTitle>
              <CardDescription>
                Manage service appointments and warranties
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Service Type</TableHead>
                    <TableHead>Scheduled Date</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {serviceBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>{booking.customer_id}</TableCell>
                      <TableCell>{booking.service_type}</TableCell>
                      <TableCell>
                        {new Date(booking.scheduled_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>₹{booking.total_cost || 0}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            booking.status === "completed"
                              ? "default"
                              : booking.status === "cancelled"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {booking.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Add Pre-approved Email</CardTitle>
                <CardDescription>
                  Add emails that can sign up with specific roles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={newEmailRole}
                    onValueChange={(value) => setNewEmailRole(value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="dealer">Dealer</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddPreApprovedEmail} disabled={loading}>
                  <Plus className="h-4 w-4 mr-2" />
                  {loading ? "Adding..." : "Add Email"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pre-approved Emails</CardTitle>
                <CardDescription>
                  Manage pre-approved email addresses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Used</TableHead>
                      <TableHead>Date Added</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {preApprovedEmails.map((email) => (
                      <TableRow key={email.id}>
                        <TableCell>{email.email}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              email.role === "admin"
                                ? "destructive"
                                : email.role === "dealer"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {email.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={email.used ? "default" : "secondary"}>
                            {email.used ? "Used" : "Unused"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(email.created_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Dealer Applications</CardTitle>
              <CardDescription>
                Review and approve dealer applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Business Name</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell>{application.business_name}</TableCell>
                      <TableCell>{application.full_name}</TableCell>
                      <TableCell>{application.email}</TableCell>
                      <TableCell>
                        {application.experience_years} years
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            application.status === "approved"
                              ? "default"
                              : application.status === "pending"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {application.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {application.status === "pending" && (
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() =>
                                handleUpdateApplicationStatus(
                                  application.id,
                                  "approved"
                                )
                              }
                              disabled={loading}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() =>
                                handleUpdateApplicationStatus(
                                  application.id,
                                  "rejected"
                                )
                              }
                              disabled={loading}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

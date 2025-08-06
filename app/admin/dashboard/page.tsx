"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import type { UserProfile, Dealer, Order, DealerApplication, PreApprovedEmail, ServiceBooking, Warranty, Transaction, Review } from "@/types/database";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Users, Building2, ShoppingCart, DollarSign, Shield, Star, FileText, Wrench, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const { userProfile } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Data states
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [applications, setApplications] = useState<DealerApplication[]>([]);
  const [serviceBookings, setServiceBookings] = useState<ServiceBooking[]>([]);
  const [warranties, setWarranties] = useState<Warranty[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

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
        { data: serviceBookingsData },
        { data: warrantiesData },
        { data: transactionsData },
        { data: reviewsData },
      ] = await Promise.all([
        supabase.from("user_profiles").select("*"),
        supabase.from("dealers").select("*"),
        supabase.from("orders").select("*"),
        supabase.from("dealer_applications").select("*"),
        supabase.from("service_bookings").select("*"),
        supabase.from("warranties").select("*"),
        supabase.from("financial_transactions").select("*"),
        supabase.from("customer_reviews").select("*"),
      ]);

      const totalRevenue = (transactionsData || [])
        .filter((t) => t.transaction_type === "sale" && t.status === "completed")
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
        pendingApplications: (applicationsData || []).filter((a) => a.status === "pending").length,
        activeWarranties: (warrantiesData || []).filter((w) => w.status === "active").length,
        pendingServiceBookings: (serviceBookingsData || []).filter((s) => s.status === "scheduled").length,
        averageRating: Math.round(averageRating * 10) / 10,
      });

    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        {error && (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Dealers</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDealers}</div>
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
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{stats.pendingApplications}</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Warranties</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{stats.activeWarranties}</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Service Bookings</CardTitle>
                <Wrench className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{stats.pendingServiceBookings}</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{stats.averageRating}/5</div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
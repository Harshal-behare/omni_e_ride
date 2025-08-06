"use client";

import { useAuth } from "@/hooks/useAuth"
import { useDealerData, type DealerOrder, type DealerTestRide } from "@/hooks/useDealerData"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, ShoppingCart, DollarSign, CheckCircle, Clock, Users, AlertTriangle, ArrowRight, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

// --- DEMO DATA FOR FALLBACK ---
const DEMO_SALES_DATA = [
    { name: 'Aug 1', total: 95000 }, { name: 'Aug 2', total: 110000 },
    { name: 'Aug 3', total: 0 }, { name: 'Aug 4', total: 125000 },
    { name: 'Aug 5', total: 235000 }, { name: 'Aug 6', total: 95000 },
];
const DEMO_ACTIVITY = [
    { type: 'order' as const, id: 'demo1', title: 'New order from Amit Kumar', subtitle: 'OMNI R-40', status: 'processing', date: new Date().toISOString() },
    { type: 'test_ride' as const, id: 'demo2', title: 'Test ride request from Priya Sharma', subtitle: 'OMNI L-30', status: 'pending', date: new Date().toISOString() }
];

export default function DealerDashboard() {
  const { userProfile, loading: authLoading } = useAuth();
  const { loading: dataLoading, error, dealerProfile, sales, orders, testRides, refetch } = useDealerData();

  const isLoading = authLoading || dataLoading;

  // Logic to use live data or fall back to demo data
  const displaySales = sales.length > 0 ? sales : [];
  const displayOrders = orders.length > 0 ? orders : [];
  const displayTestRides = testRides.length > 0 ? testRides : [];
  
  const chartData = displaySales.length > 0 
    ? displaySales.slice(0, 7).map(s => ({
        name: new Date(s.sale_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric'}),
        total: s.orders.total_amount
      })).reverse()
    : DEMO_SALES_DATA;
    
  const recentActivity = getRecentActivity(displayOrders, displayTestRides);

  const stats = {
    totalRevenue: displaySales.reduce((sum, sale) => sum + sale.orders.total_amount, 0),
    completedOrders: displayOrders.filter(o => o.status === 'delivered').length,
    totalOrders: displayOrders.length,
    pendingOrders: displayOrders.filter(o => o.status === 'pending' || o.status === 'processing').length,
    pendingTestRides: displayTestRides.filter(r => r.status === 'pending').length
  };

  if (isLoading) { /* Skeleton Loading UI */
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Skeleton className="h-28 rounded-xl" /> <Skeleton className="h-28 rounded-xl" />
            <Skeleton className="h-28 rounded-xl" /> <Skeleton className="h-28 rounded-xl" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2"><Skeleton className="h-96 rounded-xl" /></div>
            <div><Skeleton className="h-96 rounded-xl" /></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-start">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Welcome, {dealerProfile?.business_name || "Dealer"}</h1>
                <p className="text-gray-500">Here's a summary of your dealership's activity.</p>
            </div>
            <Button onClick={() => refetch()} variant="outline" size="sm">Refresh Data</Button>
        </div>

        {error && <Alert variant="destructive"><AlertTriangle className="h-4 w-4" /><AlertDescription>{error}</AlertDescription></Alert>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Revenue" value={`₹${stats.totalRevenue.toLocaleString()}`} icon={DollarSign} />
            <StatCard title="Completed Orders" value={stats.completedOrders} description={`out of ${stats.totalOrders}`} icon={CheckCircle} />
            <StatCard title="Pending Orders" value={stats.pendingOrders} icon={Clock} />
            <StatCard title="Pending Test Rides" value={stats.pendingTestRides} icon={Calendar} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 shadow-sm hover:shadow-lg transition-shadow">
                <CardHeader><CardTitle>Recent Sales</CardTitle><CardDescription>Last 7 transactions.</CardDescription></CardHeader>
                <CardContent className="pl-2"><ResponsiveContainer width="100%" height={300}><BarChart data={chartData}><XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} /><YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${Number(v)/1000}k`} /><Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '0.5rem', border: '1px solid #e5e7eb' }} /><Bar dataKey="total" fill="var(--color-primary, #3CB043)" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-lg transition-shadow">
                 <CardHeader><CardTitle>Recent Activity</CardTitle><CardDescription>Latest events</CardDescription></CardHeader>
                <CardContent>
                   {(recentActivity.length === 0 ? DEMO_ACTIVITY : recentActivity).map((activity, index) => (
                        <div key={index} className="flex items-center mb-4">
                            <div className="p-2 bg-gray-100 rounded-full mr-4">{activity.type === 'order' ? <ShoppingCart className="h-5 w-5 text-gray-600" /> : <Calendar className="h-5 w-5 text-gray-600" />}</div>
                            <div className="flex-1"><p className="text-sm font-medium">{activity.title}</p><p className="text-xs text-gray-500">{activity.subtitle}</p></div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

// Helper component for Stat Cards
const StatCard = ({ title, value, description, icon: Icon }: any) => (
    <Card className="shadow-sm hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">{title}</CardTitle><Icon className="h-4 w-4 text-muted-foreground" /></CardHeader>
        <CardContent><div className="text-2xl font-bold">{value}</div>{description && <p className="text-xs text-muted-foreground">{description}</p>}</CardContent>
    </Card>
);

// Helper function to generate recent activity feed
function getRecentActivity(orders: DealerOrder[], testRides: DealerTestRide[]) {
    const activity = [
        ...orders.slice(0, 2).map(o => ({ type: 'order' as const, id: o.id, title: `New order: ${o.user_profiles.full_name}`, subtitle: o.models.name, status: o.status, date: o.created_at })),
        ...testRides.slice(0, 2).map(r => ({ type: 'test_ride' as const, id: r.id, title: `Test ride: ${r.user_profiles.full_name}`, subtitle: r.models.name, status: r.status, date: r.preferred_date }))
    ];
    return activity.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
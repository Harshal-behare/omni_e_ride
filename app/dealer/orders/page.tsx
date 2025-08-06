"use client";

import { useDealerData, type DealerOrder } from "@/hooks/useDealerData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const DEMO_ORDERS: DealerOrder[] = [
    { id: 'ord1', created_at: '2025-08-05T10:00:00Z', total_amount: 125000, status: 'delivered', payment_status: 'paid', models: { name: 'OMNI R-40' }, user_profiles: { full_name: 'Amit Kumar', email: 'amit@example.com' }},
    { id: 'ord2', created_at: '2025-08-04T14:30:00Z', total_amount: 110000, status: 'processing', payment_status: 'paid', models: { name: 'OMNI L-30' }, user_profiles: { full_name: 'Priya Sharma', email: 'priya@example.com' }},
];

export default function DealerOrdersPage() {
    const { orders, loading, refetch } = useDealerData();
    const displayData = !loading && orders.length === 0 ? DEMO_ORDERS : orders;
    
    const getStatusBadge = (status: DealerOrder['status']) => {
        const colorMap = {
            pending: "bg-yellow-100 text-yellow-800",
            confirmed: "bg-blue-100 text-blue-800",
            processing: "bg-indigo-100 text-indigo-800",
            shipped: "bg-purple-100 text-purple-800",
            delivered: "bg-green-100 text-green-800",
            cancelled: "bg-red-100 text-red-800",
        };
        return <Badge className={`border-none capitalize ${colorMap[status]}`}>{status}</Badge>;
    };
    
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Manage Orders</h1>
                <Button onClick={() => refetch()} variant="outline">Refresh</Button>
            </div>
            <Card className="shadow-sm hover:shadow-lg transition-shadow">
                <CardHeader><CardTitle>All Orders</CardTitle><CardDescription>View and update customer orders.</CardDescription></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Model</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Order Status</TableHead>
                                <TableHead>Payment</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? <TableRow><TableCell colSpan={6} className="text-center h-24">Loading...</TableCell></TableRow> :
                                displayData.map((order: DealerOrder) => (
                                    <TableRow key={order.id} className="hover:bg-gray-50">
                                        <TableCell className="font-medium">{order.user_profiles.full_name}</TableCell>
                                        <TableCell>{order.models.name}</TableCell>
                                        <TableCell>₹{order.total_amount.toLocaleString()}</TableCell>
                                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                                        <TableCell><Badge variant={order.payment_status === 'paid' ? 'default' : 'secondary'} className="capitalize">{order.payment_status}</Badge></TableCell>
                                        <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
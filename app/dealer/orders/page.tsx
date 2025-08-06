"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useDealerData, type DealerOrder } from "@/hooks/useDealerData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function DealerOrdersPage() {
    const { user, userProfile } = useAuth();
    const { orders, loading, refetch } = useDealerData();
    
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Manage Orders</h1>
                <Button onClick={() => refetch()} variant="outline">Refresh</Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>All Orders</CardTitle>
                    <CardDescription>View and update customer orders assigned to you.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Model</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Order Status</TableHead>
                                <TableHead>Payment Status</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow><TableCell colSpan={6} className="text-center">Loading orders...</TableCell></TableRow>
                            ) : orders.length === 0 ? (
                                <TableRow><TableCell colSpan={6} className="text-center">No orders found.</TableCell></TableRow>
                            ) : (
                                orders.map((order: DealerOrder) => (
                                    <TableRow key={order.id}>
                                        <TableCell>{order.user_profiles.full_name}</TableCell>
                                        <TableCell>{order.models.name}</TableCell>
                                        <TableCell>₹{order.total_amount.toLocaleString()}</TableCell>
                                        <TableCell><Badge>{order.order_status}</Badge></TableCell>
                                        <TableCell><Badge variant="secondary">{order.payment_status}</Badge></TableCell>
                                        <TableCell>{new Date(order.order_date).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
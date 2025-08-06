"use client";

import { useState, useEffect } from "react";
import type { ServiceBooking } from "@/types/database";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/lib/supabase";

export default function ServicesPage() {
    const [serviceBookings, setServiceBookings] = useState<ServiceBooking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchServiceBookings();
    }, []);

    const fetchServiceBookings = async () => {
        setLoading(true);
        const { data } = await supabase.from("service_bookings").select("*").order("created_at", { ascending: false });
        setServiceBookings(data || []);
        setLoading(false);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Service & Warranty</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Service Bookings</CardTitle>
                    <CardDescription>Manage service appointments and warranties</CardDescription>
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
                                    <TableCell>{new Date(booking.scheduled_date).toLocaleDateString()}</TableCell>
                                    <TableCell>₹{booking.total_cost || 0}</TableCell>
                                    <TableCell>
                                        <Badge variant={booking.status === "completed" ? "default" : booking.status === "cancelled" ? "destructive" : "secondary"}>
                                            {booking.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
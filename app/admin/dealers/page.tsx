"use client";

import { useState, useEffect } from "react";
import type { Dealer } from "@/types/database";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/lib/supabase";

export default function DealersPage() {
    const [dealers, setDealers] = useState<Dealer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDealers();
    }, []);

    const fetchDealers = async () => {
        setLoading(true);
        const { data } = await supabase.from("dealers").select("*").order("created_at", { ascending: false });
        setDealers(data || []);
        setLoading(false);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Dealer Management</h1>
            <Card>
                <CardHeader>
                    <CardTitle>All Dealers</CardTitle>
                    <CardDescription>Manage all dealers and their status</CardDescription>
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
                                        <div>{dealer.email}</div>
                                        <div className="text-sm text-gray-500">{dealer.phone}</div>
                                    </TableCell>
                                    <TableCell>{dealer.business_address}</TableCell>
                                    <TableCell>
                                        <Badge variant={dealer.status === "approved" ? "default" : dealer.status === "pending" ? "secondary" : "destructive"}>
                                            {dealer.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{new Date(dealer.created_at).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
"use client";

import { useDealerData, type DealerSale } from "@/hooks/useDealerData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function DealerSalesPage() {
    const { sales, commissions, loading, refetch } = useDealerData();
    
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Sales & Reports</h1>
                 <Button onClick={() => refetch()} variant="outline">Refresh</Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Sales History</CardTitle>
                        <CardDescription>Your recent sales transactions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader><TableRow><TableHead>Order ID</TableHead><TableHead>Amount</TableHead><TableHead>Date</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {loading ? <TableRow><TableCell colSpan={3} className="text-center">Loading...</TableCell></TableRow> :
                                sales.map((sale: DealerSale) => (
                                    <TableRow key={sale.id}>
                                        <TableCell>{sale.order_id.slice(0,8)}</TableCell>
                                        <TableCell>₹{sale.sale_amount.toLocaleString()}</TableCell>
                                        <TableCell>{new Date(sale.sale_date).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Commission Reports</CardTitle>
                        <CardDescription>Your commission earnings.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader><TableRow><TableHead>Order ID</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {loading ? <TableRow><TableCell colSpan={3} className="text-center">Loading...</TableCell></TableRow> :
                                commissions.map((comm) => (
                                    <TableRow key={comm.id}>
                                        <TableCell>{comm.order_id.slice(0,8)}</TableCell>
                                        <TableCell>₹{comm.commission_amount.toLocaleString()}</TableCell>
                                        <TableCell>{comm.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
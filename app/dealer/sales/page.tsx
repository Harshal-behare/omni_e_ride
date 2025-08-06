"use client";

import { useDealerData, type DealerSale } from "@/hooks/useDealerData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const DEMO_SALES: DealerSale[] = [
    { id: 'sale1', sale_date: '2025-08-05', commission_amount: 6250, orders: {id: 'ord1', total_amount: 125000, models: { name: 'OMNI R-40' }}},
    { id: 'sale2', sale_date: '2025-07-28', commission_amount: 5500, orders: {id: 'ord2', total_amount: 110000, models: { name: 'OMNI L-30' }}},
];

export default function DealerSalesPage() {
    const { sales, commissions, loading, refetch } = useDealerData();
    const displaySales = !loading && sales.length === 0 ? DEMO_SALES : sales;

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center"><h1 className="text-3xl font-bold text-gray-800">Sales & Reports</h1><Button onClick={() => refetch()} variant="outline">Refresh</Button></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-sm hover:shadow-lg transition-shadow">
                    <CardHeader><CardTitle>Sales History</CardTitle><CardDescription>Your recent transactions.</CardDescription></CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader><TableRow><TableHead>Model</TableHead><TableHead className="text-right">Amount</TableHead><TableHead className="text-right">Date</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {loading ? <TableRow><TableCell colSpan={3} className="text-center h-24">Loading...</TableCell></TableRow> :
                                displaySales.map((sale: DealerSale) => (
                                    <TableRow key={sale.id} className="hover:bg-gray-50"><TableCell className="font-medium">{sale.orders.models.name}</TableCell><TableCell className="text-right">₹{sale.orders.total_amount.toLocaleString()}</TableCell><TableCell className="text-right">{new Date(sale.sale_date).toLocaleDateString()}</TableCell></TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card className="shadow-sm hover:shadow-lg transition-shadow">
                    <CardHeader><CardTitle>Commission Reports</CardTitle><CardDescription>Your commission earnings.</CardDescription></CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader><TableRow><TableHead>Model</TableHead><TableHead className="text-right">Commission</TableHead><TableHead className="text-right">Status</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {loading ? <TableRow><TableCell colSpan={3} className="text-center h-24">Loading...</TableCell></TableRow> :
                                displaySales.map((comm) => (
                                    <TableRow key={comm.id} className="hover:bg-gray-50"><TableCell className="font-medium">{comm.orders.models.name}</TableCell><TableCell className="text-right">₹{comm.commission_amount.toLocaleString()}</TableCell><TableCell className="text-right">Paid</TableCell></TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
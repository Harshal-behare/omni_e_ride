"use client";

import { useDealerData, type DealerInventory } from "@/hooks/useDealerData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const DEMO_INVENTORY: DealerInventory[] = [
    { id: 'inv1', quantity: 8, models: { name: 'OMNI R-40', price: 125000, specifications: { range: '180km', top_speed: '85km/h' } }},
    { id: 'inv2', quantity: 4, models: { name: 'OMNI L-30', price: 110000, specifications: { range: '150km', top_speed: '70km/h' } }},
];

export default function DealerInventoryPage() {
    const { inventory, loading, refetch } = useDealerData();
    const displayData = !loading && inventory.length === 0 ? DEMO_INVENTORY : inventory;

    const getStockStatus = (quantity: number) => {
        if (quantity <= 0) return <Badge variant="destructive">Out of Stock</Badge>;
        if (quantity <= 5) return <Badge className="bg-orange-100 text-orange-800 border-none">Low Stock</Badge>;
        return <Badge className="bg-green-100 text-green-800 border-none">In Stock</Badge>;
    };

    return (
        <div className="space-y-6 animate-fade-in">
             <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Inventory Management</h1>
                <Button onClick={() => refetch()} variant="outline">Refresh</Button>
            </div>
            <Card className="shadow-sm hover:shadow-lg transition-shadow">
                <CardHeader><CardTitle>Your Stock</CardTitle><CardDescription>View and manage your vehicle inventory.</CardDescription></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Model</TableHead><TableHead>Price</TableHead><TableHead>Range</TableHead><TableHead>Top Speed</TableHead><TableHead className="text-right">Quantity</TableHead><TableHead className="text-center">Status</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {loading ? <TableRow><TableCell colSpan={6} className="text-center h-24">Loading...</TableCell></TableRow> :
                                displayData.map((item: DealerInventory) => (
                                    <TableRow key={item.id} className="hover:bg-gray-50">
                                        <TableCell className="font-medium">{item.models.name}</TableCell>
                                        <TableCell>₹{item.models.price.toLocaleString()}</TableCell>
                                        <TableCell>{item.models.specifications.range}</TableCell>
                                        <TableCell>{item.models.specifications.top_speed}</TableCell>
                                        <TableCell className="text-right font-semibold">{item.quantity}</TableCell>
                                        <TableCell className="text-center">{getStockStatus(item.quantity)}</TableCell>
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
"use client";

import { useDealerData, type DealerInventory } from "@/hooks/useDealerData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function DealerInventoryPage() {
    const { inventory, loading, refetch } = useDealerData();
    
    const getStockStatus = (quantity: number) => {
        if (quantity <= 0) return <Badge variant="destructive">Out of Stock</Badge>;
        if (quantity <= 5) return <Badge variant="secondary">Low Stock</Badge>;
        return <Badge>In Stock</Badge>;
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Inventory Management</h1>
                <Button onClick={() => refetch()} variant="outline">Refresh</Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Your Stock</CardTitle>
                    <CardDescription>View and manage your current vehicle inventory.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Model Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                             {loading ? (
                                <TableRow><TableCell colSpan={4} className="text-center">Loading inventory...</TableCell></TableRow>
                            ) : inventory.length === 0 ? (
                                <TableRow><TableCell colSpan={4} className="text-center">No inventory found.</TableCell></TableRow>
                            ) : (
                                inventory.map((item: DealerInventory) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.models.name}</TableCell>
                                        <TableCell>₹{item.models.price.toLocaleString()}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{getStockStatus(item.quantity)}</TableCell>
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
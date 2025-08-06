"use client";

import { useDealerData, type DealerTestRide } from "@/hooks/useDealerData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function DealerTestRidesPage() {
    const { testRides, loading, refetch, updateTestRideStatus } = useDealerData();
    
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Test Ride Bookings</h1>
                <Button onClick={() => refetch()} variant="outline">Refresh</Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>All Bookings</CardTitle>
                    <CardDescription>View and manage your test ride appointments.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Model</TableHead>
                                <TableHead>Preferred Date & Time</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow><TableCell colSpan={5} className="text-center">Loading test rides...</TableCell></TableRow>
                            ) : testRides.length === 0 ? (
                                <TableRow><TableCell colSpan={5} className="text-center">No test rides found.</TableCell></TableRow>
                            ) : (
                                testRides.map((ride: DealerTestRide) => (
                                    <TableRow key={ride.id}>
                                        <TableCell>{ride.user_profiles.full_name}</TableCell>
                                        <TableCell>{ride.models.name}</TableCell>
                                        <TableCell>{new Date(ride.preferred_date).toLocaleDateString()} at {ride.preferred_time}</TableCell>
                                        <TableCell><Badge>{ride.status}</Badge></TableCell>
                                        <TableCell className="space-x-2">
                                            {ride.status === 'pending' && (
                                                <>
                                                    <Button size="sm" onClick={() => updateTestRideStatus(ride.id, 'confirmed')}>Confirm</Button>
                                                    <Button size="sm" variant="destructive" onClick={() => updateTestRideStatus(ride.id, 'cancelled')}>Cancel</Button>
                                                </>
                                            )}
                                        </TableCell>
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
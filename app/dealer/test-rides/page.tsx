"use client";

import { useDealerData, type DealerTestRide } from "@/hooks/useDealerData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const DEMO_TEST_RIDES: DealerTestRide[] = [
    { id: 'tr1', status: 'pending', preferred_date: '2025-08-10', preferred_time: '11:00', models: { name: 'OMNI R-40' }, user_profiles: { full_name: 'Vikram Rathore', phone: '9876543211' }},
    { id: 'tr2', status: 'confirmed', preferred_date: '2025-08-08', preferred_time: '14:00', models: { name: 'OMNI L-30' }, user_profiles: { full_name: 'Sunita Devi', phone: '9876543212' }},
];

export default function DealerTestRidesPage() {
    const { testRides, loading, refetch, updateTestRideStatus } = useDealerData();
    const displayData = !loading && testRides.length === 0 ? DEMO_TEST_RIDES : testRides;

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Test Ride Bookings</h1>
                <Button onClick={() => refetch()} variant="outline">Refresh</Button>
            </div>
            <Card className="shadow-sm hover:shadow-lg transition-shadow">
                <CardHeader><CardTitle>All Bookings</CardTitle><CardDescription>Manage your test ride appointments.</CardDescription></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Customer</TableHead><TableHead>Phone</TableHead><TableHead>Model</TableHead><TableHead>Date & Time</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {loading ? <TableRow><TableCell colSpan={6} className="text-center h-24">Loading...</TableCell></TableRow> :
                                displayData.map((ride: DealerTestRide) => (
                                    <TableRow key={ride.id} className="hover:bg-gray-50">
                                        <TableCell className="font-medium">{ride.user_profiles.full_name}</TableCell>
                                        <TableCell>{ride.user_profiles.phone}</TableCell>
                                        <TableCell>{ride.models.name}</TableCell>
                                        <TableCell>{new Date(ride.preferred_date).toLocaleDateString()} at {ride.preferred_time}</TableCell>
                                        <TableCell><Badge variant={ride.status === 'pending' ? 'secondary' : 'default'}>{ride.status}</Badge></TableCell>
                                        <TableCell className="text-right">
                                            {ride.status === 'pending' && <div className="space-x-2"><Button size="sm" onClick={() => updateTestRideStatus(ride.id, 'confirmed')}>Confirm</Button><Button size="sm" variant="destructive" onClick={() => updateTestRideStatus(ride.id, 'cancelled')}>Cancel</Button></div>}
                                        </TableCell>
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
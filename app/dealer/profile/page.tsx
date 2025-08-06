"use client";

import { useAuth } from "@/hooks/useAuth";
import { useDealerData } from "@/hooks/useDealerData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function DealerProfilePage() {
    const { userProfile } = useAuth();
    const { dealerProfile, loading } = useDealerData();
    
    return (
        <div className="space-y-6 animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-800">Dealer Profile</h1>
             <Card>
                <CardHeader>
                    <CardTitle>Your Information</CardTitle>
                    <CardDescription>Your personal and business details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                    {loading ? (
                        <div className="space-y-4">
                            <Skeleton className="h-8 w-1/2" />
                            <Skeleton className="h-8 w-1/3" />
                            <Skeleton className="h-8 w-2/3" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <div><Label>Contact Person</Label><p className="text-lg font-semibold text-gray-800">{userProfile?.full_name}</p></div>
                            <div><Label>Business Name</Label><p className="text-lg font-semibold text-gray-800">{dealerProfile?.business_name}</p></div>
                            <div><Label>Email Address</Label><p className="text-lg font-semibold text-gray-800">{dealerProfile?.email}</p></div>
                            <div><Label>Phone Number</Label><p className="text-lg font-semibold text-gray-800">{dealerProfile?.phone}</p></div>
                            <div className="md:col-span-2"><Label>Business Address</Label><p className="text-lg font-semibold text-gray-800">{dealerProfile?.business_address}</p></div>
                            <div>
                                <Label>Account Status</Label>
                                <div className="text-lg font-semibold capitalize">
                                    <Badge className="text-base">{dealerProfile?.status}</Badge>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="pt-4 border-t">
                        <Button variant="outline">Request Profile Update</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
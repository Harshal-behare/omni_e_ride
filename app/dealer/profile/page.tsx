"use client";

import { useAuth } from "@/hooks/useAuth";
import { useDealerData } from "@/hooks/useDealerData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function DealerProfilePage() {
    const { userProfile } = useAuth();
    const { dealerProfile, loading } = useDealerData();
    
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Dealer Profile</h1>
             <Card>
                <CardHeader>
                    <CardTitle>Your Information</CardTitle>
                    <CardDescription>Your personal and business details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {loading ? <p>Loading profile...</p> : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div><Label>Contact Person</Label><p className="font-semibold">{userProfile?.full_name}</p></div>
                            <div><Label>Business Name</Label><p className="font-semibold">{dealerProfile?.business_name}</p></div>
                            <div><Label>Email</Label><p className="font-semibold">{dealerProfile?.email}</p></div>
                            <div><Label>Phone</Label><p className="font-semibold">{dealerProfile?.phone}</p></div>
                            <div className="md:col-span-2"><Label>Business Address</Label><p className="font-semibold">{dealerProfile?.business_address}</p></div>
                            <div><Label>Status</Label><p className="font-semibold capitalize">{dealerProfile?.status}</p></div>
                        </div>
                    )}
                    <div className="pt-4">
                        <Button variant="outline">Edit Profile</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
"use client";

import { useState, useEffect } from "react";
import { useAdminActions } from "@/hooks/useAdminActions";
import type { DealerApplication, PreApprovedEmail } from "@/types/database";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function SettingsPage() {
    const { addPreApprovedEmail } = useAdminActions();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [applications, setApplications] = useState<DealerApplication[]>([]);
    const [preApprovedEmails, setPreApprovedEmails] = useState<PreApprovedEmail[]>([]);
    const [newEmail, setNewEmail] = useState("");
    const [newEmailRole, setNewEmailRole] = useState<"admin" | "dealer" | "customer">("customer");

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        setLoading(true);
        const [{ data: appsData }, { data: emailsData }] = await Promise.all([
            supabase.from("dealer_applications").select("*").order("created_at", { ascending: false }),
            supabase.from("pre_approved_emails").select("*").order("created_at", { ascending: false }),
        ]);
        setApplications(appsData || []);
        setPreApprovedEmails(emailsData || []);
        setLoading(false);
    };

    const handleAddPreApprovedEmail = async () => {
        if (!newEmail.trim()) { setError("Email is required"); return; }
        setLoading(true);
        const result = await addPreApprovedEmail(newEmail, newEmailRole);
        if (result.success) {
            setSuccess("Email added successfully");
            setNewEmail("");
            setNewEmailRole("customer");
            fetchAllData();
        } else {
            setError(result.error || "Failed to add email");
        }
        setLoading(false);
    };
    
    const handleUpdateApplicationStatus = async (applicationId: string, status: "pending" | "approved" | "rejected") => {
        setLoading(true);
        const { error } = await supabase.from("dealer_applications").update({ status }).eq("id", applicationId);
        if (!error) {
            setSuccess(`Application ${status} successfully`);
            fetchAllData();
        } else {
            setError("Failed to update application status");
        }
        setLoading(false);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Admin Settings</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Add Pre-approved Email</CardTitle>
                        <CardDescription>Add emails that can sign up with specific roles</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                        </div>
                        <div>
                            <Label htmlFor="role">Role</Label>
                            <Select value={newEmailRole} onValueChange={(value) => setNewEmailRole(value as any)}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="customer">Customer</SelectItem>
                                    <SelectItem value="dealer">Dealer</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button onClick={handleAddPreApprovedEmail} disabled={loading}>
                            <Plus className="h-4 w-4 mr-2" />
                            {loading ? "Adding..." : "Add Email"}
                        </Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Pre-approved Emails</CardTitle>
                        <CardDescription>Manage pre-approved email addresses</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader><TableRow><TableHead>Email</TableHead><TableHead>Role</TableHead><TableHead>Used</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {preApprovedEmails.map((email) => (
                                    <TableRow key={email.id}>
                                        <TableCell>{email.email}</TableCell>
                                        <TableCell><Badge variant={email.role === "admin" ? "destructive" : "default"}>{email.role}</Badge></TableCell>
                                        <TableCell><Badge variant={email.used ? "default" : "secondary"}>{email.used ? "Used" : "Unused"}</Badge></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Dealer Applications</CardTitle>
                    <CardDescription>Review and approve dealer applications</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Business Name</TableHead><TableHead>Contact</TableHead><TableHead>Email</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {applications.map((app) => (
                                <TableRow key={app.id}>
                                    <TableCell>{app.business_name}</TableCell>
                                    <TableCell>{app.full_name}</TableCell>
                                    <TableCell>{app.email}</TableCell>
                                    <TableCell><Badge variant={app.status === "approved" ? "default" : "secondary"}>{app.status}</Badge></TableCell>
                                    <TableCell>
                                        {app.status === "pending" && (
                                            <div className="flex space-x-2">
                                                <Button size="sm" onClick={() => handleUpdateApplicationStatus(app.id, "approved")} disabled={loading}><CheckCircle className="h-4 w-4 mr-1" />Approve</Button>
                                                <Button size="sm" variant="destructive" onClick={() => handleUpdateApplicationStatus(app.id, "rejected")} disabled={loading}><XCircle className="h-4 w-4 mr-1" />Reject</Button>
                                            </div>
                                        )}
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
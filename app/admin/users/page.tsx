"use client";

import { useState, useEffect } from "react";
import { useAdminActions } from "@/hooks/useAdminActions";
import type { UserProfile } from "@/types/database";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label"; // <-- ADD THIS LINE
import { Edit } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function UsersPage() {
    const { updateUserRole } = useAdminActions();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
    const [newRole, setNewRole] = useState<"admin" | "dealer" | "customer">("customer");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        const { data } = await supabase.from("user_profiles").select("*").order("created_at", { ascending: false });
        setUsers(data || []);
        setLoading(false);
    };

    const handleUpdateUserRole = async () => {
        if (!selectedUser) return;
        setLoading(true);
        const result = await updateUserRole(selectedUser.id, newRole);
        if (result.success) {
            setSuccess("User role updated successfully");
            setSelectedUser(null);
            fetchUsers();
        } else {
            setError(result.error || "Failed to update user role");
        }
        setLoading(false);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">User Management</h1>
            <Card>
                <CardHeader>
                    <CardTitle>All Users</CardTitle>
                    <CardDescription>Manage all users in the system</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Joined</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.full_name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={user.user_type === "admin" ? "destructive" : user.user_type === "dealer" ? "default" : "secondary"}>
                                            {user.user_type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="sm" onClick={() => setSelectedUser(user)}>
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Update User Role</DialogTitle>
                                                    <DialogDescription>Change the role for {user.full_name}</DialogDescription>
                                                </DialogHeader>
                                                <div className="space-y-4">
                                                    <Label htmlFor="role">Role</Label>
                                                    <Select value={newRole} onValueChange={(value) => setNewRole(value as any)}>
                                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="customer">Customer</SelectItem>
                                                            <SelectItem value="dealer">Dealer</SelectItem>
                                                            <SelectItem value="admin">Admin</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <DialogFooter>
                                                    <Button onClick={handleUpdateUserRole} disabled={loading}>
                                                        {loading ? "Updating..." : "Update Role"}
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
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
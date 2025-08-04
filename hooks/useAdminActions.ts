"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export function useAdminActions() {
  const [loading, setLoading] = useState(false)

  const addPreApprovedEmail = async (email: string, role: "admin" | "dealer" | "customer") => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("pre_approved_emails")
        .insert({
          email,
          role,
        })
        .select()
        .single()

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true, data }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    } finally {
      setLoading(false)
    }
  }

  const getPreApprovedEmails = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("pre_approved_emails")
        .select("*")
        .order("created_at", { ascending: false })

      return { data: data || [], error }
    } catch (error) {
      return { data: [], error }
    } finally {
      setLoading(false)
    }
  }

  const removePreApprovedEmail = async (id: string) => {
    setLoading(true)
    try {
      const { error } = await supabase.from("pre_approved_emails").delete().eq("id", id)

      return { error }
    } catch (error) {
      return { error }
    } finally {
      setLoading(false)
    }
  }

  const updateUserRole = async (userId: string, newRole: "customer" | "dealer" | "admin") => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .update({ user_type: newRole })
        .eq("id", userId)
        .select()
        .single()

      if (error) {
        return { success: false, error: error.message }
      }

      // If changing to dealer, create dealer record
      if (newRole === "dealer" && data) {
        const { error: dealerError } = await supabase.from("dealers").insert({
          user_id: userId,
          business_name: data.full_name,
          business_address: "Address to be updated",
          phone: data.phone || "",
          email: data.email,
          status: "pending",
        })

        if (dealerError) {
          console.error("Error creating dealer record:", dealerError)
        }
      }

      return { success: true, data }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    } finally {
      setLoading(false)
    }
  }

  const getAllUsers = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.from("user_profiles").select("*").order("created_at", { ascending: false })

      return { data: data || [], error }
    } catch (error) {
      return { data: [], error }
    } finally {
      setLoading(false)
    }
  }

  const getDashboardStats = async () => {
    setLoading(true)
    try {
      const [usersResult, ordersResult, dealersResult, inquiriesResult] = await Promise.all([
        supabase.from("user_profiles").select("id, user_type"),
        supabase.from("orders").select("id, amount, status, payment_status"),
        supabase.from("dealers").select("id, status"),
        supabase.from("contact_inquiries").select("id, status"),
      ])

      const stats = {
        totalUsers: usersResult.data?.length || 0,
        totalCustomers: usersResult.data?.filter((u) => u.user_type === "customer").length || 0,
        totalDealers: usersResult.data?.filter((u) => u.user_type === "dealer").length || 0,
        totalAdmins: usersResult.data?.filter((u) => u.user_type === "admin").length || 0,
        totalOrders: ordersResult.data?.length || 0,
        pendingOrders: ordersResult.data?.filter((o) => o.status === "pending").length || 0,
        completedOrders: ordersResult.data?.filter((o) => o.status === "delivered").length || 0,
        totalRevenue: ordersResult.data?.reduce((sum, order) => sum + (order.amount || 0), 0) || 0,
        paidRevenue:
          ordersResult.data
            ?.filter((o) => o.payment_status === "paid")
            .reduce((sum, order) => sum + (order.amount || 0), 0) || 0,
        activeDealers: dealersResult.data?.filter((d) => d.status === "active").length || 0,
        pendingDealers: dealersResult.data?.filter((d) => d.status === "pending").length || 0,
        newInquiries: inquiriesResult.data?.filter((i) => i.status === "new").length || 0,
        totalInquiries: inquiriesResult.data?.length || 0,
      }

      return { data: stats, error: null }
    } catch (error) {
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    addPreApprovedEmail,
    getPreApprovedEmails,
    removePreApprovedEmail,
    updateUserRole,
    getAllUsers,
    getDashboardStats,
  }
}

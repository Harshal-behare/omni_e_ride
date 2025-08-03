"use client"

import { useState, useEffect } from "react"
import { supabase, type Order } from "@/lib/supabase"
import { useAuth } from "./useAuth"

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user, userProfile } = useAuth()

  useEffect(() => {
    if (user && userProfile) {
      fetchOrders()
    }
  }, [user, userProfile])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      let query = supabase
        .from("orders")
        .select(`
          *,
          models (*)
        `)
        .order("created_at", { ascending: false })

      // Filter based on user type
      if (userProfile?.user_type === "customer") {
        query = query.eq("user_id", user?.id)
      } else if (userProfile?.user_type === "dealer") {
        // For dealers, show orders from their area or assigned to them
        // This would need more complex logic based on your business rules
      }
      // Admins see all orders

      const { data, error } = await query

      if (error) throw error
      setOrders(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const createOrder = async (orderData: Omit<Order, "id" | "created_at" | "updated_at">) => {
    try {
      setLoading(true)

      const { data, error } = await supabase.from("orders").insert([orderData]).select().single()

      if (error) throw error

      await fetchOrders()
      return { data, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
      return { data: null, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (id: string, status: Order["status"]) => {
    try {
      const { error } = await supabase.from("orders").update({ status }).eq("id", id)

      if (error) throw error

      setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, status } : order)))

      return { error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
      return { error: errorMessage }
    }
  }

  const updatePaymentStatus = async (id: string, paymentStatus: Order["payment_status"]) => {
    try {
      const { error } = await supabase.from("orders").update({ payment_status: paymentStatus }).eq("id", id)

      if (error) throw error

      setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, payment_status: paymentStatus } : order)))

      return { error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
      return { error: errorMessage }
    }
  }

  const getOrderStats = () => {
    const stats = {
      total: orders.length,
      pending: orders.filter((o) => o.status === "pending").length,
      confirmed: orders.filter((o) => o.status === "confirmed").length,
      processing: orders.filter((o) => o.status === "processing").length,
      shipped: orders.filter((o) => o.status === "shipped").length,
      delivered: orders.filter((o) => o.status === "delivered").length,
      cancelled: orders.filter((o) => o.status === "cancelled").length,
      totalRevenue: orders.filter((o) => o.payment_status === "paid").reduce((sum, o) => sum + o.amount, 0),
    }
    return stats
  }

  return {
    orders,
    loading,
    error,
    createOrder,
    updateOrderStatus,
    updatePaymentStatus,
    refetch: fetchOrders,
    getOrderStats,
  }
}

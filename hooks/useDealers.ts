"use client"

import { useState, useEffect } from "react"
import { supabase, type Dealer } from "@/lib/supabase"
import { useAuth } from "./useAuth"

export function useDealers() {
  const [dealers, setDealers] = useState<Dealer[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user, userProfile } = useAuth()

  useEffect(() => {
    fetchDealers()
  }, [user, userProfile])

  const fetchDealers = async () => {
    try {
      setLoading(true)
      let query = supabase
        .from("dealers")
        .select(`
          *,
          users:user_profiles (full_name, email, phone)
        `)
        .order("created_at", { ascending: false })

      // Filter based on user type
      if (userProfile?.user_type === "dealer") {
        query = query.eq("user_id", user?.id)
      }
      // Customers see only active dealers, admins see all
      if (userProfile?.user_type === "customer" || !userProfile) {
        query = query.in("status", ["approved", "active"])
      }

      const { data, error } = await query

      if (error) throw error
      setDealers(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const createDealer = async (dealerData: Omit<Dealer, "id" | "created_at" | "updated_at">) => {
    try {
      setLoading(true)

      const { data, error } = await supabase.from("dealers").insert([dealerData]).select().single()

      if (error) throw error

      await fetchDealers()
      return { data, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
      return { data: null, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const updateDealerStatus = async (id: string, status: Dealer["status"]) => {
    try {
      const { error } = await supabase.from("dealers").update({ status }).eq("id", id)

      if (error) throw error

      setDealers((prev) => prev.map((dealer) => (dealer.id === id ? { ...dealer, status } : dealer)))

      return { error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
      return { error: errorMessage }
    }
  }

  const updateDealerSales = async (id: string, monthlySales: number, totalSales: number) => {
    try {
      const { error } = await supabase
        .from("dealers")
        .update({ monthly_sales: monthlySales, total_sales: totalSales })
        .eq("id", id)

      if (error) throw error

      setDealers((prev) =>
        prev.map((dealer) =>
          dealer.id === id ? { ...dealer, monthly_sales: monthlySales, total_sales: totalSales } : dealer,
        ),
      )

      return { error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
      return { error: errorMessage }
    }
  }

  const getDealerStats = () => {
    const stats = {
      total: dealers.length,
      pending: dealers.filter((d) => d.status === "pending").length,
      approved: dealers.filter((d) => d.status === "approved").length,
      active: dealers.filter((d) => d.status === "active").length,
      inactive: dealers.filter((d) => d.status === "inactive").length,
      totalSales: dealers.reduce((sum, dealer) => sum + dealer.total_sales, 0),
      totalMonthlySales: dealers.reduce((sum, dealer) => sum + dealer.monthly_sales, 0),
    }
    return stats
  }

  return {
    dealers,
    loading,
    error,
    createDealer,
    updateDealerStatus,
    updateDealerSales,
    refetch: fetchDealers,
    getDealerStats,
  }
}

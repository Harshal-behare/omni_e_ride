"use client"

import { useState, useEffect } from "react"
import { supabase, type Inventory } from "@/lib/supabase"
import { useAuth } from "./useAuth"

export function useInventory() {
  const [inventory, setInventory] = useState<Inventory[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user, userProfile } = useAuth()

  useEffect(() => {
    if (user && userProfile) {
      fetchInventory()
    }
  }, [user, userProfile])

  const fetchInventory = async () => {
    try {
      setLoading(true)
      let query = supabase
        .from("inventory")
        .select(`
          *,
          dealers (*),
          models (*)
        `)
        .order("last_updated", { ascending: false })

      // Filter based on user type
      if (userProfile?.user_type === "dealer") {
        query = query.eq("dealer_id", user?.id)
      }
      // Admins see all inventory

      const { data, error } = await query

      if (error) throw error
      setInventory(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const addInventoryItem = async (modelId: number, stockQuantity: number) => {
    if (!user || userProfile?.user_type !== "dealer") {
      return { data: null, error: "Unauthorized" }
    }

    try {
      setLoading(true)

      const { data, error } = await supabase
        .from("inventory")
        .insert([
          {
            dealer_id: user.id,
            model_id: modelId,
            stock_quantity: stockQuantity,
            reserved_quantity: 0,
          },
        ])
        .select()
        .single()

      if (error) throw error

      await fetchInventory()
      return { data, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
      return { data: null, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const updateStock = async (id: string, newStockQuantity: number) => {
    try {
      const { error } = await supabase.from("inventory").update({ stock_quantity: newStockQuantity }).eq("id", id)

      if (error) throw error

      setInventory((prev) =>
        prev.map((item) => (item.id === id ? { ...item, stock_quantity: newStockQuantity } : item)),
      )

      return { error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
      return { error: errorMessage }
    }
  }

  const reserveStock = async (id: string, quantity: number) => {
    try {
      const item = inventory.find((i) => i.id === id)
      if (!item) return { error: "Item not found" }

      const newReservedQuantity = item.reserved_quantity + quantity

      const { error } = await supabase.from("inventory").update({ reserved_quantity: newReservedQuantity }).eq("id", id)

      if (error) throw error

      setInventory((prev) =>
        prev.map((item) => (item.id === id ? { ...item, reserved_quantity: newReservedQuantity } : item)),
      )

      return { error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
      return { error: errorMessage }
    }
  }

  const getInventoryStats = () => {
    const stats = {
      totalItems: inventory.length,
      totalStock: inventory.reduce((sum, item) => sum + item.stock_quantity, 0),
      totalReserved: inventory.reduce((sum, item) => sum + item.reserved_quantity, 0),
      lowStock: inventory.filter((item) => item.stock_quantity - item.reserved_quantity <= 5).length,
      outOfStock: inventory.filter((item) => item.stock_quantity - item.reserved_quantity <= 0).length,
    }
    return stats
  }

  const getLowStockItems = () => {
    return inventory.filter((item) => item.stock_quantity - item.reserved_quantity <= 5)
  }

  return {
    inventory,
    loading,
    error,
    addInventoryItem,
    updateStock,
    reserveStock,
    refetch: fetchInventory,
    getInventoryStats,
    getLowStockItems,
  }
}

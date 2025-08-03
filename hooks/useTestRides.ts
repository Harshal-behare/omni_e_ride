"use client"

import { useState, useEffect } from "react"
import { supabase, type TestRideBooking } from "@/lib/supabase"
import { useAuth } from "./useAuth"

export function useTestRides() {
  const [bookings, setBookings] = useState<TestRideBooking[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user, userProfile } = useAuth()

  useEffect(() => {
    if (user && userProfile) {
      fetchBookings()
    }
  }, [user, userProfile])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      let query = supabase
        .from("test_ride_bookings")
        .select(`
          *,
          models (*)
        `)
        .order("created_at", { ascending: false })

      // Filter based on user type
      if (userProfile?.user_type === "customer") {
        query = query.eq("user_id", user?.id)
      } else if (userProfile?.user_type === "dealer") {
        query = query.eq("dealer_id", user?.id)
      }
      // Admins see all bookings

      const { data, error } = await query

      if (error) throw error
      setBookings(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const createBooking = async (
    bookingData: Omit<TestRideBooking, "id" | "created_at" | "updated_at" | "booking_id">,
  ) => {
    try {
      setLoading(true)

      // Generate booking ID
      const bookingId = `TR${Date.now()}`

      const { data, error } = await supabase
        .from("test_ride_bookings")
        .insert([{ ...bookingData, booking_id: bookingId }])
        .select()
        .single()

      if (error) throw error

      await fetchBookings()
      return { data, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
      return { data: null, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const updateBookingStatus = async (id: string, status: TestRideBooking["status"], notes?: string) => {
    try {
      const updates: any = { status }
      if (notes) updates.notes = notes

      const { error } = await supabase.from("test_ride_bookings").update(updates).eq("id", id)

      if (error) throw error

      setBookings((prev) =>
        prev.map((booking) => (booking.id === id ? { ...booking, status, notes: notes || booking.notes } : booking)),
      )

      return { error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
      return { error: errorMessage }
    }
  }

  const getBookingStats = () => {
    const stats = {
      total: bookings.length,
      pending: bookings.filter((b) => b.status === "pending").length,
      confirmed: bookings.filter((b) => b.status === "confirmed").length,
      completed: bookings.filter((b) => b.status === "completed").length,
      cancelled: bookings.filter((b) => b.status === "cancelled").length,
    }
    return stats
  }

  return {
    bookings,
    loading,
    error,
    createBooking,
    updateBookingStatus,
    refetch: fetchBookings,
    getBookingStats,
  }
}

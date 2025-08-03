"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export interface DealerApplication {
  id: string
  full_name: string
  email: string
  phone: string
  business_name: string
  business_address: string
  city: string
  state: string
  pincode: string
  business_type: string
  experience_years?: number
  investment_capacity: string
  expected_sales?: number
  territory_preference?: string[]
  additional_info?: string
  status: "pending" | "approved" | "rejected"
  created_at: string
  updated_at: string
  reviewed_by?: string
  reviewed_at?: string
}

export function useDealerApplications() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitApplication = async (
    applicationData: Omit<DealerApplication, "id" | "status" | "created_at" | "updated_at">,
  ) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: submitError } = await supabase
        .from("dealer_applications")
        .insert([applicationData])
        .select()
        .single()

      if (submitError) {
        throw submitError
      }

      return { data, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to submit application"
      setError(errorMessage)
      return { data: null, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const fetchApplications = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from("dealer_applications")
        .select("*")
        .order("created_at", { ascending: false })

      if (fetchError) {
        throw fetchError
      }

      return { data: data || [], error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch applications"
      setError(errorMessage)
      return { data: [], error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const updateApplicationStatus = async (id: string, status: "approved" | "rejected", reviewedBy: string) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: updateError } = await supabase
        .from("dealer_applications")
        .update({
          status,
          reviewed_by: reviewedBy,
          reviewed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single()

      if (updateError) {
        throw updateError
      }

      return { data, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update application"
      setError(errorMessage)
      return { data: null, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    submitApplication,
    fetchApplications,
    updateApplicationStatus,
  }
}

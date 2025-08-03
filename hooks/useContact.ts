"use client"

import { useState, useEffect } from "react"
import { supabase, type ContactInquiry } from "@/lib/supabase"
import { useAuth } from "./useAuth"

export function useContact() {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user, userProfile } = useAuth()

  useEffect(() => {
    if (user && userProfile && userProfile.user_type === "admin") {
      fetchInquiries()
    }
  }, [user, userProfile])

  const fetchInquiries = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("contact_inquiries")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setInquiries(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const createInquiry = async (
    inquiryData: Omit<ContactInquiry, "id" | "created_at" | "updated_at" | "status" | "assigned_to" | "response">,
  ) => {
    try {
      setLoading(true)

      const { data, error } = await supabase.from("contact_inquiries").insert([inquiryData]).select().single()

      if (error) throw error

      return { data, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
      return { data: null, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const updateInquiryStatus = async (id: string, status: ContactInquiry["status"], response?: string) => {
    try {
      const updates: any = { status }
      if (response) updates.response = response

      const { error } = await supabase.from("contact_inquiries").update(updates).eq("id", id)

      if (error) throw error

      setInquiries((prev) =>
        prev.map((inquiry) =>
          inquiry.id === id ? { ...inquiry, status, response: response || inquiry.response } : inquiry,
        ),
      )

      return { error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
      return { error: errorMessage }
    }
  }

  const assignInquiry = async (id: string, assignedTo: string) => {
    try {
      const { error } = await supabase
        .from("contact_inquiries")
        .update({ assigned_to: assignedTo, status: "in_progress" })
        .eq("id", id)

      if (error) throw error

      setInquiries((prev) =>
        prev.map((inquiry) =>
          inquiry.id === id ? { ...inquiry, assigned_to: assignedTo, status: "in_progress" as const } : inquiry,
        ),
      )

      return { error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
      return { error: errorMessage }
    }
  }

  const getInquiryStats = () => {
    const stats = {
      total: inquiries.length,
      new: inquiries.filter((i) => i.status === "new").length,
      inProgress: inquiries.filter((i) => i.status === "in_progress").length,
      resolved: inquiries.filter((i) => i.status === "resolved").length,
    }
    return stats
  }

  return {
    inquiries,
    loading,
    error,
    createInquiry,
    updateInquiryStatus,
    assignInquiry,
    refetch: fetchInquiries,
    getInquiryStats,
  }
}

"use client"

import { useState, useEffect } from "react"
import { supabase, type Model } from "@/lib/supabase"

export function useModels() {
  const [models, setModels] = useState<Model[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchModels()
  }, [])

  const fetchModels = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("models")
        .select("*")
        .eq("is_active", true)
        .order("price", { ascending: true })

      if (error) throw error
      setModels(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const getModelById = async (id: number) => {
    try {
      const { data, error } = await supabase.from("models").select("*").eq("id", id).single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  const createModel = async (modelData: Omit<Model, "id" | "created_at" | "updated_at">) => {
    try {
      const { data, error } = await supabase.from("models").insert([modelData]).select().single()

      if (error) throw error
      await fetchModels()
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  const updateModel = async (id: number, updates: Partial<Model>) => {
    try {
      const { data, error } = await supabase.from("models").update(updates).eq("id", id).select().single()

      if (error) throw error
      await fetchModels()
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  const deleteModel = async (id: number) => {
    try {
      const { error } = await supabase.from("models").update({ is_active: false }).eq("id", id)

      if (error) throw error
      await fetchModels()
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  return {
    models,
    loading,
    error,
    fetchModels,
    getModelById,
    createModel,
    updateModel,
    deleteModel,
  }
}

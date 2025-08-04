"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"

export interface Model {
  id: string
  name: string
  description: string
  price: number
  specifications: {
    range: string
    top_speed: string
    charging_time: string
    battery: string
    weight: string
    motor_power: string
    features: string[]
    colors: string[]
    [key: string]: any
  }
  main_image: string
  gallery: string[]
  created_at: string
  updated_at: string
}

export function useModels() {
  const [models, setModels] = useState<Model[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchModels = async () => {
    try {
      setLoading(true)
      setError(null)

      const supabase = createClient()
      const { data, error: fetchError } = await supabase
        .from('models')
        .select('*')
        .order('created_at', { ascending: true })

      if (fetchError) {
        console.error('Error fetching models:', fetchError)
        setError(fetchError.message)
        return
      }

      setModels(data || [])
    } catch (err) {
      console.error('Error in fetchModels:', err)
      setError('Failed to fetch models')
    } finally {
      setLoading(false)
    }
  }

  const getModelById = async (id: string): Promise<Model | null> => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('models')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching model:', error)
        return null
      }

      return data
    } catch (err) {
      console.error('Error in getModelById:', err)
      return null
    }
  }

  useEffect(() => {
    fetchModels()
  }, [])

  return {
    models,
    loading,
    error,
    refetch: fetchModels,
    getModelById
  }
}

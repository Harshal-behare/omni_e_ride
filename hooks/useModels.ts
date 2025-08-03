"use client"

import { useState, useEffect } from "react"

export interface Model {
  id: string
  name: string
  description: string
  price: number
  range: string
  top_speed: string
  charging_time: string
  battery: string
  image_url?: string
  features: string[]
  specifications: Record<string, string>
  colors: string[]
  status: string
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

      // Mock data for now since we're having RLS issues
      const mockModels: Model[] = [
        {
          id: "1",
          name: "Omni Swift",
          description: "Perfect for daily commuting with excellent range and reliability.",
          price: 43000,
          range: "60km",
          top_speed: "25km/h",
          charging_time: "4-5 hours",
          battery: "48V 20Ah",
          image_url: "/placeholder.svg?height=300&width=400&text=Omni+Swift",
          features: ["LED Headlight", "Digital Display", "USB Charging"],
          specifications: {
            "Motor Power": "250W",
            Battery: "48V 20Ah",
            Range: "60km",
            "Top Speed": "25km/h",
            "Charging Time": "4-5 hours",
          },
          colors: ["Red", "Blue", "Black"],
          status: "active",
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2024-01-01T00:00:00Z",
        },
        {
          id: "2",
          name: "Omni Power",
          description: "High-performance scooter with powerful motor and extended range.",
          price: 75000,
          range: "80km",
          top_speed: "45km/h",
          charging_time: "3-4 hours",
          battery: "60V 30Ah",
          image_url: "/placeholder.svg?height=300&width=400&text=Omni+Power",
          features: ["LED Headlight", "Digital Display", "Anti-theft Alarm", "USB Charging"],
          specifications: {
            "Motor Power": "800W",
            Battery: "60V 30Ah",
            Range: "80km",
            "Top Speed": "45km/h",
            "Charging Time": "3-4 hours",
          },
          colors: ["White", "Silver", "Black"],
          status: "active",
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2024-01-01T00:00:00Z",
        },
        {
          id: "3",
          name: "Omni Elite",
          description: "Premium electric scooter with advanced features and superior performance.",
          price: 95000,
          range: "100km",
          top_speed: "60km/h",
          charging_time: "2-3 hours",
          battery: "72V 35Ah",
          image_url: "/placeholder.svg?height=300&width=400&text=Omni+Elite",
          features: ["LED Headlight", "Digital Display", "Anti-theft Alarm", "USB Charging", "Bluetooth"],
          specifications: {
            "Motor Power": "1200W",
            Battery: "72V 35Ah",
            Range: "100km",
            "Top Speed": "60km/h",
            "Charging Time": "2-3 hours",
          },
          colors: ["Black", "Red", "Blue"],
          status: "active",
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2024-01-01T00:00:00Z",
        },
      ]

      setModels(mockModels)
    } catch (err: any) {
      setError(err.message)
      console.error("Error fetching models:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchModels()
  }, [])

  return {
    models,
    loading,
    error,
    fetchModels,
  }
}

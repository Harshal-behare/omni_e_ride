"use client"

import { useState, useEffect } from "react"

export interface Dealer {
  id: string
  name: string
  location: string
  address: string
  phone: string
  email: string
  manager_name: string
  status: string
  monthly_sales: number
  total_sales: number
  created_at: string
  updated_at: string
}

export function useDealers() {
  const [dealers, setDealers] = useState<Dealer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDealers = async () => {
    try {
      setLoading(true)
      setError(null)

      // Mock data for now since we're having RLS issues
      const mockDealers: Dealer[] = [
        {
          id: "1",
          name: "Omni E-Ride Patna Central",
          location: "Patna",
          address: "Gandhi Maidan, Near GPO, Patna, Bihar 800001",
          phone: "+91 9876543210",
          email: "patna@omnierride.com",
          manager_name: "Rajesh Kumar",
          status: "active",
          monthly_sales: 25,
          total_sales: 150,
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2024-01-01T00:00:00Z",
        },
        {
          id: "2",
          name: "Omni E-Ride Muzaffarpur",
          location: "Muzaffarpur",
          address: "Station Road, Near Railway Station, Muzaffarpur, Bihar 842001",
          phone: "+91 9876543211",
          email: "muzaffarpur@omnierride.com",
          manager_name: "Priya Singh",
          status: "active",
          monthly_sales: 18,
          total_sales: 95,
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2024-01-01T00:00:00Z",
        },
        {
          id: "3",
          name: "Omni E-Ride Gaya",
          location: "Gaya",
          address: "Civil Lines, Main Market, Gaya, Bihar 823001",
          phone: "+91 9876543212",
          email: "gaya@omnierride.com",
          manager_name: "Amit Sharma",
          status: "active",
          monthly_sales: 22,
          total_sales: 120,
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2024-01-01T00:00:00Z",
        },
      ]

      setDealers(mockDealers)
    } catch (err: any) {
      setError(err.message)
      console.error("Error fetching dealers:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDealers()
  }, [])

  return {
    dealers,
    loading,
    error,
    fetchDealers,
  }
}

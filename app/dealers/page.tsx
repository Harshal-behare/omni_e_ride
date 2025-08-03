"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MapPin, Phone, Mail, User, Search, Filter, Store, Navigation, Clock, Star } from "lucide-react"
import Link from "next/link"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

interface PublicDealer {
  id: string
  business_name: string
  business_address: string
  phone: string
  email: string
  status: string
  created_at: string
}

export default function DealersPage() {
  const [dealers, setDealers] = useState<PublicDealer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCity, setSelectedCity] = useState("")

  const fetchDealers = async () => {
    try {
      setLoading(true)
      setError(null)

      // Public query - no authentication required
      const { data, error: fetchError } = await supabase
        .from("dealers")
        .select("id, business_name, business_address, phone, email, status, created_at")
        .eq("status", "approved")
        .order("created_at", { ascending: false })

      if (fetchError) {
        throw fetchError
      }

      setDealers(data || [])
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

  const filteredDealers = dealers.filter((dealer) => {
    const matchesSearch =
      dealer.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dealer.business_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dealer.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCity = selectedCity === "" || dealer.business_address.toLowerCase().includes(selectedCity.toLowerCase())

    return matchesSearch && matchesCity
  })

  const cities = Array.from(new Set(dealers.map((dealer) => {
    // Extract city from business_address (simple approach)
    const addressParts = dealer.business_address.split(',').map(part => part.trim())
    return addressParts[addressParts.length - 2] || addressParts[addressParts.length - 1] || 'Unknown'
  }))).sort()

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#3CB043] to-[#2D7A32] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center">
                <Skeleton className="h-12 w-64 mx-auto mb-4 bg-white/20" />
                <Skeleton className="h-6 w-96 mx-auto bg-white/20" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-80" />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#3CB043] to-[#2D7A32] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Find Our Dealers</h1>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Locate authorized OMNI E-RIDE dealers near you for test rides, purchases, and service
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by dealer name, location, or manager..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="md:w-48">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3CB043] focus:border-transparent"
                >
                  <option value="">All Cities</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <Button onClick={fetchDealers} variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-8">
              <AlertDescription>Error loading dealers: {error}. Please try refreshing the page.</AlertDescription>
            </Alert>
          )}

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Store className="h-8 w-8 text-[#3CB043]" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Dealers</p>
                    <p className="text-2xl font-bold text-gray-900">{dealers.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <MapPin className="h-8 w-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Cities Covered</p>
                    <p className="text-2xl font-bold text-gray-900">{cities.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Star className="h-8 w-8 text-yellow-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Customer Rating</p>
                    <p className="text-2xl font-bold text-gray-900">4.8★</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Dealers Grid */}
          {filteredDealers.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Store className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Dealers Found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || selectedCity
                    ? "No dealers match your search criteria. Try adjusting your filters."
                    : "No active dealers available at the moment."}
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCity("")
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDealers.map((dealer) => (
                <Card key={dealer.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg font-bold text-gray-900">{dealer.business_name}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {dealer.business_address.split(',').slice(-2).join(', ')}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <Clock className="h-3 w-3 mr-1" />
                        Open
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="font-medium">Status:</span>
                        <span className="ml-1 capitalize">{dealer.status}</span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        <a href={`tel:${dealer.phone}`} className="hover:text-[#3CB043] transition-colors">
                          {dealer.phone}
                        </a>
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        <a href={`mailto:${dealer.email}`} className="hover:text-[#3CB043] transition-colors">
                          {dealer.email}
                        </a>
                      </div>

                      <div className="flex items-start text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                        <span>{dealer.business_address}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button
                        className="flex-1"
                        size="sm"
                        onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(dealer.business_address)}`)}
                      >
                        <Navigation className="h-4 w-4 mr-1" />
                        Directions
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => window.open(`tel:${dealer.phone}`)}
                      >
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-16 bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Want to Become a Dealer?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join our growing network of authorized dealers and be part of the electric revolution. Expand your
              business with OMNI E-RIDE's premium electric scooters.
            </p>
            <Link href="/dealer-application">
              <Button size="lg" className="bg-[#3CB043] hover:bg-[#2D7A32]">
                <Store className="h-5 w-5 mr-2" />
                Apply to Become a Dealer
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

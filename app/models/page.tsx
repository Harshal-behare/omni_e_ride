"use client"

import { useEffect } from "react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { useModels } from "@/hooks/useModels"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, Battery, Zap, Clock, Gauge } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Models() {
  const { models, loading, error, fetchModels } = useModels()

  useEffect(() => {
    fetchModels()
  }, [])

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Loading models...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error loading models: {error}</p>
            <Button onClick={fetchModels}>Try Again</Button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />

      <section className="py-24 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1F2937] mb-4">Our Electric Scooter Models</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our range of eco-friendly electric scooters designed for modern urban mobility. Each model
              combines cutting-edge technology with sustainable transportation.
            </p>
          </div>

          {models.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No models available at the moment. Please check back later.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {models.map((model) => (
                <Card key={model.id} className="hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative h-64 bg-gray-100">
                    <Image
                      src={
                        model.image_url ||
                        `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(model.name)}`
                      }
                      alt={model.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-[#3CB043] text-white">₹{model.price.toLocaleString()}</Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl text-[#1F2937]">{model.name}</CardTitle>
                    <p className="text-gray-600 text-sm line-clamp-2">{model.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Key Specifications */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Battery className="h-4 w-4 text-[#3CB043]" />
                        <div>
                          <p className="text-xs text-gray-500">Range</p>
                          <p className="text-sm font-medium">{model.range}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Gauge className="h-4 w-4 text-[#3CB043]" />
                        <div>
                          <p className="text-xs text-gray-500">Top Speed</p>
                          <p className="text-sm font-medium">{model.top_speed}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-[#3CB043]" />
                        <div>
                          <p className="text-xs text-gray-500">Charging</p>
                          <p className="text-sm font-medium">{model.charging_time}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-[#3CB043]" />
                        <div>
                          <p className="text-xs text-gray-500">Battery</p>
                          <p className="text-sm font-medium">{model.battery}</p>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    {model.features && model.features.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Key Features:</p>
                        <div className="flex flex-wrap gap-1">
                          {model.features.slice(0, 3).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {model.features.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{model.features.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Colors */}
                    {model.colors && model.colors.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Available Colors:</p>
                        <div className="flex flex-wrap gap-1">
                          {model.colors.map((color, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {color}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-4">
                      <Link href={`/models/${model.id}`} className="flex-1">
                        <Button variant="outline" className="w-full bg-transparent">
                          View Details
                        </Button>
                      </Link>
                      <Button className="flex-1 bg-[#3CB043] hover:bg-[#2D7A32]">Book Test Ride</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center mt-16">
            <h2 className="text-2xl font-bold text-[#1F2937] mb-4">Ready to Go Electric?</h2>
            <p className="text-gray-600 mb-8">
              Experience the future of transportation with our eco-friendly electric scooters
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#3CB043] hover:bg-[#2D7A32]">
                Schedule Test Ride
              </Button>
              <Button size="lg" variant="outline">
                Find Nearest Dealer
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

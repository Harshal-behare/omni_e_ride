"use client"

import { useState, useEffect, use } from "react"
import { notFound } from "next/navigation"
import Navbar from "../../../components/Navbar"
import Footer from "../../../components/Footer"
import { useModels, Model } from "@/hooks/useModels"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, Battery, Zap, Clock, Gauge, ArrowLeft, Heart, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ModelDetail({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params using React.use() to fix hydration mismatch
  const resolvedParams = use(params)
  const { getModelById } = useModels()
  const [model, setModel] = useState<Model | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)

  useEffect(() => {
    const fetchModel = async () => {
      setLoading(true)
      const fetchedModel = await getModelById(resolvedParams.id)
      if (fetchedModel) {
        setModel(fetchedModel)
      }
      setLoading(false)
    }

    fetchModel()
  }, [resolvedParams.id, getModelById])

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Loading model details...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (!model) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Model not found</p>
            <Link href="/models">
              <Button>Back to Models</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  // Ensure specifications exist and provide defaults
  const specs = model.specifications || {}
  const features = specs.features || []
  const colors = specs.colors || []
  const gallery = model.gallery || []

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <span>/</span>
              <Link href="/models" className="hover:text-blue-600">Models</Link>
              <span>/</span>
              <span className="text-gray-900">{model.name}</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-white">
                <Image
                  src={gallery[selectedImage] || model.main_image || `/placeholder.svg?height=600&width=600&text=${encodeURIComponent(model.name)}`}
                  alt={model.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
              {gallery.length > 0 && (
                <div className="grid grid-cols-5 gap-2">
                  {gallery.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                      }`}
                    >
                      <Image
                        src={image || `/placeholder.svg?height=120&width=120&text=${index + 1}`}
                        alt={`${model.name} ${index + 1}`}
                        width={120}
                        height={120}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{model.name}</h1>
                <p className="text-xl text-blue-600 font-semibold">₹{model.price.toLocaleString()}</p>
              </div>

              <p className="text-gray-600 leading-relaxed">{model.description}</p>

              {/* Key Specifications */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                  <Battery className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Range</p>
                    <p className="font-semibold">{specs.range || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                  <Gauge className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Top Speed</p>
                    <p className="font-semibold">{specs.top_speed || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-600">Charging Time</p>
                    <p className="font-semibold">{specs.charging_time || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="text-sm text-gray-600">Motor Power</p>
                    <p className="font-semibold">{specs.motor_power || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                  <Battery className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Battery</p>
                    <p className="font-semibold">{specs.battery || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                  <Gauge className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="text-sm text-gray-600">Weight</p>
                    <p className="font-semibold">{specs.weight || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Colors */}
              {colors.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Available Colors</h3>
                  <div className="flex space-x-2">
                    {colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(index)}
                        className={`px-4 py-2 rounded-lg border-2 text-sm ${
                          selectedColor === index
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              {features.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link href="/test-ride" className="w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                    Book Test Ride
                  </Button>
                </Link>
                <Link href="/contact" className="w-full">
                  <Button variant="outline" className="w-full py-3">
                    Contact Dealer
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Detailed Specifications */}
          <div className="mt-16">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Performance</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Range:</span>
                        <span>{model.specifications.range}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Top Speed:</span>
                        <span>{model.specifications.top_speed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Motor Power:</span>
                        <span>{model.specifications.motor_power}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Battery:</span>
                        <span>{model.specifications.battery}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Charging Time:</span>
                        <span>{model.specifications.charging_time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Physical</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Weight:</span>
                        <span>{model.specifications.weight}</span>
                      </div>
                      {model.specifications.cargo_capacity && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Cargo Capacity:</span>
                          <span>{model.specifications.cargo_capacity}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

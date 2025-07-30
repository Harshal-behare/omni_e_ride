"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TestRideModal from "./TestRideModal"
import Link from "next/link"

interface Model {
  id: number
  name: string
  price: number
  range: string
  topSpeed: string
  chargingTime: string
  battery: string
  acceleration: string
  colors: string[]
  features: string[]
  specifications: {
    motor: string
    batteryType: string
    weight: string
    loadCapacity: string
    brakes: string
    tyres: string
    groundClearance: string
    wheelbase: string
  }
  description: string
}

interface ProductDetailsProps {
  model: Model
}

export default function ProductDetails({ model }: ProductDetailsProps) {
  const [selectedColor, setSelectedColor] = useState(model.colors[0])
  const [showTestRideModal, setShowTestRideModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const colorMap: { [key: string]: string } = {
    "Pearl White": "#F8F9FA",
    "Matte Black": "#212529",
    "Electric Blue": "#0066FF",
    "Crimson Red": "#DC143C",
    "Silver Grey": "#6C757D",
    "Golden Yellow": "#FFD700",
    "Metallic Purple": "#8A2BE2",
  }

  const images = [
    `/placeholder.svg?height=600&width=800&text=${model.name}+Front+View`,
    `/placeholder.svg?height=600&width=800&text=${model.name}+Side+View`,
    `/placeholder.svg?height=600&width=800&text=${model.name}+Back+View`,
    `/placeholder.svg?height=600&width=800&text=${model.name}+Dashboard`,
    `/placeholder.svg?height=600&width=800&text=${model.name}+Interior`,
  ]

  return (
    <>
      <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                <img
                  src={images[currentImageIndex] || "/placeholder.svg"}
                  alt={`${model.name} - ${selectedColor}`}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-[#3CB043] text-white shadow-lg">360° VIEW</Badge>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex space-x-2 justify-center">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          currentImageIndex === index ? "bg-[#3CB043]" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-5 gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative rounded-lg overflow-hidden border-2 transition-colors ${
                      currentImageIndex === index ? "border-[#3CB043]" : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`View ${index + 1}`}
                      className="w-full h-16 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{model.name}</h1>
                <p className="text-xl text-gray-600 mb-4">
                  {model.acceleration} | {model.range} Range
                </p>
                <p className="text-gray-700 mb-6">{model.description}</p>
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-3xl font-bold text-[#3CB043]">₹{model.price.toLocaleString()}</span>
                  <Badge variant="outline" className="text-sm">
                    Starting Price
                  </Badge>
                </div>
              </div>

              {/* Key Specs */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-[#3CB043]">{model.range}</div>
                    <div className="text-sm text-gray-600">Range</div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-[#3CB043]">{model.topSpeed}</div>
                    <div className="text-sm text-gray-600">Top Speed</div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-[#3CB043]">{model.chargingTime}</div>
                    <div className="text-sm text-gray-600">Charging Time</div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-[#3CB043]">{model.acceleration.split(" ")[0]}</div>
                    <div className="text-sm text-gray-600">0-40 km/h</div>
                  </CardContent>
                </Card>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Choose Color</h3>
                <div className="flex space-x-3">
                  {model.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 rounded-full border-4 transition-all shadow-lg ${
                        selectedColor === color ? "border-[#3CB043] scale-110" : "border-gray-300"
                      }`}
                      style={{ backgroundColor: colorMap[color] }}
                      title={color}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">Selected: {selectedColor}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Button
                  onClick={() => setShowTestRideModal(true)}
                  className="flex-1 bg-[#3CB043] hover:bg-[#2D7A32] text-white py-3 text-lg font-semibold shadow-lg"
                >
                  Test Ride
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-[#3CB043] text-[#3CB043] hover:bg-[#3CB043] hover:text-white py-3 text-lg font-semibold bg-transparent"
                >
                  Order Now
                </Button>
              </div>

              <div className="text-center">
                <Button variant="link" className="text-[#3CB043] font-medium hover:text-[#2D7A32]">
                  Talk to our Experts →
                </Button>
              </div>

              <div className="text-center">
                <Link href="/terms" className="text-sm text-gray-500 hover:text-[#3CB043] underline">
                  Terms and Conditions Apply
                </Link>
              </div>
            </div>
          </div>

          {/* Detailed Specifications */}
          <div className="mt-16">
            <Tabs defaultValue="features" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="warranty">Warranty</TabsTrigger>
              </TabsList>

              <TabsContent value="features" className="mt-6">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {model.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-[#3CB043] rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specifications" className="mt-6">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {Object.entries(model.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between border-b pb-2">
                          <span className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                          <span className="text-gray-600">{value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="warranty" className="mt-6">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Warranty Information</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Vehicle Warranty</span>
                        <span className="text-gray-600">3 Years</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Battery Warranty</span>
                        <span className="text-gray-600">3 Years or 50,000 km</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Motor Warranty</span>
                        <span className="text-gray-600">3 Years</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium">Charger Warranty</span>
                        <span className="text-gray-600">1 Year</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <TestRideModal isOpen={showTestRideModal} onClose={() => setShowTestRideModal(false)} model={model} />
    </>
  )
}

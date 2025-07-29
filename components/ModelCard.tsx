"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import TestRideModal from "./TestRideModal"

interface Model {
  id: number
  name: string
  price: number
  range: string
  topSpeed: string
  chargingTime: string
  battery: string
}

interface ModelCardProps {
  model: Model
}

export default function ModelCard({ model }: ModelCardProps) {
  const [showTestRideModal, setShowTestRideModal] = useState(false)

  return (
    <>
      <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden bg-white">
        <div className="relative overflow-hidden">
          <img
            src={`/placeholder.svg?height=300&width=400&text=${model.name}`}
            alt={model.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4">
            <Badge className="bg-[#3CB043] text-white shadow-lg">NEW</Badge>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <CardContent className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{model.name}</h3>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl font-bold text-[#3CB043]">₹{model.price.toLocaleString()}</span>
              <Badge variant="outline" className="text-xs">
                Starting Price
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#3CB043] rounded-full"></div>
              <span className="text-gray-600">Range: {model.range}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#3CB043] rounded-full"></div>
              <span className="text-gray-600">Speed: {model.topSpeed}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#3CB043] rounded-full"></div>
              <span className="text-gray-600">Charge: {model.chargingTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#3CB043] rounded-full"></div>
              <span className="text-gray-600">Battery: {model.battery}</span>
            </div>
          </div>

          <div className="flex space-x-3">
            <Link href={`/models/${model.id}`} className="flex-1">
              <Button className="w-full bg-[#3CB043] hover:bg-[#2D7A32] text-white font-semibold py-2.5 shadow-lg">
                View Details
              </Button>
            </Link>
            <Button
              onClick={() => setShowTestRideModal(true)}
              variant="outline"
              className="flex-1 border-[#3CB043] text-[#3CB043] hover:bg-[#3CB043] hover:text-white font-semibold py-2.5 bg-transparent"
            >
              Test Ride
            </Button>
          </div>
        </CardContent>
      </Card>

      <TestRideModal isOpen={showTestRideModal} onClose={() => setShowTestRideModal(false)} model={model} />
    </>
  )
}

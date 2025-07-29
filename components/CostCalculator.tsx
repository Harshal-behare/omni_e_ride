"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Model {
  id: number
  name: string
  price: number
  range: string
}

interface CostCalculatorProps {
  model: Model
}

export default function CostCalculator({ model }: CostCalculatorProps) {
  const [dailyDistance, setDailyDistance] = useState([50])
  const [selectedState, setSelectedState] = useState("Bihar")
  const [petrolPrice, setPetrolPrice] = useState(105) // per liter
  const [electricityPrice, setElectricityPrice] = useState(6) // per unit

  // Calculate costs
  const monthlyDistance = dailyDistance[0] * 30
  const yearlyDistance = dailyDistance[0] * 365

  // Petrol scooter calculations (assuming 40 kmpl mileage)
  const petrolMileage = 40
  const monthlyPetrolCost = (monthlyDistance / petrolMileage) * petrolPrice
  const yearlyPetrolCost = (yearlyDistance / petrolMileage) * petrolPrice
  const petrolMaintenanceCost = monthlyDistance * 0.5 // ₹0.5 per km
  const petrolInsurance = 3000 // yearly
  const petrolTotalMonthlyCost = monthlyPetrolCost + petrolMaintenanceCost + petrolInsurance / 12

  // Electric scooter calculations (assuming 4 km per unit)
  const electricMileage = 4
  const monthlyElectricCost = (monthlyDistance / electricMileage) * electricityPrice
  const yearlyElectricCost = (yearlyDistance / electricMileage) * electricityPrice
  const electricMaintenanceCost = monthlyDistance * 0.1 // ₹0.1 per km
  const electricInsurance = 2000 // yearly
  const electricTotalMonthlyCost = monthlyElectricCost + electricMaintenanceCost + electricInsurance / 12

  // Savings calculation
  const monthlySavings = petrolTotalMonthlyCost - electricTotalMonthlyCost
  const yearlySavings = monthlySavings * 12

  const stateElectricityPrices: { [key: string]: number } = {
    Bihar: 6,
    "Uttar Pradesh": 6.5,
    "West Bengal": 7,
    Jharkhand: 5.5,
    Odisha: 5.8,
    Delhi: 6.2,
  }

  useEffect(() => {
    setElectricityPrice(stateElectricityPrices[selectedState] || 6)
  }, [selectedState])

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Calculate Your Savings</h2>
          <p className="text-xl text-gray-600">See how much you can save with {model.name}</p>
        </div>

        {/* Savings Display */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="text-center bg-gradient-to-br from-[#3CB043] to-[#2D7A32] text-white border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="text-4xl font-bold mb-2">₹{Math.round(yearlySavings).toLocaleString()}</div>
              <div className="text-xl opacity-90">Annual Savings</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-gradient-to-br from-[#3CB043] to-[#2D7A32] text-white border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="text-4xl font-bold mb-2">₹{Math.round(monthlySavings).toLocaleString()}</div>
              <div className="text-xl opacity-90">Monthly Savings</div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <Card className="mb-8 shadow-lg border-0">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Vehicle Type</label>
                <Select defaultValue="scooter">
                  <SelectTrigger className="border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scooter">Scooter</SelectItem>
                    <SelectItem value="bike">Bike</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Model</label>
                <Select defaultValue={model.name}>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={model.name}>{model.name}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">State</label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(stateElectricityPrices).map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <Button variant="link" className="text-[#3CB043] font-medium p-0 hover:text-[#2D7A32]">
                  Talk to our Experts →
                </Button>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Daily distance: {dailyDistance[0]}km
                </label>
                <Slider
                  value={dailyDistance}
                  onValueChange={setDailyDistance}
                  max={100}
                  min={15}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>15 Km</span>
                  <span>100 Km</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cost Comparison Chart */}
        <Card className="shadow-lg border-0">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Petrol Scooter */}
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">ICE Scooter</h3>
                <div className="relative">
                  <div className="w-full h-80 bg-gray-100 rounded-xl overflow-hidden shadow-inner">
                    {/* Fixed Cost */}
                    <div
                      className="bg-gray-800 w-full flex items-center justify-center text-white text-sm font-medium"
                      style={{ height: "20%" }}
                    >
                      Fixed Cost
                    </div>
                    {/* Maintenance */}
                    <div
                      className="bg-blue-400 w-full flex items-center justify-center text-white text-sm font-medium"
                      style={{ height: "15%" }}
                    >
                      Maintenance
                    </div>
                    {/* Running Cost */}
                    <div
                      className="bg-purple-300 w-full flex items-center justify-center text-white text-sm font-medium"
                      style={{ height: "65%" }}
                    >
                      Running Cost
                    </div>
                  </div>
                  <div className="mt-4 text-xl font-bold text-gray-800">
                    ₹{Math.round(petrolTotalMonthlyCost).toLocaleString()}/month
                  </div>
                </div>
              </div>

              {/* Electric Scooter */}
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">{model.name}</h3>
                <div className="relative">
                  <div className="w-full h-80 bg-gray-100 rounded-xl overflow-hidden shadow-inner">
                    {/* Fixed Cost */}
                    <div
                      className="bg-gray-800 w-full flex items-center justify-center text-white text-sm font-medium"
                      style={{ height: "25%" }}
                    >
                      Fixed Cost
                    </div>
                    {/* Maintenance */}
                    <div
                      className="bg-blue-400 w-full flex items-center justify-center text-white text-sm font-medium"
                      style={{ height: "8%" }}
                    >
                      Maintenance
                    </div>
                    {/* Running Cost */}
                    <div
                      className="bg-gray-600 w-full flex items-center justify-center text-white text-sm font-medium"
                      style={{ height: "12%" }}
                    >
                      Running Cost
                    </div>
                    {/* Savings */}
                    <div
                      className="bg-[#3CB043] w-full flex items-center justify-center text-white text-sm font-medium"
                      style={{ height: "55%" }}
                    >
                      Savings
                    </div>
                  </div>
                  <div className="mt-4 text-xl font-bold text-gray-800">
                    ₹{Math.round(electricTotalMonthlyCost).toLocaleString()}/month
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-800 rounded"></div>
                <span className="font-medium">Fixed cost</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-400 rounded"></div>
                <span className="font-medium">Maintenance</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-purple-300 rounded"></div>
                <span className="font-medium">Running cost</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-[#3CB043] rounded"></div>
                <span className="font-medium">Savings</span>
              </div>
            </div>

            <div className="mt-6 text-xs text-gray-500 text-center max-w-4xl mx-auto">
              *The estimated total monthly cost includes EMI, maintenance, and running expenses calculated for the price
              of {model.name}. Based on electricity and fuel prices in {selectedState} as of January 2024, with a daily
              distance of {dailyDistance[0]} kms.
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const stateElectricityRates = {
  Bihar: 4.5,
  Delhi: 5.2,
  Maharashtra: 6.1,
  Karnataka: 5.8,
  "Tamil Nadu": 5.5,
  Gujarat: 4.8,
  Rajasthan: 5.0,
  "Uttar Pradesh": 4.2,
}

export default function CostSavingsCalculator() {
  const [dailyDistance, setDailyDistance] = useState([75])
  const [selectedState, setSelectedState] = useState("Bihar")

  const calculateSavings = () => {
    const distance = dailyDistance[0]
    const electricityRate = stateElectricityRates[selectedState as keyof typeof stateElectricityRates]

    // Petrol scooter calculations (assuming 45 km/l, petrol at ₹105/l)
    const petrolConsumption = distance / 45 // liters per day
    const petrolCostPerDay = petrolConsumption * 105
    const petrolMaintenancePerDay = 15 // estimated maintenance cost
    const totalPetrolCostPerDay = petrolCostPerDay + petrolMaintenancePerDay

    // Electric scooter calculations (assuming 4 km/kWh efficiency)
    const electricConsumption = distance / 4 // kWh per day
    const electricCostPerDay = electricConsumption * electricityRate
    const electricMaintenancePerDay = 3 // much lower maintenance
    const totalElectricCostPerDay = electricCostPerDay + electricMaintenancePerDay

    const dailySavings = totalPetrolCostPerDay - totalElectricCostPerDay
    const monthlySavings = dailySavings * 30
    const annualSavings = dailySavings * 365

    return {
      dailySavings: Math.max(0, dailySavings),
      monthlySavings: Math.max(0, monthlySavings),
      annualSavings: Math.max(0, annualSavings),
      petrolMonthlyCost: totalPetrolCostPerDay * 30,
      electricMonthlyCost: totalElectricCostPerDay * 30,
    }
  }

  const savings = calculateSavings()

  return (
    <section className="py-24 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Buying an EV is money in the bank.</h2>
          <p className="text-xl text-gray-600 mb-8">Don't believe us? Calculate for yourself.</p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 md:p-12">
            {/* Savings Display */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#3CB043] mb-2">
                  ₹{Math.round(savings.annualSavings).toLocaleString()}
                </div>
                <div className="text-lg text-gray-600">Annual Savings</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#3CB043] mb-2">
                  ₹{Math.round(savings.monthlySavings).toLocaleString()}
                </div>
                <div className="text-lg text-gray-600">Monthly Savings</div>
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-8 mb-12">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-lg font-semibold text-gray-700">Daily distance: {dailyDistance[0]}km</label>
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(stateElectricityRates).map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="px-4">
                  <Slider
                    value={dailyDistance}
                    onValueChange={setDailyDistance}
                    max={100}
                    min={15}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>15 Km</span>
                    <span>100 Km</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cost Comparison Chart */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Monthly Cost Comparison</h3>
              <div className="flex justify-center items-end space-x-8 h-64">
                {/* Petrol Scooter Bar */}
                <div className="flex flex-col items-center">
                  <div
                    className="relative w-20 bg-gradient-to-t from-red-400 to-red-300 rounded-t-lg flex flex-col justify-end"
                    style={{ height: `${Math.min((savings.petrolMonthlyCost / 10000) * 200, 200)}px` }}
                  >
                    <div className="text-white text-sm font-semibold p-2 text-center">
                      ₹{Math.round(savings.petrolMonthlyCost).toLocaleString()}
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <div className="font-semibold text-gray-800">Petrol Scooter</div>
                    <div className="text-sm text-gray-600">Total Cost</div>
                  </div>
                </div>

                {/* Electric Scooter Bar */}
                <div className="flex flex-col items-center">
                  <div
                    className="relative w-20 bg-gradient-to-t from-[#3CB043] to-green-400 rounded-t-lg flex flex-col justify-end"
                    style={{ height: `${Math.min((savings.electricMonthlyCost / 10000) * 200, 200)}px` }}
                  >
                    <div className="text-white text-sm font-semibold p-2 text-center">
                      ₹{Math.round(savings.electricMonthlyCost).toLocaleString()}
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <div className="font-semibold text-gray-800">Omni E-Ride</div>
                    <div className="text-sm text-gray-600">Total Cost</div>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="flex justify-center space-x-6 mt-6 text-sm">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-800 rounded mr-2"></div>
                  <span>Fixed cost</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-400 rounded mr-2"></div>
                  <span>Maintenance</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-purple-300 rounded mr-2"></div>
                  <span>Running cost</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-[#3CB043] rounded mr-2"></div>
                  <span>Savings</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-8">
              <button className="bg-[#3CB043] text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-[#2D7A32] transition-colors inline-flex items-center">
                Talk to our Experts
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

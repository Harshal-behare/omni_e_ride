"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, CheckCircle } from "lucide-react"
import { format } from "date-fns"

interface Model {
  id: number
  name: string
  price: number
}

interface TestRideModalProps {
  isOpen: boolean
  onClose: () => void
  model: Model
}

export default function TestRideModal({ isOpen, onClose, model }: TestRideModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    dealer: "",
    date: undefined as Date | undefined,
    timeSlot: "",
  })

  const cities = ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Purnia", "Darbhanga"]
  const dealers = {
    Patna: ["Omni E-Ride Patna Showroom", "Green Wheels Patna", "Electric Zone Patna"],
    Gaya: ["Omni E-Ride Gaya Center", "Eco Motors Gaya", "Future Mobility Gaya"],
    Muzaffarpur: ["Omni E-Ride Muzaffarpur", "Clean Energy Motors", "Electric Hub Muzaffarpur"],
    Bhagalpur: ["Omni E-Ride Bhagalpur", "Green Tech Motors", "EV World Bhagalpur"],
    Purnia: ["Omni E-Ride Purnia", "Eco Ride Center", "Electric Avenue Purnia"],
    Darbhanga: ["Omni E-Ride Darbhanga", "Green Motion Motors", "EV Plaza Darbhanga"],
  }

  const timeSlots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM",
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else {
      // Generate booking ID
      const bookingId = `TR${Date.now().toString().slice(-6)}`
      setStep(3)

      // Here you would typically send the data to your backend
      console.log("Test ride booking:", { ...formData, model: model.name, bookingId })
    }
  }

  const resetForm = () => {
    setStep(1)
    setFormData({
      name: "",
      email: "",
      phone: "",
      city: "",
      dealer: "",
      date: undefined,
      timeSlot: "",
    })
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {step === 3 ? "Booking Confirmed!" : `Book Test Ride - ${model.name}`}
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Select value={formData.city} onValueChange={(value) => handleInputChange("city", value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full bg-[#3CB043] hover:bg-[#2D7A32]">
              Continue
            </Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dealer">Select Dealer *</Label>
              <Select value={formData.dealer} onValueChange={(value) => handleInputChange("dealer", value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a dealer" />
                </SelectTrigger>
                <SelectContent>
                  {formData.city &&
                    dealers[formData.city as keyof typeof dealers]?.map((dealer) => (
                      <SelectItem key={dealer} value={dealer}>
                        {dealer}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Preferred Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-transparent"
                    type="button"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => setFormData((prev) => ({ ...prev, date }))}
                    disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeSlot">Time Slot *</Label>
              <Select
                value={formData.timeSlot}
                onValueChange={(value) => handleInputChange("timeSlot", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-3">
              <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button type="submit" className="flex-1 bg-[#3CB043] hover:bg-[#2D7A32]">
                Book Test Ride
              </Button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-[#3CB043]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Test Ride Booked Successfully!</h3>
              <p className="text-gray-600 mt-2">
                Your booking ID is:{" "}
                <span className="font-bold text-[#3CB043]">TR{Date.now().toString().slice(-6)}</span>
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-left space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Model:</span>
                <span>{model.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Date:</span>
                <span>{formData.date ? format(formData.date, "PPP") : ""}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Time:</span>
                <span>{formData.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Dealer:</span>
                <span>{formData.dealer}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              You will receive a confirmation email shortly. The dealer will contact you before your scheduled test
              ride.
            </p>
            <Button onClick={handleClose} className="w-full bg-[#3CB043] hover:bg-[#2D7A32]">
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

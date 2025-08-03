"use client"

import type React from "react"

import { useState } from "react"
import { useTestRides } from "@/hooks/useTestRides"
import { useDealers } from "@/hooks/useDealers"
import { useAuthContext } from "@/components/AuthProvider"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CalendarIcon, Loader2, CheckCircle } from "lucide-react"
import { format } from "date-fns"

interface TestRideModalProps {
  isOpen: boolean
  onClose: () => void
  model?: {
    id: number
    name: string
    price: number
  }
}

export default function TestRideModal({ isOpen, onClose, model }: TestRideModalProps) {
  const { user } = useAuthContext()
  const { bookTestRide } = useTestRides()
  const { dealers } = useDealers()

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    preferred_date: undefined as Date | undefined,
    preferred_time: "",
    dealer_id: "",
    notes: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!model || !formData.preferred_date) return

    setLoading(true)
    setError("")

    try {
      const { error } = await bookTestRide({
        model_id: model.id,
        dealer_id: formData.dealer_id || undefined,
        preferred_date: format(formData.preferred_date, "yyyy-MM-dd"),
        preferred_time: formData.preferred_time,
        customer_name: formData.customer_name,
        customer_phone: formData.customer_phone,
        customer_email: formData.customer_email,
        notes: formData.notes,
      })

      if (error) {
        setError(error.message)
        return
      }

      setSuccess(true)
      setTimeout(() => {
        onClose()
        resetForm()
      }, 2000)
    } catch (err: any) {
      setError(err.message || "Failed to book test ride")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setStep(1)
    setSuccess(false)
    setError("")
    setFormData({
      customer_name: "",
      customer_phone: "",
      customer_email: "",
      preferred_date: undefined,
      preferred_time: "",
      dealer_id: "",
      notes: "",
    })
  }

  const handleClose = () => {
    onClose()
    resetForm()
  }

  const timeSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"]

  if (success) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Test Ride Booked Successfully!</h3>
            <p className="text-gray-600 mb-4">We'll contact you soon to confirm your test ride appointment.</p>
            <Button onClick={handleClose}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Book Test Ride</DialogTitle>
          <DialogDescription>
            {model ? `Book a test ride for ${model.name}` : "Book a test ride for our electric scooters"}
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Personal Information</h3>

              <div className="space-y-2">
                <Label htmlFor="customer_name">Full Name *</Label>
                <Input
                  id="customer_name"
                  value={formData.customer_name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, customer_name: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customer_phone">Phone Number *</Label>
                <Input
                  id="customer_phone"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={formData.customer_phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, customer_phone: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customer_email">Email Address *</Label>
                <Input
                  id="customer_email"
                  type="email"
                  value={formData.customer_email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, customer_email: e.target.value }))}
                  required
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!formData.customer_name || !formData.customer_phone || !formData.customer_email}
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Schedule & Preferences</h3>

              <div className="space-y-2">
                <Label>Preferred Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.preferred_date ? format(formData.preferred_date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.preferred_date}
                      onSelect={(date) => setFormData((prev) => ({ ...prev, preferred_date: date }))}
                      disabled={(date) => date < new Date() || date.getDay() === 0} // Disable past dates and Sundays
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Preferred Time *</Label>
                <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, preferred_time: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Preferred Dealer (Optional)</Label>
                <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, dealer_id: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select dealer or leave blank for auto-assignment" />
                  </SelectTrigger>
                  <SelectContent>
                    {dealers.map((dealer) => (
                      <SelectItem key={dealer.id} value={dealer.id}>
                        {dealer.name} - {dealer.city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any specific requirements or questions..."
                  value={formData.notes}
                  onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                />
              </div>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button type="submit" disabled={loading || !formData.preferred_date || !formData.preferred_time}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Book Test Ride
                </Button>
              </div>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}

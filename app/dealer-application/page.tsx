"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, Building, User, MapPin, Briefcase } from "lucide-react"
import { useDealerApplications } from "@/hooks/useDealerApplications"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

export default function DealerApplicationPage() {
  const router = useRouter()
  const { submitApplication, loading, error } = useDealerApplications()
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    business_name: "",
    business_address: "",
    city: "",
    state: "",
    pincode: "",
    business_type: "",
    experience_years: "",
    investment_capacity: "",
    expected_sales: "",
    territory_preference: [] as string[],
    additional_info: "",
  })

  const businessTypes = [
    "Sole Proprietorship",
    "Partnership",
    "Private Limited Company",
    "Limited Liability Partnership",
    "Other",
  ]

  const investmentCapacities = ["₹5-10 Lakhs", "₹10-25 Lakhs", "₹25-50 Lakhs", "₹50 Lakhs - 1 Crore", "Above ₹1 Crore"]

  const territories = [
    "Patna",
    "Gaya",
    "Bhagalpur",
    "Muzaffarpur",
    "Darbhanga",
    "Bihar Sharif",
    "Arrah",
    "Begusarai",
    "Katihar",
    "Munger",
    "Chapra",
    "Purnia",
    "Saharsa",
    "Sasaram",
    "Hajipur",
    "Dehri",
    "Siwan",
    "Motihari",
    "Nawada",
    "Bagaha",
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleTerritoryChange = (territory: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      territory_preference: checked
        ? [...prev.territory_preference, territory]
        : prev.territory_preference.filter((t) => t !== territory),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const applicationData = {
      ...formData,
      experience_years: formData.experience_years ? Number.parseInt(formData.experience_years) : undefined,
      expected_sales: formData.expected_sales ? Number.parseInt(formData.expected_sales) : undefined,
    }

    const { data, error } = await submitApplication(applicationData)

    if (!error && data) {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 py-12 pt-32">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="text-center">
              <CardContent className="pt-12 pb-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted Successfully!</h1>
                <p className="text-gray-600 mb-8">
                  Thank you for your interest in becoming an OMNI E-RIDE dealer. We have received your application and
                  will review it within 3-5 business days. Our team will contact you soon with the next steps.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => router.push("/")} variant="outline">
                    Back to Home
                  </Button>
                  <Button onClick={() => router.push("/dealers")}>View Dealers</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 pt-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Dealer Application</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join the OMNI E-RIDE family and be part of the electric revolution. Fill out the form below to apply for
              dealership.
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-8">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </CardTitle>
                <CardDescription>Please provide your personal details</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => handleInputChange("full_name", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Business Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                  Business Information
                </CardTitle>
                <CardDescription>Tell us about your business</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="business_name">Business Name *</Label>
                    <Input
                      id="business_name"
                      value={formData.business_name}
                      onChange={(e) => handleInputChange("business_name", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="business_type">Business Type *</Label>
                    <Select
                      value={formData.business_type}
                      onValueChange={(value) => handleInputChange("business_type", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        {businessTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="business_address">Business Address *</Label>
                  <Textarea
                    id="business_address"
                    value={formData.business_address}
                    onChange={(e) => handleInputChange("business_address", e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      value={formData.pincode}
                      onChange={(e) => handleInputChange("pincode", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Business Details
                </CardTitle>
                <CardDescription>Additional business information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="experience_years">Years of Experience</Label>
                    <Input
                      id="experience_years"
                      type="number"
                      value={formData.experience_years}
                      onChange={(e) => handleInputChange("experience_years", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="investment_capacity">Investment Capacity *</Label>
                    <Select
                      value={formData.investment_capacity}
                      onValueChange={(value) => handleInputChange("investment_capacity", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select investment capacity" />
                      </SelectTrigger>
                      <SelectContent>
                        {investmentCapacities.map((capacity) => (
                          <SelectItem key={capacity} value={capacity}>
                            {capacity}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="expected_sales">Expected Monthly Sales (Units)</Label>
                  <Input
                    id="expected_sales"
                    type="number"
                    value={formData.expected_sales}
                    onChange={(e) => handleInputChange("expected_sales", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Territory Preference */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Territory Preference
                </CardTitle>
                <CardDescription>Select your preferred territories (you can select multiple)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {territories.map((territory) => (
                    <div key={territory} className="flex items-center space-x-2">
                      <Checkbox
                        id={territory}
                        checked={formData.territory_preference.includes(territory)}
                        onCheckedChange={(checked) => handleTerritoryChange(territory, checked as boolean)}
                      />
                      <Label htmlFor={territory} className="text-sm">
                        {territory}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
                <CardDescription>Any additional information you'd like to share</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.additional_info}
                  onChange={(e) => handleInputChange("additional_info", e.target.value)}
                  placeholder="Tell us more about your business, experience, or any other relevant information..."
                  rows={4}
                />
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="text-center">
              <Button type="submit" size="lg" disabled={loading} className="min-w-48">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

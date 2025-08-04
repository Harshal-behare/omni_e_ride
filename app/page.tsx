"use client"
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Footer from "../components/Footer"
import WhatsAppButton from "../components/WhatsAppButton"
import CostSavingsCalculator from "../components/CostSavingsCalculator"
import { useModels } from "@/hooks/useModels"
import { useDealers } from "@/hooks/useDealers"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Battery, Zap, Clock, Gauge, MapPin, Phone, Star, Users, Award, Leaf } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  const { models, loading: modelsLoading } = useModels()
  const { dealers, loading: dealersLoading } = useDealers()

  // Get featured models (first 3)
  const featuredModels = models.slice(0, 3)

  // Get featured dealers (first 3 active dealers)
  const featuredDealers = dealers.filter((d) => d.status === "active").slice(0, 3)

  return (
    <>
      <Navbar />
      <Hero />

      {/* Featured Models Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">Featured Models</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our most popular electric scooters designed for modern urban mobility
            </p>
          </div>

          {modelsLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : featuredModels.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {featuredModels.map((model) => (
                <Card key={model.id} className="hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative h-48 bg-gray-100">
                    <Image
                      src={
                        model.main_image ||
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

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-[#1F2937] mb-2">{model.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{model.description}</p>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center space-x-2">
                        <Battery className="h-4 w-4 text-[#3CB043]" />
                        <span className="text-sm">{model.specifications?.range || 'N/A'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Gauge className="h-4 w-4 text-[#3CB043]" />
                        <span className="text-sm">{model.specifications?.top_speed || 'N/A'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-[#3CB043]" />
                        <span className="text-sm">{model.specifications?.charging_time || 'N/A'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-[#3CB043]" />
                        <span className="text-sm">{model.specifications?.battery || 'N/A'}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Link href={`/models/${model.id}`} className="flex-1">
                        <Button variant="outline" className="w-full bg-transparent">
                          View Details
                        </Button>
                      </Link>
                      <Button className="flex-1 bg-[#3CB043] hover:bg-[#2D7A32]">Test Ride</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No models available at the moment.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/models">
              <Button size="lg" variant="outline">
                View All Models
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Cost Savings Calculator Section */}
      <CostSavingsCalculator />

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">Why Choose Omni E-Ride?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leading the electric revolution in Bihar with innovative technology and exceptional service
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#3CB043] rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Eco-Friendly</h3>
              <p className="text-gray-600">Zero emissions, sustainable transportation for a cleaner environment</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#3CB043] rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Technology</h3>
              <p className="text-gray-600">Cutting-edge battery technology and smart features</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#3CB043] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
              <p className="text-gray-600">Premium build quality with comprehensive warranty</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#3CB043] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600">Dedicated customer service and maintenance support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dealers Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">Our Authorized Dealers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visit our trusted dealers across Bihar for test rides and expert guidance
            </p>
          </div>

          {dealersLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : featuredDealers.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {featuredDealers.map((dealer) => (
                <Card key={dealer.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#1F2937]">{dealer.name}</CardTitle>
                    <p className="text-sm text-gray-600">{dealer.location}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                      <p className="text-sm text-gray-600">{dealer.address}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-[#3CB043]" />
                      <a href={`tel:${dealer.phone}`} className="text-sm text-[#3CB043] hover:underline">
                        {dealer.phone}
                      </a>
                    </div>

                    <div className="pt-2">
                      <Badge variant="outline" className="text-xs">
                        Manager: {dealer.manager_name}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No dealers available at the moment.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/dealers">
              <Button size="lg" variant="outline">
                View All Dealers
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real experiences from satisfied Omni E-Ride customers across Bihar
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                location: "Patna",
                rating: 5,
                comment:
                  "Excellent scooter! Great range and very comfortable for daily commuting. The charging is super convenient.",
              },
              {
                name: "Priya Singh",
                location: "Gaya",
                rating: 5,
                comment:
                  "Love my Omni E-Ride! It's eco-friendly, cost-effective, and the service support is outstanding.",
              },
              {
                name: "Amit Sharma",
                location: "Muzaffarpur",
                rating: 5,
                comment:
                  "Best investment I've made. No more fuel costs and it's so smooth to ride. Highly recommended!",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.comment}"</p>
                  <div>
                    <p className="font-semibold text-[#1F2937]">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#3CB043]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Go Electric?</h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of satisfied customers who have made the switch to sustainable transportation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-white text-[#3CB043] hover:bg-gray-100">
                Schedule Test Ride
              </Button>
            </Link>
            <Link href="/models">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#3CB043] bg-transparent"
              >
                View All Models
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  )
}

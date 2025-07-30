import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import ModelCard from "../components/ModelCard"
import OfferBanner from "../components/OfferBanner"
import TestimonialCard from "../components/TestimonialCard"
import ContactForm from "../components/ContactForm"
import Footer from "../components/Footer"
import CostSavingsCalculator from "../components/CostSavingsCalculator"

const models = [
  {
    id: 1,
    name: "Omni Swift",
    price: 63000,
    range: "80 km",
    topSpeed: "45 km/h",
    chargingTime: "4-5 hours",
    battery: "48V 24Ah",
  },
  {
    id: 2,
    name: "Omni Power",
    price: 78000,
    range: "100 km",
    topSpeed: "60 km/h",
    chargingTime: "5-6 hours",
    battery: "60V 30Ah",
  },
  {
    id: 3,
    name: "Omni Elite",
    price: 95000,
    range: "120 km",
    topSpeed: "70 km/h",
    chargingTime: "6-7 hours",
    battery: "72V 35Ah",
  },
  {
    id: 4,
    name: "Omni Pro",
    price: 110000,
    range: "150 km",
    topSpeed: "80 km/h",
    chargingTime: "7-8 hours",
    battery: "72V 40Ah",
  },
  {
    id: 5,
    name: "Omni Max",
    price: 125000,
    range: "180 km",
    topSpeed: "90 km/h",
    chargingTime: "8-9 hours",
    battery: "84V 45Ah",
  },
]

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Patna, Bihar",
    quote:
      "Amazing experience with Omni E-Ride! Zero maintenance cost and excellent performance. Highly recommended for daily commute.",
  },
  {
    id: 2,
    name: "Priya Singh",
    location: "Gaya, Bihar",
    quote:
      "Love my Omni Swift! It's eco-friendly, cost-effective, and perfect for city rides. Great customer service too.",
  },
  {
    id: 3,
    name: "Amit Sharma",
    location: "Muzaffarpur, Bihar",
    quote: "Best investment I made this year. The battery life is excellent and charging is so convenient at home.",
  },
]

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />

      {/* Models Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">Our Electric Scooter Models</h2>
            <p className="text-lg text-gray-600">
              Choose from our range of premium electric scooters designed for every need
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {models.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        </div>
      </section>

      {/* Cost Savings Calculator */}
      <CostSavingsCalculator />

      {/* Why Choose Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">Why Choose Omni E-Ride?</h2>
            <p className="text-lg text-gray-600">Experience the benefits of sustainable mobility</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#3CB043] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Zero Emissions</h3>
              <p className="text-gray-600">100% electric, 0% pollution. Contribute to a cleaner environment.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#3CB043] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Low Running Cost</h3>
              <p className="text-gray-600">Save up to 80% on fuel costs with our efficient electric motors.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#3CB043] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Charging</h3>
              <p className="text-gray-600">Quick charge technology for minimal downtime and maximum mobility.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#3CB043] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Reliable Service</h3>
              <p className="text-gray-600">Comprehensive warranty and service support across Bihar.</p>
            </div>
          </div>
        </div>
      </section>

      <OfferBanner />

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600">Real experiences from satisfied Omni E-Ride owners</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      <ContactForm />
      <Footer />
    </>
  )
}

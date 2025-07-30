import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

export default function About() {
  return (
    <>
      <Navbar />

      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-[#3CB043] to-[#2D7A32] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About Omni E-Ride</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              Leading the electric revolution in Bihar with premium, eco-friendly scooters designed for the future of
              sustainable mobility.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-[#3CB043] rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  To revolutionize urban mobility in Bihar by providing affordable, reliable, and eco-friendly electric
                  scooters that reduce pollution, lower transportation costs, and contribute to a sustainable future for
                  our communities.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-[#3CB043] rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
                <p className="text-gray-600 leading-relaxed">
                  To become Bihar's leading electric vehicle manufacturer, creating a cleaner, greener future where
                  every citizen has access to affordable and sustainable transportation solutions that enhance quality
                  of life while protecting our environment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From a vision to transform Bihar's transportation landscape to becoming a trusted name in electric
                mobility.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="/placeholder.svg?height=400&width=600&text=Omni+E-Ride+Factory"
                  alt="Omni E-Ride Manufacturing Facility"
                  className="rounded-xl shadow-lg w-full"
                />
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">Founded in 2020</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Omni E-Ride was founded with a simple yet powerful vision: to make electric mobility accessible to
                    every household in Bihar. Starting from a small workshop in Patna, we've grown into a comprehensive
                    electric vehicle manufacturer.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">Innovation at Heart</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our team of engineers and designers work tirelessly to create electric scooters that combine
                    cutting-edge technology with practical design, ensuring our customers get the best value for their
                    investment.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">Community Impact</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We've helped over 10,000 families switch to electric mobility, collectively saving millions of
                    rupees in fuel costs and significantly reducing carbon emissions across Bihar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Omni E-Ride?</h2>
              <p className="text-xl text-gray-600">
                We're committed to providing the best electric mobility solutions in Bihar.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-20 h-20 bg-[#3CB043] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Assurance</h3>
                <p className="text-gray-600">
                  Every scooter undergoes rigorous quality testing to ensure reliability, safety, and performance that
                  exceeds industry standards.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-20 h-20 bg-[#3CB043] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Eco-Friendly</h3>
                <p className="text-gray-600">
                  100% electric, zero emissions. Our scooters help reduce air pollution and contribute to a cleaner,
                  healthier environment for future generations.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-20 h-20 bg-[#3CB043] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">24/7 Support</h3>
                <p className="text-gray-600">
                  Our dedicated customer support team and service network across Bihar ensures you're never stranded and
                  always have help when you need it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-xl text-gray-600">The passionate individuals driving Bihar's electric revolution.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <img
                  src="/placeholder.svg?height=200&width=200&text=CEO"
                  alt="CEO"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Rajesh Kumar Singh</h3>
                <p className="text-[#3CB043] font-medium mb-3">Founder & CEO</p>
                <p className="text-gray-600 text-sm">
                  Visionary leader with 15+ years in automotive industry, passionate about sustainable mobility
                  solutions.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <img
                  src="/placeholder.svg?height=200&width=200&text=CTO"
                  alt="CTO"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Dr. Priya Sharma</h3>
                <p className="text-[#3CB043] font-medium mb-3">Chief Technology Officer</p>
                <p className="text-gray-600 text-sm">
                  PhD in Electrical Engineering, leading our R&D efforts in battery technology and motor efficiency.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <img
                  src="/placeholder.svg?height=200&width=200&text=COO"
                  alt="COO"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Amit Gupta</h3>
                <p className="text-[#3CB043] font-medium mb-3">Chief Operating Officer</p>
                <p className="text-gray-600 text-sm">
                  Operations expert ensuring smooth manufacturing, quality control, and customer service excellence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Awards & Recognition */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Awards & Recognition</h2>
              <p className="text-xl text-gray-600">
                Recognized for our contribution to sustainable mobility and innovation.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Best EV Startup 2023</h3>
                <p className="text-sm text-gray-600">Bihar Innovation Awards</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Eco-Friendly Brand</h3>
                <p className="text-sm text-gray-600">Green India Initiative 2024</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Customer Choice Award</h3>
                <p className="text-sm text-gray-600">EV India Awards 2024</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Innovation Excellence</h3>
                <p className="text-sm text-gray-600">Make in India Awards 2024</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}

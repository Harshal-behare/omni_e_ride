import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

const dealers = [
  {
    id: 1,
    name: "Omni E-Ride Patna Showroom",
    address: "Gandhi Maidan, Patna, Bihar 800001",
    phone: "+91 9876543210",
    email: "patna@omnierride.com",
    manager: "Rajesh Kumar",
    status: "Active",
  },
  {
    id: 2,
    name: "Omni E-Ride Gaya Center",
    address: "Civil Lines, Gaya, Bihar 823001",
    phone: "+91 9876543211",
    email: "gaya@omnierride.com",
    manager: "Priya Singh",
    status: "Active",
  },
  {
    id: 3,
    name: "Omni E-Ride Muzaffarpur Hub",
    address: "Station Road, Muzaffarpur, Bihar 842001",
    phone: "+91 9876543212",
    email: "muzaffarpur@omnierride.com",
    manager: "Amit Sharma",
    status: "Active",
  },
]

export default function Dealers() {
  return (
    <>
      <Navbar />

      <section className="py-24 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1F2937] mb-4">Our Authorized Dealers</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visit our authorized dealers across Bihar for test rides, purchases, and comprehensive after-sales
              service. Experience our electric scooters firsthand at a location near you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-white shadow-xl rounded-xl p-0 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.8967249730444!2d85.12761931501744!3d25.594095983742868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58dce6732867%3A0x4059f39a1ac82f06!2sGandhi%20Maidan%2C%20Patna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1635789012345!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Omni E-Ride Dealer Locations"
              ></iframe>
            </div>

            <div className="space-y-6">
              {dealers.map((dealer) => (
                <div
                  key={dealer.id}
                  className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-[#1F2937] mb-2">{dealer.name}</h3>
                  <p className="text-gray-600 mb-2">{dealer.address}</p>
                  <p className="text-[#3CB043] font-medium mb-1">📞 {dealer.phone}</p>
                  <p className="text-[#3CB043] font-medium mb-2">✉️ {dealer.email}</p>
                  <p className="text-sm text-gray-500">Manager: {dealer.manager}</p>
                  <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium mt-2">
                    {dealer.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Become a Dealer Section */}
          <section className="py-16 bg-gray-50 rounded-2xl">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold text-[#1F2937] mb-4">Become a Dealer</h2>
              <p className="text-lg text-gray-600 mb-8">
                Join the Omni E-Ride family and be part of the electric revolution in Bihar
              </p>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#3CB043] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H7m2 0v-5a2 2 0 012-2h2a2 2 0 012 2v5m-6 0V9a2 2 0 012-2h2a2 2 0 012 2v9"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Prime Locations</h3>
                  <p className="text-gray-600">Secure premium locations in growing markets across Bihar</p>
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
                  <h3 className="text-xl font-semibold mb-2">Attractive Margins</h3>
                  <p className="text-gray-600">Competitive dealer margins and incentive programs</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-[#3CB043] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Full Support</h3>
                  <p className="text-gray-600">Complete training, marketing support, and technical assistance</p>
                </div>
              </div>

              <button className="bg-[#3CB043] text-white font-semibold py-4 px-8 rounded-xl hover:bg-[#2D7A32] transition-colors text-lg">
                Apply for Dealership
              </button>
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </>
  )
}

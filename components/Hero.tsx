import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[#3CB043] via-[#2D7A32] to-[#3CB043] min-h-screen flex items-center">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Charge the Future, <br />
              <span className="text-yellow-300">Ride the Change!</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Experience the power of sustainable mobility with our premium electric scooters. Zero emissions, maximum
              performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/models"
                className="inline-block bg-white text-[#3CB043] font-semibold py-3 px-6 rounded-xl shadow-lg hover:bg-gray-100 transition-all duration-300 text-center"
              >
                Explore Models
              </Link>
              <Link
                href="/contact"
                className="inline-block bg-transparent text-white border-2 border-white font-medium py-3 px-6 rounded-xl hover:bg-white hover:text-[#3CB043] transition-all duration-300 text-center"
              >
                Book Test Ride
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src="/placeholder.svg?height=500&width=600&text=Electric+Scooter"
              alt="Omni E-Ride Electric Scooter"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

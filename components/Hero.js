import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary via-darkGreen to-primary min-h-screen flex items-center">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-hero">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              Charge the Future, <br />
              <span className="text-yellow-300">Ride the Change!</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Experience the power of sustainable mobility with our premium electric scooters. Zero emissions, maximum
              performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/models" className="btn-primary bg-white text-primary hover:bg-lightGray">
                Explore Models
              </Link>
              <Link href="/contact" className="btn-secondary border-white text-white hover:bg-white hover:text-primary">
                Book Test Ride
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src="/placeholder.svg?height=500&width=600"
              alt="Omni E-Ride Electric Scooter"
              className="w-full h-auto rounded-2xl shadow-hover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

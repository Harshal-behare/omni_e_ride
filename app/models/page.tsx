import Navbar from "../../components/Navbar"
import ModelCard from "../../components/ModelCard"
import Footer from "../../components/Footer"

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

export default function Models() {
  return (
    <>
      <Navbar />

      <section className="py-24 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1F2937] mb-4">Our Electric Scooter Models</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our complete range of premium electric scooters designed for every lifestyle and budget.
              Experience the perfect blend of performance, style, and sustainability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {models.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-white shadow-xl rounded-xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Need Help Choosing?</h3>
              <p className="text-gray-600 mb-6">
                Our experts are here to help you find the perfect electric scooter for your needs and budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-[#3CB043] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#2D7A32] transition-colors">
                  Schedule Consultation
                </button>
                <button className="bg-white text-[#3CB043] border-2 border-[#3CB043] font-medium py-3 px-6 rounded-xl hover:bg-[#3CB043] hover:text-white transition-colors">
                  Compare Models
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

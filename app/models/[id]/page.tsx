import { notFound } from "next/navigation"
import Navbar from "../../../components/Navbar"
import Footer from "../../../components/Footer"
import ProductDetails from "../../../components/ProductDetails"
import CostCalculator from "../../../components/CostCalculator"

const models = [
  {
    id: 1,
    name: "Omni Swift",
    price: 63000,
    range: "80 km",
    topSpeed: "45 km/h",
    chargingTime: "4-5 hours",
    battery: "48V 24Ah",
    acceleration: "0-40 km/h in 4.2 sec",
    colors: ["Pearl White", "Matte Black", "Electric Blue"],
    features: ["LED Headlights", "Digital Display", "Mobile Charging", "Anti-theft Alarm", "Regenerative Braking"],
    specifications: {
      motor: "1.5 kW BLDC Motor",
      batteryType: "Lithium-ion",
      weight: "85 kg",
      loadCapacity: "150 kg",
      brakes: "Disc/Drum",
      tyres: "90/90-12 Tubeless",
      groundClearance: "165 mm",
      wheelbase: "1285 mm",
    },
    description:
      "Perfect for daily commuting with excellent range and performance. The Omni Swift combines efficiency with style, making it ideal for urban mobility.",
  },
  {
    id: 2,
    name: "Omni Power",
    price: 78000,
    range: "100 km",
    topSpeed: "60 km/h",
    chargingTime: "5-6 hours",
    battery: "60V 30Ah",
    acceleration: "0-40 km/h in 3.8 sec",
    colors: ["Pearl White", "Matte Black", "Electric Blue", "Crimson Red"],
    features: [
      "LED Headlights",
      "Digital Display",
      "Mobile Charging",
      "Anti-theft Alarm",
      "Reverse Mode",
      "Bluetooth Connectivity",
    ],
    specifications: {
      motor: "2.0 kW BLDC Motor",
      batteryType: "Lithium-ion",
      weight: "90 kg",
      loadCapacity: "150 kg",
      brakes: "Disc/Disc",
      tyres: "90/90-12 Tubeless",
      groundClearance: "170 mm",
      wheelbase: "1290 mm",
    },
    description:
      "Enhanced performance with longer range and advanced features. The Omni Power delivers superior acceleration and connectivity for modern riders.",
  },
  {
    id: 3,
    name: "Omni Elite",
    price: 95000,
    range: "120 km",
    topSpeed: "70 km/h",
    chargingTime: "6-7 hours",
    battery: "72V 35Ah",
    acceleration: "0-40 km/h in 3.5 sec",
    colors: ["Pearl White", "Matte Black", "Electric Blue", "Crimson Red", "Silver Grey"],
    features: [
      "LED Headlights",
      "Digital Display",
      "Mobile Charging",
      "Anti-theft Alarm",
      "Reverse Mode",
      "Cruise Control",
      "GPS Navigation",
    ],
    specifications: {
      motor: "2.5 kW BLDC Motor",
      batteryType: "Lithium-ion",
      weight: "95 kg",
      loadCapacity: "150 kg",
      brakes: "Disc/Disc",
      tyres: "100/80-12 Tubeless",
      groundClearance: "175 mm",
      wheelbase: "1295 mm",
    },
    description:
      "Premium electric scooter with advanced features and exceptional range. The Omni Elite offers luxury and performance for discerning riders.",
  },
  {
    id: 4,
    name: "Omni Pro",
    price: 110000,
    range: "150 km",
    topSpeed: "80 km/h",
    chargingTime: "7-8 hours",
    battery: "72V 40Ah",
    acceleration: "0-40 km/h in 3.2 sec",
    colors: ["Pearl White", "Matte Black", "Electric Blue", "Crimson Red", "Silver Grey", "Golden Yellow"],
    features: [
      "LED Headlights",
      "Digital Display",
      "Mobile Charging",
      "Anti-theft Alarm",
      "Reverse Mode",
      "Cruise Control",
      "GPS Navigation",
      "Smart Connectivity",
    ],
    specifications: {
      motor: "3.0 kW BLDC Motor",
      batteryType: "Lithium-ion",
      weight: "100 kg",
      loadCapacity: "150 kg",
      brakes: "Disc/Disc",
      tyres: "100/80-12 Tubeless",
      groundClearance: "180 mm",
      wheelbase: "1300 mm",
    },
    description:
      "Professional-grade electric scooter with maximum range and power. The Omni Pro is designed for long-distance travel and commercial use.",
  },
  {
    id: 5,
    name: "Omni Max",
    price: 125000,
    range: "180 km",
    topSpeed: "90 km/h",
    chargingTime: "8-9 hours",
    battery: "84V 45Ah",
    acceleration: "0-40 km/h in 2.9 sec",
    colors: [
      "Pearl White",
      "Matte Black",
      "Electric Blue",
      "Crimson Red",
      "Silver Grey",
      "Golden Yellow",
      "Metallic Purple",
    ],
    features: [
      "LED Headlights",
      "Digital Display",
      "Mobile Charging",
      "Anti-theft Alarm",
      "Reverse Mode",
      "Cruise Control",
      "GPS Navigation",
      "Bluetooth Connectivity",
      "Fast Charging",
    ],
    specifications: {
      motor: "3.5 kW BLDC Motor",
      batteryType: "Lithium-ion",
      weight: "105 kg",
      loadCapacity: "150 kg",
      brakes: "Disc/Disc",
      tyres: "110/70-12 Tubeless",
      groundClearance: "185 mm",
      wheelbase: "1305 mm",
    },
    description:
      "The ultimate electric scooter with maximum performance and range. The Omni Max represents the pinnacle of electric mobility technology.",
  },
]

export default function ModelDetail({ params }: { params: { id: string } }) {
  const model = models.find((m) => m.id === Number.parseInt(params.id))

  if (!model) {
    notFound()
  }

  return (
    <>
      <Navbar />

      <div className="pt-20">
        <ProductDetails model={model} />
        <CostCalculator model={model} />
      </div>

      <Footer />
    </>
  )
}

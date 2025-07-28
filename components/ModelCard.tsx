interface Model {
  id: number
  name: string
  price: number
  image?: string
  range: string
  topSpeed: string
  chargingTime: string
  battery: string
}

interface ModelCardProps {
  model: Model
}

export default function ModelCard({ model }: ModelCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer">
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img
          src={model.image || `/placeholder.svg?height=300&width=400&text=${model.name}`}
          alt={model.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-[#3CB043] text-white px-3 py-1 rounded-full text-sm font-semibold">
          New
        </div>
      </div>

      <h3 className="text-xl font-bold mb-2">{model.name}</h3>
      <p className="text-2xl font-bold text-[#3CB043] mb-4">₹{model.price.toLocaleString()}</p>

      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Range:</span>
          <span className="font-medium">{model.range}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Top Speed:</span>
          <span className="font-medium">{model.topSpeed}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Charging Time:</span>
          <span className="font-medium">{model.chargingTime}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Battery:</span>
          <span className="font-medium">{model.battery}</span>
        </div>
      </div>

      <button className="w-full bg-[#3CB043] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#2D7A32] transition-colors duration-300">
        Book Now
      </button>
    </div>
  )
}

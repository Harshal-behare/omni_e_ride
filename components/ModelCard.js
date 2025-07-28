export default function ModelCard({ model }) {
  return (
    <div className="card group cursor-pointer">
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img
          src={model.image || "/placeholder.svg"}
          alt={model.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
          New
        </div>
      </div>

      <h3 className="text-xl font-heading font-semibold mb-2">{model.name}</h3>
      <p className="text-2xl font-bold text-primary mb-4">₹{model.price.toLocaleString()}</p>

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

      <button className="btn-primary w-full">Book Now</button>
    </div>
  )
}

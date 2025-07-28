export default function DealerMap() {
  const dealers = [
    {
      id: 1,
      name: "Omni E-Ride Patna Showroom",
      address: "Gandhi Maidan, Patna, Bihar 800001",
      phone: "+91 9876543210",
      email: "patna@omnierride.com",
    },
    {
      id: 2,
      name: "Omni E-Ride Gaya Center",
      address: "Civil Lines, Gaya, Bihar 823001",
      phone: "+91 9876543211",
      email: "gaya@omnierride.com",
    },
    {
      id: 3,
      name: "Omni E-Ride Muzaffarpur Hub",
      address: "Station Road, Muzaffarpur, Bihar 842001",
      phone: "+91 9876543212",
      email: "muzaffarpur@omnierride.com",
    },
  ]

  return (
    <section className="py-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-accent mb-4">Find Our Dealers</h2>
          <p className="text-lg text-gray-600">
            Visit our authorized dealers across Bihar for test rides and purchases
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="card p-0 overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.8967249730444!2d85.12761931501744!3d25.594095983742868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58dce6732867%3A0x4059f39a1ac82f06!2sGandhi%20Maidan%2C%20Patna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1635789012345!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Omni E-Ride Dealer Locations"
            ></iframe>
          </div>

          <div className="space-y-6">
            {dealers.map((dealer) => (
              <div key={dealer.id} className="card">
                <h3 className="text-xl font-semibold text-accent mb-2">{dealer.name}</h3>
                <p className="text-gray-600 mb-2">{dealer.address}</p>
                <p className="text-primary font-medium mb-1">📞 {dealer.phone}</p>
                <p className="text-primary font-medium">✉️ {dealer.email}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

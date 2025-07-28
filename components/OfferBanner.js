export default function OfferBanner() {
  return (
    <section className="py-section bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card bg-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-darkGreen"></div>

          <div className="py-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-accent mb-4">🎉 Festive Lucky Draw! 🎉</h2>
            <p className="text-lg text-gray-600 mb-6">
              Book your test ride now and get a chance to win exciting prizes worth ₹50,000!
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-4xl mb-2">🏆</div>
                <h3 className="font-semibold text-primary">1st Prize</h3>
                <p className="text-sm text-gray-600">₹25,000 Cash</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🎁</div>
                <h3 className="font-semibold text-primary">2nd Prize</h3>
                <p className="text-sm text-gray-600">₹15,000 Voucher</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🎊</div>
                <h3 className="font-semibold text-primary">3rd Prize</h3>
                <p className="text-sm text-gray-600">₹10,000 Accessories</p>
              </div>
            </div>

            <button className="btn-primary text-lg px-8">Participate Now</button>

            <p className="text-xs text-gray-500 mt-4">
              *Terms and conditions apply. Offer valid till December 31st, 2024.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function OfferBanner() {
  return (
    <section className="py-24 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-xl p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#3CB043] to-[#2D7A32]"></div>

          <div className="py-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">🎉 Festive Lucky Draw! 🎉</h2>
            <p className="text-lg text-gray-600 mb-6">
              Book your test ride now and get a chance to win exciting prizes worth ₹50,000!
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-4xl mb-2">🏆</div>
                <h3 className="font-semibold text-[#3CB043]">1st Prize</h3>
                <p className="text-sm text-gray-600">₹25,000 Cash</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🎁</div>
                <h3 className="font-semibold text-[#3CB043]">2nd Prize</h3>
                <p className="text-sm text-gray-600">₹15,000 Voucher</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🎊</div>
                <h3 className="font-semibold text-[#3CB043]">3rd Prize</h3>
                <p className="text-sm text-gray-600">₹10,000 Accessories</p>
              </div>
            </div>

            <button className="bg-[#3CB043] text-white font-semibold py-4 px-8 rounded-xl hover:bg-[#2D7A32] transition-colors duration-300 text-lg">
              Participate Now
            </button>

            <p className="text-xs text-gray-500 mt-4">
              *Terms and conditions apply. Offer valid till December 31st, 2024.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

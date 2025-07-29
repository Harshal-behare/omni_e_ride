import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#1F2937] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Company Info */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-[#3CB043] mb-4">OMNI E‑RIDE</h3>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Leading the electric revolution in Bihar with premium, eco-friendly scooters. Experience the future of
              sustainable mobility today.
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300">📍 Gandhi Maidan, Patna, Bihar 800001</p>
              <p className="text-gray-300">📞 Call / Whatsapp: +91 9876543210</p>
              <p className="text-gray-300">✉️ Email: customercare@omnierride.com</p>
              <p className="text-gray-300">🕒 Support Hours: Mon-Sat 9AM-7PM</p>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4 mt-6">
              <a
                href="https://facebook.com/omnierride"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#1877F2] rounded-full flex items-center justify-center hover:bg-[#166FE5] transition-all duration-300 transform hover:scale-110"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/omnierride"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-r from-[#E4405F] to-[#5B51D8] rounded-full flex items-center justify-center hover:from-[#D73447] hover:to-[#4C46C4] transition-all duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/omnierride"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#1DA1F2] rounded-full flex items-center justify-center hover:bg-[#1A91DA] transition-all duration-300 transform hover:scale-110"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="https://youtube.com/omnierride"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#FF0000] rounded-full flex items-center justify-center hover:bg-[#E60000] transition-all duration-300 transform hover:scale-110"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* About Us */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-[#3CB043]">QUICK LINKS</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3 text-sm">
                <Link
                  href="/models"
                  className="block text-gray-300 hover:text-[#3CB043] transition-colors duration-300"
                >
                  Our Models
                </Link>
                <Link
                  href="/test-ride"
                  className="block text-gray-300 hover:text-[#3CB043] transition-colors duration-300"
                >
                  Book Test Ride
                </Link>
                <Link
                  href="/dealers"
                  className="block text-gray-300 hover:text-[#3CB043] transition-colors duration-300"
                >
                  Find Dealers
                </Link>
                <Link
                  href="/service"
                  className="block text-gray-300 hover:text-[#3CB043] transition-colors duration-300"
                >
                  Service Centers
                </Link>
                <Link
                  href="/warranty"
                  className="block text-gray-300 hover:text-[#3CB043] transition-colors duration-300"
                >
                  Warranty Info
                </Link>
              </div>
              <div className="space-y-3 text-sm">
                <Link href="/blog" className="block text-gray-300 hover:text-[#3CB043] transition-colors duration-300">
                  Our Blog
                </Link>
                <Link href="/about" className="block text-gray-300 hover:text-[#3CB043] transition-colors duration-300">
                  About Company
                </Link>
                <Link
                  href="/contact"
                  className="block text-gray-300 hover:text-[#3CB043] transition-colors duration-300"
                >
                  Contact Us
                </Link>
                <Link
                  href="/privacy-policy"
                  className="block text-gray-300 hover:text-[#3CB043] transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
                <Link href="/terms" className="block text-gray-300 hover:text-[#3CB043] transition-colors duration-300">
                  Terms & Conditions
                </Link>
                <Link
                  href="/careers"
                  className="block text-gray-300 hover:text-[#3CB043] transition-colors duration-300"
                >
                  Careers
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-300 text-sm">© {currentYear} Omni E-Ride Pvt Ltd - All Rights Reserved</p>
              <p className="text-gray-400 text-xs mt-1">Pioneering sustainable mobility solutions in Bihar</p>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-gray-300 text-sm">We accept:</span>
              <div className="flex space-x-2">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-1 rounded text-xs text-white font-medium transition-all duration-300 hover:scale-105">
                  VISA
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-red-600 px-3 py-1 rounded text-xs text-white font-medium transition-all duration-300 hover:scale-105">
                  MC
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 px-3 py-1 rounded text-xs text-white font-medium transition-all duration-300 hover:scale-105">
                  UPI
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-cyan-600 px-3 py-1 rounded text-xs text-white font-medium transition-all duration-300 hover:scale-105">
                  PAYTM
                </div>
                <div className="bg-gradient-to-r from-green-400 to-blue-500 px-3 py-1 rounded text-xs text-white font-medium transition-all duration-300 hover:scale-105">
                  GPAY
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

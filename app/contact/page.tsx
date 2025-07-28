import Navbar from "../../components/Navbar"
import ContactForm from "../../components/ContactForm"
import Footer from "../../components/Footer"

export default function Contact() {
  return (
    <>
      <Navbar />

      <section className="py-24 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1F2937] mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to make the switch to electric? Get in touch with us for inquiries, test rides, or any questions
              about our electric scooters.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-[#3CB043] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Visit Our Showroom</h3>
              <p className="text-gray-600">
                Gandhi Maidan, Patna
                <br />
                Bihar 800001
                <br />
                India
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-[#3CB043] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600">
                Sales: +91 9876543210
                <br />
                Service: +91 9876543211
                <br />
                Mon-Sat: 9 AM - 7 PM
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-[#3CB043] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600">
                info@omnierride.com
                <br />
                sales@omnierride.com
                <br />
                support@omnierride.com
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-xl rounded-xl p-0 overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.8967249730444!2d85.12761931501744!3d25.594095983742868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58dce6732867%3A0x4059f39a1ac82f06!2sGandhi%20Maidan%2C%20Patna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1635789012345!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Omni E-Ride Showroom Location"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

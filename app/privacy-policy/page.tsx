import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />

      <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <h1 className="text-4xl font-bold text-[#FF5722] mb-8 text-center">Privacy Policy</h1>

            <div className="space-y-8 text-gray-700">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">General Terms</h2>
                <p className="mb-4 leading-relaxed">
                  These Terms and Conditions ("T&C") govern the sale and purchase of electric two-wheelers (2W) and
                  three-wheelers (3W) from Omni E-Ride. By placing an order, the customer agrees to abide by these T&C.
                  Omni E-Ride reserves the right to update these T&C without prior notice to stay updated please check
                  on Omni E-Ride website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Personal Information:</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Name, email address, phone number</li>
                      <li>Address and location data</li>
                      <li>Government-issued ID for verification</li>
                      <li>Payment and billing information</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Usage Information:</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Website browsing patterns and preferences</li>
                      <li>Device information and IP address</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Process orders and deliver products/services</li>
                  <li>Provide customer support and technical assistance</li>
                  <li>Send important updates about your orders and account</li>
                  <li>Improve our products and services based on feedback</li>
                  <li>Comply with legal requirements and prevent fraud</li>
                  <li>Send promotional offers (with your consent)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Payments</h2>
                <p className="mb-4 leading-relaxed">
                  All payments must be made through authorized channels, including UPI, net banking, credit/debit cards,
                  and EMI options facilitated through the PayU payment gateway. The transaction will only be deemed
                  successful upon confirmation from the payment gateway and receipt generation. Any additional charges
                  such as taxes, duties, and processing fees shall be borne by the customer.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Vehicle Dispatch & Delivery</h2>
                <p className="mb-4 leading-relaxed">
                  Once the vehicle dispatch process has begun, delivery cannot be denied or cancelled by the customer.
                  Customers must ensure accurate shipping details; Omni E-Ride is not responsible for delivery delays
                  due to incorrect information. Proof of delivery obtained from a recognized logistics provider will
                  serve as the final confirmation of receipt.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
                <p className="mb-4 leading-relaxed">
                  We implement industry-standard security measures to protect your personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>SSL encryption for all data transmission</li>
                  <li>Secure servers with regular security updates</li>
                  <li>Limited access to personal information on a need-to-know basis</li>
                  <li>Regular security audits and monitoring</li>
                  <li>Compliance with applicable data protection laws</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cancellation & Refunds</h2>
                <p className="mb-4 leading-relaxed">
                  Orders can only be cancelled before dispatch initiation. No refund requests will be entertained once
                  the vehicle has been dispatched. Only in the event of payment failure or duplicate payments, refunds
                  will be processed per PayU's refund guidelines. Refunds, where applicable, will be processed back to
                  the original payment source as per regulations. Under any circumstances the repair shall be done as
                  per warranty policy if so.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Warranty & After-Sales Service</h2>
                <p className="mb-4 leading-relaxed">
                  Omni E-Ride provides a standard warranty on its EVs, details of which are mentioned in the website.
                  Warranty claims must be supported by valid proof of purchase. Any damages due to misuse, unauthorized
                  modifications, or external factors will void the warranty.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
                <p className="mb-4 leading-relaxed">You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your data (subject to legal requirements)</li>
                  <li>Opt-out of marketing communications</li>
                  <li>File complaints with data protection authorities</li>
                  <li>Request data portability where applicable</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="mb-4 font-semibold">For privacy-related questions or concerns, contact us:</p>
                  <div className="space-y-2">
                    <p>
                      <strong>Email:</strong> privacy@omnierride.com
                    </p>
                    <p>
                      <strong>Phone:</strong> +91 9876543210
                    </p>
                    <p>
                      <strong>Address:</strong> Gandhi Maidan, Patna, Bihar 800001
                    </p>
                    <p>
                      <strong>Data Protection Officer:</strong> dpo@omnierride.com
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Updates to This Policy</h2>
                <p className="leading-relaxed">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or legal
                  requirements. We will notify you of significant changes through email or website notifications. Your
                  continued use of our services after such changes constitutes acceptance of the updated policy.
                </p>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
              <p>Last updated: January 2024</p>
              <p className="mt-2">© 2024 Omni E-Ride. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

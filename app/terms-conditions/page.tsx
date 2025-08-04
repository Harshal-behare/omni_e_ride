import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

export default function TermsAndConditions() {
  return (
    <>
      <Navbar />

      <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Terms and Conditions</h1>

            <div className="space-y-8 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">1. General Terms</h2>
                <p className="mb-4">
                  Welcome to Omni E-Ride. These terms and conditions outline the rules and regulations for the use of
                  Omni E-Ride's Website and services. By accessing this website and using our services, you accept these
                  terms and conditions in full.
                </p>
                <p>
                  If you disagree with these terms and conditions or any part of these terms and conditions, you must
                  not use our website or services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Test Ride Terms</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>Test rides are available for customers aged 18 years and above with a valid driving license.</li>
                  <li>Customers must carry original driving license and Aadhaar card for verification.</li>
                  <li>Test rides are subject to availability and weather conditions.</li>
                  <li>Duration of test ride is limited to 15-20 minutes within designated routes.</li>
                  <li>Customers are responsible for any damage caused during the test ride.</li>
                  <li>Omni E-Ride reserves the right to refuse test rides at its discretion.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Product Information</h2>
                <p className="mb-4">
                  All product specifications, features, and pricing information displayed on our website are subject to
                  change without prior notice. We strive to provide accurate information but do not guarantee the
                  completeness or accuracy of product descriptions.
                </p>
                <p>
                  Colors shown in images may vary from actual products due to screen settings and lighting conditions.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Warranty Terms</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>Vehicle warranty: 3 years from date of purchase</li>
                  <li>Battery warranty: 3 years or 50,000 km, whichever comes first</li>
                  <li>Motor warranty: 3 years from date of purchase</li>
                  <li>Charger warranty: 1 year from date of purchase</li>
                  <li>Warranty is void in case of misuse, accidents, or unauthorized modifications</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Privacy Policy</h2>
                <p className="mb-4">
                  We respect your privacy and are committed to protecting your personal information. Any personal
                  information collected through our website or services will be used solely for business purposes and
                  will not be shared with third parties without your consent.
                </p>
                <p>We may use cookies to enhance your browsing experience and collect anonymous usage statistics.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
                <p className="mb-4">
                  Omni E-Ride shall not be liable for any indirect, incidental, special, or consequential damages
                  arising from the use of our products or services. Our liability is limited to the purchase price of
                  the product.
                </p>
                <p>We do not warrant that our website will be uninterrupted or error-free.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Governing Law</h2>
                <p>
                  These terms and conditions are governed by and construed in accordance with the laws of India. Any
                  disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in
                  Patna, Bihar.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Contact Information</h2>
                <p className="mb-2">For any questions regarding these terms and conditions, please contact us:</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p>
                    <strong>Omni E-Ride</strong>
                  </p>
                  <p>Email: legal@omnierride.com</p>
                  <p>Phone: +91 9876543210</p>
                  <p>Address: 123 Electric Avenue, Patna, Bihar 800001</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Updates to Terms</h2>
                <p>
                  We reserve the right to update these terms and conditions at any time. Changes will be effective
                  immediately upon posting on our website. Continued use of our services after changes constitutes
                  acceptance of the updated terms.
                </p>
              </section>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
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

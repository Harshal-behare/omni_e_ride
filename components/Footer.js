import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-accent text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-heading font-bold text-primary mb-4">
              OMNI E‑RIDE
            </h3>
            <p className="text-gray-300 mb-6">
              Leading the electric revolution in Bihar with premium,
              eco-friendly scooters. Experience the future of sustainable
              mobility today.
            </p>
            <div className="space-y-2">
              <p className="text-gray-300">
                📍 Gandhi Maidan, Patna, Bihar 800001
              </p>
              <p className="text-gray-300">📞 +91 9876543210</p>
              <p className="text-gray-300">✉️ info@omnierride.com</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-primary transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/models"
                  className="text-gray-300 hover:text-primary transition"
                >
                  Models
                </Link>
              </li>
              <li>
                <Link
                  href="/dealers"
                  className="text-gray-300 hover:text-primary transition"
                >
                  Dealers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-primary transition"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-primary transition"
                >
                  About
                </Link>

              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-300 hover:text-primary transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-conditions"
                  className="text-gray-300 hover:text-primary transition"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <SocialLinks />
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © {currentYear} Omni E-Ride. All rights reserved. | Designed for
            sustainable future.
          </p>
        </div>
      </div>
    </footer>
  );
}

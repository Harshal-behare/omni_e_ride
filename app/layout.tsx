import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/AuthProvider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Omni E-Ride - Electric Scooters in Bihar",
  description:
    "Leading electric scooter manufacturer and dealer in Bihar. Eco-friendly, affordable, and reliable electric vehicles for sustainable transportation.",
  keywords: "electric scooter, e-scooter, Bihar, eco-friendly, sustainable transport, electric vehicle",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}

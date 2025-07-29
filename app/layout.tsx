import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import WhatsAppButton from "../components/WhatsAppButton"

export const metadata: Metadata = {
  title: "Omni E-Ride - Premium Electric Scooters in Bihar",
  description:
    "Discover Omni E-Ride's premium electric scooters in Bihar. Zero emissions, low running costs, and competitive pricing. Book your test ride today!",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}

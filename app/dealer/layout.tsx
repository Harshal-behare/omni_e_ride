import type React from "react"
import DealerSidebar from "@/components/DealerSidebar"

export default function DealerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DealerSidebar />
      <main className="flex-1 p-6 lg:p-8">
        {children}
      </main>
    </div>
  )
}
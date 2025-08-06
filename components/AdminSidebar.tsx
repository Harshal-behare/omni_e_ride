"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  Building2,
  ShoppingCart,
  Wrench,
  Settings,
  LogOut,
  Home,
} from "lucide-react"

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { userProfile, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    router.push("/login")
  }

  const navItems = [
    { href: "/admin/dashboard", icon: LayoutDashboard, label: "Overview" },
    { href: "/admin/users", icon: Users, label: "Users" },
    { href: "/admin/dealers", icon: Building2, label: "Dealers" },
    { href: "/admin/orders", icon: ShoppingCart, label: "Orders" },
    { href: "/admin/services", icon: Wrench, label: "Services" },
    { href: "/admin/settings", icon: Settings, label: "Settings" },
  ]

  return (
    <aside className="w-64 flex-shrink-0 bg-white shadow-md flex flex-col">
      <div className="p-6 border-b">
        <Link href="/" className="text-2xl font-bold text-[#3CB043]">
          OMNI E-RIDE
        </Link>
        <p className="text-sm text-gray-500 mt-1">Admin Panel</p>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              pathname === item.href
                ? "bg-[#3CB043] text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t">
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-800">
            {userProfile?.full_name}
          </p>
          <p className="text-xs text-gray-500">{userProfile?.email}</p>
        </div>
        <Button onClick={handleSignOut} variant="outline" size="sm" className="w-full">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
         
      </div>
    </aside>
  )
}
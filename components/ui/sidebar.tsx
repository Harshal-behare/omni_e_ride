'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  Users,
  Building2,
  ShoppingCart,
  Wrench,
  Settings,
  LogOut,
} from 'lucide-react'

const NavLink = ({ activeTab, tabName, setActiveTab, icon, children }) => (
  <Button
    variant={activeTab === tabName ? 'secondary' : 'ghost'}
    className="w-full justify-start"
    onClick={() => setActiveTab(tabName)}
  >
    {icon}
    {children}
  </Button>
)

export function Sidebar({ activeTab, setActiveTab, handleSignOut }) {
  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r p-4 flex flex-col">
      <div className="flex items-center mb-8">
        <Link href="/" className="text-2xl font-bold text-[#3CB043]">
          OMNI E‑RIDE
        </Link>
      </div>
      <nav className="flex flex-col space-y-2 flex-grow">
        <NavLink
          activeTab={activeTab}
          tabName="overview"
          setActiveTab={setActiveTab}
          icon={<LayoutDashboard className="mr-2 h-4 w-4" />}
        >
          Overview
        </NavLink>
        <NavLink
          activeTab={activeTab}
          tabName="users"
          setActiveTab={setActiveTab}
          icon={<Users className="mr-2 h-4 w-4" />}
        >
          Users
        </NavLink>
        <NavLink
          activeTab={activeTab}
          tabName="dealers"
          setActiveTab={setActiveTab}
          icon={<Building2 className="mr-2 h-4 w-4" />}
        >
          Dealers
        </NavLink>
        <NavLink
          activeTab={activeTab}
          tabName="orders"
          setActiveTab={setActiveTab}
          icon={<ShoppingCart className="mr-2 h-4 w-4" />}
        >
          Orders
        </NavLink>
        <NavLink
          activeTab={activeTab}
          tabName="services"
          setActiveTab={setActiveTab}
          icon={<Wrench className="mr-2 h-4 w-4" />}
        >
          Services
        </NavLink>
        <NavLink
          activeTab={activeTab}
          tabName="settings"
          setActiveTab={setActiveTab}
          icon={<Settings className="mr-2 h-4 w-4" />}
        >
          Settings
        </NavLink>
      </nav>
      <div>
        <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </aside>
  )
}

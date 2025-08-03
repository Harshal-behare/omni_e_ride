import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types matching the actual schema
export interface UserProfile {
  id: string
  email: string
  user_type: "customer" | "dealer" | "admin"
  full_name: string
  phone?: string
  address?: string
  city?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Model {
  id: number
  name: string
  price: number
  range: string
  top_speed: string
  charging_time: string
  battery: string
  acceleration?: string
  colors: string[]
  features: string[]
  specifications: Record<string, string>
  description: string
  image_url?: string
  gallery_images?: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface TestRideBooking {
  id: string
  user_id?: string
  model_id: number
  dealer_id?: string
  customer_name: string
  customer_email: string
  customer_phone: string
  city: string
  dealer_name: string
  preferred_date: string
  time_slot: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  booking_id: string
  notes?: string
  created_at: string
  updated_at: string
  models?: Model
}

export interface Order {
  id: string
  user_id?: string
  model_id: number
  customer_name: string
  customer_email: string
  customer_phone: string
  model_name: string
  amount: number
  color: string
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  order_date: string
  delivery_address: string
  payment_status: "pending" | "paid" | "failed"
  tracking_number?: string
  created_at: string
  updated_at: string
  models?: Model
}

export interface Dealer {
  id: string
  user_id: string
  name: string
  location: string
  address: string
  phone: string
  email: string
  manager_name: string
  status: "pending" | "approved" | "active" | "inactive"
  monthly_sales: number
  total_sales: number
  commission_rate: number
  territory: string[]
  created_at: string
  updated_at: string
  users?: UserProfile
}

export interface ContactInquiry {
  id: string
  name: string
  email: string
  phone: string
  message: string
  subject?: string
  status: "new" | "in_progress" | "resolved"
  assigned_to?: string
  response?: string
  created_at: string
  updated_at: string
}

export interface DealerSale {
  id: string
  dealer_id: string
  order_id: string
  commission_amount: number
  commission_rate: number
  sale_date: string
  created_at: string
  dealers?: Dealer
  orders?: Order
}

export interface Inventory {
  id: string
  dealer_id: string
  model_id: number
  stock_quantity: number
  reserved_quantity: number
  last_updated: string
  dealers?: Dealer
  models?: Model
}

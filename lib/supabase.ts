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
  id: string
  name: string
  description: string
  price: number
  range: string
  top_speed: string
  charging_time: string
  battery: string
  image_url?: string
  features: string[]
  specifications: Record<string, string>
  colors: string[]
  status: string
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
  dealers?: Dealer
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
  payment_status: "pending" | "paid" | "failed" | "refunded"
  order_date: string
  delivery_address: string
  tracking_number?: string
  created_at: string
  updated_at: string
  models?: Model
}

export type Dealer = {
  id: string
  name: string
  location: string
  address: string
  phone: string
  email: string
  manager_name: string
  status: string
  monthly_sales: number
  total_sales: number
  created_at: string
  updated_at: string
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

export interface DealerApplication {
  id: string
  full_name: string
  email: string
  phone: string
  business_name: string
  business_address: string
  city: string
  state: string
  pincode: string
  business_type: string
  experience_years?: number
  investment_capacity?: string
  expected_sales?: number
  territory_preference?: string[]
  additional_info?: string
  status: "pending" | "approved" | "rejected"
  reviewed_by?: string
  reviewed_at?: string
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
  available_quantity?: number
  last_updated: string
  dealers?: Dealer
  models?: Model
}

export interface PreApprovedEmail {
  id: string
  email: string
  role: "admin" | "dealer"
  created_by?: string
  created_at: string
  used: boolean
}

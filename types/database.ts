// Database Types for Omni E-Ride Application

export interface User {
  id: string
  email: string
  created_at: string
  updated_at: string
}

export interface UserProfile {
  id: string
  user_id: string
  full_name: string
  email: string
  phone?: string
  address?: string
  user_type: 'admin' | 'dealer' | 'customer'
  created_at: string
  updated_at: string
}

export interface Model {
  id: string
  name: string
  description?: string
  price: number
  main_image?: string
  gallery?: string[]
  specifications?: {
    range?: string
    top_speed?: string
    charging_time?: string
    motor_power?: string
    battery?: string
    weight?: string
    [key: string]: any
  }
  features?: string[]
  colors?: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  user_id: string
  customer_id: string // For compatibility
  model_id: string
  dealer_id?: string
  quantity: number
  total_amount: number
  amount: number // For compatibility
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  payment_method?: string
  shipping_address?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface Dealer {
  id: string
  user_id: string
  business_name: string
  business_address: string
  contact_person: string
  phone: string
  email: string
  address: string
  city: string
  state: string
  pincode: string
  gst_number?: string
  status: 'active' | 'inactive' | 'suspended' | 'approved' | 'pending'
  created_at: string
  updated_at: string
}

export interface DealerApplication {
  id: string
  full_name: string
  email: string
  phone: string
  business_name: string
  address: string
  city: string
  state: string
  pincode: string
  gst_number?: string
  experience?: string
  experience_years?: number
  investment_capacity?: string
  status: 'pending' | 'approved' | 'rejected'
  notes?: string
  created_at: string
  updated_at: string
}

export interface Inventory {
  id: string
  model_id: string
  dealer_id?: string
  stock: number
  reserved_stock: number
  available_stock: number
  reorder_level: number
  location?: string
  created_at: string
  updated_at: string
}

export interface ContactInquiry {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: 'new' | 'in_progress' | 'resolved' | 'closed'
  response?: string
  created_at: string
  updated_at: string
}

export interface TestRide {
  id: string
  user_id: string
  model_id: string
  dealer_id?: string
  full_name: string
  customer_name: string
  email: string
  customer_email: string
  phone: string
  customer_phone: string
  preferred_date: string
  preferred_time: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
  created_at: string
  updated_at: string
}

export interface TestRideBooking {
  id: string
  customer_id?: string | null
  dealer_id?: string | null
  model_id: string
  preferred_date: string
  preferred_time: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string | null
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  order_id?: string
  user_id: string
  amount: number
  type: 'payment' | 'refund' | 'commission'
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  payment_method?: string
  transaction_id?: string
  gateway_response?: any
  created_at: string
  updated_at: string
}

export interface ServiceBooking {
  id: string
  user_id: string
  customer_id: string
  model_id?: string
  dealer_id?: string
  service_type: string
  description?: string
  scheduled_date: string
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  cost?: number
  total_cost?: number
  notes?: string
  created_at: string
  updated_at: string
}

export interface Warranty {
  id: string
  order_id: string
  model_id: string
  user_id: string
  warranty_number: string
  start_date: string
  end_date: string
  status: 'active' | 'expired' | 'claimed' | 'void'
  terms?: string
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  user_id: string
  model_id: string
  order_id?: string
  rating: number
  title?: string
  comment?: string
  is_verified: boolean
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  updated_at: string
}

export interface PreApprovedEmail {
  id: string
  email: string
  role: 'admin' | 'dealer' | 'customer'
  status: 'active' | 'inactive'
  used: boolean
  created_by: string
  created_at: string
  updated_at: string
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Statistics Types
export interface OrderStats {
  total: number
  pending: number
  confirmed: number
  processing: number
  shipped: number
  delivered: number
  cancelled: number
  totalRevenue: number
}

export interface DashboardStats {
  totalUsers: number
  totalDealers: number
  totalOrders: number
  totalRevenue: number
  pendingApplications: number
  activeModels: number
}

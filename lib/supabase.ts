import { createClient } from '@/utils/supabase/client'

// For client components
export const supabase = createClient()

// Database Types
export interface UserProfile {
  id: string
  email: string
  full_name: string
  phone: string
  user_type: 'admin' | 'dealer' | 'customer'
  created_at: string
  updated_at: string
}

export interface Dealer {
  id: string
  user_id: string
  business_name: string
  business_address: string
  phone: string
  email: string
  status: 'pending' | 'approved' | 'rejected' | 'suspended'
  created_at: string
  updated_at: string
}

export interface Model {
  id: string
  name: string
  description: string
  price: number
  specifications: Record<string, any>
  main_image: string | null
  gallery: string[] | null
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  customer_id: string
  dealer_id: string
  model_id: string
  quantity: number
  total_amount: number
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  shipping_address: string
  created_at: string
  updated_at: string
}

export interface TestRideBooking {
  id: string
  customer_id: string
  dealer_id: string
  model_id: string
  preferred_date: string
  preferred_time: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes: string
  created_at: string
  updated_at: string
}

export interface ContactInquiry {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: 'new' | 'in_progress' | 'resolved' | 'closed'
  created_at: string
  updated_at: string
}

export interface DealerApplication {
  id: string
  business_name: string
  business_address: string
  contact_person: string
  email: string
  phone: string
  business_license: string
  experience_years: number
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  updated_at: string
}

export interface PreApprovedEmail {
  id: string
  email: string
  role: 'admin' | 'dealer' | 'customer'
  used: boolean
  used_at: string | null
  created_at: string
}

export interface Inventory {
  id: string
  dealer_id: string
  model_id: string
  quantity: number
  price: number
  condition: string
  created_at: string
  updated_at: string
}

export interface DealerSale {
  id: string
  dealer_id: string
  order_id: string
  commission_amount: number
  sale_date: string
  created_at: string
  updated_at: string
}

// New interfaces for complete showroom system
export interface ServiceBooking {
  id: string
  customer_id: string
  dealer_id: string
  vehicle_model_id: string | null
  vehicle_registration: string | null
  service_type: string
  service_description: string | null
  scheduled_date: string
  estimated_duration: number | null
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
  total_cost: number | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Warranty {
  id: string
  order_id: string
  customer_id: string
  vehicle_model_id: string | null
  warranty_type: string
  start_date: string
  end_date: string
  status: 'active' | 'expired' | 'void'
  terms_conditions: string | null
  created_at: string
  updated_at: string
}

export interface FinancialTransaction {
  id: string
  order_id: string | null
  dealer_id: string
  customer_id: string | null
  transaction_type: string
  amount: number
  payment_method: string | null
  transaction_date: string
  status: string
  reference_number: string | null
  notes: string | null
  created_at: string
}

export interface DealerCommission {
  id: string
  dealer_id: string
  order_id: string
  commission_amount: number
  commission_percentage: number
  status: string
  paid_date: string | null
  created_at: string
}

export interface CustomerReview {
  id: string
  customer_id: string
  dealer_id: string | null
  order_id: string | null
  model_id: string | null
  rating: number
  review_text: string | null
  is_verified: boolean
  created_at: string
  updated_at: string
}

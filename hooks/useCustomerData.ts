import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './useAuth'

export interface CustomerOrder {
  id: string
  customer_id: string
  dealer_id: string
  model_id: string
  order_date: string
  delivery_date?: string
  total_amount: number
  payment_status: 'pending' | 'paid' | 'failed'
  order_status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  created_at: string
  models: {
    id: string
    name: string
    price: number
    main_image?: string
  }
  dealers: {
    id: string
    business_name: string
    contact_email: string
    contact_phone: string
  }
}

export interface CustomerTestRide {
  id: string
  customer_id: string
  dealer_id: string
  model_id: string
  preferred_date: string
  preferred_time: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
  created_at: string
  models: {
    id: string
    name: string
    main_image?: string
  }
  dealers: {
    id: string
    business_name: string
    contact_phone: string
  }
}

export interface CustomerServiceBooking {
  id: string
  customer_id: string
  dealer_id?: string
  vehicle_model_id: string
  service_type: string
  preferred_date: string
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  description?: string
  created_at: string
  models: {
    id: string
    name: string
  }
  dealers?: {
    id: string
    business_name: string
  }
}

export interface CustomerWarranty {
  id: string
  order_id: string
  customer_id: string
  vehicle_model_id: string
  warranty_type: string
  start_date: string
  end_date: string
  status: 'active' | 'expired' | 'claimed'
  created_at: string
  models: {
    id: string
    name: string
  }
  orders: {
    id: string
    order_date: string
  }
}

export function useCustomerData() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<CustomerOrder[]>([])
  const [testRides, setTestRides] = useState<CustomerTestRide[]>([])
  const [serviceBookings, setServiceBookings] = useState<CustomerServiceBooking[]>([])
  const [warranties, setWarranties] = useState<CustomerWarranty[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCustomerOrders = async () => {
    if (!user?.id) return

    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          models (
            id,
            name,
            price,
            main_image
          ),
          dealers (
            id,
            business_name,
            contact_email,
            contact_phone
          )
        `)
        .eq('customer_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (err) {
      console.error('Error fetching customer orders:', err)
      setError('Failed to fetch orders')
    }
  }

  const fetchTestRides = async () => {
    if (!user?.id) return

    try {
      const { data, error } = await supabase
        .from('test_ride_bookings')
        .select(`
          *,
          models (
            id,
            name,
            main_image
          ),
          dealers (
            id,
            business_name,
            contact_phone
          )
        `)
        .eq('customer_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setTestRides(data || [])
    } catch (err) {
      console.error('Error fetching test rides:', err)
      setError('Failed to fetch test rides')
    }
  }

  const fetchServiceBookings = async () => {
    if (!user?.id) return

    try {
      const { data, error } = await supabase
        .from('service_bookings')
        .select(`
          *,
          models (
            id,
            name
          ),
          dealers (
            id,
            business_name
          )
        `)
        .eq('customer_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setServiceBookings(data || [])
    } catch (err) {
      console.error('Error fetching service bookings:', err)
      setError('Failed to fetch service bookings')
    }
  }

  const fetchWarranties = async () => {
    if (!user?.id) return

    try {
      const { data, error } = await supabase
        .from('warranties')
        .select(`
          *,
          models (
            id,
            name
          ),
          orders (
            id,
            order_date
          )
        `)
        .eq('customer_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setWarranties(data || [])
    } catch (err) {
      console.error('Error fetching warranties:', err)
      setError('Failed to fetch warranties')
    }
  }

  const fetchAllData = async () => {
    setLoading(true)
    setError(null)
    
    await Promise.all([
      fetchCustomerOrders(),
      fetchTestRides(),
      fetchServiceBookings(),
      fetchWarranties()
    ])
    
    setLoading(false)
  }

  useEffect(() => {
    if (user?.id) {
      fetchAllData()
    }
  }, [user?.id])

  const bookTestRide = async (testRideData: {
    model_id: string
    dealer_id: string
    preferred_date: string
    preferred_time: string
    notes?: string
  }) => {
    if (!user?.id) throw new Error('User not authenticated')

    try {
      const { data, error } = await supabase
        .from('test_ride_bookings')
        .insert({
          customer_id: user.id,
          ...testRideData
        })
        .select()
        .single()

      if (error) throw error
      
      // Refresh test rides
      await fetchTestRides()
      return data
    } catch (err) {
      console.error('Error booking test ride:', err)
      throw err
    }
  }

  const bookService = async (serviceData: {
    vehicle_model_id: string
    dealer_id?: string
    service_type: string
    preferred_date: string
    description?: string
  }) => {
    if (!user?.id) throw new Error('User not authenticated')

    try {
      const { data, error } = await supabase
        .from('service_bookings')
        .insert({
          customer_id: user.id,
          ...serviceData
        })
        .select()
        .single()

      if (error) throw error
      
      // Refresh service bookings
      await fetchServiceBookings()
      return data
    } catch (err) {
      console.error('Error booking service:', err)
      throw err
    }
  }

  const getOrderStats = () => {
    const totalOrders = orders.length
    const completedOrders = orders.filter(order => order.order_status === 'delivered').length
    const pendingOrders = orders.filter(order => ['pending', 'confirmed', 'processing', 'shipped'].includes(order.order_status)).length
    const totalSpent = orders
      .filter(order => order.payment_status === 'paid')
      .reduce((sum, order) => sum + order.total_amount, 0)

    return {
      totalOrders,
      completedOrders,
      pendingOrders,
      totalSpent
    }
  }

  const getRecentActivity = () => {
    const allActivity = [
      ...orders.map(order => ({
        type: 'order' as const,
        id: order.id,
        title: `Order for ${order.models.name}`,
        status: order.order_status,
        date: order.created_at,
        amount: order.total_amount
      })),
      ...testRides.map(ride => ({
        type: 'test_ride' as const,
        id: ride.id,
        title: `Test ride for ${ride.models.name}`,
        status: ride.status,
        date: ride.created_at
      })),
      ...serviceBookings.map(booking => ({
        type: 'service' as const,
        id: booking.id,
        title: `${booking.service_type} service`,
        status: booking.status,
        date: booking.created_at
      }))
    ]

    return allActivity
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5)
  }

  return {
    orders,
    testRides,
    serviceBookings,
    warranties,
    loading,
    error,
    bookTestRide,
    bookService,
    getOrderStats,
    getRecentActivity,
    refetch: fetchAllData
  }
}

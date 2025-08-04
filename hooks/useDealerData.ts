import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './useAuth'

export interface DealerOrder {
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
  user_profiles: {
    id: string
    full_name: string
    email: string
    phone?: string
  }
}

export interface DealerTestRide {
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
  user_profiles: {
    id: string
    full_name: string
    email: string
    phone?: string
  }
}

export interface DealerInventory {
  id: string
  dealer_id: string
  model_id: string
  quantity: number
  created_at: string
  updated_at: string
  models: {
    id: string
    name: string
    price: number
    main_image?: string
    specifications?: any
  }
}

export interface DealerSale {
  id: string
  dealer_id: string
  order_id: string
  sale_amount: number
  commission_amount: number
  sale_date: string
  created_at: string
  orders: {
    id: string
    customer_id: string
    order_status: string
    payment_status: string
    models: {
      name: string
    }
    user_profiles: {
      full_name: string
      email: string
    }
  }
}

export interface DealerCommission {
  id: string
  dealer_id: string
  order_id: string
  commission_amount: number
  commission_rate: number
  status: 'pending' | 'paid' | 'cancelled'
  created_at: string
  orders: {
    id: string
    total_amount: number
    order_date: string
    models: {
      name: string
    }
  }
}

export function useDealerData() {
  const { user, userProfile } = useAuth()
  const [dealerProfile, setDealerProfile] = useState<any>(null)
  const [orders, setOrders] = useState<DealerOrder[]>([])
  const [testRides, setTestRides] = useState<DealerTestRide[]>([])
  const [inventory, setInventory] = useState<DealerInventory[]>([])
  const [sales, setSales] = useState<DealerSale[]>([])
  const [commissions, setCommissions] = useState<DealerCommission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDealerProfile = async () => {
    if (!user?.id) return

    try {
      const { data, error } = await supabase
        .from('dealers')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (error) throw error
      setDealerProfile(data)
    } catch (err) {
      console.error('Error fetching dealer profile:', err)
      setError('Failed to fetch dealer profile')
    }
  }

  const fetchDealerOrders = async () => {
    if (!dealerProfile?.id) return

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
          user_profiles (
            id,
            full_name,
            email,
            phone
          )
        `)
        .eq('dealer_id', dealerProfile.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (err) {
      console.error('Error fetching dealer orders:', err)
      setError('Failed to fetch orders')
    }
  }

  const fetchTestRides = async () => {
    if (!dealerProfile?.id) return

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
          user_profiles (
            id,
            full_name,
            email,
            phone
          )
        `)
        .eq('dealer_id', dealerProfile.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setTestRides(data || [])
    } catch (err) {
      console.error('Error fetching test rides:', err)
      setError('Failed to fetch test rides')
    }
  }

  const fetchInventory = async () => {
    if (!dealerProfile?.id) return

    try {
      const { data, error } = await supabase
        .from('inventory')
        .select(`
          *,
          models (
            id,
            name,
            price,
            main_image,
            specifications
          )
        `)
        .eq('dealer_id', dealerProfile.id)
        .order('updated_at', { ascending: false })

      if (error) throw error
      setInventory(data || [])
    } catch (err) {
      console.error('Error fetching inventory:', err)
      setError('Failed to fetch inventory')
    }
  }

  const fetchSales = async () => {
    if (!dealerProfile?.id) return

    try {
      const { data, error } = await supabase
        .from('dealer_sales')
        .select(`
          *,
          orders (
            id,
            customer_id,
            order_status,
            payment_status,
            models (
              name
            ),
            user_profiles (
              full_name,
              email
            )
          )
        `)
        .eq('dealer_id', dealerProfile.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setSales(data || [])
    } catch (err) {
      console.error('Error fetching sales:', err)
      setError('Failed to fetch sales')
    }
  }

  const fetchCommissions = async () => {
    if (!dealerProfile?.id) return

    try {
      const { data, error } = await supabase
        .from('dealer_commissions')
        .select(`
          *,
          orders (
            id,
            total_amount,
            order_date,
            models (
              name
            )
          )
        `)
        .eq('dealer_id', dealerProfile.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setCommissions(data || [])
    } catch (err) {
      console.error('Error fetching commissions:', err)
      setError('Failed to fetch commissions')
    }
  }

  const fetchAllData = async () => {
    setLoading(true)
    setError(null)
    
    // First fetch dealer profile, then fetch other data
    await fetchDealerProfile()
  }

  useEffect(() => {
    if (user?.id && userProfile?.user_type === 'dealer') {
      fetchAllData()
    }
  }, [user?.id, userProfile?.user_type])

  useEffect(() => {
    if (dealerProfile?.id) {
      Promise.all([
        fetchDealerOrders(),
        fetchTestRides(),
        fetchInventory(),
        fetchSales(),
        fetchCommissions()
      ]).finally(() => setLoading(false))
    }
  }, [dealerProfile?.id])

  const updateTestRideStatus = async (testRideId: string, status: 'pending' | 'confirmed' | 'completed' | 'cancelled', notes?: string) => {
    try {
      const { error } = await supabase
        .from('test_ride_bookings')
        .update({ 
          status, 
          notes,
          updated_at: new Date().toISOString()
        })
        .eq('id', testRideId)

      if (error) throw error
      
      // Refresh test rides
      await fetchTestRides()
    } catch (err) {
      console.error('Error updating test ride status:', err)
      throw err
    }
  }

  const updateOrderStatus = async (orderId: string, status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled') => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ 
          order_status: status,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)

      if (error) throw error
      
      // Refresh orders
      await fetchDealerOrders()
    } catch (err) {
      console.error('Error updating order status:', err)
      throw err
    }
  }

  const updateInventoryStock = async (inventoryId: string, quantity: number) => {
    try {
      const { error } = await supabase
        .from('inventory')
        .update({ 
          quantity,
          updated_at: new Date().toISOString()
        })
        .eq('id', inventoryId)

      if (error) throw error
      
      // Refresh inventory
      await fetchInventory()
    } catch (err) {
      console.error('Error updating inventory:', err)
      throw err
    }
  }

  const getDashboardStats = () => {
    const totalOrders = orders.length
    const pendingOrders = orders.filter(order => order.order_status === 'pending').length
    const completedOrders = orders.filter(order => order.order_status === 'delivered').length
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.sale_amount, 0)
    const totalCommissions = commissions
      .filter(comm => comm.status === 'paid')
      .reduce((sum, comm) => sum + comm.commission_amount, 0)
    const pendingTestRides = testRides.filter(ride => ride.status === 'pending').length
    const lowStockItems = inventory.filter(item => item.quantity <= 5).length

    return {
      totalOrders,
      pendingOrders,
      completedOrders,
      totalRevenue,
      totalCommissions,
      pendingTestRides,
      lowStockItems
    }
  }

  const getRecentActivity = () => {
    const allActivity = [
      ...orders.map(order => ({
        type: 'order' as const,
        id: order.id,
        title: `New order from ${order.user_profiles.full_name}`,
        subtitle: order.models.name,
        status: order.order_status,
        date: order.created_at,
        amount: order.total_amount
      })),
      ...testRides.map(ride => ({
        type: 'test_ride' as const,
        id: ride.id,
        title: `Test ride request from ${ride.user_profiles.full_name}`,
        subtitle: ride.models.name,
        status: ride.status,
        date: ride.created_at
      }))
    ]

    return allActivity
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 8)
  }

  return {
    dealerProfile,
    orders,
    testRides,
    inventory,
    sales,
    commissions,
    loading,
    error,
    updateTestRideStatus,
    updateOrderStatus,
    updateInventoryStock,
    getDashboardStats,
    getRecentActivity,
    refetch: fetchAllData
  }
}

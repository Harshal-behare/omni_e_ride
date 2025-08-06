"use client"

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './useAuth'

// --- INTERFACES BASED ON YOUR database_schema.sql ---
export interface DealerProfile {
  id: string;
  user_id: string;
  business_name: string;
  business_address: string;
  phone: string;
  email: string;
  status: 'pending' | 'active' | 'suspended';
}

export interface DealerOrder {
  id: string;
  created_at: string;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed';
  models: { name: string };
  user_profiles: { full_name: string; email: string };
}

export interface DealerInventory {
    id: string;
    quantity: number;
    models: { name: string; price: number, specifications: { range: string; top_speed: string }};
}

export interface DealerTestRide {
    id: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    preferred_date: string;
    preferred_time: string;
    models: { name: string };
    user_profiles: { full_name: string, phone: string };
}

export interface DealerSale {
    id: string;
    sale_date: string;
    commission_amount: number;
    orders: { id: string, total_amount: number; models: { name: string }};
}

export interface DealerCommission {
    id: string;
    status: 'pending' | 'paid' | 'cancelled';
    commission_amount: number;
    orders: { models: { name: string } };
}


export function useDealerData() {
  const { user, userProfile } = useAuth();
  const [dealerProfile, setDealerProfile] = useState<DealerProfile | null>(null);
  const [orders, setOrders] = useState<DealerOrder[]>([]);
  const [testRides, setTestRides] = useState<DealerTestRide[]>([]);
  const [inventory, setInventory] = useState<DealerInventory[]>([]);
  const [sales, setSales] = useState<DealerSale[]>([]);
  const [commissions, setCommissions] = useState<DealerCommission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllData = useCallback(async () => {
    if (!user || userProfile?.user_type !== 'dealer') {
        setLoading(false);
        return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data: dealerData, error: dealerError } = await supabase
        .from('dealers')
        .select('*')
        .eq('user_id', user.id)
        .single();
        
      if (dealerError) throw new Error(`Failed to fetch dealer profile: ${dealerError.message}`);
      setDealerProfile(dealerData);
      
      if (!dealerData) {
          setLoading(false);
          return;
      }

      const [
          { data: ordersData, error: ordersError },
          { data: testRidesData, error: testRidesError },
          { data: inventoryData, error: inventoryError },
          { data: salesData, error: salesError },
          { data: commissionsData, error: commissionsError },
      ] = await Promise.all([
          supabase.from('orders').select('*, models(name), user_profiles(full_name, email)').eq('dealer_id', dealerData.id),
          supabase.from('test_ride_bookings').select('*, models(name), user_profiles(full_name, phone)').eq('dealer_id', dealerData.id),
          supabase.from('inventory').select('*, models(name, price, specifications)').eq('dealer_id', dealerData.id),
          supabase.from('dealer_sales').select('*, orders(id, total_amount, models(name))').eq('dealer_id', dealerData.id),
          supabase.from('dealer_commissions').select('*, orders(models(name))').eq('dealer_id', dealerData.id),
      ]);
      
      if (ordersError) throw new Error(`Orders: ${ordersError.message}`);
      if (testRidesError) throw new Error(`Test Rides: ${testRidesError.message}`);
      if (inventoryError) throw new Error(`Inventory: ${inventoryError.message}`);
      if (salesError) throw new Error(`Sales: ${salesError.message}`);
      if (commissionsError) throw new Error(`Commissions: ${commissionsError.message}`);

      setOrders(ordersData as any || []);
      setTestRides(testRidesData as any || []);
      setInventory(inventoryData as any || []);
      setSales(salesData as any || []);
      setCommissions(commissionsData as any || []);

    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      console.error("Error fetching dealer data:", err);
    } finally {
      setLoading(false);
    }
  }, [user, userProfile]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const updateTestRideStatus = async (id: string, status: 'confirmed' | 'cancelled') => {
      const { error } = await supabase.from('test_ride_bookings').update({ status }).eq('id', id);
      if (error) alert(`Error: ${error.message}`);
      else await fetchAllData();
  };

  return {
    dealerProfile,
    orders,
    inventory,
    testRides,
    sales,
    commissions,
    loading,
    error,
    refetch: fetchAllData,
    updateTestRideStatus,
  }
}
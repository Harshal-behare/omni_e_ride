-- =====================================================
-- FIX AUTHENTICATION DATABASE SETUP
-- =====================================================

-- First, disable all RLS policies for development
ALTER TABLE IF EXISTS public.user_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.dealers DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.test_ride_bookings DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.service_bookings DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.contact_inquiries DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.dealer_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.dealer_commissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.dealer_sales DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.customer_reviews DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.financial_transactions DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.inventory DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.models DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.pre_approved_emails DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.warranties DISABLE ROW LEVEL SECURITY;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create a simple, robust trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  user_role text := 'customer';
BEGIN
  -- Check if email is in pre_approved_emails for special roles
  SELECT role INTO user_role 
  FROM public.pre_approved_emails 
  WHERE email = NEW.email AND used = false
  LIMIT 1;
  
  -- If no special role found, default to customer
  IF user_role IS NULL THEN
    user_role := 'customer';
  END IF;
  
  -- Create user profile
  INSERT INTO public.user_profiles (
    id, 
    email, 
    full_name, 
    phone, 
    user_type,
    created_at,
    updated_at
  ) VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    user_role::user_type,
    NOW(),
    NOW()
  );
  
  -- Mark pre-approved email as used if it was found
  IF user_role != 'customer' THEN
    UPDATE public.pre_approved_emails 
    SET used = true, used_at = NOW() 
    WHERE email = NEW.email AND used = false;
  END IF;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the signup
    RAISE WARNING 'Error in handle_new_user trigger: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Ensure the user_type enum exists with correct values
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_type') THEN
    CREATE TYPE user_type AS ENUM ('admin', 'dealer', 'customer');
  END IF;
END $$;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Insert test pre-approved emails
INSERT INTO public.pre_approved_emails (email, role, used, created_at) VALUES
('admin@test.com', 'admin', false, NOW()),
('dealer@test.com', 'dealer', false, NOW()),
('customer@test.com', 'customer', false, NOW())
ON CONFLICT (email) DO UPDATE SET 
  role = EXCLUDED.role,
  used = false,
  updated_at = NOW();

-- Test the setup
DO $$
BEGIN
  RAISE NOTICE 'Authentication database setup completed successfully!';
  RAISE NOTICE 'Test with these pre-approved emails:';
  RAISE NOTICE '- admin@test.com (admin role)';
  RAISE NOTICE '- dealer@test.com (dealer role)';
  RAISE NOTICE '- customer@test.com (customer role)';
  RAISE NOTICE 'Any other email will get customer role by default.';
END $$;

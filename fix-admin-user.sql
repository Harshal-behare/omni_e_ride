-- Fix Admin User Script
-- Run this script in your Supabase SQL editor to fix the existing admin user

-- First, let's clean up any existing data to avoid conflicts
DELETE FROM public.dealers WHERE email = 'harshalbehare1@gmail.com';
DELETE FROM public.user_profiles WHERE email = 'harshalbehare1@gmail.com';

-- Create missing user profile for existing admin user
INSERT INTO public.user_profiles (id, email, full_name, phone, user_type)
SELECT 
    id,
    email,
    COALESCE(raw_user_meta_data->>'full_name', 'Admin User'),
    raw_user_meta_data->>'phone',
    'admin'
FROM auth.users 
WHERE email = 'harshalbehare1@gmail.com'
ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    phone = EXCLUDED.phone,
    user_type = EXCLUDED.user_type;

-- Mark pre-approved email as used
UPDATE public.pre_approved_emails 
SET used = TRUE, used_at = NOW()
WHERE email = 'harshalbehare1@gmail.com' AND used = FALSE;

-- Create dealer record for admin if they should have dealer access
INSERT INTO public.dealers (
    user_id,
    business_name,
    business_address,
    phone,
    email,
    status
)
SELECT 
    id,
    'Admin Business',
    'Admin Address',
    COALESCE(raw_user_meta_data->>'phone', ''),
    email,
    'approved'
FROM auth.users 
WHERE email = 'harshalbehare1@gmail.com'
ON CONFLICT (user_id) DO UPDATE SET
    business_name = EXCLUDED.business_name,
    business_address = EXCLUDED.business_address,
    phone = EXCLUDED.phone,
    email = EXCLUDED.email,
    status = EXCLUDED.status;

-- Verify the setup
SELECT 
    'User Profile' as table_name,
    id,
    email,
    full_name,
    user_type::text
FROM public.user_profiles 
WHERE email = 'harshalbehare1@gmail.com'

UNION ALL

SELECT 
    'Dealer' as table_name,
    user_id as id,
    email,
    business_name as full_name,
    status::text as user_type
FROM public.dealers 
WHERE email = 'harshalbehare1@gmail.com'

UNION ALL

SELECT 
    'Pre-approved Email' as table_name,
    id,
    email,
    role::text as full_name,
    CASE WHEN used THEN 'used' ELSE 'unused' END as user_type
FROM public.pre_approved_emails 
WHERE email = 'harshalbehare1@gmail.com'; 
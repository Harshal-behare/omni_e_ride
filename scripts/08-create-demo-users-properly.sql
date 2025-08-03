-- This script creates demo users using Supabase's proper method
-- Run this in Supabase SQL Editor

-- First, let's create a function to create users properly
CREATE OR REPLACE FUNCTION create_demo_user(
    user_email TEXT,
    user_password TEXT,
    user_id UUID,
    user_type TEXT,
    full_name TEXT,
    phone TEXT DEFAULT NULL
)
RETURNS void AS $$
DECLARE
    encrypted_pw TEXT;
BEGIN
    -- Generate proper password hash
    encrypted_pw := crypt(user_password, gen_salt('bf'));
    
    -- Insert into auth.users
    INSERT INTO auth.users (
        id,
        instance_id,
        email,
        encrypted_password,
        email_confirmed_at,
        created_at,
        updated_at,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token,
        aud,
        role,
        raw_user_meta_data,
        raw_app_meta_data
    ) VALUES (
        user_id,
        '00000000-0000-0000-0000-000000000000',
        user_email,
        encrypted_pw,
        NOW(),
        NOW(),
        NOW(),
        '',
        '',
        '',
        '',
        'authenticated',
        'authenticated',
        jsonb_build_object('full_name', full_name, 'phone', COALESCE(phone, '')),
        jsonb_build_object('provider', 'email', 'providers', ARRAY['email'])
    ) ON CONFLICT (id) DO UPDATE SET
        encrypted_password = encrypted_pw,
        email_confirmed_at = NOW();
    
    -- Insert into user_profiles
    INSERT INTO user_profiles (
        id,
        email,
        user_type,
        full_name,
        phone,
        created_at,
        updated_at
    ) VALUES (
        user_id,
        user_email,
        user_type,
        full_name,
        phone,
        NOW(),
        NOW()
    ) ON CONFLICT (id) DO UPDATE SET
        user_type = user_type,
        full_name = full_name,
        email = user_email,
        phone = COALESCE(phone, user_profiles.phone);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Temporarily disable RLS
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;

-- Create admin user
SELECT create_demo_user(
    'admin@omnierride.com',
    'admin123',
    '00000000-0000-0000-0000-000000000001'::UUID,
    'admin',
    'System Administrator',
    '+91 9876543210'
);

-- Create dealer user
SELECT create_demo_user(
    'dealer@omnierride.com',
    'dealer123',
    '00000000-0000-0000-0000-000000000002'::UUID,
    'dealer',
    'Demo Dealer',
    '+91 9876543211'
);

-- Create dealer record for the dealer user
INSERT INTO dealers (
    id,
    user_id,
    name,
    location,
    address,
    phone,
    email,
    manager_name,
    status,
    territory,
    monthly_sales,
    total_sales,
    commission_rate,
    created_at,
    updated_at
) VALUES (
    '00000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000002',
    'Demo Dealer Store',
    'Patna',
    '123 Main Street, Patna, Bihar',
    '+91 9876543211',
    'dealer@omnierride.com',
    'Demo Dealer',
    'active',
    ARRAY['Patna', 'Bihar'],
    15,
    150,
    5.0,
    NOW(),
    NOW()
) ON CONFLICT (id) DO UPDATE SET
    status = 'active',
    name = 'Demo Dealer Store';

-- Re-enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Drop the function as it's no longer needed
DROP FUNCTION create_demo_user(TEXT, TEXT, UUID, TEXT, TEXT, TEXT);

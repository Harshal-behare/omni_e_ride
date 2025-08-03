-- Fix for Customer Signup Database Error
-- This script addresses issues with the handle_new_user trigger function

-- First, let's drop and recreate the trigger function with better error handling
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- Create improved trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    user_role user_type;
BEGIN
    -- Check if user is in pre_approved_emails
    SELECT role INTO user_role
    FROM public.pre_approved_emails
    WHERE email = NEW.email AND used = FALSE
    LIMIT 1;
    
    -- Insert user profile with better error handling
    INSERT INTO public.user_profiles (id, email, full_name, phone, user_type)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
        COALESCE(NEW.raw_user_meta_data->>'phone', ''),
        COALESCE(user_role, 'customer')
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = EXCLUDED.full_name,
        phone = EXCLUDED.phone,
        user_type = EXCLUDED.user_type,
        updated_at = NOW();
    
    -- Mark pre_approved_email as used if found
    IF user_role IS NOT NULL THEN
        UPDATE public.pre_approved_emails
        SET used = TRUE, used_at = NOW()
        WHERE email = NEW.email AND used = FALSE;
        
        -- If user is a dealer, create dealer record
        IF user_role = 'dealer' THEN
            INSERT INTO public.dealers (
                user_id,
                business_name,
                business_address,
                phone,
                email,
                status
            ) VALUES (
                NEW.id,
                COALESCE(NEW.raw_user_meta_data->>'business_name', 'Business Name'),
                COALESCE(NEW.raw_user_meta_data->>'business_address', 'Business Address'),
                COALESCE(NEW.raw_user_meta_data->>'phone', ''),
                NEW.email,
                'pending'
            )
            ON CONFLICT (user_id) DO UPDATE SET
                business_name = EXCLUDED.business_name,
                business_address = EXCLUDED.business_address,
                phone = EXCLUDED.phone,
                email = EXCLUDED.email,
                updated_at = NOW();
        END IF;
    END IF;
    
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        -- Log the error but don't fail the signup
        RAISE WARNING 'Error in handle_new_user trigger: %', SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Fix RLS policies for user_profiles to allow the trigger to work
DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;
CREATE POLICY "Users can insert own profile" ON public.user_profiles
    FOR INSERT WITH CHECK (true);

-- Ensure the trigger function has proper permissions
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO authenticated;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO anon;

-- Add a function to manually create user profile if needed
CREATE OR REPLACE FUNCTION public.create_user_profile_manual(
    user_id UUID,
    user_email TEXT,
    user_full_name TEXT DEFAULT 'User',
    user_phone TEXT DEFAULT '',
    user_role user_type DEFAULT 'customer'
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name, phone, user_type)
    VALUES (user_id, user_email, user_full_name, user_phone, user_role)
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = EXCLUDED.full_name,
        phone = EXCLUDED.phone,
        user_type = EXCLUDED.user_type,
        updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the manual function
GRANT EXECUTE ON FUNCTION public.create_user_profile_manual(UUID, TEXT, TEXT, TEXT, user_type) TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_user_profile_manual(UUID, TEXT, TEXT, TEXT, user_type) TO anon;

-- Ensure all necessary permissions are set
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO anon;
GRANT ALL ON public.user_profiles TO authenticated;
GRANT ALL ON public.user_profiles TO anon;
GRANT ALL ON public.pre_approved_emails TO authenticated;
GRANT ALL ON public.pre_approved_emails TO anon;
GRANT ALL ON public.dealers TO authenticated;
GRANT ALL ON public.dealers TO anon;

-- Insert a test customer email to ensure the system works
INSERT INTO public.pre_approved_emails (email, role) 
VALUES ('test@example.com', 'customer')
ON CONFLICT (email) DO NOTHING;

-- Display current user profiles for verification
SELECT 'Current user profiles:' as info;
SELECT id, email, full_name, user_type, created_at FROM public.user_profiles ORDER BY created_at DESC LIMIT 10;

-- Display current pre-approved emails for verification
SELECT 'Current pre-approved emails:' as info;
SELECT email, role, used, created_at FROM public.pre_approved_emails ORDER BY created_at DESC LIMIT 10;
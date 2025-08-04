-- Database Setup Script for Omni E-Ride Authentication System
-- Run this script in your Supabase SQL editor

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS public.customer_reviews CASCADE;
DROP TABLE IF EXISTS public.dealer_commissions CASCADE;
DROP TABLE IF EXISTS public.financial_transactions CASCADE;
DROP TABLE IF EXISTS public.warranties CASCADE;
DROP TABLE IF EXISTS public.service_bookings CASCADE;
DROP TABLE IF EXISTS public.dealer_sales CASCADE;
DROP TABLE IF EXISTS public.inventory CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.test_ride_bookings CASCADE;
DROP TABLE IF EXISTS public.dealers CASCADE;
DROP TABLE IF EXISTS public.user_profiles CASCADE;
DROP TABLE IF EXISTS public.dealer_applications CASCADE;
DROP TABLE IF EXISTS public.contact_inquiries CASCADE;
DROP TABLE IF EXISTS public.pre_approved_emails CASCADE;
DROP TABLE IF EXISTS public.models CASCADE;

-- Create custom ENUM types
DO $$ BEGIN
    CREATE TYPE user_type AS ENUM ('admin', 'dealer', 'customer');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE inquiry_status AS ENUM ('new', 'in_progress', 'resolved', 'closed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE dealer_status AS ENUM ('pending', 'approved', 'rejected', 'suspended');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE service_status AS ENUM ('scheduled', 'in_progress', 'completed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE warranty_status AS ENUM ('active', 'expired', 'void');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create base tables first

-- Models Table (Products)
CREATE TABLE public.models (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    specifications JSONB,
    main_image TEXT,
    gallery TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Profiles Table
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    user_type user_type DEFAULT 'customer',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pre-approved Emails Table
CREATE TABLE public.pre_approved_emails (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    role user_type NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    used_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Dealers Table
CREATE TABLE public.dealers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE UNIQUE,
    business_name VARCHAR(255) NOT NULL,
    business_address TEXT NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    status dealer_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Inquiries Table
CREATE TABLE public.contact_inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status inquiry_status DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Dealer Applications Table
CREATE TABLE public.dealer_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    business_name VARCHAR(255) NOT NULL,
    business_address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(20) NOT NULL,
    business_type VARCHAR(100) NOT NULL,
    experience_years INTEGER,
    investment_capacity VARCHAR(100) NOT NULL,
    expected_sales INTEGER,
    territory_preference TEXT[],
    additional_info TEXT,
    status dealer_status DEFAULT 'pending',
    reviewed_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders Table
CREATE TABLE public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    dealer_id UUID REFERENCES public.dealers(id) ON DELETE CASCADE,
    model_id UUID REFERENCES public.models(id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 1,
    total_amount DECIMAL(10,2) NOT NULL,
    status order_status DEFAULT 'pending',
    payment_status payment_status DEFAULT 'pending',
    shipping_address TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Test Ride Bookings Table
CREATE TABLE public.test_ride_bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    dealer_id UUID REFERENCES public.dealers(id) ON DELETE CASCADE,
    model_id UUID REFERENCES public.models(id) ON DELETE CASCADE,
    preferred_date DATE NOT NULL,
    preferred_time VARCHAR(50) NOT NULL,
    status booking_status DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inventory Table
CREATE TABLE public.inventory (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    dealer_id UUID REFERENCES public.dealers(id) ON DELETE CASCADE,
    model_id UUID REFERENCES public.models(id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 0,
    price DECIMAL(10,2) NOT NULL,
    condition VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT unique_dealer_model UNIQUE (dealer_id, model_id)
);

-- Dealer Sales Table
CREATE TABLE public.dealer_sales (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    dealer_id UUID REFERENCES public.dealers(id) ON DELETE CASCADE,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    commission_amount DECIMAL(10,2) NOT NULL,
    sale_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service Bookings Table
CREATE TABLE public.service_bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    dealer_id UUID REFERENCES public.dealers(id) ON DELETE CASCADE,
    vehicle_model_id UUID REFERENCES public.models(id) ON DELETE CASCADE,
    vehicle_registration VARCHAR(50),
    service_type VARCHAR(100) NOT NULL,
    service_description TEXT,
    scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
    estimated_duration INTEGER,
    status service_status DEFAULT 'scheduled',
    total_cost DECIMAL(10,2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Warranties Table
CREATE TABLE public.warranties (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    vehicle_model_id UUID REFERENCES public.models(id) ON DELETE CASCADE,
    warranty_type VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status warranty_status DEFAULT 'active',
    terms_conditions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Financial Transactions Table
CREATE TABLE public.financial_transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    dealer_id UUID REFERENCES public.dealers(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    transaction_type VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50),
    transaction_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'completed',
    reference_number VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Dealer Commissions Table
CREATE TABLE public.dealer_commissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    dealer_id UUID REFERENCES public.dealers(id) ON DELETE CASCADE,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    commission_amount DECIMAL(10,2) NOT NULL,
    commission_percentage DECIMAL(5,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    paid_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customer Reviews Table
CREATE TABLE public.customer_reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    dealer_id UUID REFERENCES public.dealers(id) ON DELETE CASCADE,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    model_id UUID REFERENCES public.models(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Function to handle new user creation
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
    
    -- Insert user profile
    INSERT INTO public.user_profiles (id, email, full_name, phone, user_type)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
        NEW.raw_user_meta_data->>'phone',
        COALESCE(user_role, 'customer')
    )
    ON CONFLICT (id) DO NOTHING;
    
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
            ON CONFLICT (user_id) DO NOTHING;
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable RLS on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dealers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_ride_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dealer_sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.warranties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dealer_commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles (Simplified to prevent recursion)
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
CREATE POLICY "Users can view own profile" ON public.user_profiles
    FOR SELECT USING (id = auth.uid());

DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
CREATE POLICY "Users can update own profile" ON public.user_profiles
    FOR UPDATE USING (id = auth.uid());

DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;
CREATE POLICY "Users can insert own profile" ON public.user_profiles
    FOR INSERT WITH CHECK (id = auth.uid());

-- Admin policies (simplified)
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.user_profiles;
CREATE POLICY "Admins can view all profiles" ON public.user_profiles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.pre_approved_emails
            WHERE email = auth.email()
            AND role = 'admin'
        )
    );

-- RLS Policies for dealers
DROP POLICY IF EXISTS "dealers_select_own" ON public.dealers;
CREATE POLICY "dealers_select_own" ON public.dealers
    FOR SELECT USING (
        user_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM public.pre_approved_emails
            WHERE email = auth.email()
            AND role = 'admin'
        )
    );

DROP POLICY IF EXISTS "dealers_update_own" ON public.dealers;
CREATE POLICY "dealers_update_own" ON public.dealers
    FOR UPDATE USING (
        user_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM public.pre_approved_emails
            WHERE email = auth.email()
            AND role = 'admin'
        )
    );

DROP POLICY IF EXISTS "dealers_insert_own" ON public.dealers;
CREATE POLICY "dealers_insert_own" ON public.dealers
    FOR INSERT WITH CHECK (
        user_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM public.pre_approved_emails
            WHERE email = auth.email()
            AND role = 'admin'
        )
    );

-- RLS Policies for orders
DROP POLICY IF EXISTS "customers_view_own_orders" ON public.orders;
CREATE POLICY "customers_view_own_orders" ON public.orders
    FOR SELECT USING (
        customer_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM public.pre_approved_emails
            WHERE email = auth.email()
            AND role = 'admin'
        ) OR
        EXISTS (
            SELECT 1 FROM public.dealers
            WHERE user_id = auth.uid() AND id = dealer_id
        )
    );

DROP POLICY IF EXISTS "customers_insert_own_orders" ON public.orders;
CREATE POLICY "customers_insert_own_orders" ON public.orders
    FOR INSERT WITH CHECK (
        customer_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM public.pre_approved_emails
            WHERE email = auth.email()
            AND role = 'admin'
        )
    );

DROP POLICY IF EXISTS "customers_update_own_orders" ON public.orders;
CREATE POLICY "customers_update_own_orders" ON public.orders
    FOR UPDATE USING (
        customer_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM public.pre_approved_emails
            WHERE email = auth.email()
            AND role = 'admin'
        )
    );

-- RLS Policies for test_ride_bookings
DROP POLICY IF EXISTS "customers_view_own_bookings" ON public.test_ride_bookings;
CREATE POLICY "customers_view_own_bookings" ON public.test_ride_bookings
    FOR SELECT USING (
        customer_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM public.pre_approved_emails
            WHERE email = auth.email()
            AND role = 'admin'
        ) OR
        EXISTS (
            SELECT 1 FROM public.dealers
            WHERE user_id = auth.uid() AND id = dealer_id
        )
    );

DROP POLICY IF EXISTS "customers_insert_own_bookings" ON public.test_ride_bookings;
CREATE POLICY "customers_insert_own_bookings" ON public.test_ride_bookings
    FOR INSERT WITH CHECK (
        customer_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM public.pre_approved_emails
            WHERE email = auth.email()
            AND role = 'admin'
        )
    );

DROP POLICY IF EXISTS "customers_update_own_bookings" ON public.test_ride_bookings;
CREATE POLICY "customers_update_own_bookings" ON public.test_ride_bookings
    FOR UPDATE USING (
        customer_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM public.pre_approved_emails
            WHERE email = auth.email()
            AND role = 'admin'
        )
    );

-- RLS Policies for inventory
DROP POLICY IF EXISTS "dealers_view_own_inventory" ON public.inventory;
CREATE POLICY "dealers_view_own_inventory" ON public.inventory
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.dealers
            WHERE user_id = auth.uid() AND id = dealer_id
        ) OR
        EXISTS (
            SELECT 1 FROM public.pre_approved_emails
            WHERE email = auth.email()
            AND role = 'admin'
        )
    );

DROP POLICY IF EXISTS "dealers_manage_own_inventory" ON public.inventory;
CREATE POLICY "dealers_manage_own_inventory" ON public.inventory
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.dealers
            WHERE user_id = auth.uid() AND id = dealer_id
        ) OR
        EXISTS (
            SELECT 1 FROM public.pre_approved_emails
            WHERE email = auth.email()
            AND role = 'admin'
        )
    );

-- RLS Policies for dealer_sales
DROP POLICY IF EXISTS "dealers_view_own_sales" ON public.dealer_sales;
CREATE POLICY "dealers_view_own_sales" ON public.dealer_sales
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.dealers
            WHERE user_id = auth.uid() AND id = dealer_id
        ) OR
        EXISTS (
            SELECT 1 FROM public.pre_approved_emails
            WHERE email = auth.email()
            AND role = 'admin'
        )
    );

DROP POLICY IF EXISTS "dealers_manage_own_sales" ON public.dealer_sales;
CREATE POLICY "dealers_manage_own_sales" ON public.dealer_sales
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.dealers
            WHERE user_id = auth.uid() AND id = dealer_id
        ) OR
        EXISTS (
            SELECT 1 FROM public.pre_approved_emails
            WHERE email = auth.email()
            AND role = 'admin'
        )
    );

-- RLS Policies for service_bookings
DROP POLICY IF EXISTS "service_bookings_policy" ON public.service_bookings;
CREATE POLICY "service_bookings_policy" ON public.service_bookings
    FOR ALL USING (
        customer_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM public.dealers
            WHERE user_id = auth.uid() AND id = dealer_id
        ) OR
        EXISTS (
            SELECT 1 FROM public.pre_approved_emails
            WHERE email = auth.email()
            AND role = 'admin'
        )
    );

-- RLS Policies for warranties
DROP POLICY IF EXISTS "warranties_policy" ON public.warranties;
CREATE POLICY "warranties_policy" ON public.warranties
    FOR ALL USING (
        customer_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM public.pre_approved_emails
            WHERE email = auth.email()
            AND role = 'admin'
        )
    );

-- RLS Policies for financial_transactions
DROP POLICY IF EXISTS "financial_transactions_policy" ON public.financial_transactions;
CREATE POLICY "financial_transactions_policy" ON public.financial_transactions
    FOR ALL USING (
        customer_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM public.dealers
            WHERE user_id = auth.uid() AND id = dealer_id
        ) OR
        EXISTS (
            SELECT 1 FROM public.pre_approved_emails
            WHERE email = auth.email()
            AND role = 'admin'
        )
    );

-- RLS Policies for dealer_commissions
DROP POLICY IF EXISTS "dealer_commissions_policy" ON public.dealer_commissions;
CREATE POLICY "dealer_commissions_policy" ON public.dealer_commissions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.dealers
            WHERE user_id = auth.uid() AND id = dealer_id
        ) OR
        EXISTS (
            SELECT 1 FROM public.pre_approved_emails
            WHERE email = auth.email()
            AND role = 'admin'
        )
    );

-- RLS Policies for customer_reviews
DROP POLICY IF EXISTS "customer_reviews_policy" ON public.customer_reviews;
CREATE POLICY "customer_reviews_policy" ON public.customer_reviews
    FOR ALL USING (
        customer_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM public.dealers
            WHERE user_id = auth.uid() AND id = dealer_id
        ) OR
        EXISTS (
            SELECT 1 FROM public.pre_approved_emails
            WHERE email = auth.email()
            AND role = 'admin'
        )
    );

-- Public policies for contact_inquiries and dealer_applications
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_insert_contact_inquiries" ON public.contact_inquiries;
CREATE POLICY "public_insert_contact_inquiries" ON public.contact_inquiries
    FOR INSERT WITH CHECK (true);

ALTER TABLE public.dealer_applications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_insert_dealer_applications" ON public.dealer_applications;
CREATE POLICY "public_insert_dealer_applications" ON public.dealer_applications
    FOR INSERT WITH CHECK (true);

-- Admin can view all contact_inquiries and dealer_applications
DROP POLICY IF EXISTS "admin_view_contact_inquiries" ON public.contact_inquiries;
CREATE POLICY "admin_view_contact_inquiries" ON public.contact_inquiries
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.pre_approved_emails
            WHERE email = auth.email()
            AND role = 'admin'
        )
    );

DROP POLICY IF EXISTS "admin_view_dealer_applications" ON public.dealer_applications;
CREATE POLICY "admin_view_dealer_applications" ON public.dealer_applications
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.pre_approved_emails
            WHERE email = auth.email()
            AND role = 'admin'
        )
    );

-- Public access to models
ALTER TABLE public.models ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_view_models" ON public.models;
CREATE POLICY "public_view_models" ON public.models
    FOR SELECT USING (true);

-- Admin can manage models
DROP POLICY IF EXISTS "admin_manage_models" ON public.models;
CREATE POLICY "admin_manage_models" ON public.models
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.pre_approved_emails
            WHERE email = auth.email()
            AND role = 'admin'
        )
    );

-- Insert initial admin email
INSERT INTO public.pre_approved_emails (email, role) 
VALUES ('harshalbehare1@gmail.com', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert some sample models
INSERT INTO public.models (name, description, price, specifications, main_image) VALUES
('OMNI E-Scooter Pro', 'High-performance electric scooter with advanced features', 29999.00, '{"max_speed": "45 km/h", "range": "80 km", "battery": "48V 20Ah"}', '/images/scooter-pro.jpg'),
('OMNI E-Scooter Lite', 'Lightweight and affordable electric scooter', 19999.00, '{"max_speed": "35 km/h", "range": "60 km", "battery": "36V 15Ah"}', '/images/scooter-lite.jpg'),
('OMNI E-Scooter Max', 'Premium electric scooter with extended range', 39999.00, '{"max_speed": "50 km/h", "range": "100 km", "battery": "60V 25Ah"}', '/images/scooter-max.jpg'); 
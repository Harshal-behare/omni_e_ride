-- REMOVE ALL EXISTING POLICIES FIRST
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Anyone can view active models" ON models;
DROP POLICY IF EXISTS "Admins can manage models" ON models;
DROP POLICY IF EXISTS "Anyone can view active dealers" ON dealers;
DROP POLICY IF EXISTS "Dealers can view own record" ON dealers;
DROP POLICY IF EXISTS "Dealers can update own record" ON dealers;
DROP POLICY IF EXISTS "Admins can manage all dealers" ON dealers;
DROP POLICY IF EXISTS "Anyone can create test ride booking" ON test_ride_bookings;
DROP POLICY IF EXISTS "Users can view own bookings" ON test_ride_bookings;
DROP POLICY IF EXISTS "Dealers can view their bookings" ON test_ride_bookings;
DROP POLICY IF EXISTS "Dealers can update their bookings" ON test_ride_bookings;
DROP POLICY IF EXISTS "Admins can manage all bookings" ON test_ride_bookings;
DROP POLICY IF EXISTS "Anyone can create orders" ON orders;
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
DROP POLICY IF EXISTS "Dealers can view orders in their territory" ON orders;
DROP POLICY IF EXISTS "Dealers can update orders" ON orders;
DROP POLICY IF EXISTS "Admins can manage all orders" ON orders;
DROP POLICY IF EXISTS "Anyone can create inquiries" ON contact_inquiries;
DROP POLICY IF EXISTS "Admins can manage inquiries" ON contact_inquiries;
DROP POLICY IF EXISTS "Anyone can submit applications" ON dealer_applications;
DROP POLICY IF EXISTS "Admins can manage applications" ON dealer_applications;
DROP POLICY IF EXISTS "Dealers can manage own inventory" ON inventory;
DROP POLICY IF EXISTS "Admins can view all inventory" ON inventory;
DROP POLICY IF EXISTS "Dealers can view own sales" ON dealer_sales;
DROP POLICY IF EXISTS "Admins can manage all sales" ON dealer_sales;
DROP POLICY IF EXISTS "Admins can manage pre-approved emails" ON pre_approved_emails;
DROP POLICY IF EXISTS "Anyone can check email approval" ON pre_approved_emails;

-- DISABLE RLS ON ALL TABLES FIRST
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE models DISABLE ROW LEVEL SECURITY;
ALTER TABLE dealers DISABLE ROW LEVEL SECURITY;
ALTER TABLE test_ride_bookings DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries DISABLE ROW LEVEL SECURITY;
ALTER TABLE dealer_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE inventory DISABLE ROW LEVEL SECURITY;
ALTER TABLE dealer_sales DISABLE ROW LEVEL SECURITY;
ALTER TABLE pre_approved_emails DISABLE ROW LEVEL SECURITY;

-- NOW ENABLE RLS ON ALL TABLES
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE models ENABLE ROW LEVEL SECURITY;
ALTER TABLE dealers ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_ride_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE dealer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE dealer_sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE pre_approved_emails ENABLE ROW LEVEL SECURITY;

-- CREATE FRESH POLICIES

-- User Profiles Policies
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON user_profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND user_type = 'admin'
        )
    );

CREATE POLICY "Admins can update all profiles" ON user_profiles
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND user_type = 'admin'
        )
    );

-- Models Policies (Public read, admin write)
CREATE POLICY "Anyone can view active models" ON models
    FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage models" ON models
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND user_type = 'admin'
        )
    );

-- Dealers Policies
CREATE POLICY "Anyone can view active dealers" ON dealers
    FOR SELECT USING (status = 'active');

CREATE POLICY "Dealers can view own record" ON dealers
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Dealers can update own record" ON dealers
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all dealers" ON dealers
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND user_type = 'admin'
        )
    );

-- Test Ride Bookings Policies
CREATE POLICY "Anyone can create test ride booking" ON test_ride_bookings
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own bookings" ON test_ride_bookings
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Dealers can view their bookings" ON test_ride_bookings
    FOR SELECT USING (
        dealer_id IN (
            SELECT id FROM dealers WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Dealers can update their bookings" ON test_ride_bookings
    FOR UPDATE USING (
        dealer_id IN (
            SELECT id FROM dealers WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Admins can manage all bookings" ON test_ride_bookings
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND user_type = 'admin'
        )
    );

-- Orders Policies
CREATE POLICY "Anyone can create orders" ON orders
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own orders" ON orders
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Dealers can view orders in their territory" ON orders
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM dealers 
            WHERE user_id = auth.uid() AND status = 'active'
        )
    );

CREATE POLICY "Dealers can update orders" ON orders
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM dealers 
            WHERE user_id = auth.uid() AND status = 'active'
        )
    );

CREATE POLICY "Admins can manage all orders" ON orders
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND user_type = 'admin'
        )
    );

-- Contact Inquiries Policies
CREATE POLICY "Anyone can create inquiries" ON contact_inquiries
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage inquiries" ON contact_inquiries
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND user_type = 'admin'
        )
    );

-- Dealer Applications Policies
CREATE POLICY "Anyone can submit applications" ON dealer_applications
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage applications" ON dealer_applications
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND user_type = 'admin'
        )
    );

-- Inventory Policies
CREATE POLICY "Dealers can manage own inventory" ON inventory
    FOR ALL USING (
        dealer_id IN (
            SELECT id FROM dealers WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Admins can view all inventory" ON inventory
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND user_type = 'admin'
        )
    );

-- Dealer Sales Policies
CREATE POLICY "Dealers can view own sales" ON dealer_sales
    FOR SELECT USING (
        dealer_id IN (
            SELECT id FROM dealers WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Admins can manage all sales" ON dealer_sales
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND user_type = 'admin'
        )
    );

-- Pre-approved Emails Policies
CREATE POLICY "Admins can manage pre-approved emails" ON pre_approved_emails
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND user_type = 'admin'
        )
    );

CREATE POLICY "Anyone can check email approval" ON pre_approved_emails
    FOR SELECT USING (true);

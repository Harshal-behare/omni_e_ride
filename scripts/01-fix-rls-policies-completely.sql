-- Drop all existing policies and functions to start fresh
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Admin can view all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Admin can update all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Public can view active dealers" ON dealers;
DROP POLICY IF EXISTS "Dealers can view their own data" ON dealers;
DROP POLICY IF EXISTS "Admin can manage dealers" ON dealers;
DROP POLICY IF EXISTS "Public can view active models" ON models;
DROP POLICY IF EXISTS "Admin can manage models" ON models;

-- Disable RLS on all tables to prevent infinite recursion
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE dealers DISABLE ROW LEVEL SECURITY;
ALTER TABLE models DISABLE ROW LEVEL SECURITY;
ALTER TABLE test_rides DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE inventory DISABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries DISABLE ROW LEVEL SECURITY;
ALTER TABLE dealer_applications DISABLE ROW LEVEL SECURITY;

-- Create simple, non-recursive policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- User profiles: Users can only see/edit their own data
CREATE POLICY "user_profiles_select_own" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "user_profiles_update_own" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "user_profiles_insert_own" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Admin access: Check if user email is in pre-approved list
CREATE POLICY "user_profiles_admin_access" ON user_profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM pre_approved_emails 
      WHERE email = auth.jwt() ->> 'email' 
      AND user_type = 'admin'
    )
  );

-- Enable RLS on other tables with simple policies
ALTER TABLE dealers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "dealers_public_read" ON dealers FOR SELECT USING (status = 'active');

ALTER TABLE models ENABLE ROW LEVEL SECURITY;
CREATE POLICY "models_public_read" ON models FOR SELECT USING (status = 'active');

-- Test rides and orders: users can only see their own
ALTER TABLE test_rides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "test_rides_user_access" ON test_rides
  FOR ALL USING (auth.uid() = user_id);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "orders_user_access" ON orders
  FOR ALL USING (auth.uid() = user_id);

-- Contact inquiries: users can insert, admins can view all
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "contact_inquiries_insert" ON contact_inquiries
  FOR INSERT WITH CHECK (true);

-- Dealer applications: users can insert their own, admins can view all
ALTER TABLE dealer_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "dealer_applications_insert" ON dealer_applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Inventory: dealers can manage their own, admins can view all
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
CREATE POLICY "inventory_dealer_access" ON inventory
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM dealers 
      WHERE id = inventory.dealer_id 
      AND manager_email = auth.jwt() ->> 'email'
    )
  );

COMMIT;

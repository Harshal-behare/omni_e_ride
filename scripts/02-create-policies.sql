-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE scooter_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE dealers ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_rides ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- User Profiles Policies
CREATE POLICY "Users can view their own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

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

CREATE POLICY "Allow profile creation" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Scooter Models Policies
CREATE POLICY "Anyone can view active models" ON scooter_models
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage models" ON scooter_models
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- Dealers Policies
CREATE POLICY "Anyone can view active dealers" ON dealers
  FOR SELECT USING (is_active = true);

CREATE POLICY "Dealers can view their own info" ON dealers
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Dealers can update their own info" ON dealers
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can manage dealers" ON dealers
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- Test Rides Policies
CREATE POLICY "Customers can view their own test rides" ON test_rides
  FOR SELECT USING (auth.uid() = customer_id);

CREATE POLICY "Customers can create test rides" ON test_rides
  FOR INSERT WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Dealers can view their assigned test rides" ON test_rides
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND user_type = 'dealer'
    ) AND dealer_id = auth.uid()
  );

CREATE POLICY "Dealers can update their assigned test rides" ON test_rides
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND user_type = 'dealer'
    ) AND dealer_id = auth.uid()
  );

CREATE POLICY "Admins can manage all test rides" ON test_rides
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- Orders Policies
CREATE POLICY "Customers can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = customer_id);

CREATE POLICY "Customers can create orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Dealers can view their assigned orders" ON orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND user_type = 'dealer'
    ) AND dealer_id = auth.uid()
  );

CREATE POLICY "Dealers can update their assigned orders" ON orders
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND user_type = 'dealer'
    ) AND dealer_id = auth.uid()
  );

CREATE POLICY "Admins can manage all orders" ON orders
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- Inventory Policies
CREATE POLICY "Dealers can view their own inventory" ON inventory
  FOR SELECT USING (auth.uid() = dealer_id);

CREATE POLICY "Dealers can update their own inventory" ON inventory
  FOR UPDATE USING (auth.uid() = dealer_id);

CREATE POLICY "Dealers can insert their own inventory" ON inventory
  FOR INSERT WITH CHECK (auth.uid() = dealer_id);

CREATE POLICY "Admins can manage all inventory" ON inventory
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- Contact Inquiries Policies
CREATE POLICY "Anyone can create contact inquiries" ON contact_inquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage all inquiries" ON contact_inquiries
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

CREATE POLICY "Dealers can view assigned inquiries" ON contact_inquiries
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND user_type = 'dealer'
    ) AND assigned_to = auth.uid()
  );

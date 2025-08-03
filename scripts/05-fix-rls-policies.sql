-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON user_profiles;
DROP POLICY IF EXISTS "Enable select for users based on user_id" ON user_profiles;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON user_profiles;
DROP POLICY IF EXISTS "Enable all for admins" ON user_profiles;

-- Create new RLS policies for user_profiles
CREATE POLICY "Enable insert for authenticated users" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable select for users based on user_id" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Enable update for users based on user_id" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Allow admins to manage all profiles
CREATE POLICY "Enable all for admins" ON user_profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- Insert demo admin user (you can change the email and password)
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
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000000',
  'admin@omnierride.com',
  crypt('admin123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
) ON CONFLICT (email) DO NOTHING;

-- Insert admin profile
INSERT INTO user_profiles (
  id,
  email,
  user_type,
  full_name,
  phone,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'admin@omnierride.com',
  'admin',
  'System Administrator',
  '+91 9876543210',
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  user_type = 'admin',
  full_name = 'System Administrator';

-- Insert demo dealer user
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
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000000',
  'dealer@omnierride.com',
  crypt('dealer123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
) ON CONFLICT (email) DO NOTHING;

-- Insert dealer profile
INSERT INTO user_profiles (
  id,
  email,
  user_type,
  full_name,
  phone,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000002',
  'dealer@omnierride.com',
  'dealer',
  'Demo Dealer',
  '+91 9876543211',
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  user_type = 'dealer',
  full_name = 'Demo Dealer';

-- Insert dealer record
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
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  status = 'active';

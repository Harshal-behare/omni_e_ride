-- Ensure pre_approved_emails table exists
CREATE TABLE IF NOT EXISTS pre_approved_emails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  user_type TEXT NOT NULL DEFAULT 'customer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Disable RLS on pre_approved_emails for system access
ALTER TABLE pre_approved_emails DISABLE ROW LEVEL SECURITY;

-- Insert admin email (replace with your actual email)
INSERT INTO pre_approved_emails (email, user_type)
VALUES ('harshalbehare1@gmail.com', 'admin')
ON CONFLICT (email) DO UPDATE SET user_type = 'admin';

-- Also create the user profile directly if it doesn't exist
INSERT INTO user_profiles (id, email, user_type, full_name, phone)
VALUES (
  gen_random_uuid(),
  'harshalbehare1@gmail.com',
  'admin',
  'Admin User',
  ''
) ON CONFLICT (email) DO UPDATE SET user_type = 'admin';

-- Create a function to promote users to admin (for testing)
CREATE OR REPLACE FUNCTION promote_to_admin(user_email TEXT)
RETURNS VOID AS $$
BEGIN
  -- Add to pre-approved emails
  INSERT INTO pre_approved_emails (email, user_type)
  VALUES (user_email, 'admin')
  ON CONFLICT (email) DO UPDATE SET user_type = 'admin';
  
  -- Update existing user profile if exists
  UPDATE user_profiles 
  SET user_type = 'admin', updated_at = NOW()
  WHERE email = user_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMIT;

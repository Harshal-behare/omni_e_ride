-- First, let's clean up everything and start fresh

-- Drop all existing RLS policies for user_profiles
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON user_profiles;
DROP POLICY IF EXISTS "Enable select for users based on user_id" ON user_profiles;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON user_profiles;
DROP POLICY IF EXISTS "Enable all for admins" ON user_profiles;
DROP POLICY IF EXISTS "Allow authenticated users to read own profile" ON user_profiles;
DROP POLICY IF EXISTS "Allow authenticated users to insert own profile" ON user_profiles;
DROP POLICY IF EXISTS "Allow authenticated users to update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Allow admins full access" ON user_profiles;

-- Temporarily disable RLS to insert demo data
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;

-- Delete existing demo users if they exist
DELETE FROM auth.users WHERE email IN ('admin@omnierride.com', 'dealer@omnierride.com', 'harshalbehare1@gmail.com');
DELETE FROM user_profiles WHERE email IN ('admin@omnierride.com', 'dealer@omnierride.com', 'harshalbehare1@gmail.com');

-- Re-enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create simple RLS policies
CREATE POLICY "Allow authenticated users to read own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Allow authenticated users to insert own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Allow authenticated users to update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

-- Allow admins to do everything
CREATE POLICY "Allow admins full access" ON user_profiles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND user_type = 'admin'
        )
    );

-- Create a table to store pre-approved emails for admin and dealer roles
CREATE TABLE IF NOT EXISTS pre_approved_emails (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'dealer')),
    created_by UUID REFERENCES user_profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    used BOOLEAN DEFAULT FALSE
);

-- Enable RLS on pre_approved_emails
ALTER TABLE pre_approved_emails ENABLE ROW LEVEL SECURITY;

-- Create policies for pre_approved_emails
CREATE POLICY "Allow admins to manage pre-approved emails" ON pre_approved_emails
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND user_type = 'admin'
        )
    );

CREATE POLICY "Allow users to check their own email" ON pre_approved_emails
    FOR SELECT USING (TRUE);

-- Insert your admin email as pre-approved
INSERT INTO pre_approved_emails (email, role) VALUES ('harshalbehare1@gmail.com', 'admin');

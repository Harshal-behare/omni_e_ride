-- Remove any existing auth functions and triggers
DROP FUNCTION IF EXISTS handle_new_user() CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create the smart user creation function
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    user_role user_type := 'customer';
    approved_email RECORD;
BEGIN
    -- Check if email is pre-approved for a specific role
    SELECT * INTO approved_email 
    FROM pre_approved_emails 
    WHERE email = NEW.email AND used = false;
    
    -- If email is pre-approved, use that role
    IF FOUND THEN
        user_role := approved_email.role;
        
        -- Mark the email as used
        UPDATE pre_approved_emails 
        SET used = true 
        WHERE id = approved_email.id;
    END IF;
    
    -- Create user profile with determined role
    INSERT INTO user_profiles (
        id,
        email,
        user_type,
        full_name,
        phone
    ) VALUES (
        NEW.id,
        NEW.email,
        user_role,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
        COALESCE(NEW.raw_user_meta_data->>'phone', '')
    );
    
    -- If user is dealer, create dealer record
    IF user_role = 'dealer' THEN
        INSERT INTO dealers (
            user_id,
            name,
            location,
            address,
            phone,
            email,
            manager_name,
            status
        ) VALUES (
            NEW.id,
            COALESCE(NEW.raw_user_meta_data->>'full_name', 'Dealer'),
            'Location TBD',
            'Address to be updated',
            COALESCE(NEW.raw_user_meta_data->>'phone', ''),
            NEW.email,
            COALESCE(NEW.raw_user_meta_data->>'full_name', 'Manager'),
            'pending'
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

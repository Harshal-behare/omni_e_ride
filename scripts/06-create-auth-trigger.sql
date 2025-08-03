-- Create a function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    user_role TEXT := 'customer';
    approved_role TEXT;
BEGIN
    -- Check if email is pre-approved for admin or dealer role
    SELECT role INTO approved_role 
    FROM pre_approved_emails 
    WHERE email = NEW.email AND used = FALSE;
    
    IF approved_role IS NOT NULL THEN
        user_role := approved_role;
        -- Mark email as used
        UPDATE pre_approved_emails 
        SET used = TRUE 
        WHERE email = NEW.email;
    END IF;
    
    -- Insert user profile
    INSERT INTO public.user_profiles (
        id,
        email,
        user_type,
        full_name,
        phone,
        created_at,
        updated_at
    ) VALUES (
        NEW.id,
        NEW.email,
        user_role,
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'phone', ''),
        NOW(),
        NOW()
    );
    
    -- If user is a dealer, create dealer record
    IF user_role = 'dealer' THEN
        INSERT INTO public.dealers (
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
            NEW.id,
            NEW.id,
            COALESCE(NEW.raw_user_meta_data->>'full_name', 'New Dealer'),
            'TBD',
            'Address to be updated',
            COALESCE(NEW.raw_user_meta_data->>'phone', ''),
            NEW.email,
            COALESCE(NEW.raw_user_meta_data->>'full_name', 'Manager'),
            'pending',
            NOW(),
            NOW()
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger for new user signups
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

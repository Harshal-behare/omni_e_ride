-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    user_role user_type := 'customer';
    approved_role user_type;
BEGIN
    -- Check if this is the main admin email
    IF NEW.email = 'harshalbehare1@gmail.com' THEN
        user_role := 'admin';
    ELSE
        -- Check if email is pre-approved for specific role
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

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dealers_updated_at
    BEFORE UPDATE ON dealers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dealer_applications_updated_at
    BEFORE UPDATE ON dealer_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_inquiries_updated_at
    BEFORE UPDATE ON contact_inquiries
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_models_updated_at
    BEFORE UPDATE ON models
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_test_ride_bookings_updated_at
    BEFORE UPDATE ON test_ride_bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

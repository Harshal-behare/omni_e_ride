-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create improved auth trigger function with error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_role TEXT := 'customer';
  approved_role TEXT;
BEGIN
  -- Check if email is pre-approved
  SELECT user_type INTO approved_role
  FROM pre_approved_emails
  WHERE email = NEW.email;

  -- If pre-approved, use that role
  IF approved_role IS NOT NULL THEN
    user_role := approved_role;
  END IF;

  -- Insert user profile with error handling
  BEGIN
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
  EXCEPTION
    WHEN OTHERS THEN
      -- Log error but don't fail the auth process
      RAISE WARNING 'Failed to create user profile for %: %', NEW.email, SQLERRM;
  END;

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Don't fail auth even if profile creation fails
    RAISE WARNING 'Auth trigger failed for %: %', NEW.email, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

COMMIT;

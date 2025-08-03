# Customer Signup Database Error Fix

## 🚨 Problem
New customers cannot sign up due to database errors. The issue is likely with the database trigger function `handle_new_user()` or missing environment variables.

## 🔧 Solution Steps

### Step 1: Environment Variables Setup

1. **Create `.env.local` file** in your project root:
   ```bash
   cp .env.local.example .env.local
   ```

2. **Add your Supabase credentials** to `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```

3. **Get your Supabase credentials**:
   - Go to your Supabase Dashboard
   - Navigate to Settings > API
   - Copy the URL and anon key
   - For service role key, go to Settings > API > Project API keys

### Step 2: Database Fix

1. **Run the fix script** in your Supabase SQL Editor:
   - Go to Supabase Dashboard > SQL Editor
   - Copy and paste the contents of `fix-customer-signup.sql`
   - Execute the script

2. **Verify the fix worked**:
   - Check the output of the script
   - You should see current user profiles and pre-approved emails

### Step 3: Test the Fix

1. **Restart your development server**:
   ```bash
   pnpm dev
   ```

2. **Test customer signup**:
   - Go to `http://localhost:3000/login`
   - Click "Sign Up" tab
   - Try creating a new customer account
   - Check if the signup completes without errors

### Step 4: Manual Fix (if needed)

If the automatic trigger still doesn't work, you can manually create user profiles:

1. **For existing users without profiles**:
   ```sql
   -- Replace with actual user ID and details
   SELECT public.create_user_profile_manual(
       'user-uuid-here',
       'user@example.com',
       'User Name',
       '+1234567890',
       'customer'
   );
   ```

## 🔍 Troubleshooting

### If you still get database errors:

1. **Check Supabase Logs**:
   - Go to Supabase Dashboard > Logs
   - Look for any error messages related to the trigger function

2. **Verify RLS Policies**:
   - Go to Supabase Dashboard > Authentication > Policies
   - Ensure `user_profiles` table has proper policies

3. **Check Trigger Function**:
   - Go to Supabase Dashboard > SQL Editor
   - Run: `SELECT * FROM information_schema.triggers WHERE trigger_name = 'on_auth_user_created';`

4. **Test Database Connection**:
   ```sql
   -- Test if you can insert into user_profiles
   INSERT INTO public.user_profiles (id, email, full_name, user_type)
   VALUES (gen_random_uuid(), 'test@example.com', 'Test User', 'customer');
   ```

### Common Error Messages and Solutions:

1. **"permission denied for table user_profiles"**:
   - Run the permissions section of `fix-customer-signup.sql`

2. **"function handle_new_user() does not exist"**:
   - Re-run the entire `fix-customer-signup.sql` script

3. **"duplicate key value violates unique constraint"**:
   - The trigger function now handles conflicts properly

4. **"RLS policy violation"**:
   - The fix script updates RLS policies to allow proper operation

## ✅ Success Indicators

You'll know the fix worked when:

1. ✅ **Customer signup completes** without database errors
2. ✅ **User profile is created** automatically
3. ✅ **User can log in** after email verification
4. ✅ **No console errors** in browser developer tools
5. ✅ **User appears in** Supabase Authentication > Users
6. ✅ **User profile appears in** Database > user_profiles table

## 🚀 Next Steps

After fixing the signup issue:

1. **Test the complete flow**:
   - Signup → Email verification → Login → Dashboard

2. **Add more test users** to ensure the fix is stable

3. **Monitor for any new errors** in Supabase logs

4. **Consider adding error logging** to track any future issues

## 📞 Need Help?

If you're still experiencing issues:

1. **Check the browser console** for specific error messages
2. **Check Supabase logs** for backend errors
3. **Verify all environment variables** are set correctly
4. **Ensure the database schema** is properly set up

---

**🎯 This fix should resolve the customer signup database error and allow new users to register successfully!**
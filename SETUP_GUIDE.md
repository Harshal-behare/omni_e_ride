# Omni E-Ride Complete Setup Guide

This guide will help you set up the complete Omni E-Ride authentication system with role-based access control.

## 🚨 Important: Database Schema Issues Fixed

The previous database schema had foreign key constraint issues. The new `database_setup.sql` script fixes all these issues by:

1. **Consistent Data Types**: All foreign keys now use UUID consistently
2. **Proper Table Creation Order**: Tables are created in the correct dependency order
3. **Clean Setup**: Drops existing tables to avoid conflicts
4. **Enhanced Features**: Includes all new tables for complete showroom management

## 📋 Prerequisites

1. **Supabase Project**: You should have a Supabase project set up
2. **Environment Variables**: Your `.env.local` file should contain:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

## 🗄️ Step 1: Database Setup

### Option A: Using the Setup Script (Recommended)

1. **Run the database setup script**:
   ```bash
   # Copy the entire content of database_setup.sql
   # Go to your Supabase Dashboard > SQL Editor
   # Paste and run the script
   ```

2. **Verify the setup**:
   - Go to **Table Editor** in Supabase Dashboard
   - You should see all tables created:
     - `user_profiles`
     - `dealers`
     - `orders`
     - `models`
     - `service_bookings`
     - `warranties`
     - `financial_transactions`
     - `dealer_commissions`
     - `customer_reviews`
     - `pre_approved_emails`
     - And more...

### Option B: Manual Setup

If you prefer to run the script manually:

1. Open your Supabase Dashboard
2. Go to **SQL Editor**
3. Copy the entire content of `database_setup.sql`
4. Paste and run the script
5. Verify all tables are created

## 👤 Step 2: Create Admin User

### Method 1: Using Supabase Dashboard (Recommended)

1. **Go to Supabase Dashboard**
   - Navigate to **Authentication** > **Users**
   - Click **"Add user"**

2. **Fill in the details**:
   - **Email**: `harshalbehare1@gmail.com`
   - **Password**: Create a strong password (e.g., `Admin@2024!`)
   - **Email confirm**: Leave unchecked
   - Click **"Create user"**

3. **Verify user creation**:
   - You should see the new user in the users list
   - Status should be "Confirmed" or "Unconfirmed"

### Method 2: Using the Setup Script

1. **Install dependencies** (if not already done):
   ```bash
   npm install dotenv @supabase/supabase-js
   ```

2. **Run the setup script**:
   ```bash
   node setup-admin.js
   ```

3. **Follow the instructions** provided by the script

## 🔐 Step 3: Verify Admin Email in Pre-approved List

The `database_setup.sql` script automatically adds the admin email to the pre-approved list. To verify:

1. **Go to Supabase Dashboard**
2. **Navigate to Table Editor**
3. **Select `pre_approved_emails` table**
4. **Verify the entry exists**:
   - Email: `harshalbehare1@gmail.com`
   - Role: `admin`
   - Used: `false`

## 🚀 Step 4: Test the System

1. **Start your development server**:
   ```bash
   npm run dev
   ```

2. **Test the login**:
   - Go to `http://localhost:3000/login`
   - Use the admin credentials:
     - Email: `harshalbehare1@gmail.com`
     - Password: (the one you set in Supabase Dashboard)

3. **Verify redirection**:
   - After successful login, you should be redirected to `/admin/dashboard`
   - You should see the admin dashboard with all features

## 🔧 Step 5: Fix TypeScript Errors (if any)

If you encounter TypeScript errors in the login page, they have been fixed in the updated code. The errors were related to:

1. **Error object typing**: Added proper error handling with optional chaining
2. **Try-catch blocks**: Fixed syntax issues
3. **Error message access**: Added fallback messages

## 📊 Step 6: Verify All Features

### Admin Dashboard Features:
- ✅ **User Management**: View and manage all users
- ✅ **Dealer Management**: View all dealers and their status
- ✅ **Order Management**: View all orders
- ✅ **Service Bookings**: Manage service appointments
- ✅ **Settings**: Add pre-approved emails and manage applications

### Authentication Features:
- ✅ **Password Login**: Traditional email/password authentication
- ✅ **OTP Login**: One-time password authentication
- ✅ **Role-based Access**: Admin, Dealer, Customer roles
- ✅ **Automatic Role Assignment**: Based on pre-approved emails
- ✅ **Route Protection**: Middleware protects routes based on roles

### Database Features:
- ✅ **Row Level Security (RLS)**: Proper data access control
- ✅ **Foreign Key Constraints**: All relationships properly defined
- ✅ **Triggers**: Automatic user profile creation
- ✅ **Complete Schema**: All tables for showroom management

## 🛠️ Troubleshooting

### Common Issues:

1. **Foreign Key Constraint Error**:
   - **Solution**: Run the new `database_setup.sql` script
   - This fixes all data type inconsistencies

2. **Admin User Not Found**:
   - **Solution**: Create the user manually in Supabase Dashboard
   - Or run the `setup-admin.js` script

3. **TypeScript Errors**:
   - **Solution**: The login page has been updated with proper error handling
   - All error objects now have proper typing

4. **RLS Policy Errors**:
   - **Solution**: The new script creates all necessary policies
   - Run the complete `database_setup.sql` script

### Verification Commands:

1. **Check if admin email is pre-approved**:
   ```sql
   SELECT * FROM pre_approved_emails WHERE email = 'harshalbehare1@gmail.com';
   ```

2. **Check if admin user exists**:
   ```sql
   SELECT * FROM user_profiles WHERE email = 'harshalbehare1@gmail.com';
   ```

3. **Check RLS policies**:
   ```sql
   SELECT schemaname, tablename, policyname FROM pg_policies WHERE schemaname = 'public';
   ```

## 🎯 Next Steps

After successful setup:

1. **Add Sample Data**: Add some models, dealers, and orders for testing
2. **Test All Roles**: Create test users for dealer and customer roles
3. **Customize UI**: Modify the dashboard to match your brand
4. **Add Features**: Implement additional features as needed

## 📞 Support

If you encounter any issues:

1. **Check the console logs** for detailed error messages
2. **Verify environment variables** are correctly set
3. **Ensure Supabase project** is properly configured
4. **Run the setup script** to verify all components

## 🎉 Success!

Once you've completed all steps, you should have:

- ✅ Complete authentication system with role-based access
- ✅ Admin dashboard with full management capabilities
- ✅ Database with proper relationships and security
- ✅ Production-ready backend for your scooter showroom

Your Omni E-Ride system is now ready for production use! 
# Omni E-Ride Authentication System Setup Guide

This guide will help you set up the complete authentication system with role-based access control for the Omni E-Ride website.

## 🎯 System Overview

The authentication system supports three user roles:
- **Admin**: Full access to all features, can manage users and system settings
- **Dealer**: Access to dealer dashboard, inventory management, and sales tracking
- **Customer**: Access to customer dashboard, order history, and test ride bookings

## 🔧 Prerequisites

1. **Supabase Project**: You need a Supabase project with the following setup:
   - Database with the schema from `database_schema.sql`
   - Authentication enabled
   - Email templates configured

2. **Environment Variables**: Add these to your `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

## 📋 Setup Steps

### Step 1: Database Setup

1. **Run the Database Schema Script**:
   - Go to your Supabase Dashboard
   - Navigate to SQL Editor
   - Copy and paste the contents of `database_schema.sql`
   - Execute the script

2. **Verify RLS Policies**:
   - Go to Authentication > Policies
   - Ensure all tables have RLS enabled
   - Verify the policies are correctly applied

### Step 2: Initial Admin Setup

1. **Run the Setup Script**:
   ```bash
   node setup-admin.js
   ```

2. **Create Admin User** (if not already done):
   - Go to Supabase Dashboard > Authentication > Users
   - Click "Add User"
   - Email: `harshalbehare1@gmail.com`
   - Set a password
   - The user will automatically get admin role due to pre-approved email

### Step 3: Email Configuration

1. **Configure Email Templates** in Supabase:
   - Go to Authentication > Email Templates
   - Customize the following templates:
     - **Confirm signup**: For email verification
     - **Magic Link**: For OTP authentication
     - **Change email address**: For email changes

2. **Test Email Delivery**:
   - Use the test email feature in Supabase
   - Ensure emails are being delivered correctly

### Step 4: Application Setup

1. **Install Dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

3. **Test the System**:
   - Visit `http://localhost:3000/login`
   - Try both password and OTP authentication
   - Test admin login with `harshalbehare1@gmail.com`

## 🔐 Authentication Flow

### For New Users (Default: Customer Role)

1. **Signup Process**:
   - User visits `/login` and clicks "Sign Up"
   - Chooses between Password or OTP authentication
   - Fills in required information
   - Receives verification email/OTP
   - Account created with "customer" role by default

2. **Login Process**:
   - User enters email and password/requests OTP
   - If using OTP, enters the code sent to email
   - Redirected to appropriate dashboard based on role

### For Dealers

1. **Application Process**:
   - Dealer fills out application form on public site
   - Admin reviews application in admin dashboard
   - Admin adds dealer's email to pre-approved list with "dealer" role
   - Admin contacts dealer with login instructions

2. **Dealer Registration**:
   - Dealer visits `/login`
   - Signs up with their pre-approved email
   - Automatically gets "dealer" role
   - Access to dealer dashboard

### For Admins

1. **Admin Creation**:
   - Only existing admins can add new admin emails
   - Admin adds email to pre-approved list with "admin" role
   - New admin signs up with pre-approved email
   - Automatically gets "admin" role

## 🛡️ Security Features

### Row Level Security (RLS)
- All tables have RLS enabled
- Users can only access their own data
- Admins have access to all data
- Dealers can see their inventory and sales

### Route Protection
- Middleware protects all dashboard routes
- Users are redirected to appropriate dashboards
- Unauthorized access is blocked

### Email Verification
- All new accounts require email verification
- OTP authentication provides additional security
- Magic links for passwordless authentication

## 📱 Dashboard Access

### Admin Dashboard (`/admin/dashboard`)
- User management
- Email management (pre-approved emails)
- System statistics
- Dealer applications
- Contact inquiries

### Dealer Dashboard (`/dealer/dashboard`)
- Inventory management
- Sales tracking
- Customer orders
- Test ride bookings

### Customer Dashboard (`/customer/dashboard`)
- Order history
- Test ride bookings
- Profile management

## 🔧 Troubleshooting

### Common Issues

1. **"Access denied" errors**:
   - Check if user has correct role
   - Verify RLS policies are applied
   - Check middleware configuration

2. **Email not received**:
   - Check Supabase email configuration
   - Verify email templates
   - Check spam folder

3. **OTP not working**:
   - Ensure email is verified
   - Check OTP expiration time
   - Verify email template configuration

4. **Database connection issues**:
   - Verify environment variables
   - Check Supabase project status
   - Ensure database is accessible

### Debug Mode

To enable debug mode, add this to your `.env.local`:
```env
NEXT_PUBLIC_DEBUG=true
```

This will show additional console logs for authentication events.

## 📞 Support

If you encounter issues:

1. Check the browser console for errors
2. Verify Supabase logs in the dashboard
3. Ensure all environment variables are set correctly
4. Test with a fresh browser session

## 🚀 Production Deployment

Before deploying to production:

1. **Update Environment Variables**:
   - Use production Supabase project
   - Set production URLs in email templates

2. **Test All Flows**:
   - Admin creation and management
   - Dealer application and approval
   - Customer registration and login
   - OTP and password authentication

3. **Security Review**:
   - Verify RLS policies
   - Test route protection
   - Check email delivery

4. **Performance Optimization**:
   - Enable caching where appropriate
   - Optimize database queries
   - Monitor authentication performance

## 📝 API Reference

### Authentication Hooks

```typescript
// Available in useAuth hook
const {
  user,                    // Current user
  userProfile,            // User profile with role
  loading,                // Loading state
  signIn,                 // Password login
  signInWithOtp,          // OTP login
  verifyOtp,              // Verify OTP
  signUp,                 // Password signup
  signUpWithOtp,          // OTP signup
  signOut,                // Logout
  updateProfile,          // Update user profile
  resendConfirmation,     // Resend email verification
  resendOtp,              // Resend OTP
} = useAuth()
```

### Admin Actions

```typescript
// Available in useAdminActions hook
const {
  addPreApprovedEmail,    // Add pre-approved email
  getPreApprovedEmails,   // Get all pre-approved emails
  removePreApprovedEmail, // Remove pre-approved email
  updateUserRole,         // Update user role
  getAllUsers,            // Get all users
  getDashboardStats,      // Get dashboard statistics
} = useAdminActions()
```

This completes the authentication system setup. The system is now ready for production use with full role-based access control, OTP authentication, and secure data access. 
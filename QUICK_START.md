# 🚀 Quick Start Guide - Omni E-Ride Authentication

## ⚡ Get Started in 5 Minutes

### 1. Database Setup (2 minutes)
1. Go to your Supabase Dashboard → SQL Editor
2. Copy and paste the entire content of `database_setup.sql`
3. Click "Run" to execute the script
4. This sets up all RLS policies and triggers

### 2. Create Admin User (1 minute)
1. Go to Supabase Dashboard → Authentication → Users
2. Click "Add User"
3. Email: `harshalbehare1@gmail.com`
4. Set any password you want
5. The user will automatically get admin role

### 3. Add Admin Email to Pre-approved List (1 minute)
1. Go to Supabase Dashboard → Table Editor
2. Select `pre_approved_emails` table
3. Click "Insert Row"
4. Add:
   - Email: `harshalbehare1@gmail.com`
   - Role: `admin`
   - Used: `false`

### 4. Test the System (1 minute)
1. Run your development server: `npm run dev`
2. Visit `http://localhost:3000/login`
3. Login with `harshalbehare1@gmail.com` and your password
4. You should be redirected to `/admin/dashboard`

## ✅ What's Working Now

- ✅ **Admin Dashboard**: Full access to user management, email management, and system stats
- ✅ **Role-based Access**: Users are automatically assigned roles based on pre-approved emails
- ✅ **Route Protection**: Middleware protects all dashboard routes
- ✅ **OTP Authentication**: Both password and OTP login methods work
- ✅ **Email Verification**: All new accounts require email verification
- ✅ **RLS Policies**: Database is secured with row-level security

## 🔄 Next Steps

1. **Add Dealer Emails**: Use admin dashboard to add dealer emails to pre-approved list
2. **Test Dealer Flow**: Have a dealer sign up with pre-approved email
3. **Configure Email Templates**: Customize email templates in Supabase
4. **Add More Admins**: Use admin dashboard to add more admin emails

## 🆘 If Something's Not Working

1. **Check Environment Variables**: Ensure `.env.local` has correct Supabase credentials
2. **Verify Database**: Check that `database_setup.sql` ran successfully
3. **Check Email Templates**: Ensure Supabase email templates are configured
4. **Browser Console**: Look for any JavaScript errors

## 📞 Need Help?

- Check the full `AUTHENTICATION_SETUP.md` for detailed instructions
- Verify all files are in place: `middleware.ts`, `hooks/useAuth.ts`, `app/auth/callback/page.tsx`
- Ensure `AuthProvider` is wrapping your app in `app/layout.tsx`

---

**🎉 You're all set!** The authentication system is now fully functional with admin, dealer, and customer roles. 
require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables!')
  console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in your .env.local file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupAdmin() {
  console.log('🚀 Setting up Omni E-Ride Admin System...\n')
  
  try {
    // Step 1: Check if admin email is already in pre-approved list
    console.log('📧 Checking pre-approved emails...')
    const { data: existingEmail, error: emailCheckError } = await supabase
      .from('pre_approved_emails')
      .select('*')
      .eq('email', 'harshalbehare1@gmail.com')
      .single()

    if (emailCheckError && emailCheckError.code !== 'PGRST116') {
      throw emailCheckError
    }

    if (existingEmail) {
      console.log('✅ Admin email already exists in pre-approved list')
    } else {
      console.log('📧 Adding admin email to pre-approved list...')
      const { data: emailData, error: emailError } = await supabase
        .from('pre_approved_emails')
        .insert({
          email: 'harshalbehare1@gmail.com',
          role: 'admin',
          created_at: new Date().toISOString()
        })
        .select()
        .single()

      if (emailError) {
        throw emailError
      }
      console.log('✅ Admin email added to pre-approved list')
    }

    // Step 2: Check if admin user exists in auth.users
    console.log('\n👤 Checking if admin user exists...')
    const { data: { users }, error: authError } = await supabase.auth.admin.listUsers()
    
    if (authError) {
      throw authError
    }

    const adminUser = users.find(user => user.email === 'harshalbehare1@gmail.com')
    
    if (adminUser) {
      console.log('✅ Admin user already exists in authentication system')
      
      // Check if user profile exists
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', adminUser.id)
        .single()

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError
      }

      if (profile) {
        console.log('✅ Admin user profile already exists')
        if (profile.user_type === 'admin') {
          console.log('✅ Admin user has correct role')
        } else {
          console.log('⚠️  Admin user exists but role is:', profile.user_type)
          console.log('   You may need to update the role manually in the admin dashboard')
        }
      } else {
        console.log('⚠️  Admin user exists but no profile found')
        console.log('   This should be automatically created when the user signs in')
      }
    } else {
      console.log('❌ Admin user does not exist in authentication system')
      console.log('\n📋 Next Steps:')
      console.log('1. Go to your Supabase Dashboard')
      console.log('2. Navigate to Authentication > Users')
      console.log('3. Click "Add user"')
      console.log('4. Enter email: harshalbehare1@gmail.com')
      console.log('5. Enter a strong password')
      console.log('6. Click "Create user"')
      console.log('\n7. After creating the user, they can sign in and will automatically get admin privileges')
    }

    console.log('\n🎉 Setup complete!')
    console.log('\n📝 Summary:')
    console.log('- Admin email is pre-approved')
    if (adminUser) {
      console.log('- Admin user exists in authentication')
      console.log('- User can now sign in with admin privileges')
    } else {
      console.log('- Please create the admin user in Supabase Dashboard')
    }
    
    console.log('\n🔗 Login URL: http://localhost:3000/login')
    console.log('📧 Email: harshalbehare1@gmail.com')
    console.log('🔑 Password: (the one you set in Supabase Dashboard)')

  } catch (error) {
    console.error('❌ Error during setup:', error.message)
    if (error.code) {
      console.error('Error code:', error.code)
    }
    process.exit(1)
  }
}

setupAdmin() 
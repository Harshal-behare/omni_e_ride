import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Get the current session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { pathname } = req.nextUrl

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/about', '/contact', '/models', '/dealer-application', '/terms', '/privacy-policy', '/careers', '/blog']
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

  // If no session and trying to access protected route, redirect to login
  if (!session && !isPublicRoute) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/login'
    redirectUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If session exists, check user role and redirect accordingly
  if (session) {
    // Get user profile to check role
    const { data: userProfile } = await supabase
      .from('user_profiles')
      .select('user_type')
      .eq('id', session.user.id)
      .single()

    // If user is on login page but already authenticated, redirect to appropriate dashboard
    if (pathname === '/login') {
      const redirectUrl = req.nextUrl.clone()
      switch (userProfile?.user_type) {
        case 'admin':
          redirectUrl.pathname = '/admin/dashboard'
          break
        case 'dealer':
          redirectUrl.pathname = '/dealer/dashboard'
          break
        case 'customer':
          redirectUrl.pathname = '/customer/dashboard'
          break
        default:
          redirectUrl.pathname = '/'
      }
      return NextResponse.redirect(redirectUrl)
    }

    // Role-based route protection
    if (pathname.startsWith('/admin/') && userProfile?.user_type !== 'admin') {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/login'
      redirectUrl.searchParams.set('error', 'Access denied. Admin privileges required.')
      return NextResponse.redirect(redirectUrl)
    }

    if (pathname.startsWith('/dealer/') && userProfile?.user_type !== 'dealer') {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/login'
      redirectUrl.searchParams.set('error', 'Access denied. Dealer privileges required.')
      return NextResponse.redirect(redirectUrl)
    }

    if (pathname.startsWith('/customer/') && userProfile?.user_type !== 'customer') {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/login'
      redirectUrl.searchParams.set('error', 'Access denied. Customer privileges required.')
      return NextResponse.redirect(redirectUrl)
    }
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
} 
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the route is under /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow login page and API routes
    if (
      request.nextUrl.pathname === '/admin/login' ||
      request.nextUrl.pathname.startsWith('/api/') ||
      request.nextUrl.pathname === '/admin'
    ) {
      return NextResponse.next()
    }

    // Check for authentication - look for the token in cookies or check localStorage pattern
    // Since we can't access localStorage in middleware, we need to use cookies
    const hasAuthToken = request.cookies.get('admin-token') 
    
    // Alternative: Check for any auth-related cookies that Laravel Sanctum might set
    const hasLaravelSession = request.cookies.get('laravel_session')
    const hasSanctumToken = request.cookies.get('XSRF-TOKEN')

    // If not authenticated and trying to access protected admin routes, redirect to login
    if (!hasAuthToken && !hasLaravelSession && !hasSanctumToken) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('from', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/dashboard/:path*',
    '/admin/contacts/:path*',
    '/admin/analytics/:path*',
    '/admin/settings/:path*',
    '/admin/notifications/:path*'
  ],
}
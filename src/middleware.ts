import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

 
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname    
    const isPublicPath = path === '/login' || path === '/signup'

    const token = request.cookies.get('token')?.value || null

    if (isPublicPath && token) 
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl))

    if (!isPublicPath && !token)
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    
}
 
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/signup'
  ],
}
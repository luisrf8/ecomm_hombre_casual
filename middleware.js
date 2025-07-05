import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const PUBLIC_FILES = [
    '/manifest.json',
    '/favicon.ico',
    '/sw.js',
    '/robots.txt',
    '/sitemap.xml'
  ];
  
  if (
    PUBLIC_FILES.some((path) => pathname === path || pathname === path + '/') ||
    pathname.startsWith('/icons') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/fonts') ||
    pathname.startsWith('/_next/')
  ) {
    console.log('Middleware - Allow public file:', pathname);
    return NextResponse.next();
  }

  // Rutas protegidas
  const isAuth = request.cookies.get('authToken');
  const protectedRoutes = ['/dashboard', '/profile'];

  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !isAuth) {
    request.nextUrl.pathname = '/login';
    return NextResponse.redirect(request.nextUrl);
  }

  // // Redirigir usuarios autenticados desde login/register
  if ((pathname === '/login' || pathname === '/register') && isAuth) {
    request.nextUrl.pathname = '/dashboard';
    return NextResponse.redirect(request.nextUrl);
  }

  return NextResponse.next();
}

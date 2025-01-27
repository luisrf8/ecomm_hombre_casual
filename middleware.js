import { NextResponse } from 'next/server';

export function middleware(request) {
  const isAuth = request.cookies.get('authToken'); // Supón que almacenas un token de autenticación en una cookie.
  const url = request.nextUrl;

  // Rutas restringidas para usuarios no autenticados
  const protectedRoutes = ['/dashboard', '/profile'];

  if (protectedRoutes.some(route => url.pathname.startsWith(route)) && !isAuth) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Redirigir usuarios autenticados lejos de login/registro
  if ((url.pathname === '/login' || url.pathname === '/register') && isAuth) {
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
    id: string;
    userEmail: string;
    role: 'User' | 'Admin' | 'Administrator';
    iat: number;
    exp: number;
}

function decodeJWT(token: string): TokenPayload | null {
    try {
        const decoded = jwtDecode<TokenPayload>(token);

        // Check if token is expired
        const now = Math.floor(Date.now() / 1000);
        if (decoded.exp && decoded.exp < now) return null;

        return decoded;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return null;
    }
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get token from cookies
    const token = request.cookies.get('access-token')?.value;
    const payload = token ? decodeJWT(token) : null;

    // Define route categories
    const isDashboard = pathname.startsWith('/dashboard');
    const isAuthPage = pathname.startsWith('/auth');
    const isProfile = pathname === '/profile';
    const isPublic = !isDashboard && !isAuthPage && !isProfile;

    // Route protection logic
    if (isDashboard) {
        // Dashboard: Only Admin & Administrator → redirect others to home
        if (!payload || !['Admin', 'Administrator'].includes(payload.role)) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    } else if (isProfile) {
        // Profile: Requires authentication
        if (!payload) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
        // Redirect admin/administrator to dashboard
        if (['Admin', 'Administrator'].includes(payload.role)) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    } else if (isAuthPage) {
        // Auth pages: Redirect authenticated users
        if (payload) {
            if (['Admin', 'Administrator'].includes(payload.role)) {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            } else {
                return NextResponse.redirect(new URL('/', request.url));
            }
        }
    } else if (isPublic) {
        // Public pages: Redirect admin/administrator to dashboard
        // if (payload && ['Admin', 'Administrator'].includes(payload.role)) {
        //     return NextResponse.redirect(new URL('/dashboard', request.url));
        // }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};
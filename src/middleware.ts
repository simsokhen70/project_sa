import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  console.log('Middleware executed for path:', request.nextUrl.pathname);

  try {
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    });
    
    console.log('Token:', token ? 'exists' : 'does not exist');

    if (request.nextUrl.pathname.startsWith('/web')) {
      console.log('Checking access to /web path');
      if (!token) {
        const signInUrl = new URL('/signin', request.url);
        signInUrl.searchParams.set('callbackUrl', request.url);
        console.log('Redirecting to:', signInUrl.toString());
        return NextResponse.redirect(signInUrl);
      } else {
        console.log('User authenticated, allowing access to /web');
      }
    }
  } catch (error) {
    console.error('Error in middleware:', error);
  }

  console.log('Middleware completed, continuing to next');
  return NextResponse.next();
}

export const config = {
  matcher: ['/web/:path*'],
};
// import { withAuth } from "next-auth/middleware"
// export default withAuth({
//     callbacks: {
//         authorized: ({ token }) => {
//             return !!token;
//         }
//     },
//     pages: {
//         signIn: '/signin',
//     }
// })

// export const config = {
//     matcher: [
//         "/web/:path*",
//     ]
// }

import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { verifyAdminUser } from '@/lib/auth';

export const authConfig = {
  trustHost: true,
  pages: {
    signIn: '/admin/login',
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const user = await verifyAdminUser(
          credentials.username as string,
          credentials.password as string
        );

        if (!user) {
          return null;
        }

        return {
          id: user.id.toString(),
          name: user.username,
        };
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      const isOnLogin = nextUrl.pathname.startsWith('/admin/login');

      if (isOnAdmin && !isOnLogin) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }

      if (isOnLogin && isLoggedIn) {
        return Response.redirect(new URL('/admin', nextUrl));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;

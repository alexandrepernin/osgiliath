import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcryptjs';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { sendVerificationRequest } from 'services/emails/sendVerificationRequest';

import { prisma } from 'services/database/prisma';
import { sendWelcomeEmail } from 'services/emails/sendWelcomeEmail.ts';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/signin',
    signOut: '/signin',
    error: '/404',
    verifyRequest: '/verify-email',
  },
  providers: [
    EmailProvider({
      sendVerificationRequest,
      maxAge: 10 * 60, // 10 minutes
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async credentials => {
        if (
          credentials === undefined ||
          credentials.email === '' ||
          credentials.password === ''
        ) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (user === null || user.password === null) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password,
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      const forwardedSession = {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };

      return forwardedSession;
    },
    jwt: ({ token, user }) => {
      // user is defined only when the user signs in. Afterwards, only token is defined.
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unnecessary-condition
      if (user) {
        token.id = user.id;

        return token;
      }

      return token;
    },
  },
  events: { createUser: sendWelcomeEmail },
} as AuthOptions;

export default NextAuth(authOptions);

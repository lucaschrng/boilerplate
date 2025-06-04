import type { PrismaClient } from '@prisma/client';

import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcryptjs';
import { type DefaultSession, type NextAuthConfig } from 'next-auth';
import { type Adapter } from 'next-auth/adapters';
import CredentialsProvider from 'next-auth/providers/credentials';

import { db } from '~/server/db';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user'];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  adapter: PrismaAdapter(db) as Adapter,
  callbacks: {
    session: ({ session, token }) => {
      if (session.user) {

        session.user.id = token.sub!;
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      authorize: (credentials) => authorize(db)(credentials as Record<'email' | 'password', string>),
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  session: {
    strategy: 'jwt',
  },
} satisfies NextAuthConfig;

function authorize(prisma: PrismaClient) {
  return async (
    credentials: Record<'email' | 'password', string> | undefined,
  ) => {
    if (!credentials) throw new Error('Missing credentials');
    if (!credentials.email)
      throw new Error('"email" is required in credentials');
    if (!credentials.password)
      throw new Error('"password" is required in credentials');
    const maybeUser = await prisma.user.findFirst({
      select: { email: true, id: true, name: true, password: true },
      where: { email: credentials.email },
    });
    if (!maybeUser?.password) return null;
    // verify the input password with stored hash
    const isValid = await compare(credentials.password, maybeUser.password);
    if (!isValid) return null;
    return { email: maybeUser.email, id: maybeUser.id, name: maybeUser.name };
  };
}

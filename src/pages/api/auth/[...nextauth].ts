import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '~/server/prisma';
import { D } from '@mobily/ts-belt';
import { User, UserRole } from '@prisma/client';
import { comparePasswordWithHash } from '../../../modules/auth/password';

const mapDataBaseUserToSessionUser = D.selectKeys<User, keyof User>(['email', 'name', 'language', 'role']);

export default NextAuth({
  callbacks: {
    session({ session, token }) {
      if (session?.user && token.role) {
        return {
          ...session,
          user: { ...session.user, role: token.role as UserRole },
        };
      }

      return session;
    },

    jwt({ token, user }) {
      if (user?.role) {
        token.role = user.role;
      }

      return token;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { email, password } = credentials;
        const user = await prisma.user.findUnique({ where: { email: email } });
        if (!user) return null;

        const isPasswordLegit = await comparePasswordWithHash(user.password, password);
        const sessionUser = mapDataBaseUserToSessionUser(user);

        return isPasswordLegit ? sessionUser : null;
      },
    }),
  ],
});

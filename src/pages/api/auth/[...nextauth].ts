import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '~/server/prisma';
import { D } from '@mobily/ts-belt';
import { User } from '@prisma/client';
import { comparePasswordWithHash } from './password';

const mapDataBaseUserToSessionUser = D.selectKeys<User, keyof User>(['email', 'name', 'language', 'role']);

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
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

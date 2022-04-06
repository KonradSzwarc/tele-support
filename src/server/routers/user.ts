import { D } from '@mobily/ts-belt';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createUserInputSchema, deleteUserInputSchema, updateUserInputSchema } from '~/modules/users/create-user-input';
import { createRouter } from '../create-router';
import { hasRole } from '../middleware/auth';
import { prisma } from '../prisma';

export const userRouter = createRouter()
  .middleware(hasRole('ADMIN'))
  .query('users', {
    async resolve() {
      const users = await prisma.user.findMany({
        select: { id: true, email: true, language: true, name: true, role: true },
        where: { deletedAt: null },
      });
      return users;
    },
  })
  .query('byId', {
    input: z.object({ id: z.string() }),
    async resolve({ input }) {
      const { id } = input;
      const existingUser = await prisma.user.findUnique({
        where: { id },
      });
      if (!existingUser) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Nie ma usera o id '${id}'`,
        });
      }
      return existingUser;
    },
  })
  .mutation('create', {
    input: createUserInputSchema,
    async resolve({ input }) {
      const createdUser = await prisma.user.create({ data: input });

      return createdUser;
    },
  })
  .mutation('update', {
    input: updateUserInputSchema,
    async resolve({ input }) {
      const { id, password } = input;
      const userToUpdate = password ? input : D.deleteKey(input, 'password');

      const updatedUser = await prisma.user.update({
        where: { id },
        data: userToUpdate,
      });

      return updatedUser;
    },
  })
  .mutation('delete', {
    input: deleteUserInputSchema,
    async resolve({ input: { id } }) {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: { deletedAt: new Date() },
      });

      return updatedUser;
    },
  });

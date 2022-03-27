import { TRPCError } from '@trpc/server';
import { string, z } from 'zod';
import { createUserInputSchema, updateUserInputSchema } from '~/modules/users/create-user-input';
import { createRouter } from '../create-router';
import { prisma } from '../prisma';

export const userRouter = createRouter()
  .query('users', {
    async resolve() {
      const users = await prisma.user.findMany();
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
      const { id } = input;
      const userToUpdate = await prisma.user.update({
        where: { id },
        data: input,
      });

      return userToUpdate;
    },
  });

import { createUserInputSchema } from '~/modules/users/create-user-input';
import { createRouter } from '../create-router';
import { prisma } from '../prisma';

export const userRouter = createRouter()
  .query('users', {
    async resolve() {
      const users = await prisma.user.findMany();
      return users;
    },
  })
  .mutation('create', {
    input: createUserInputSchema,
    async resolve({ input }) {
      const createdUser = await prisma.user.create({ data: input });

      return createdUser;
    },
  })
  ;

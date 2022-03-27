import { transformer } from '~/utils/trpc';
import { createRouter } from '../create-router';
import { caseRouter } from './case';
import { postRouter } from './post';
import { userRouter } from './user';

export const appRouter = createRouter()
  .transformer(transformer)
  .query('healthz', {
    async resolve() {
      return 'yay!';
    },
  })
  .merge('post.', postRouter)
  .merge('case.', caseRouter)
  .merge('user.', userRouter);

export type AppRouter = typeof appRouter;

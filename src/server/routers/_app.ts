import { transformer } from '~/utils/trpc';
import { createRouter } from '../create-router';
import { caseRouter } from './case';
import { postRouter } from './post';
import { templateRouter } from './template';
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
  .merge('user.', userRouter)
  .merge('template.', templateRouter);

export type AppRouter = typeof appRouter;

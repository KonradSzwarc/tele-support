import { transformer } from '~/utils/trpc';
import { createRouter } from '../create-router';
import { caseRouter } from './case';
import { templateRouter } from './template';
import { userRouter } from './user';

export const appRouter = createRouter()
  .transformer(transformer)
  .query('healthz', {
    async resolve() {
      return 'yay!';
    },
  })
  .merge('case.', caseRouter)
  .merge('user.', userRouter)
  .merge('template.', templateRouter);

export type AppRouter = typeof appRouter;

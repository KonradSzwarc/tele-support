/**
 * This file contains the root router of your tRPC-backend
 */
import { transformer } from '~/utils/trpc';
import { createRouter } from '../create-router';
import { caseRouter } from './case';
import { postRouter } from './post';

export const appRouter = createRouter()
  .transformer(transformer)
  .query('healthz', {
    async resolve() {
      return 'yay!';
    },
  })
  .merge('post.', postRouter)
  .merge('case.', caseRouter);

export type AppRouter = typeof appRouter;

import { UserRole } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { MiddlewareFunction } from '@trpc/server/dist/declarations/src/internals/middlewares';
import { Session } from 'next-auth';

export const hasRole =
  (requiredRole: UserRole): MiddlewareFunction<{ session: Session }, { session: Session }> =>
  async ({ ctx: { session }, next }) => {
    const isAuthorized = session?.user?.role === requiredRole;

    if (!isAuthorized) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return next();
  };

export const isAuthenticated: MiddlewareFunction<{ session: Session }, { session: Session }> = async ({ ctx: { session }, next }) => {
  const isAuthorized = session?.user.email;

  if (!isAuthorized) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next();
};

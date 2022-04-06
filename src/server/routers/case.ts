import { A, D, pipe } from '@mobily/ts-belt';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { Writeable } from '~/utils';
import { createRouter } from '../create-router';
import { isAuthenticated } from '../middleware/auth';
import { prisma } from '../prisma';
import { getReport } from '../services/report';

const toPairs = (obj: Record<string, string>) => D.toPairs(obj);
const mapToField = ([key, value]: readonly [string, string]) => ({ value, templateId: key });

export const caseRouter = createRouter()
  .middleware(isAuthenticated)
  .query('fields', {
    async resolve() {
      const fields = await prisma.fieldTemplate.findMany({
        where: { AND: [{ isVisible: true }, { parentId: null }] },
        // TODO: Konrad przyjdzie i naprawi
        include: { children: { include: { children: { include: { children: true } } } } },
        orderBy: { order: 'asc' },
      });

      return fields;
    },
  })
  .query('cases', {
    async resolve({ ctx: { session } }) {
      const userEmail = session.user.role === 'ADMIN' ? null : session.user.email!;

      return getReport(userEmail);
    },
  })
  .mutation('create', {
    input: z.object({}).catchall(z.string()),
    async resolve({ input, ctx: { session } }) {
      const email = session?.user?.email;

      if (!email)
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: `Provided email: ${email} is invalid`,
        });

      const fields = pipe(input, toPairs, A.map(mapToField));
      const createdCase = await prisma.case.create({
        data: {
          fields: { createMany: { data: fields as Writeable<typeof fields> } },
          user: { connect: { email } },
        },
      });

      return createdCase;
    },
  });

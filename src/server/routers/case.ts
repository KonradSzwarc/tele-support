import { A, D, pipe } from '@mobily/ts-belt';
import { z } from 'zod';
import { createRouter } from '../create-router';
import { prisma } from '../prisma';

const mapToField = ([key, value]: readonly [string | number, string]) => ({ value, templateId: key });

export const caseRouter = createRouter()
  .query('fields', {
    async resolve() {
      const fields = await prisma.fieldTemplate.findMany({
        where: { AND: [{ isVisible: true }, { parentId: null }] },
        // TODO: Konrad przyjdzie i naprawi
        include: { children: { include: { children: { include: { children: true } } } } },
      });
      return fields;
    },
  })
  .mutation('create', {
    input: z.object({}).catchall(z.string()),
    async resolve({ input }) {
      const fields = pipe(input, D.toPairs, A.map(mapToField)) as any;
      const createdCase = await prisma.case.create({ data: { fields: { createMany: { data: fields } } } });

      return null;
    },
  });

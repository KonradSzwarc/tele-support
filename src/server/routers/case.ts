import { A, D, pipe } from '@mobily/ts-belt';
import { z } from 'zod';
import { createRouter } from '../create-router';
import { prisma } from '../prisma';

type Writeable<T> = { -readonly [P in keyof T]: T[P] };
const toPairs = (obj: Record<string, string>) => D.toPairs(obj);
const mapToField = ([key, value]: readonly [string, string]) => ({ value, templateId: key });

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
      const fields = pipe(input, toPairs, A.map(mapToField));
      const createdCase = await prisma.case.create({ data: { fields: { createMany: { data: fields as Writeable<typeof fields> } } } });

      return createdCase;
    },
  });

import { createRouter } from '../create-router';
import { prisma } from '../prisma';

export const templateRouter = createRouter().query('fields', {
  async resolve() {
    const fields = await prisma.fieldTemplate.findMany({
      orderBy: { order: 'asc' },
    });

    return fields;
  },
});

import { createRouter } from '../create-router';
import { prisma } from '../prisma';

export const caseRouter = createRouter().query('fields', {
  async resolve() {
    const fields = await prisma.fieldTemplate.findMany({
      where: { AND: [{ isVisible: true }, { parentId: null }] },
      // TODO: Konrad przyjdzie i naprawi
      include: { children: { include: { children: { include: { children: true } } } } },
    });
    return fields;
  },
});

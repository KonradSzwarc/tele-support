import { z } from 'zod';
import { updateFieldTemplateInputSchema } from '~/modules/case-template/components/edit-field-template';
import { createRouter } from '../create-router';
import { prisma } from '../prisma';

export const templateRouter = createRouter()
  .query('fields', {
    async resolve() {
      const fields = await prisma.fieldTemplate.findMany({
        orderBy: { order: 'asc' },
      });
      return fields;
    },
  })
  .mutation('update', {
    input: z.object({
      id: z.string(),
      fieldTemplate: updateFieldTemplateInputSchema,
    }),
    async resolve({ input: { id, fieldTemplate } }) {
      const updatedFieldTemplate = await prisma.fieldTemplate.update({ where: { id }, data: { ...fieldTemplate } });

      return updatedFieldTemplate;
    },
  });

import { z } from 'zod';
import { fieldTemplateInputSchema } from '~/modules/case-template/components/field-template-form';
import { createRouter } from '../create-router';
import { prisma } from '../prisma';

export const templateRouter = createRouter()
  .query('fields', {
    async resolve() {
      const fields = await prisma.fieldTemplate.findMany({
        where: { isVisible: true },
        orderBy: { order: 'asc' },
      });
      return fields;
    },
  })
  .mutation('update', {
    input: z.object({
      id: z.string(),
      fieldTemplate: fieldTemplateInputSchema,
    }),
    async resolve({ input: { id, fieldTemplate } }) {
      const updatedFieldTemplate = await prisma.fieldTemplate.update({ where: { id }, data: { ...fieldTemplate } });

      return updatedFieldTemplate;
    },
  })
  .mutation('create', {
    input: z.object({
      parentId: z.string().optional(),
      fieldTemplate: fieldTemplateInputSchema,
    }),
    async resolve({ input: { parentId, fieldTemplate } }) {
      const createdFieldTemplate = await prisma.fieldTemplate.create({ data: { ...fieldTemplate, parentId } });

      return createdFieldTemplate;
    },
  })
  .mutation('delete', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input: { id } }) {
      const deletedFieldTemplate = await prisma.fieldTemplate.update({ where: { id }, data: { isVisible: false } });

      return deletedFieldTemplate;
    },
  });

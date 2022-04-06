import { FieldTemplate } from '@prisma/client';
import { matchById } from './matchById';

type FieldTemplateWithFamily = FieldTemplate & {
  parent: FieldTemplate | null;
  children: FieldTemplate[];
};

export type FieldTemplateWithLevel = FieldTemplateWithFamily & { level: number };

export const calculateNestingLevel =
  (allFieldTemplates: FieldTemplateWithFamily[]) =>
  (fieldTemplate: FieldTemplateWithFamily): FieldTemplateWithLevel => {
    if (fieldTemplate.parentId === null) return { ...fieldTemplate, level: 0 };

    const parentTemplate = allFieldTemplates.find(matchById(fieldTemplate.parentId));
    if (!parentTemplate) return { ...fieldTemplate, level: -1 };

    const parentLevel = calculateNestingLevel(allFieldTemplates)(parentTemplate).level;

    return { ...fieldTemplate, level: parentLevel + 1 };
  };

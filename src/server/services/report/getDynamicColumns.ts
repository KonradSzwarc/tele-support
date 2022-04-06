import { A, G, pipe } from '@mobily/ts-belt';
import { Case, Field, FieldTemplate, User } from '@prisma/client';
import { FieldTemplateWithLevel } from './calculateNestingLevel';
import { getFieldValue } from './getFieldValue';
import { matchById } from './matchById';

export type FieldWithTemplate = Field & {
  template: FieldTemplate;
};

export type SingleCase = Case & {
  fields: FieldWithTemplate[];
  user: User | null;
};

const convertFieldToColumn = (allTemplates: FieldTemplateWithLevel[]) => (field: FieldWithTemplate) => {
  const template = pipe(allTemplates, A.find(matchById(field.templateId)));
  if (!template || template.type === 'OPTION') return null;

  const getRootElementName = (template?: FieldTemplateWithLevel): string => {
    if (!template?.parentId) return template?.name ?? '';
    const parentTemplate = allTemplates.find(matchById(template.parentId));

    return getRootElementName(parentTemplate);
  };
  const columnNameSuffix = template.level === 0 ? '' : ` - ${template.level}`;

  return {
    column: getRootElementName(template) + columnNameSuffix,
    value: getFieldValue(field, allTemplates),
  };
};

export const getDynamicColumns = (singleCase: SingleCase, allFields: FieldTemplateWithLevel[]) => {
  const dynamicColumns = singleCase.fields.map(convertFieldToColumn(allFields)).filter(G.isNotNullable);
  return dynamicColumns;
};

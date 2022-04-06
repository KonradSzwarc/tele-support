import { FieldTemplateWithLevel } from './calculateNestingLevel';
import { matchById } from './matchById';
import { FieldWithTemplate } from './getDynamicColumns';

export const getFieldValue = (field: FieldWithTemplate, allFields: FieldTemplateWithLevel[]) => {
  const fieldTemplate = allFields.find(matchById(field.value));
  const isSelect = field.template.type === 'SINGLE_SELECT';

  return isSelect ? fieldTemplate?.name ?? '' : field.value;
};

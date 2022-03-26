import { Field } from '../components/case-form';

const getRequiredFieldsIds = (acc: string[], { id, isRequired, type, children }: Field) => {
  if (isRequired && type !== 'OPTION') acc.push(id);
  if (children) children.reduce(getRequiredFieldsIds, acc);
  return acc;
};
export const getRequiredFields = (fields: Field[]) => fields.reduce(getRequiredFieldsIds, []);

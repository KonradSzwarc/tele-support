import { FieldTemplate } from '@prisma/client';
import { byOrder } from '~/utils';
import { useFormField } from '../hooks/use-form-field';
import { Field } from './case-form';
import { ShortText } from './short-text';
import { SingleSelectField } from './single-select-field';

export type CaseFieldProps = Pick<FieldTemplate, 'id' | 'type' | 'isRequired' | 'isCheckedByDefault'> & { name?: string; options: Field[] };

const onlyVisible = ({ isVisible }: Field) => isVisible;
const idMatches =
  (value: string) =>
  ({ id }: Field) =>
    id === value;

const toSelectionOption = ({ name, id, isCheckedByDefault }: Field) => ({ label: name, value: id, isCheckedByDefault: isCheckedByDefault });

export const CaseField = ({ id, name, type, options, isRequired, isCheckedByDefault }: CaseFieldProps) => {
  const { value, updateField } = useFormField(id);

  const handleValueUpdate = (newValue: string | null) => {
    const value = newValue ?? '';
    updateField(id, value);
  };

  if (type === 'SINGLE_SELECT' && options) {
    const selectionOptions = options.filter(onlyVisible).sort(byOrder).map(toSelectionOption);
    const nestedFields = options.filter(idMatches(value)).filter(onlyVisible).sort(byOrder);

    return (
      <>
        <SingleSelectField
          id={id}
          name={name}
          options={selectionOptions}
          onChange={handleValueUpdate}
          isRequired={isRequired}
          value={value}
        />
        {nestedFields.map(({ id, type, children }) => (
          <CaseField key={id} id={id} type={type} options={children} isRequired={isRequired} isCheckedByDefault={isCheckedByDefault} />
        ))}
      </>
    );
  }

  if (type === 'SHORT_TEXT') {
    return <ShortText id={id} name={name} onChange={handleValueUpdate} isRequired={isRequired} value={value} />;
  }

  return null;
};

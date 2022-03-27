import { FieldTemplate } from '@prisma/client';
import { useFormField } from '../hooks/use-form-field';
import { Field } from './case-form';
import { ShortText } from './short-text';
import { SingleSelectField } from './single-select-field';

export type CaseFieldProps = Pick<FieldTemplate, 'id' | 'type' | 'isRequired'> & { name?: string; options: Field[] };

export const CaseField = ({ id, name, type, options, isRequired }: CaseFieldProps) => {
  const { value, updateField } = useFormField(id);

  const handleValueUpdate = (newValue: string | null) => {
    const value = newValue ?? '';
    updateField(id, value);
  };

  if (type === 'SINGLE_SELECT' && options) {
    const dropdownOptions = options.map(({ name, id }) => ({ label: name, value: id }));
    const nestedFields = options.filter(({ id }) => id === value);

    return (
      <>
        <SingleSelectField
          id={id}
          name={name}
          options={dropdownOptions}
          onChange={handleValueUpdate}
          isRequired={isRequired}
          value={value}
        />
        {nestedFields.map(({ id, type, children }) => (
          <CaseField key={id} id={id} type={type} options={children} isRequired={isRequired} />
        ))}
      </>
    );
  }

  if (type === 'SHORT_TEXT') {
    return <ShortText id={id} name={name} onChange={handleValueUpdate} isRequired={isRequired} value={value} />;
  }

  return null;
};

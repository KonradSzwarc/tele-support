import { FieldTemplate } from '@prisma/client';
import { useState } from 'react';
import { useForm } from '../contexts/form-context';
import { ShortText } from './short-text';
import { SingleSelectField } from './single-select-field';

type Option = FieldTemplate & { children: Option[] };

export type CaseFieldProps = Pick<FieldTemplate, 'id' | 'type'> & { name?: string; options?: Option[] };

export const CaseField = ({ id, name, type, options }: CaseFieldProps) => {
  const { updateField } = useForm();
  const [value, setValue] = useState<string | null>(null);

  const handleValueUpdate = (newValue: string | null) => {
    const value = newValue ?? '';
    updateField(id, value);
    setValue(newValue);
  };

  if (type === 'SINGLE_SELECT' && options) {
    const dropdownOptions = options.map(({ name, id }) => ({ label: name, value: id }));
    const nestedFields = options.filter(({ id }) => id === value);

    return (
      <>
        <SingleSelectField id={id} name={name} options={dropdownOptions} onChange={handleValueUpdate} />
        {nestedFields.map(({ id, type, children }) => (
          <CaseField key={id} id={id} type={type} options={children} />
        ))}
      </>
    );
  }

  if (type === 'SHORT_TEXT') {
    return <ShortText id={id} name={name} onChange={handleValueUpdate} />;
  }

  return null;
};

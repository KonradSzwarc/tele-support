import { FieldTemplate } from '@prisma/client';
import { useState } from 'react';
import { ShortText } from './short-text';
import { SingleSelectField } from './single-select-field';

type Option = FieldTemplate & { children: Option[] };

export type CaseFieldProps = Pick<FieldTemplate, 'id' | 'type'> & { name?: string; options?: Option[] };

export const CaseField = ({ id, name, type, options }: CaseFieldProps) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  if (type === 'SINGLE_SELECT' && options) {
    const dropdownOptions = options.map(({ id, name }) => ({ label: name, value: id }));
    const nestedFields = options.filter(({ id }) => id === selectedValue);

    return (
      <>
        <SingleSelectField id={id} name={name} options={dropdownOptions} onChange={setSelectedValue} />
        {nestedFields.map(({ id, type, children }) => (
          <CaseField key={id} id={id} type={type} options={children} />
        ))}
      </>
    );
  }

  if (type === 'SHORT_TEXT') {
    return <ShortText id={id} name={name} />;
  }

  return null;
};

import { InputWrapper, Select, SelectItem, Space } from '@mantine/core';

export type SingleSelectFieldProps = {
  id: string;
  value: string;
  name?: string;
  isRequired: boolean;
  options: SelectItem[];
  onChange: (selectItem: string | null) => void;
};

export const SingleSelectField = ({ id, value, name = 'Podtyp', options, isRequired, onChange }: SingleSelectFieldProps) => {
  return (
    <>
      {!name && <Space h="md" />}
      <InputWrapper id={id} required={isRequired} label={name} size="md">
        <Select value={value} placeholder={name} size="md" data={options} onChange={onChange} clearable searchable />
      </InputWrapper>
    </>
  );
};

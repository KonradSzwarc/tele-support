import { InputWrapper, Select, SelectItem, Space } from '@mantine/core';

export type SingleSelectFieldProps = {
  id: string;
  name?: string;
  options: SelectItem[];
  onChange: (selectItem: string | null) => void;
};

export const SingleSelectField = ({ id, name = '', options, onChange }: SingleSelectFieldProps) => {
  return (
    <>
      {!name && <Space h="md" />}
      <InputWrapper id={id} required label={name} size="md">
        <Select placeholder={name} size="md" data={options} onChange={onChange} clearable searchable />
      </InputWrapper>
    </>
  );
};

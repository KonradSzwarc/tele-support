import { Chip, Chips, InputWrapper, SelectItem, Space } from '@mantine/core';

export type SingleSelectFieldProps = {
  id: string;
  value: string;
  name?: string;
  isRequired: boolean;
  options: SelectItem[];
  onChange: (selectItem: string | null) => void;
};

export const SingleSelectField = ({ value, name = '', options, isRequired, onChange }: SingleSelectFieldProps) => {
  const handleChange = (val: any) => {
    onChange(val.target.value);
  };

  const chips = options.map((o) => (
    <Chip key={o.value} value={o.value} onClick={handleChange}>
      {o.label}
    </Chip>
  ));

  return (
    <>
      {!name && <Space h="md" />}
      <InputWrapper label={name} size="md">
        <Chips color="green" aria-required={isRequired} value={value}>
          {chips}
        </Chips>
      </InputWrapper>
    </>
  );
};

import { Chip, Chips, InputWrapper, SelectItem, Space } from '@mantine/core';
interface selectionOptions {
  label: string;
  value: string;
  isCheckedByDefault: boolean;
}

export type SingleSelectFieldProps = {
  id: string;
  value: string;
  name?: string;
  isRequired: boolean;
  options: selectionOptions[];
  onChange: (selectItem: string | null) => void;
};

export const SingleSelectField = ({ value, name = '', options, isRequired, onChange }: SingleSelectFieldProps) => {
  const handleChange = (val: any) => {
    onChange(val.target.value);
  };

// TODO jesli option.isCheckedByDefault jest TRUE to chip powinien wyswietlic sie od razu zaznaczony... defaultChecked i checked nie powoduja zaznaczenia :F

  const chips = options.map((o) => (
    <Chip key={o.value} value={o.value} onClick={handleChange}>
      {o.label}
    </Chip>
  ));

  return (
    <>
      {!name && <Space h="md" />}
      <InputWrapper label={name} size="md" p='sm'>
        <Chips color="green" aria-required={isRequired} value={value}>
          {chips}
        </Chips>
      </InputWrapper>
    </>
  );
};

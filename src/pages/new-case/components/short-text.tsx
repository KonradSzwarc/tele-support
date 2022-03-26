import { Input, InputWrapper } from '@mantine/core';
import { CaseFieldProps } from './case-field';

export type ShortTextProps = Pick<CaseFieldProps, 'id' | 'name'> & {
  onChange: (selectItem: string | null) => void;
};

export const ShortText = ({ id, name, onChange }: ShortTextProps) => {
  return (
    <InputWrapper id={id} required label={name} size="md">
      <Input placeholder={name} size="md" onChange={(e: any) => onChange(e.target.value)} />
    </InputWrapper>
  );
};

import { Input, InputWrapper } from '@mantine/core';
import { CaseFieldProps } from './case-field';

export type ShortTextProps = Pick<CaseFieldProps, 'id' | 'name' | 'isRequired'> & {
  value: string;
  onChange: (selectItem: string | null) => void;
};

export const ShortText = ({ id, value, name, isRequired, onChange }: ShortTextProps) => {
  return (
    <InputWrapper id={id} required={isRequired} label={name} size="md" p='sm' style={{width: '30%'}}>
      <Input value={value} placeholder={name} size="md" onChange={(e: any) => onChange(e.target.value)} />
    </InputWrapper>
  );
};

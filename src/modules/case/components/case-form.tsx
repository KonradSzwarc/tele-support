import { Center, Space } from '@mantine/core';
import { FieldTemplate } from '@prisma/client';
import { SaveButton } from '~/components/save-button';
import { useCaseFields } from '../hooks';
import { useForm } from '../hooks/use-form';
import { CaseField } from './case-field';

export type Field = FieldTemplate & { children: Field[] };

export const CaseForm = () => {
  const { data } = useCaseFields();
  const { submitForm } = useForm(data as Field[]);

  return (
    <Center sx={{ flexDirection: 'column' }}>
      {data?.map(({ id, name, type, children, isRequired }) => (
        <CaseField key={id} id={id} name={name} type={type} isRequired={isRequired} options={children as Field[]} />
      ))}
      <Space h="md" />
      <SaveButton onClick={submitForm}></SaveButton>
    </Center>
  );
};

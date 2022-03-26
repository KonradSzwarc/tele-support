import { Button, Center, Space } from '@mantine/core';
import { FieldTemplate } from '@prisma/client';
import { CloudUpload } from 'tabler-icons-react';
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
      <Button onClick={submitForm} rightIcon={<CloudUpload size={20} />}>
        Zapisz
      </Button>
    </Center>
  );
};

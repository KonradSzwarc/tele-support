import { Button, Center, Space } from '@mantine/core';
import { CloudUpload } from 'tabler-icons-react';
import { useForm } from '../contexts/form-context';
import { useCaseFields } from '../hooks/use-case-fields';
import { CaseField } from './case-field';

export const CaseForm = () => {
  const { submitForm } = useForm();
  const { data } = useCaseFields();
  const notSimple = data?.filter((f) => f.type === 'SINGLE_SELECT');
  const simple = data?.filter((f) => f.type === 'SHORT_TEXT');

  return (
    <Center sx={{ flexDirection: 'column' }}>
      {notSimple?.map(({ id, name, type, children }) => (
        <CaseField key={id} id={id} name={name} type={type} options={children as any} />
      ))}
      {simple?.map(({ id, name, type }) => (
        <CaseField key={id} id={id} name={name} type={type} />
      ))}
      <Space h="md" />
      <Button onClick={submitForm} rightIcon={<CloudUpload size={20} />}>
        Zapisz
      </Button>
    </Center>
  );
};

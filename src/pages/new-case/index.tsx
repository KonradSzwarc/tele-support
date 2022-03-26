import { Center } from '@mantine/core';
import { NextPage } from 'next';
import { CaseField } from './components/case-field';
import { useCaseFields } from './hooks/use-case-fields';

const NewCasePage: NextPage = () => {
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
    </Center>
  );
};

export default NewCasePage;

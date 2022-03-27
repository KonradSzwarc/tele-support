import { NextPage } from 'next';
import { Button, Center, Space } from '@mantine/core';
import { useUsers } from '../../modules/users/hooks';
import DisplayUsers from '../../modules/users/components/display-users';
import { CreateUser } from '../../modules/users/components/create-user';
import { useState } from 'react';

const RegisterNewUser: NextPage = () => {
  const [showUserRegistration, setShowUserRegistration] = useState(false);

  const { data } = useUsers();
  if (!data) {
    return <Button onClick={() => setShowUserRegistration(true)}>Dodaj </Button>;
  }

  return (
    <Center style={{ flexDirection: 'column', width: '90%', marginTop: '2rem' }}>
      {showUserRegistration ? null : <Button onClick={() => setShowUserRegistration(true)}>Dodaj </Button>}
      {showUserRegistration ? <CreateUser setShow={setShowUserRegistration} /> : null}
      <Space h="md" />
      <DisplayUsers users={data} />
    </Center>
  );
};

export default RegisterNewUser;

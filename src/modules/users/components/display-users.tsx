import { Button, Center, Container, Text } from '@mantine/core';
import { User } from '@prisma/client';
import { UserPlus } from 'tabler-icons-react';
import { Row } from './single-row';

interface DisplayUserProps {
  users: User[];
  selectUserForEdit: (user: User) => void;
  selectUserForDeactivation: (user: User) => void;
}

const DisplayUsers = ({ users, setShowRegistrationModal, selectUserForEdit, selectUserForDeactivation }: any) => {
  const rows = users.map((u: User, idx: number) => (
    <Row key={u.id} user={u} nr={idx} setUserForEdit={selectUserForEdit} setUserForDeactivation={selectUserForDeactivation} />
  ));

  return (
    <Container style={{ flexDirection: 'column', width: '90%' }}>
      <Center style={{ padding: '1rem' }}>
        <Text style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Użytkownicy:</Text>
        <Button  color="green" ml='1rem' onClick={() => setShowRegistrationModal(true)} leftIcon={<UserPlus />}>Dodaj </Button>
      </Center>
      {rows}
    </Container>
  );
};

export default DisplayUsers;

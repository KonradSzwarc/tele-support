import { Center, Container, Text } from '@mantine/core';
import { User } from '@prisma/client';
import { Row } from './single-row';

interface DisplayUserProps {
  users: User[],
  selectUserForEdit: (user: User) => void,
  selectUserForDeactivation:  (user: User) => void,
}

const DisplayUsers = ({ users, selectUserForEdit, selectUserForDeactivation }: any) => {
  const rows = users.map((u: User, idx: number) => (
    <Row key={u.id} user={u} nr={idx} setUserForEdit={selectUserForEdit} setUserForDeactivation={selectUserForDeactivation} />
  ));

  return (
    <Container style={{ flexDirection: 'column', width: '90%' }}>
      <Center style={{ padding: '1rem' }}>
        <Text style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Użytkownicy:</Text>
      </Center>
      {rows}
    </Container>
  );
};

export default DisplayUsers;

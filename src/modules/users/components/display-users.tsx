import { Center, Container, Text } from '@mantine/core';
import { Row } from './single-row';

const DisplayUsers = ({ users }: any) => {
  const rows = users.map((u: any, idx: number) => <Row key={u.id} user={u} nr={idx} />);

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

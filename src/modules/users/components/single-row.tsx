import { Grid, Container, Button } from '@mantine/core';
import { Trash, Edit } from 'tabler-icons-react';

export const Row = ({ user, nr, setUserForEdit, setUserForDeactivation }: any) => {

  const chooseUser = () => {
    console.log('selecting for edit user: ', user)
    setUserForEdit(user);
  }
  return (
    <Container>
      <Grid justify={'center'} align={'center'}>
        <Grid.Col span={1}>{nr + 1}</Grid.Col>
        <Grid.Col span={2}>{user.name}</Grid.Col>
        <Grid.Col span={3}>{user.email}</Grid.Col>
        <Grid.Col span={2}>{user.role}</Grid.Col>
        
        <Grid.Col span={2}>
          <Button color="blue" onClick={chooseUser} leftIcon={<Edit />}>
            Edytuj
          </Button>
        </Grid.Col>

        <Grid.Col span={2}>
          <Button color="red" onClick={() => setUserForDeactivation(user)} leftIcon={<Trash />}>
            Dezaktywuj
          </Button>
        </Grid.Col>
        
      </Grid>
    </Container>
  );
};

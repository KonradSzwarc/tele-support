import { Grid, Container, Button } from '@mantine/core';
import { Trash } from 'tabler-icons-react';

export const Row = ({ user, nr }: any) => {
  return (
    <Container>
      <Grid justify={'center'} align={'center'}>
        <Grid.Col span={1}>{nr + 1}</Grid.Col>
        <Grid.Col span={2}>{user.name}</Grid.Col>
        <Grid.Col span={3}>{user.email}</Grid.Col>
        <Grid.Col span={2}>{user.role}</Grid.Col>
        <Grid.Col span={1}>
          <Button color="red" onClick={() => {}} leftIcon={<Trash />}>
            Dezaktywuj
          </Button>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
